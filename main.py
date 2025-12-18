import os

api_key = os.environ.get("API_KEY")

if api_key is None:
    raise ValueError("API_KEY environment variable is not set.")
else:
    print("API_KEY is set.")
    print(f"API_KEY: {api_key}")