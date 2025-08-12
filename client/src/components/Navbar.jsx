import React from "react";

const Navbar = () => (
  <nav className="flex justify-between items-center py-4 px-6 bg-blue-600 text-white">
    <div className="text-xl font-bold">OnlineClipboard</div>
    <div className="space-x-6">
      <button className="hover:underline">Text</button>
      <button className="hover:underline">File</button>
      <button className="hover:underline">Retrieve</button>
    </div>
  </nav>
);

export default Navbar;
