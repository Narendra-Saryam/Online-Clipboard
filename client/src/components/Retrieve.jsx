import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const Retrieve = () => {
  const pasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setCode(clipboardText);
    } catch (err) {
      setError("Failed to read clipboard!");
    }
  };
  const [code, setCode] = useState("");
  const [retrievedContent, setRetrievedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const retrieveContent = async () => {
    if (!code) {
      setError("Enter a 4-digit sharing code");
      return;
    }

    setLoading(true);
    setError("");
    setRetrievedContent(null);

    try {
      const res = await fetch(`${API_BASE_URL}/clipboard?code=${code}`);
      const data = await res.json();

      if (res.ok) {
        setRetrievedContent(data);
      } else {
        setError(data.error || "Content not found or expired");
      }
    } catch (err) {
      setError("Failed to retrieve content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col p-6  mx-auto bg-white rounded-lg shadow mt-6 mb-8">
      <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full space-y-4">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            Retrieve Shared Content
          </h2>
          <p className="text-gray-600 mb-4">
            Enter the 4-digit code to access shared content.
          </p>
          <input
            type="text"
            maxLength={4}
            placeholder="Enter code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border-[0.5px] rounded focus:outline-none"
          />
          <div className="flex gap-4">
            <button
              onClick={pasteFromClipboard}
              className="w-full px-4 py-2 bg-green-500 text-white hover:opacity-100 opacity-85 rounded transition-colors mb-2"
              title="Paste clipboard text"
              disabled={loading}
            >
              Paste from Clipboard
            </button>
            <button
              onClick={retrieveContent}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-400 hover:opacity-100 opacity-85 rounded transition-colors mb-2"
            >
              {loading ? "Retrieving..." : "Retrieve"}
            </button>
          </div>
          
        </div>
        <div className="w-full space-y-4">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Retrieved Content Display */}
          {retrievedContent && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Retrieved Content
              </h3>
              
              {retrievedContent.type === "text" ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Type: Text</p>
                  <div className="p-3 bg-white border rounded">
                    <p className="text-gray-800 whitespace-pre-wrap">{retrievedContent.content}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(retrievedContent.content)}
                    className="px-3 py-1 bg-green-400 hover:opacity-100 opacity-85 text-sm rounded"
                  >
                    Copy to Clipboard
                  </button>
                </div>
              ) : retrievedContent.type === "file" ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Type: File</p>
                  <div className="p-3 bg-white border rounded">
                    <p className="text-gray-800 font-medium">{retrievedContent.filename}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => window.open(`${API_BASE_URL}${retrievedContent.url}`, "_blank")}
                      className="px-3 py-1 bg-green-400 hover:opacity-100 opacity-85 text-sm rounded"
                    >
                      Download File
                    </button>
                    <button
                      onClick={() => window.open(`${API_BASE_URL}${retrievedContent.url}`, "_blank")}
                      className="px-3 py-1 bg-green-400 hover:opacity-100 opacity-85 text-sm rounded"
                    >
                      View File
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Retrieve;
