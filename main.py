import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api import endpoints
from app.core.config import settings
import nltk

# Download necessary NLTK data for summarization
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

app = FastAPI(
    title="AI Audiobook Generator",
    description="Convert PDFs and Docs to Audio with Neural Voices",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp directories
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.AUDIO_DIR, exist_ok=True)

# Mount static files for audio playback
app.mount("/audio", StaticFiles(directory=settings.AUDIO_DIR), name="audio")

# Include Routes
app.include_router(endpoints.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "AI Audiobook Generator API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)