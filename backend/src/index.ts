import express from "express"
import cors from "cors"
import versionRouter from "./routes/version"
import productsRouter from "./routes/products"
import searchRouter from "./routes/search"

/* Middleware */
const app = express()

app.use(cors())
app.use(express.json())

/* Routes */
app.use("/version", versionRouter)
app.use("/api/products", productsRouter)
app.use("/api/search", searchRouter)

/* Scan endpoint - Mock for now */
app.post("/api/scan", (req, res) => {
  console.log("POST /api/scan received")

  res.json({
    productName: "Producto escaneado",
    isSafe: true,
    riskyIngredients: [],
    allIngredients: ["agua", "almendras"],
  })
})

/* Get product by barcode - NUEVO */
app.get("/api/products/barcode/:barcode", (req, res) => {
  const { barcode } = req.params

  console.log("GET /api/products/barcode/:barcode -", barcode)

  // Mock data
  const mockProducts: Record<string, any> = {
    "8718345030255": {
      id: 1,
      name: "Leche de almendras",
      brand: "Alpro",
      barcode: "8718345030255",
      isSafe: true,
      riskyIngredients: [],
      allIngredients: ["agua", "almendras", "sal"],
    },
    "5201000011142": {
      id: 2,
      name: "Leche entera",
      brand: "Fres.co",
      barcode: "5201000011142",
      isSafe: false,
      riskyIngredients: ["leche de vaca"],
      allIngredients: ["leche de vaca"],
    },
    "4006381333931": {
      id: 3,
      name: "Yogur natural",
      brand: "Activia",
      barcode: "4006381333931",
      isSafe: false,
      riskyIngredients: ["leche de vaca", "lactosa"],
      allIngredients: ["leche", "lactosa", "cultivos vivos"],
    },
  }

  const product = mockProducts[barcode]

  if (!product) {
    return res.status(404).json({
      error: "Producto no encontrado",
      barcode: barcode,
      message: "El código de barras no está registrado en la base de datos",
    })
  }

  console.log("Producto encontrado:", product.name)
  res.json(product)
})

app.listen(4000, () => {
  console.log("✅ Backend running on http://localhost:4000")
})

export default app
