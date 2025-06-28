import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaTiktok } from "react-icons/fa";
import logo from ".././assets/LogoRena.png";
import invertedLogo from ".././assets/LogoRenaInverted.png";

export default function Socials() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-stone-900 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none"
        aria-label="Open socials"
      >
        <div className="relative w-12 h-12">
          <img
            src={logo}
            alt="logo"
            className={`absolute inset-0 w-12 h-12 rounded-full transition-opacity duration-500 ${
              open ? "opacity-0" : "opacity-100"
            }`}
            draggable={false}
          />
          <img
            src={invertedLogo}
            alt="logo inverted"
            className={`absolute inset-0 w-12 h-12 rounded-full transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        </div>
      </button>
      <div
        className={`flex items-center ml-2 transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        style={{ transformOrigin: "left" }}
      >
        <a
          href="https://www.instagram.com/renamalcriada/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-1 hover:bg-pink-600 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://x.com/renamalcriada"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 text-white rounded-full w-10 h-10 flex items-center justify-center mx-1 hover:bg-blue-500 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
        </a>
        <a
          href="https://www.tiktok.com/@renamalcriada"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center mx-1 hover:bg-gray-800 transition"
        >
          <FaTiktok />
        </a>
      </div>
    </div>
  );
}