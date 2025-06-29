import React, { useEffect, useState } from "react";
import Header from "../Header";

export default function Admin({ appLang, setAppLang }) {
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState({
    title_en: "",
    title_pt: "",
    type_en: "",
    type_pt: "",
    size_en: "",
    size_pt: "",
    available: false,
    description_en: "",
    description_pt: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [showAuth, setShowAuth] = useState(true);
  const [inputPassword, setInputPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Password modal logic
  async function handleAuthSubmit(e) {
    e.preventDefault();
    const res = await fetch("https://artbyrena.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: inputPassword }),
    });
    if (res.ok) {
      setShowAuth(false);
      setAuthError("");
      // Optionally, store token from res.json().token
    } else {
      setAuthError("Incorrect password.");
    }
  }

  // Fetch artworks
  useEffect(() => {
    if (!showAuth) {
      fetch("https://artbyrena.onrender.com/gallery")
        .then((res) => res.json())
        .then(data => {
          console.log("Fetched artworks:", data);
          setArtworks(data)
        });
    }
  }, [showAuth]);

  // Handle form input changes
  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  // Handle form submit (add or edit)
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title_en", form.title_en);
    formData.append("title_pt", form.title_pt);
    formData.append("type_en", form.type_en);
    formData.append("type_pt", form.type_pt);
    formData.append("size_en", form.size_en);
    formData.append("size_pt", form.size_pt);
    formData.append("available", form.available ? "true" : "false");
    formData.append("description_en", form.description_en);
    formData.append("description_pt", form.description_pt);
    if (form.image) formData.append("image", form.image);
    for (const key of formData.entries()) {
      console.log(key[0] + ": " + key[1]);
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://artbyrena.onrender.com/gallery/${editingId}`
      : "https://artbyrena.onrender.com/gallery";
    const res = await fetch(url, {
      method,
      body: formData,
    });
    if (res.ok) {
      // Refresh artworks
      fetch("https://artbyrena.onrender.com/gallery")
        .then((res) => res.json())
        .then(setArtworks);
      setForm({
        title_en: "",
        title_pt: "",
        type_en: "",
        type_pt: "",
        size_en: "",
        size_pt: "",
        available: false,
        description_en: "",
        description_pt: "",
        image: null,
      });
      setEditingId(null);
    }
  }

  // Handle edit button
  function handleEdit(art) {
    setForm({
      title_en: art.title_en || "",
      title_pt: art.title_pt || "",
      type_en: art.type_en || "",
      type_pt: art.type_pt || "",
      size_en: art.size_en || "",
      size_pt: art.size_pt || "",
      available: art.available,
      description_en: art.description_en || "",
      description_pt: art.description_pt || "",
      image: null,
    });
    setEditingId(art._id);
  }

  // Handle delete button
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      await fetch(`https://artbyrena.onrender.com/gallery/${id}`, { method: "DELETE" });
      setArtworks((arts) => arts.filter((a) => a._id !== id));
      if (editingId === id) {
        setEditingId(null);
        setForm({
          title_en: "",
          title_pt: "",
          type_en: "",
          type_pt: "",
          size_en: "",
          size_pt: "",
          available: false,
          description_en: "",
          description_pt: "",
          image: null,
        });
      }
    }
  }

  // Password modal
  if (showAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 overflow-hidden">
        <form
          onSubmit={handleAuthSubmit}
          className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-stone-900">
            Admin Access
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="border rounded px-3 py-2 mb-4 text-black"
            required
          />
          {authError && <div className="text-red-600 mb-2">{authError}</div>}
          <button
            type="submit"
            className="bg-stone-900 text-white px-4 py-2 rounded hover:bg-stone-700 transition"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  // Main admin page
  return (
    <div className="min-h-screen bg-stone-900 text-white p-4 md:p-8">
      <Header appLang={appLang} setAppLang={setAppLang}/>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">Admin Gallery Management</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-stone-800 p-4 md:p-6 rounded-lg mb-6 md:mb-8 flex flex-col gap-4 max-w-lg mx-auto"
        encType="multipart/form-data"
      >
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="title_en"
            placeholder="Title (EN)"
            value={form.title_en}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
            required
          />
          <input
            type="text"
            name="title_pt"
            placeholder="Título (PT)"
            value={form.title_pt}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="type_en"
            placeholder="Type (EN)"
            value={form.type_en}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
            required
          />
          <input
            type="text"
            name="type_pt"
            placeholder="Tipo (PT)"
            value={form.type_pt}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
            required
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="size_en"
            placeholder="Size (EN)"
            value={form.size_en}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
          />
          <input
            type="text"
            name="size_pt"
            placeholder="Tamanho (PT)"
            value={form.size_pt}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>
        <div className="flex flex-col md:flex-row gap-2">
          <textarea
            name="description_en"
            placeholder="Description (EN)"
            value={form.description_en}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
          />
          <textarea
            name="description_pt"
            placeholder="Descrição (PT)"
            value={form.description_pt}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-black flex-1"
          />
        </div>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Artwork" : "Add Artwork"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                title_en: "",
                title_pt: "",
                type_en: "",
                type_pt: "",
                size_en: "",
                size_pt: "",
                available: false,
                description_en: "",
                description_pt: "",
                image: null,
              });
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {artworks.map((art) => (
          <div
            key={art._id}
            className="bg-stone-800 rounded-xl shadow-lg p-4 flex flex-col items-center"
          >
            {art.imageUrl && (
              <img
                src={`https://artbyrena.onrender.com${art.imageUrl}`}
                alt={art.title_en || art.title_pt}
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-center">
              {art.title_en} / {art.title_pt}
            </h2>
            <div className="text-sm mb-2 text-center">
              <span className="font-bold">Type:</span> {art.type_en} / {art.type_pt} <br />
              <span className="font-bold">Size:</span> {art.size_en} / {art.size_pt} <br />
              <span className="font-bold">Available:</span>{" "}
              {art.available ? "Yes" : "No"}
            </div>
            <p className="text-sm text-center">
              {art.description_en} / {art.description_pt}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(art)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(art._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}