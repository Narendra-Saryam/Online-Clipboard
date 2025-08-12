import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Simple configuration for JSON file storage
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "your-secret-key-here")
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50MB limit
