const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title_en: String,
  title_pt: String,
  type_en: String,
  type_pt: String,
  size_en: String,
  size_pt: String,
  format: String,
  available: Boolean,
  imageUrl: String,
  description_en: String,
  description_pt: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Artwork", artworkSchema);