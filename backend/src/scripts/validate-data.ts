import fs from "fs";

function loadJson<T>(path: string): T {
  const raw = fs.readFileSync(path, "utf8");
  return JSON.parse(raw) as T;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
}

interface Ingredient {
  id: number;
  productId: number;
  name: string;
  isMilkDerivative: boolean;
}

function validateJson(path: string) {
  try {
    const raw = fs.readFileSync(path, "utf8");
    JSON.parse(raw);
    console.log(`✔ Valid JSON: ${path}`);
  } catch (err) {
    console.error(`❌ Invalid JSON in ${path}`, err);
  }
}

validateJson("data/users.json");
validateJson("data/products.json");
validateJson("data/ingredients.json");

const users = loadJson<User[]>("data/users.json");
const products = loadJson<Product[]>("data/products.json");
const ingredients = loadJson<Ingredient[]>("data/ingredients.json");

console.log(
  `Users: ${users.length}, Products: ${products.length}, Ingredients: ${ingredients.length}`
);
