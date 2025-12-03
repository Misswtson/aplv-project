import express from "express";
import versionRouter from "./routes/version";
import productsRouter from "./routes/products";
import searchRouter from "./routes/search";



const app = express();
app.use(express.json());

app.use("/version", versionRouter);
app.use("/products", productsRouter);
app.use("/api/search", searchRouter);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
