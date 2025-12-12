"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const version_1 = __importDefault(require("./routes/version"));
const products_1 = __importDefault(require("./routes/products"));
const search_1 = __importDefault(require("./routes/search"));
/* Middleware */
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* Routes */
app.use("/version", version_1.default);
app.use("/api/products", products_1.default);
app.use("/api/search", search_1.default);
/* Scan endpoint - Mock for now */
app.post("/api/scan", (req, res) => {
    console.log("POST /api/scan received");
    res.json({
        productName: "Producto escaneado",
        isSafe: true,
        riskyIngredients: [],
        allIngredients: ["agua", "almendras"],
    });
});
/* Get product by barcode */
app.get("/api/products/barcode/:barcode", (req, res) => {
    const { barcode } = req.params;
    console.log("GET /api/products/barcode/:barcode -", barcode);
    // Mock data
    const mockProducts = {
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
    };
    const product = mockProducts[barcode];
    if (!product) {
        return res.status(404).json({
            error: "Producto no encontrado",
            barcode: barcode,
            message: "El código de barras no está registrado en la base de datos",
        });
    }
    console.log("Producto encontrado:", product.name);
    res.json(product);
});
app.listen(4000, () => {
    console.log("✅ Backend running on http://localhost:4000");
});
exports.default = app;
