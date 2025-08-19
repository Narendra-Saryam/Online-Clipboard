import React, { useState } from "react";
import logo from "../assets/logo.png"; 
import linkedin from "../assets/linkedin.jpeg";
import github from "../assets/github.jpeg";

const Navbar = () => {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <>
      <nav className="fixed w-full z-10 top-0 flex justify-between items-center py-2 md:py-4 px-2 md:px-6 bg-transparent opacity-90 backdrop-blur-md shadow-lg">
        <div className="flex items-center space-x-2 md:space-x-4">
          <img className="w-6 md:w-7" src={logo} alt="logo" />
          <h1 className="font-bold">Online Clipboard</h1>
        </div>
        <div className="flex space-x-1 md:space-x-6">
          <button className="px-1 rounded-sm hover:bg-green-400" onClick={() => setShowAbout(true)}>About</button>
          <a href="https://github.com/Narendra-Saryam/Online-Clipboard">
            <img src={github} alt="GitHub" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/narendra-saryam/">
            <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
      </nav>
      {showAbout && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white border-[0.5px] rounded-lg shadow-xl p-8 max-w-md w-full text-center relative">
            <h2 className="text-2xl font-bold mb-4">About Online Clipboard</h2>
            <p className="mb-6">Online Clipboard is a simple tool to share text and files between devices instantly and securely. 
              The application is made by 
              <a href="https://www.linkedin.com/in/narendra-saryam/"> @Narendra Saryam</a>
            </p>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl" onClick={() => setShowAbout(false)}>&times;</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
