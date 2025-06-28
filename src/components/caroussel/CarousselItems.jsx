import React from "react";

export default function CarousselItems({ src, alt }) {
  return (
    <div className="w-full h-full flex justify-center items-center rounded-3xl">
      <img
        src={src}
        alt={alt}
        className="max-w-[100%] max-h-[100%] object-contain rounded-3xl"
      />
    </div>
  );
}