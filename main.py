from flask import Flask, render_template
from api.supabase_api import supabase_blueprint # Import your separate API
from api.auth_api import auth_blueprint

app = Flask(__name__, static_folder='static', template_folder='templates')

# 1. Register the separate API file
# All routes in supabase_api.py will now start with /api
app.register_blueprint(supabase_blueprint, url_prefix='/api')
app.register_blueprint(auth_blueprint, url_prefix='/auth')

# 2. Main route to serve your HTML file
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)