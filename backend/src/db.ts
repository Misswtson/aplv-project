import Database from "better-sqlite3";
import fs from "fs";

// Open SQLite DB
const db = new Database("aplv.db");

// Enable WAL (mejor rendimiento)
db.pragma("journal_mode = WAL");

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT NOT NULL,
  allergies TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT
);

CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  is_milk_derivative INTEGER NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
`);

export default db;
