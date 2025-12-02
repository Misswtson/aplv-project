"use client";

import { useState } from "react";
import { apiGet } from "../../lib/api"

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch() {
    try {
      setError("");
      const result = await apiGet(`/products/code/${query}`);
      setData(result);
    } catch (err) {
      setError("Producto no encontrado");
      setData(null);
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Buscar producto</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Escanea o ingresa el código..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white p-2 rounded w-full"
        onClick={handleSearch}
      >
        Buscar
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {data && (
        <div className="mt-4 p-3 border rounded">
          <h2 className="font-bold">{data.product.name}</h2>
          <p>Marca: {data.product.brand}</p>
          <p>
            Apto APLV:{" "}
            {data.product.isSafeForAPLV === 1
              ? "Sí 💚"
              : data.product.isSafeForAPLV === 0
              ? "No ❌"
              : "Desconocido"}
          </p>

          <h3 className="font-semibold mt-3">Ingredientes:</h3>
          <ul className="list-disc ml-5">
            {data.ingredients.map((i: any) => (
              <li key={i.id}>
                {i.name}{" "}
                {i.isMilkOrDeriv ? <span className="text-red-600">⚠️</span> : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
