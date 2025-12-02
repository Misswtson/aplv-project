import express from "express";
import db from "../db";

const router = express.Router();

// GET /products/code/:scanCode
router.get("/code/:scanCode", (req, res) => {
  const code = req.params.scanCode;

  const product = db.prepare("SELECT * FROM products WHERE scanCode = ?").get(code);

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  const ingredients = db
    .prepare("SELECT * FROM ingredients WHERE productId = ?")
    .all(product.id);

  return res.json({ product, ingredients });
});

export default router;
