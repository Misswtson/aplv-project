const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/search", (req, res) => {
  const { query } = req.query;
  return res.json({ ok: true, received: query || null });
});

module.exports = router;
