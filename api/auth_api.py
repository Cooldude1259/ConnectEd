import os
import secrets
from datetime import datetime, timedelta, timezone
from flask import Blueprint, request, jsonify
from supabase import create_client
from api.email_utils import send_custom_mail

auth_blueprint = Blueprint('auth_api', __name__)

# Initialize Supabase
supabase = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
)

@auth_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    try:
        # 1. Create user in Supabase Auth
        # (Make sure "Confirm Email" is OFF in Supabase Dashboard)
        auth_response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        user_id = auth_response.user.id

        # 2. Create entry in your custom profiles table
        supabase.table("profiles").insert({
            "id": user_id,
            "email": email,
            "is_verified": False
        }).execute()

        return jsonify({"message": "User created. Please request a magic link to verify.", "user": user_id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        response = supabase.auth.sign_in_with_password({
            "email": data.get('email'),
            "password": data.get('password')
        })
        
        # Check if the user is verified in our custom table before allowing entry
        profile = supabase.table("profiles").select("is_verified").eq("id", response.user.id).single().execute()
        
        if not profile.data.get("is_verified"):
            return jsonify({"error": "Account not verified. Please check your email."}), 403

        return jsonify({"message": "Login successful", "session": response.session.access_token}), 200
    except Exception as e:
        return jsonify({"error": "Invalid credentials"}), 401

@auth_blueprint.route('/send-magic-link', methods=['POST'])
def send_link():
    email = request.json.get('email')
    
    # 1. Rate Limiting: Check if a token was sent in the last 60 seconds
    last_token = supabase.table("verification_tokens").select("created_at").eq("email", email).order("created_at", desc=True).limit(1).execute()
    if last_token.data:
        created_at = datetime.fromisoformat(last_token.data[0]['created_at'].replace('Z', '+00:00'))
        if datetime.now(timezone.utc) - created_at < timedelta(minutes=1):
            return jsonify({"error": "Please wait 60 seconds"}), 429

    # 2. Generate 15-minute temporary token
    token = secrets.token_urlsafe(32)
    expiry = datetime.now(timezone.utc) + timedelta(minutes=15)

    # 3. Store token in Supabase
    supabase.table("verification_tokens").insert({
        "email": email,
        "token": token,
        "expires_at": expiry.isoformat()
    }).execute()

    # 4. Send Email
    base_url = os.environ.get("BASE_URL", "http://localhost:5000")
    magic_link = f"{base_url}/auth/verify?token={token}"
    
    if send_custom_mail(email, magic_link):
        return jsonify({"message": "Magic link sent!"}), 200
    return jsonify({"error": "Failed to send email"}), 500

@auth_blueprint.route('/verify', methods=['GET'])
def verify():
    token_received = request.args.get('token')

    # 1. Fetch token details
    query = supabase.table("verification_tokens").select("*").eq("token", token_received).single().execute()
    if not query.data:
        return "Invalid Link", 400

    # 2. Check Expiration
    expiry = datetime.fromisoformat(query.data['expires_at'].replace('Z', '+00:00'))
    if datetime.now(timezone.utc) > expiry:
        return "Link Expired", 400

    # 3. Update Profile to Verified
    email = query.data['email']
    supabase.table("profiles").update({"is_verified": True}).eq("email", email).execute()

    # 4. Clean up: Delete used token
    supabase.table("verification_tokens").delete().eq("token", token_received).execute()

    return "Account verified successfully! You can now log in.", 200