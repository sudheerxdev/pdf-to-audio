import os
from pathlib import Path

class Settings:
    BASE_DIR = Path(__file__).resolve().parent.parent.parent
    UPLOAD_DIR = os.path.join(BASE_DIR, "temp", "uploads")
    AUDIO_DIR = os.path.join(BASE_DIR, "temp", "audio")
    MAX_TEXT_LENGTH = 100000  # Safety limit for demo

settings = Settings()