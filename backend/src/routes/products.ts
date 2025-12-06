import { Router } from "express"

const router = Router()

// GET /api/products?safe=true OR /api/products?query=...
router.get("/", (req, res) => {
  const { safe, query } = req.query

  console.log("GET /api/products - safe:", safe, "query:", query)

  // Si pide productos seguros (safe=true)
  if (safe === "true") {
    const mockProducts = [
      {
        id: 1,
        name: "Leche de almendras",
        brand: "Alpro",
        category: "Bebida vegetal",
        isSafe: true,
      },
      {
        id: 2,
        name: "Yogur de coco",
        brand: "Cocoyo",
        category: "Lácteo alternativo",
        isSafe: true,
      },
      {
        id: 3,
        name: "Bebida de avena",
        brand: "Oatly",
        category: "Bebida vegetal",
        isSafe: true,
      },
      {
        id: 4,
        name: "Leche de soja",
        brand: "Natura",
        category: "Bebida vegetal",
        isSafe: true,
      },
      {
        id: 5,
        name: "Queso vegano",
        brand: "Nutritional Yeast",
        category: "Queso",
        isSafe: true,
      },
    ]
    console.log("Retornando productos seguros:", mockProducts.length)
    return res.json(mockProducts)
  }

  // Si busca por query (search)
  if (query && typeof query === "string") {
    const searchTerm = query.toLowerCase()
    const allProducts = [
      { id: 1, name: "Leche de almendras", brand: "Alpro", isSafe: true },
      { id: 2, name: "Leche entera", brand: "Fres.co", isSafe: false },
      { id: 3, name: "Yogur natural", brand: "Activia", isSafe: false },
      { id: 4, name: "Bebida de avena", brand: "Oatly", isSafe: true },
    ]
    
    const results = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm)
    )
    
    console.log("Búsqueda:", searchTerm, "Resultados:", results.length)
    return res.json(results)
  }

  // Si no tiene parámetros
  console.log("Sin parámetros - retornando array vacío")
  res.json([])
})

export default router
