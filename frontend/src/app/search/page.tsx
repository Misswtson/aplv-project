"use client";

import { useState } from "react";
import { apiGet } from "../../lib/api";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await apiGet<{ products: any[] }>(
        `http://localhost:4000/api/search?query=${encodeURIComponent(query)}`
      );

      setResults(data.products || []);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Buscar alimentos</h1>

      <input
        type="text"
        placeholder="Ej: Leche, Yogurt, Galletas…"
        className="border px-3 py-2 w-full rounded mb-3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={search}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Buscar
      </button>

      {loading && <p className="mt-4">Buscando...</p>}

      <ul className="mt-4">
        {results.map((item) => (
          <li key={item.id} className="p-3 bg-white rounded shadow mb-2">
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-gray-600">{item.brand}</p>
            <p className="text-sm">
              Apto APLV:{" "}
              {item.isSafeForAPLV === null
                ? "❓ Desconocido"
                : item.isSafeForAPLV
                ? "✔ Sí"
                : "✖ No"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
