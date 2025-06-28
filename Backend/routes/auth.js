const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    // For demo: return a simple token (in production use JWT or session)
    return res.json({ success: true, token: "admin-token" });
  }
  res.status(401).json({ success: false, message: "Invalid password" });
});

module.exports = router;