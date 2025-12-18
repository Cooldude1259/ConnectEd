from flask import Flask, render_template
from api.supabase_api import supabase_blueprint # Import your separate API

app = Flask(__name__)

# 1. Register the separate API file
# All routes in supabase_api.py will now start with /api
app.register_blueprint(supabase_blueprint, url_prefix='/api')

# 2. Main route to serve your HTML file
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)