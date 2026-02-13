import re
from pypdf import PdfReader
from docx import Document
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from langdetect import detect

def clean_text(text: str) -> str:
    # Remove page numbers, headers/footers patterns (basic regex)
    text = re.sub(r'\n\d+\n', '\n', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

async def extract_text_from_file(file_path: str, filename: str) -> str:
    text = ""
    if filename.lower().endswith('.pdf'):
        reader = PdfReader(file_path)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
    elif filename.lower().endswith('.docx'):
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
    elif filename.lower().endswith('.txt'):
        with open(file_path, 'r', encoding='utf-8') as f:
            text = f.read()
    
    return clean_text(text)

def generate_summary(text: str, sentences_count: int = 3) -> str:
    try:
        language = detect(text[:1000])
        # Map langdetect code to sumy language string if needed, defaulting to english
        lang_map = {'en': 'english', 'fr': 'french', 'de': 'german', 'es': 'spanish'}
        sumy_lang = lang_map.get(language, 'english')

        parser = PlaintextParser.from_string(text, Tokenizer(sumy_lang))
        stemmer = Stemmer(sumy_lang)
        summarizer = LsaSummarizer(stemmer)
        summarizer.stop_words = get_stop_words(sumy_lang)

        summary = []
        for sentence in summarizer(parser.document, sentences_count):
            summary.append(str(sentence))
        
        return " ".join(summary)
    except Exception as e:
        print(f"Summarization error: {e}")
        return "Summary unavailable for this text."

def detect_language(text: str) -> str:
    try:
        return detect(text[:500])
    except:
        return "en"