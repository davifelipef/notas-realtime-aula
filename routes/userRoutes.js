const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Rota para criar usuário
router.post("/register", async (req, res) => {
  const { username } = req.body;
  try {
    const user = new User({ username });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;