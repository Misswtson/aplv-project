"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const root = path_1.default.join(__dirname, "../../"); // inside the backend/
const dbPath = path_1.default.join(root, "aplv.db");
const schemaPath = path_1.default.join(root, "schema.sql");
const dataDir = path_1.default.join(root, "data");
// Remove old DB if exists (opcional)
// fs.existsSync(dbPath) && fs.unlinkSync(dbPath);
const db = new better_sqlite3_1.default(dbPath);
// execute schema (DROP + CREATE)
const schema = fs_1.default.readFileSync(schemaPath, "utf8");
db.exec(schema);
// Loads JSONs
const products = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, "products.json"), "utf8"));
const users = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, "users.json"), "utf8"));
const ingredients = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dataDir, "ingredients.json"), "utf8"));
const insertProduct = db.prepare(`
  INSERT OR REPLACE INTO products (id, name, brand, category, isSafeForAPLV, scanCode, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);
const insertUser = db.prepare(`
  INSERT OR REPLACE INTO users (id, name, email, passwordHash, createdAt)
  VALUES (?, ?, ?, ?, ?)
`);
const insertIngredient = db.prepare(`
  INSERT OR REPLACE INTO ingredients (id, productId, name, isMilkOrDeriv, aliases, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?)
`);
const seedAll = db.transaction(() => {
    for (const p of products) {
        insertProduct.run(p.id, p.name, p.brand, p.category, p.isSafeForAPLV === null ? null : (p.isSafeForAPLV ? 1 : 0), p.scanCode, p.updatedAt);
    }
    for (const u of users) {
        insertUser.run(u.id, u.name, u.email, u.passwordHash, u.createdAt);
    }
    for (const i of ingredients) {
        insertIngredient.run(i.id, i.productId, i.name, i.isMilkOrDeriv ? 1 : 0, JSON.stringify(i.aliases || []), i.updatedAt);
    }
});
seedAll();
db.close();
console.log("✔ Seed finished. DB:", dbPath);
