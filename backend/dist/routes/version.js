"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const productsCount = db_1.default.prepare("SELECT COUNT(*) AS count FROM products").get();
    res.json({
        api: "aplv-api",
        version: "1.0.0",
        productsCount,
        db: "sqlite",
        status: "ok",
    });
});
exports.default = router;
