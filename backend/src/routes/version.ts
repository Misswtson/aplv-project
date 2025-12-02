import { Router } from "express";
import db from "../db";
import { ConcurrentlyResult } from "concurrently";

const router = Router();

router.get("/", (req, res) => {
  const productsCount = db.prepare("SELECT COUNT(*) AS count FROM products").get() as ConcurrentlyResult;

  res.json({
    api: "aplv-api",
    version: "1.0.0",
    productsCount,
    db: "sqlite",
    status: "ok",
  });
});

export default router;
