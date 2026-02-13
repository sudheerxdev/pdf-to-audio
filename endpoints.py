import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from app.services.text_processor import extract_text_from_file, generate_summary, detect_language
from app.services.tts_engine import generate_audio
from app.core.config import settings

router = APIRouter()

VOICES = [
    {"id": "en-US-AriaNeural", "name": "Aria (US Female)", "lang": "en"},
    {"id": "en-US-GuyNeural", "name": "Guy (US Male)", "lang": "en"},
    {"id": "en-GB-SoniaNeural", "name": "Sonia (UK Female)", "lang": "en"},
    {"id": "es-ES-ElviraNeural", "name": "Elvira (Spanish Female)", "lang": "es"},
    {"id": "fr-FR-DeniseNeural", "name": "Denise (French Female)", "lang": "fr"},
]

@router.get("/voices")
async def get_voices():
    return VOICES

@router.post("/convert")
async def convert_document(
    file: UploadFile = File(...),
    voice: str = Form("en-US-AriaNeural"),
    speed: float = Form(1.0)
):
    # Validate file type
    if not file.filename.lower().endswith(('.pdf', '.docx', '.txt')):
        raise HTTPException(status_code=400, detail="Unsupported file format")

    # Save uploaded file temporarily
    temp_path = os.path.join(settings.UPLOAD_DIR, file.filename)
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 1. Extract Text
        text = await extract_text_from_file(temp_path, file.filename)
        
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from document")

        # 2. AI Processing (Summary & Lang Detect)
        summary = generate_summary(text)
        language = detect_language(text)

        # 3. Generate Audio
        # Convert float speed to string format (e.g., 1.2 -> "+20%")
        rate_pct = int((speed - 1.0) * 100)
        rate_str = f"{'+' if rate_pct >= 0 else ''}{rate_pct}%"
        
        # Limit text length for demo purposes to avoid timeouts
        safe_text = text[:settings.MAX_TEXT_LENGTH]
        
        audio_filename = await generate_audio(safe_text, voice, rate_str)
        audio_url = f"/audio/{audio_filename}"

        return {
            "status": "success",
            "summary": summary,
            "detected_language": language,
            "audio_url": audio_url,
            "text_preview": text[:500] + "..."
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup upload
        if os.path.exists(temp_path):
            os.remove(temp_path)

def remove_file(path: str):
    if os.path.exists(path):
        os.remove(path)

@router.get("/download/{filename}")
async def download_audio(filename: str, background_tasks: BackgroundTasks):
    file_path = os.path.join(settings.AUDIO_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Optional: Delete file after download if you want ephemeral storage
    # background_tasks.add_task(remove_file, file_path)
    return FileResponse(file_path, media_type="audio/mpeg", filename="audiobook.mp3")