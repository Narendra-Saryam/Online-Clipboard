import React, { useState } from "react";
import ShareCode from "./ShareCode";
import { API_BASE_URL } from "../config";

const Hero = () => {
  const [text, setText] = useState("");
  const [showShareCode, setShowShareCode] = useState(false);
  const [shareCode, setShareCode] = useState("");

  const resetText = () => setText("");
  
  const shareText = async () => {
    if (!text.trim()) {
      alert("Please enter some text to share!");
      return;
    }

    const formData = new FormData();
    formData.append("type", "text");
    formData.append("text", text);

    try {
      const res = await fetch(`${API_BASE_URL}/clipboard`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();

      if (data.share_code) {
        setShareCode(data.share_code);
        setShowShareCode(true);
        setText(""); // Clear the text after successful share
      } else {
        alert("Error sharing text!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sharing text! Please try again.");
    }
  };

  const closeShareCode = () => {
    setShowShareCode(false);
    setShareCode("");
  };

  return (
    <>
      <section className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow mt-6">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Share Your Text
        </h2>
        <p className="text-gray-600 mb-4">
          Enter your text below to get a sharing code.
        </p>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste or type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex gap-4">
          <button
            onClick={resetText}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Reset
          </button>
          <button
            onClick={shareText}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Share Text
          </button>
        </div>
      </section>

      {showShareCode && (
        <ShareCode
          shareCode={shareCode}
          onClose={closeShareCode}
          type="text"
        />
      )}
    </>
  );
};

export default Hero;
