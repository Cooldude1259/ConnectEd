import os
from flask import Flask

api_key = os.environ.get("API_KEY")





app = Flask(__name__)

@app.route("/")
def index():
    if api_key is None:
        return "API_KEY environment variable is not set."
    else:
        return f"API_KEY is set. {api_key}"