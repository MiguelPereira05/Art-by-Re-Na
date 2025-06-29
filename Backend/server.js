const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const galleryRoutes = require("./routes/gallery");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/gallery", galleryRoutes);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));