import "../styles/Header.css";
import logo from "../assets/LogoRena.png";
import { Link } from "react-router-dom";
import UK from "../assets/UK.png";
import PT from "../assets/PT.png";
import { useState } from "react";

export default function Header({ appLang, setAppLang }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleLanguage() {
    setAppLang((prev) => (prev === "en-US" ? "pt-PT" : "en-US"));
  }

  const labels = {
    home: appLang === "pt-PT" ? "Início" : "Home",
    about: appLang === "pt-PT" ? "Sobre Mim" : "AboutMe",
    gallery: appLang === "pt-PT" ? "Galeria" : "Gallery",
  };

  return (
    <header className="border-2 border-stone-500 m-4 p-4 flex justify-between items-center rounded-3xl relative">
      <span className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 mr-5 rounded-full"
        />
        <Link to="/" className="flex items-center text-stone-50 text-2xl hover:font-bold cursor-pointer transition-all hidden md:inline">
          {labels.home}
        </Link>
      </span>
      <h1 className="text-3xl font-bold text-stone-50 ml-2 md:ml-14">Art By Re:Na</h1>
      {/* Desktop links */}
      <span className="hidden md:flex gap-5 items-center rounded-full">
        <Link to="/about" className="flex items-center text-stone-50 text-2xl hover:font-bold cursor-pointer transition-all">
          {labels.about}
        </Link>
        <Link to="/gallery" className="flex items-center text-stone-50 text-2xl hover:font-bold cursor-pointer transition-all">
          {labels.gallery}
        </Link>
        <button
          onClick={toggleLanguage}
          className="ml-3 px-2 py-1 rounded bg-stone-700 text-white hover:bg-stone-600"
        >
          {appLang === "pt-PT" ? <img src={PT} alt="PT" /> : <img src={UK} alt="UK" />}
        </button>
      </span>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center z-50 w-10 h-10 relative"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        <span
          className={`
            block absolute h-1 w-8 bg-white rounded transition-all duration-300
            ${menuOpen ? "rotate-45 top-4" : "top-2"}
          `}
        ></span>
        <span
          className={`
            block absolute h-1 w-8 bg-white rounded transition-all duration-300
            ${menuOpen ? "opacity-0 left-4" : "top-4"}
          `}
        ></span>
        <span
          className={`
            block absolute h-1 w-8 bg-white rounded transition-all duration-300
            ${menuOpen ? "-rotate-45 top-4" : "top-6"}
          `}
        ></span>
      </button>
      {/* Mobile menu */}
      <div
        className={`absolute top-full right-0 left-0 bg-stone-900 border-t border-stone-700 shadow-lg flex flex-col items-center gap-4 py-6 transition-all duration-300 z-40 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } md:hidden rounded-3xl`}
        style={{ overflow: "hidden" }}
      >
        <Link
          to="/"
          className="text-stone-50 text-xl hover:font-bold cursor-pointer transition-all"
          onClick={() => setMenuOpen(false)}
        >
          {labels.home}
        </Link>
        <Link
          to="/about"
          className="text-stone-50 text-xl hover:font-bold cursor-pointer transition-all"
          onClick={() => setMenuOpen(false)}
        >
          {labels.about}
        </Link>
        <Link
          to="/gallery"
          className="text-stone-50 text-xl hover:font-bold cursor-pointer transition-all"
          onClick={() => setMenuOpen(false)}
        >
          {labels.gallery}
        </Link>
        <button
          onClick={() => {
            toggleLanguage();
            setMenuOpen(false);
          }}
          className="px-2 py-1 rounded bg-stone-700 text-white hover:bg-stone-600"
        >
          {appLang === "pt-PT" ? <img src={PT} alt="PT" /> : <img src={UK} alt="UK" />}
        </button>
      </div>
    </header>
  );
}
