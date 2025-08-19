import React, { useState } from "react";
import ShareCode from "./ShareCode";
import { API_BASE_URL } from "../config";

const Hero = () => {
  const [text, setText] = useState("");
  const [showShareCode, setShowShareCode] = useState(false);
  const [shareCode, setShareCode] = useState("");

  const resetText = () => setText("");

  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      alert("Failed to read clipboard!");
    }
  };

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
      <section className="p-6 md:min-w-3xl sm:min-w-3xl mx-auto bg-white rounded-lg shadow mt-6">
        <h2 className="text-3xl font-semibold mb-3 text-gray-800">
          Share Text :
        </h2>
        <p className="text-gray-600 mb-4">
          Enter your text below to get a sharing code.
        </p>
        <textarea
          className="w-full min-h-32 max-h-32 p-3 border border-gray-300 rounded focus:outline-none focus:ring-[0.5px] focus:ring-black"
          placeholder="Paste or type here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex gap-4">
          <button
            onClick={resetText}
            className="px-4 py-2 bg-gray-500 text-white hover:opacity-100 opacity-85 rounded"
          >
            Reset
          </button>
          <button
            onClick={pasteFromClipboard}
            className="px-4 py-2 bg-green-500 text-white hover:opacity-100 opacity-85 rounded"
            title="Paste clipboard text"
          >
            Paste
          </button>
          <button
            onClick={shareText}
            className="px-4 py-2 bg-green-400 hover:opacity-100 opacity-85 rounded"
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
