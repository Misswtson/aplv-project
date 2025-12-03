import { Router } from "express";
import db from "../db";

const router = Router();

router.get("/", (req, res) => {
  const q = req.query.q as string;

  const results = db
    .prepare("SELECT * FROM products WHERE name LIKE ?")
    .all(`%${q}%`);

  res.json({ results });
});

export default router;
