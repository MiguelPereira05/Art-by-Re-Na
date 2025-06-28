import React, { useState, useEffect, Children } from "react";

const Caroussel = ({ children }) => {
  const items = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setFade(true);
      }, 1000);
    }, 3000);
    return () => clearInterval(timer);
  }, [items.length]);

  // Handle indicator click
  const handleIndicatorClick = (i) => {
    if (i !== index) {
      setFade(false);
      setTimeout(() => {
        setIndex(i);
        setFade(true);
      }, 200); // Shorter fade for manual navigation
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <div className="relative md:w-[700px] md:h-[500px] w-[700px] h-[300px] overflow-hidden rounded-3xl">
        <div
          className={`transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          } w-full h-full`}
        >
          {items[index]}
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleIndicatorClick(i)}
            className={`w-4 h-4 rounded-full border-2 border-white transition-colors duration-300 focus:outline-none
              ${index === i ? "bg-white" : "bg-transparent"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default Caroussel;