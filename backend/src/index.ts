import express from "express";
import versionRouter from "./routes/version";

const app = express();
app.use(express.json());

app.use("/version", versionRouter);

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
