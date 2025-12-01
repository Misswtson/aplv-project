import express from "express";

const app = express();
const PORT = 4000;

app.get("/version", (req, res) => {
  res.json({ api: "aplv-api", version: "1.0.0", status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
