"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    const q = req.query.q;
    const results = db_1.default
        .prepare("SELECT * FROM products WHERE name LIKE ?")
        .all(`%${q}%`);
    res.json({ results });
});
exports.default = router;
