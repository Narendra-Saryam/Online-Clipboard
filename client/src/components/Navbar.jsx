import React from "react";

const Navbar = () => (
  <nav className="fixed w-full z-10 top-0 flex justify-between items-center py-2 md:py-4 px-2 md:px-6 bg-transparent opacity-90 backdrop-blur-md shadow-lg">
    <div className="text-xl font-bold">OnlineClipboard</div>
    <div className=" space-x-1 md:space-x-6">
      <button className="hover:underline">About</button>
      <button className="hover:underline">GitHub</button>
      <button className="hover:underline">Connect</button>
    </div>
  </nav>
);

export default Navbar;
