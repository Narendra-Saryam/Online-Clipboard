import React, { useState } from "react";

const ShareCode = ({ shareCode, onClose, type }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 ">
      <div className="bg-white border-[0.5px] rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {type === 'text' ? 'Text Shared Successfully!' : 'File Shared Successfully!'}
          </h3>
          <p className="text-gray-600">
            Use this 4-digit code to retrieve your {type === 'text' ? 'text' : 'file'}:
          </p>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="text-4xl font-bold text-green-400 tracking-wider mb-2">
            {shareCode}
          </div>
          <p className="text-sm text-gray-500">
            This code will expire in 1 hour
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="flex-1 px-4 py-3 bg-green-400 hover:opacity-100 opacity-85 rounded-lg font-medium transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-500 hover:opacity-100 opacity-85 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareCode;
