import edge_tts
import uuid
import os
from app.core.config import settings

async def generate_audio(text: str, voice: str, rate: str = "+0%") -> str:
    """
    Generates audio using Edge TTS.
    Returns the filename of the generated audio.
    """
    # Create a unique filename
    filename = f"{uuid.uuid4()}.mp3"
    output_path = os.path.join(settings.AUDIO_DIR, filename)
    
    # Configure TTS
    # rate format for edge-tts is like "+10%" or "-10%"
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    
    # Save to file
    await communicate.save(output_path)
    
    return filename