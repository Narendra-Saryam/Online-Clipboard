import os
import json
import random
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from config import Config

ALLOWED_EXT = {"jpg", "jpeg", "png", "gif", "mp4", "avi", "mov", "mp3", "wav", "pdf", "doc", "docx", "txt"}

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# JSON file for data storage
CLIPS_FILE = "clips.json"

def load_clips():
    """Load clips from JSON file"""
    if os.path.exists(CLIPS_FILE):
        with open(CLIPS_FILE, 'r') as f:
            return json.load(f)
    return []

def save_clips(clips_data):
    """Save clips to JSON file"""
    with open(CLIPS_FILE, 'w') as f:
        json.dump(clips_data, f, indent=2, default=str)

# Create uploads directory if it doesn't exist
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# ✅ Ensure unique 4-digit code
def generate_unique_code():
    clips_data = load_clips()
    while True:
        code = "{:04d}".format(random.randint(0, 9999))
        # Check if code exists and is not expired
        existing = next((clip for clip in clips_data 
                        if clip["share_code"] == code and 
                        datetime.fromisoformat(clip["expiry"]) > datetime.utcnow()), None)
        if not existing:
            return code

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXT

# 📌 Share TEXT or FILE
@app.route("/clipboard", methods=["POST"])
def store_clipboard():
    data_type = request.form.get("type", "text")
    share_code = generate_unique_code()

    clip_data = {
        "created_at": datetime.utcnow(),
        "expiry": datetime.utcnow() + timedelta(hours=1),
        "share_code": share_code
    }

    if data_type == "text":
        clip_data["type"] = "text"
        clip_data["content"] = request.form.get("text", "")

    elif data_type == "file":
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        file = request.files["file"]
        if file.filename == "" or not allowed_file(file.filename):
            return jsonify({"error": "Invalid file"}), 400
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)
        clip_data["type"] = "file"
        clip_data["filename"] = filename

    else:
        return jsonify({"error": "Invalid type"}), 400

    # Save to JSON file
    clips_data = load_clips()
    clip_data["id"] = str(len(clips_data) + 1)  # Simple ID generation
    clips_data.append(clip_data)
    save_clips(clips_data)
    
    return jsonify({
        "success": True,
        "id": clip_data["id"],
        "share_code": share_code
    })

# 📌 Retrieve by 4-digit code
@app.route("/clipboard", methods=["GET"])
def retrieve_clipboard():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Code required"}), 400

    clips_data = load_clips()
    clip = next((clip for clip in clips_data 
                if clip["share_code"] == code and 
                datetime.fromisoformat(clip["expiry"]) > datetime.utcnow()), None)

    if not clip:
        return jsonify({"error": "Not found or expired"}), 404

    if clip["type"] == "file":
        return jsonify({
            "type": "file",
            "filename": clip["filename"],
            "url": f"/uploads/{clip['filename']}"
        })
    else:
        return jsonify({
            "type": "text",
            "content": clip["content"]
        })

# 📌 Serve uploaded files
@app.route("/uploads/<filename>")
def serve_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# 📌 Delete clip
@app.route("/clipboard/<clip_id>", methods=["DELETE"])
def delete_clipboard(clip_id):
    clips_data = load_clips()
    original_length = len(clips_data)
    clips_data = [clip for clip in clips_data if clip["id"] != clip_id]
    
    if len(clips_data) < original_length:
        save_clips(clips_data)
        return jsonify({"deleted": True})
    else:
        return jsonify({"deleted": False})

# 📌 Health check endpoint
@app.route("/health")
def health_check():
    try:
        # Test JSON file access
        load_clips()
        return jsonify({"status": "ok", "message": "Server is running", "storage": "json_file"})
    except Exception as e:
        return jsonify({"status": "error", "message": "Storage access failed", "error": str(e)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
