import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Socials from "../Socials";

export default function Gallery({ appLang, setAppLang }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  const labels = {
    galleryTitle: appLang === "pt-PT" ? "Galeria" : "Art Gallery",
    noArtworks: appLang === "pt-PT" ? "Nenhuma obra encontrada." : "No artworks found.",
    loading: appLang === "pt-PT" ? "Carregando galeria..." : "Loading gallery...",
    type: appLang === "pt-PT" ? "Tipo" : "Type",
    size: appLang === "pt-PT" ? "Tamanho" : "Size",
    available: appLang === "pt-PT" ? "Disponível" : "Available",
    description: appLang === "pt-PT" ? "Descrição" : "Description",
  };

  useEffect(() => {
    fetch("https://artbyrena.onrender.com/gallery")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        {labels.loading}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#242424] text-white overflow-x-hidden">
      <Header appLang={appLang} setAppLang={setAppLang}/>
      <h1 className="text-3xl font-bold text-center flex justify-center align-middle mb-4">{labels.galleryTitle}</h1>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 px-2">
        {artworks.length === 0 && (
          <div className="text-xl">{labels.noArtworks}</div>
        )}
        {artworks.map((art, idx) => (
          <div
            key={art._id}
            className="relative flex flex-col items-center w-full sm:w-72 mb-4"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            style={{ minHeight: "320px" }}
          >
            {art.imageUrl && (
              <img
                src={`https://artbyrena.onrender.com${art.imageUrl}`}
                alt={appLang === "pt-PT" ? art.title_pt : art.title_en}
                className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-md transition-all duration-300 ease-in-out"
              />
            )}
            <h2 className="text-lg sm:text-xl font-semibold text-center mt-2">
              {appLang === "pt-PT" ? art.title_pt : art.title_en}
            </h2>
            {/* Hover card */}
            <div
              className={`
                absolute left-1/2 top-0 -translate-x-1/2 z-30
                w-11/12 sm:w-80 bg-stone-900 bg-opacity-95 text-white p-4 sm:p-6 rounded-xl shadow-2xl border-2 border-stone-400
                flex flex-col items-center
                transition-all duration-300 ease-in-out
                ${hovered === idx ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
              `}
              style={{ minWidth: "0", maxWidth: "95vw" }}
            >
              {art.imageUrl && (
                <img
                  src={`http://localhost:5000${art.imageUrl}`}
                  alt={appLang === "pt-PT" ? art.title_pt : art.title_en}
                  className="w-full h-32 sm:h-48 object-cover rounded-lg mb-2"
                />
              )}
              <h2 className="text-lg sm:text-xl font-semibold text-center mb-2">
                {appLang === "pt-PT" ? art.title_pt : art.title_en}
              </h2>
              <div className="text-xs sm:text-sm mb-2">
                <span className="font-bold">{labels.type}:</span> {appLang === "pt-PT" ? art.type_pt : art.type_en} <br />
                <span className="font-bold">{labels.size}:</span> {appLang === "pt-PT" ? art.size_pt : art.size_en} <br />
                <span className="font-bold">{labels.available}:</span> {art.available ? (appLang === "pt-PT" ? "Sim" : "Yes") : (appLang === "pt-PT" ? "Não" : "No")}
              </div>
              <p className="text-xs sm:text-sm">
                {appLang === "pt-PT" ? art.description_pt : art.description_en}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Socials />
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}