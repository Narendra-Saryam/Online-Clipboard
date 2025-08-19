import React, { useState } from "react";
import ShareCode from "./ShareCode";
import { API_BASE_URL } from "../config";

const FileShare = () => {
  const [file, setFile] = useState(null);
  const [showShareCode, setShowShareCode] = useState(false);
  const [shareCode, setShareCode] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to share!");
      return;
    }

    const formData = new FormData();
    formData.append("type", "file");
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/clipboard`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.share_code) {
        setShareCode(data.share_code);
        setShowShareCode(true);
        setFile(null); // Clear the file after successful upload
        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        alert("Error uploading file!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error uploading file! Please try again.");
    }
  };

  const closeShareCode = () => {
    setShowShareCode(false);
    setShareCode("");
  };

  return (
    <>
      <section className="p-6 md:min-w-2xl sm:min-w-2xl mx-auto bg-white rounded-lg shadow mt-6">
        <h2 className="text-3xl font-semibold mb-3 text-gray-800">
          Share Files :
        </h2>
        <p className="text-gray-600 mb-4">
          Click to upload or drag and drop your file. <br />
          <p className="text-sm text-gray-500 mt-2">
            Supported: Images (JPG, PNG, GIF), Videos (MP4, AVI, MOV),
            Audio (MP3, WAV), Documents (PDF, DOC, TXT).
          </p>
        </p>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full p-1 text-gray-600 border-[0.5px] rounded-lg cursor-pointer focus:outline-none"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-500">Selected: {file.name}</p>
        )}
        <button
          onClick={uploadFile}
          className="mt-4 px-4 py-1 md:py-1.5 bg-green-400 hover:opacity-100 opacity-85 rounded"
        >
          Share File
        </button>
      </section>

      {showShareCode && (
        <ShareCode
          shareCode={shareCode}
          onClose={closeShareCode}
          type="file"
        />
      )}
    </>
  );
};

export default FileShare;
