import { readFileSync } from "fs";
import { join } from "path";
import { UsersArray, ProductsArray, IngredientsArray } from "../schemas";

function loadJson<T>(relPath: string): T {
  const raw = readFileSync(join(__dirname, "../../data", relPath), "utf-8");
  return JSON.parse(raw) as T;
}

function main() {
  try {
    const users = loadJson("users.json");
    const products = loadJson("products.json");
    const ingredients = loadJson("ingredients.json");

    UsersArray.parse(users);
    ProductsArray.parse(products);
    IngredientsArray.parse(ingredients);

    console.log("✅ All JSON files validate successfully.");
    console.log(`Users: ${users.length}, Products: ${products.length}, Ingredients: ${ingredients.length}`);
  } catch (err) {
    console.error("❌ Validation error:");
    // zod errors have format
    if (err && typeof err === "object" && "errors" in err) {
      console.error(JSON.stringify(err.errors, null, 2));
    } else {
      console.error(err);
    }
    process.exit(1);
  }
}

main();
