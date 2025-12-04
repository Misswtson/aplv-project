import express from "express";
import cors from "cors"
import versionRouter from "./routes/version";
import productsRouter from "./routes/products";
import searchRouter from "./routes/search";


/* Middleware */
const app = express();

app.use(cors())
app.use(express.json());

/* Routes */
app.use("/version", versionRouter);
app.use("/api/products", productsRouter);
app.use("/api/search", searchRouter);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});

export default app