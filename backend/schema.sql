
-- schema.sql - table for users, products, ingredients
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

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
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  isSafeForAPLV INTEGER, -- NULL | 0 | 1
  scanCode TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients (
  id INTEGER PRIMARY KEY,
  productId INTEGER NOT NULL,
  name TEXT NOT NULL,
  isMilkOrDeriv INTEGER NOT NULL CHECK (isMilkOrDeriv IN (0, 1)),
  aliases TEXT,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE
);
