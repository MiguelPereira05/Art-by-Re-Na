import React, { useEffect, useState } from "react";
import Header from "../Header";
import Caroussel from "../caroussel/Caroussel";
import CarousselItems from "../caroussel/CarousselItems";
import Footer from "../Footer";
import Card from "../Card/Card";
import Socials from "../Socials";
import JollyRoger from "../../assets/JollyRoger.jpg";
import Chopper from "../../assets/Chopper.jpg";
import SelfSketch from "../../assets/SelfSketch.jpg";
import Sketch from "../../assets/Sketch.jpg";
import Drawing from "../../assets/Drawing.jpg";
import Capivara1 from "../../assets/Capivara1.jpg";
import Capivara2 from "../../assets/Capivara2.jpg";
import Digital1 from "../../assets/Digital1.jpg";
import Digital2 from "../../assets/Digital2.jpg";
import Draw1 from "../../assets/Draw1.jpg";
import Draw2 from "../../assets/Draw2.jpg";

export default function LandingPage({ appLang, setAppLang }) {
	const labels = {
		home: appLang === "pt-PT" ? "Criações para Vender" : "Creations for Sale",
		esculturasTitle:
			appLang === "pt-PT"
				? "Esculturas personalizadas"
				: "Customized sculptures",
		esculturasDescription:
			appLang === "pt-PT"
				? "Criação de esculturas personalizadas"
				: "Homemade customized sculptures",
		esculturasPreco: appLang === "pt-PT" ? "Desde €4.99" : "From €4.99",
		digitalTitle:
			appLang === "pt-PT"
				? "Arte digital personalizada"
				: "Personal digital artwork",
		digitalDescription:
			appLang === "pt-PT"
				? "Criação de Arte digital personalizada"
				: "Customized digital artwork",
		digitalPreco: appLang === "pt-PT" ? "Desde €9.99" : "From €9.99",
		drawTitle:
			appLang === "pt-PT" ? "Desenho personalizado" : "Personal drawing",
		drawDescription:
			appLang === "pt-PT" ? "Criação de Desenhos personalizados" : "Customized drawings",
		drawPreco: appLang === "pt-PT" ? "Desde €24.99" : "From €24.99",
		buttonText: appLang === "pt-PT" ? "Personalizar agora" : "Customize now",
		sculpture: appLang === "pt-PT" ? "Escultura" : "Sculpture",
		drawing: appLang === "pt-PT" ? "Desenho" : "Drawing",
		nocolordraw:
			appLang === "pt-PT"
				? "Desenho Preto e Branco"
				: "Black and White Drawing",
		colordraw: appLang === "pt-PT" ? "Desenho Colorido" : "Color Drawing",
		size: appLang === "pt-PT" ? "Tamanho" : "Size",
		submition: appLang === "pt-PT" ? "Submissão" : "Submission",
		placeholderName: appLang === "pt-PT" ? "Nome" : "Name",
		placeholderEmail: appLang === "pt-PT" ? "Email" : "Email",
		placeholderMessage: appLang === "pt-PT" ? "Mensagem" : "Message",
		placeholderPhone: appLang === "pt-PT" ? "Telefone" : "Phone",
	};
	return (
		<div className="min-h-screen flex flex-col overflow-hidden">
			<Header
				appLang={appLang}
				setAppLang={setAppLang}
			/>
			<main className="flex-1 flex flex-col items-center bg-[#242424] text-stone-100 px-2 sm:px-4 md:px-8 py-5">
				<Caroussel>
					<CarousselItems
						src={JollyRoger}
						alt={"Jolly Roger"}
					/>
					<CarousselItems
						src={Chopper}
						alt={"Chopper"}
					/>
					<CarousselItems
						src={SelfSketch}
						alt={"Self Sketch"}
					/>
					<CarousselItems
						src={Sketch}
						alt={"Sketch"}
					/>
					<CarousselItems
						src={Drawing}
						alt={"Drawing"}
					/>
				</Caroussel>
				<h1 className="text-2xl sm:text-3xl font-bold mt-8 mb-5 text-stone-100 text-center">
					{labels.home}
				</h1>
				<div className="w-full flex flex-col items-center sm:flex-row flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 mb-10">
					<Card
						image={Capivara1}
						hoverImage={Capivara2}
						title={labels.esculturasTitle}
						description={labels.esculturasDescription}
						price={labels.esculturasPreco}
						buttonText={labels.buttonText}
						sculpture={labels.sculpture}
						drawing={labels.drawing}
						nocolordraw={labels.nocolordraw}
						colordraw={labels.colordraw}
						size={labels.size}
						submition={labels.submition}
						placeholderName={labels.placeholderName}
						placeholderEmail={labels.placeholderEmail}
						placeholderMessage={labels.placeholderMessage}
						placeholderPhone={labels.placeholderPhone}
					/>
					<Card
						image={Digital1}
						hoverImage={Digital2}
						title={labels.digitalTitle}
						description={labels.digitalDescription}
						price={labels.digitalPreco}
						buttonText={labels.buttonText}
						sculpture={labels.sculpture}
						drawing={labels.drawing}
						nocolordraw={labels.nocolordraw}
						colordraw={labels.colordraw}
						size={labels.size}
						submition={labels.submition}
						placeholderName={labels.placeholderName}
						placeholderEmail={labels.placeholderEmail}
						placeholderMessage={labels.placeholderMessage}
						placeholderPhone={labels.placeholderPhone}
					/>
					<Card
						image={Draw1}
						hoverImage={Draw2}
						title={labels.drawTitle}
						description={labels.drawDescription}
						price={labels.drawPreco}
						buttonText={labels.buttonText}
						sculpture={labels.sculpture}
						drawing={labels.drawing}
						nocolordraw={labels.nocolordraw}
						colordraw={labels.colordraw}
						size={labels.size}
						submition={labels.submition}
						placeholderName={labels.placeholderName}
						placeholderEmail={labels.placeholderEmail}
						placeholderMessage={labels.placeholderMessage}
						placeholderPhone={labels.placeholderPhone}
					/>
				</div>
				<Socials />
			</main>
			<Footer />
		</div>
	);
}
