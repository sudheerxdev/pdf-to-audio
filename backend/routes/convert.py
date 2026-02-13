import os, uuid
from flask import Blueprint, request, jsonify, send_from_directory
from services.pdf_reader import pdf_to_text
from services.tts_service import text_to_audio
from config import UPLOAD_FOLDER, AUDIO_FOLDER

convert_bp = Blueprint("convert", __name__)

@convert_bp.route("/api/convert", methods=["POST"])
def convert_pdf():
    pdf = request.files.get("file")
    lang = request.form.get("lang", "en")

    if not pdf:
        return jsonify({"error": "No PDF uploaded"}), 400

    pdf_name = f"{uuid.uuid4()}.pdf"
    pdf_path = os.path.join(UPLOAD_FOLDER, pdf_name)
    pdf.save(pdf_path)

    text = pdf_to_text(pdf_path)

    audio_name = pdf_name.replace(".pdf", ".mp3")
    audio_path = os.path.join(AUDIO_FOLDER, audio_name)

    text_to_audio(text, lang, audio_path)

    return jsonify({
        "audio_url": f"http://127.0.0.1:5000/audio/{audio_name}"
    })


@convert_bp.route("/audio/<filename>")
def serve_audio(filename):
    return send_from_directory(AUDIO_FOLDER, filename)
