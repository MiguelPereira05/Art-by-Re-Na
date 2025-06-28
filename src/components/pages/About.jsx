import React from "react";
import Header from "../Header";
import "../../styles/Header.css";
import RenaFoto from "../../assets/RenaFoto1.jpg"; 
import Footer from "../Footer";
import Socials from "../Socials";

export default function About({ appLang, setAppLang }) {
  const paragraph = appLang === "pt-PT"
    ? `Andreia Amado, também conhecida como Rena, é a verdadeira mulher dos 7
      ofícios no mundo das artes. Do artesanato à animação, da criação de
      personagens à dobragem de vozes, passando pela construção de universos
      inteiros do zero — Rena faz de tudo um pouco, e faz com alma.
      A sua paixão pela arte é contagiante e transparece em tudo o que cria. 
      Basta vê-la no seu próprio mundo, a dar vida às ideias, para perceber que
      está exatamente onde pertence: a criar, a imaginar e a transformar o
      comum em extraordinário.`
    : `Andreia Amado, also known as Rena, is the true jack-of-all-trades in the art world.
      From crafts to animation, from character creation to voice acting, and even building entire universes from scratch — Rena does a bit of everything, and does it with soul.
      Her passion for art is contagious and shines through in everything she creates.
      Just watch her in her own world, bringing ideas to life, and you'll see she's exactly where she belongs: creating, imagining, and turning the ordinary into extraordinary.`;

  return (
    <div className="min-h-screen flex flex-col bg-[#242424] text-white overflow-hidden">
      <Header appLang={appLang} setAppLang={setAppLang} />
      <span className="flex-1 flex flex-col items-center mt-5">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-8 md:gap-20">
          <img
            src={RenaFoto}
            className="rounded-full w-72 h-72 md:w-72 md:h-72 lg:w-96 lg:h-96 object-cover mb-6 md:mb-0"
            alt="Rena"
          />
          <p className="text-base md:text-lg text-center md:text-left mt-4 md:mt-0">
            {paragraph}
          </p>
        </div>
        <Socials />
      </span>
      <Footer />
    </div>
  );
}
