import React, { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function CustomizeForm({ isOpen, onClose, onSubmit, title, sculpture, drawing, nocolordraw, colordraw, size, submition, placeholderName, placeholderEmail, placeholderMessage, placeholderPhone }) {
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const [color, setColor] = useState(false);
  const [artType, setArtType] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  // Replace with your actual EmailJS values
  const SERVICE_ID = "service_4ko1xri";
  const TEMPLATE_ID = "template_lgy4rks";
  const PUBLIC_KEY = "YVdxy7yMarjG_eSga";

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setSending(false);
        setSent(true);
        if (onSubmit) onSubmit(e);
        formRef.current.reset();
      })
      .catch(() => {
        setSending(false);
        alert("Failed to send email. Please try again.");
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-stone-900 rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form
          ref={formRef}
          onSubmit={handleEmailSubmit}
          className="flex flex-col gap-4"
        >
          {/* Art type selection */}
          <div className="flex gap-4 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="artType"
                value="sculpture"
                checked={artType === "sculpture"}
                onChange={() => setArtType("sculpture")}
                className="mr-2"
              />
              { sculpture}
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="artType"
                value="drawing"
                checked={artType === "drawing"}
                onChange={() => setArtType("drawing")}
                className="mr-2"
              />
              { drawing}
            </label>
          </div>

          {/* Show only if sculpture */}
          {artType === "sculpture" && (
            <select
              name="size"
              className="border rounded px-3 py-2"
              id="size"
              defaultValue=""
            >
              <option value="" disabled>
                {size}
              </option>
              <option value="5~10cm">5~10cm</option>
              <option value="10~15cm">10~15cm</option>
              <option value="15~20cm">15~20cm</option>
              <option value="20cm+">20cm+</option>
            </select>
          )}

          {/* Show only if drawing */}
          {artType === "drawing" && (
            <select
              name="format"
              className="border rounded px-3 py-2"
              id="format"
              defaultValue=""
            >
              <option value="" disabled>
                {size}
              </option>
              <option value="A5">A5</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          )}

          {/* Replace the Black and White / Color checkboxes with radios */}
          <div className="flex flex-col gap-6 mb-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="colorType"
                id="BlackAndWhite"
                value="blackAndWhite"
                checked={blackAndWhite}
                onChange={() => {
                  setBlackAndWhite(true);
                  setColor(false);
                }}
                className="appearance-none w-4 h-4 border-2 border-stone-400 rounded-full checked:bg-stone-900 checked:border-stone-900 transition duration-200 align-middle"
                style={{
                  boxShadow: blackAndWhite ? "0 0 0 1px #fff inset" : undefined,
                }}
              />
              <span className="ml-2 text-sm">{nocolordraw}</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="colorType"
                id="color"
                value="color"
                checked={color}
                onChange={() => {
                  setColor(true);
                  setBlackAndWhite(false);
                }}
                className="appearance-none w-4 h-4 border-2 border-stone-400 rounded-full checked:bg-stone-900 checked:border-stone-900 transition duration-200 align-middle"
                style={{
                  boxShadow: color ? "0 0 0 1px #fff inset" : undefined,
                }}
              />
              <span className="ml-2 text-sm">{colordraw}</span>
            </label>
          </div>

          <input
            type="text"
            name="name"
            placeholder={placeholderName}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={placeholderEmail}
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder={placeholderPhone}
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            name="details"
            placeholder={placeholderMessage}
            className="border rounded px-3 py-2"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-700 transition"
            disabled={sending}
          >
            {sending ? "Sending..." : submition}
          </button>
          {sent && (
            <div className="text-green-600 text-center mt-2">
              Email sent successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}