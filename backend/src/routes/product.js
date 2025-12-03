const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/search", (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Código requerido" });

  const stmt = db.prepare("SELECT * FROM products WHERE barcode = ?");
  const product = stmt.get(code);

  if (!product) {
    return res.json({ found: false });
  }

  res.json({ found: true, product });
});

module.exports = router;
