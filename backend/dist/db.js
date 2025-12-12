"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
// Open SQLite DB
const db = new better_sqlite3_1.default("aplv.db");
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
exports.default = db;
