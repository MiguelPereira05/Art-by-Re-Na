const express = require("express");
const router = express.Router();
const Artwork = require("../models/Artwork");
const multer = require("multer");
const path = require("path");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// GET /gallery?type=&size=&available=
router.get("/", async (req, res) => {
  const { type, size, available } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (size) filter.size = size;
  if (available !== undefined) filter.available = available === "true";
  const artworks = await Artwork.find(filter);
  res.json(artworks);
});

// GET /gallery/:id
router.get("/:id", async (req, res) => {
  const artwork = await Artwork.findById(req.params.id);
  if (!artwork) return res.status(404).json({ error: "Not found" });
  res.json(artwork);
});

// ADMIN ROUTES

// POST /gallery (image upload + metadata)
router.post("/", upload.single("image"), async (req, res) => {
  console.log("Body: ", req.body);
  const {
    title_en, title_pt,
    type_en, type_pt,
    size_en, size_pt,
    available, description_en, description_pt
  } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  const artwork = new Artwork({
    title_en, 
    title_pt,
    type_en, 
    type_pt,
    size_en, 
    size_pt,
    available,
    description_en, 
    description_pt,
    imageUrl
  });
  await artwork.save();
  res.status(201).json(artwork);
});

// PUT /gallery/:id
router.put("/:id", upload.single("image"), async (req, res) => {
  const {
    title_en, title_pt,
    type_en, type_pt,
    size_en, size_pt,
    available, description_en, description_pt
  } = req.body;
  const update = {
    title_en, title_pt,
    type_en, type_pt,
    size_en, size_pt,
    available,
    description_en, description_pt
  };
  if (req.file) update.imageUrl = `/uploads/${req.file.filename}`;
  const artwork = await Artwork.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!artwork) return res.status(404).json({ error: "Not found" });
  res.json(artwork);
});

// DELETE /gallery/:id
router.delete("/:id", async (req, res) => {
  const artwork = await Artwork.findByIdAndDelete(req.params.id);
  if (!artwork) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

module.exports = router;