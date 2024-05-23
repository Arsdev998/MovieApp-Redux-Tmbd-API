import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center bg-neutral-600 bg-opacity-35 text-neutral-500 py-2">
      <div className="flex items-center justify-center gap-4">
        <Link to={"/"}>About</Link>
        <Link>Contact</Link>
        <Link>Home</Link>
      </div>
      <p className="text-sm"> &copy; Created By Arsdev 2024</p>
    </footer>
  );
};

export default Footer;
