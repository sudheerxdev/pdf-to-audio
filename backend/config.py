import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
AUDIO_FOLDER = os.path.join(BASE_DIR, "audio")

SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key")

DEBUG = True
