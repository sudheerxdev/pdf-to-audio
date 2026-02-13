from flask import Flask
from flask_cors import CORS
import os

from config import UPLOAD_FOLDER, AUDIO_FOLDER, SECRET_KEY, DEBUG
from routes.convert import convert_bp

app = Flask(__name__)
app.secret_key = SECRET_KEY
app.debug = DEBUG

CORS(app)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)

# Register routes
app.register_blueprint(convert_bp)

@app.route("/")
def health():
    return {"status": "Backend is running 🚀"}

if __name__ == "__main__":
    app.run()
