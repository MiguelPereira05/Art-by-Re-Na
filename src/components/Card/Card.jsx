import React, { useState } from "react";
import CustomizeForm from "../CustomizeForm/CustomizeForm";

export default function Card({ image, hoverImage, title, description, price, buttonText, sculpture, drawing, nocolordraw, colordraw, size, submition, placeholderName, placeholderEmail, placeholderMessage, placeholderPhone }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-stone-300 rounded-xl shadow-md overflow-visible w-72 flex flex-col mb-10">
        <div
          className="relative h-48 w-full flex justify-center items-center overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={image}
            alt={title}
            className={`absolute top-0 left-1/2 -translate-x-1/2 h-48 w-full object-cover rounded-xl z-10
              transition-all duration-500
              ${isHovered && hoverImage ? "opacity-0 scale-125 cursor-pointer" : "opacity-100 scale-100"}
            `}
            style={{ transitionProperty: "opacity, transform" }}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={title + " hover"}
              className={`absolute top-0 left-1/2 -translate-x-1/2 h-48 w-full object-cover rounded-xl z-10
                transition-all duration-500
                ${isHovered ? "opacity-100 scale-125 cursor-pointer" : "opacity-0 scale-100"}
              `}
              style={{ transitionProperty: "opacity, transform" }}
            />
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-800 flex-1">{description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-stone-900">{price}</span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition min-w-[160px] min-h-[50px] whitespace-nowrap"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <CustomizeForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={() => setShowModal(false)}
        title={title}
        sculpture={sculpture}
        drawing= {drawing}
        nocolordraw={nocolordraw}
        colordraw= {colordraw}
        size= {size}
        submition= {submition}
        placeholderName={placeholderName}
        placeholderEmail={placeholderEmail}
        placeholderMessage={placeholderMessage}
        placeholderPhone={placeholderPhone}
      />
    </>
  );
}