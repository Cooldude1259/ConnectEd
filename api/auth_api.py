# api/auth_api.py
from flask import Blueprint, request, jsonify
from supabase import create_client
import os

auth_blueprint = Blueprint('auth_api', __name__)

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
        # With "Confirm Email" off, this user is created and ready to go
        response = supabase.auth.sign_up({
            "email": email,
            "password": password,
        })
        return jsonify({"message": "User created successfully", "user": response.user.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    try:
        # Supabase checks the email/password and returns a session
        response = supabase.auth.sign_in_with_password({
            "email": data.get('email'),
            "password": data.get('password'),
        })
        return jsonify({
            "message": "Login successful", 
            "user": response.user.id,
            "session": response.session.access_token # You'll use this later
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 401