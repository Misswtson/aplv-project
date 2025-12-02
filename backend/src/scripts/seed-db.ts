// src/scripts/seed-db.ts
import { readFileSync } from "fs";
import { join } from "path";
import Database from "better-sqlite3";
import { UsersArray, ProductsArray, IngredientsArray } from "../schemas";

const DB_FILE = join(__dirname, "../../aplv.db");

function loadJson(relPath: string) {
  return JSON.parse(readFileSync(join(__dirname, "../../data", relPath), "utf-8"));
}

function ensureTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      brand TEXT,
      category TEXT,
      isSafeForAPLV INTEGER,
      scanCode TEXT,
      updatedAt TEXT
    );
    CREATE TABLE IF NOT EXISTS ingredients (
      id INTEGER PRIMARY KEY,
      productId INTEGER NOT NULL,
      name TEXT NOT NULL,
      isMilkOrDeriv INTEGER NOT NULL,
      aliases TEXT,
      updatedAt TEXT,
      FOREIGN KEY(productId) REFERENCES products(id)
    );
  `);
}

function seed() {
  const db = new Database(DB_FILE);
  ensureTables(db);

  const users = UsersArray.parse(loadJson("users.json"));
  const products = ProductsArray.parse(loadJson("products.json"));
  const ingredients = IngredientsArray.parse(loadJson("ingredients.json"));

  // Use transaction for speed + atomicity
  const insert = db.transaction(() => {
    const uStmt = db.prepare("INSERT OR REPLACE INTO users (id, name, email, passwordHash, createdAt) VALUES (?, ?, ?, ?, ?)");
    const pStmt = db.prepare("INSERT OR REPLACE INTO products (id, name, brand, category, isSafeForAPLV, scanCode, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const iStmt = db.prepare("INSERT OR REPLACE INTO ingredients (id, productId, name, isMilkOrDeriv, aliases, updatedAt) VALUES (?, ?, ?, ?, ?, ?)");

    users.forEach(u => uStmt.run(u.id, u.name, u.email, u.passwordHash, u.createdAt));
    products.forEach(p => pStmt.run(p.id, p.name, p.brand, p.category, p.isSafeForAPLV === null ? null : (p.isSafeForAPLV ? 1 : 0), p.scanCode ?? null, p.updatedAt ?? null));
    ingredients.forEach(i => iStmt.run(i.id, i.productId, i.name, i.isMilkOrDeriv ? 1 : 0, JSON.stringify(i.aliases || []), i.updatedAt ?? null));
  });

  insert();
  db.close();
  console.log("✅ Seed complete — database:", DB_FILE);
}

seed();
