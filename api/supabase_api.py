import os
from flask import Blueprint, jsonify
from supabase import create_client

# Create the blueprint
supabase_blueprint = Blueprint('supabase_api', __name__)

# Initialize Supabase
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(url, key)

@supabase_blueprint.route('/get-items')
def get_items():
    try:
        response = supabase.table("items").select("*").execute()
        return jsonify({"status": "success", "data": response.data})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500