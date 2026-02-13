# AI Audiobook Generator Platform

A professional web application that converts PDF, DOCX, and TXT documents into natural-sounding audiobooks using AI.

## Features

- **AI Text-to-Speech**: Uses high-quality neural voices (Edge TTS).
- **Smart Summarization**: Automatically generates a summary of the uploaded document.
- **Multi-format Support**: PDF, DOCX, TXT.
- **Customization**: Adjustable speed and multiple voice options.
- **Modern UI**: Built with Next.js and Tailwind CSS.

## Project Structure

- `backend/`: FastAPI application (Python)
- `frontend/`: Next.js application (TypeScript/React)

## Getting Started

### Prerequisites

- Docker & Docker Compose (Recommended)
- OR Python 3.10+ and Node.js 18+

### Running Locally (Docker)

1. Create a `docker-compose.yml` in the root (optional, or run individually).
2. Build and run:

```bash
# Backend
cd backend
docker build -t audiobook-backend .
docker run -p 8000:8000 audiobook-backend

# Frontend
cd frontend
docker build -t audiobook-frontend .
docker run -p 3000:3000 audiobook-frontend
```

### Running Locally (Manual)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m app.main
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Deployment

- **Backend**: Ready for Render/Railway (Python/FastAPI).
- **Frontend**: Ready for Vercel (Next.js).