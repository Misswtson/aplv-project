"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function loadJson(path) {
    const raw = fs_1.default.readFileSync(path, "utf8");
    return JSON.parse(raw);
}
function validateJson(path) {
    try {
        const raw = fs_1.default.readFileSync(path, "utf8");
        JSON.parse(raw);
        console.log(`✔ Valid JSON: ${path}`);
    }
    catch (err) {
        console.error(`❌ Invalid JSON in ${path}`, err);
    }
}
validateJson("data/users.json");
validateJson("data/products.json");
validateJson("data/ingredients.json");
const users = loadJson("data/users.json");
const products = loadJson("data/products.json");
const ingredients = loadJson("data/ingredients.json");
console.log(`Users: ${users.length}, Products: ${products.length}, Ingredients: ${ingredients.length}`);
