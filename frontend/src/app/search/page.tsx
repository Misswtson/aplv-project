// frontend/src/app/(root)/search/page.tsx
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react"

type ProductResult = {
  id: number
  name: string
  brand: string
  isSafe: boolean
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ProductResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      const response = await fetch(
        `http://localhost:4000/api/products?query=${encodeURIComponent(query)}`
      )

      if (!response.ok) throw new Error("Error en la búsqueda")

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Search className="h-5 w-5 text-emerald-600" />
            Buscar producto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              placeholder="Nombre o marca"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!query.trim() || loading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>

          {/* Results */}
          <div className="space-y-2">
            {searched && results.length === 0 && !loading && (
              <p className="text-xs text-slate-500 text-center py-4">
                No se encontraron resultados.
              </p>
            )}

            {results.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border bg-white px-3 py-3 hover:shadow-sm transition"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{p.name}</span>
                  <span className="text-[11px] text-slate-500 truncate">{p.brand}</span>
                </div>
                {p.isSafe ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-[2px] text-[11px] text-emerald-700 border border-emerald-100 flex-shrink-0 ml-2">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="hidden sm:inline">Apto</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-[2px] text-[11px] text-red-700 border border-red-100 flex-shrink-0 ml-2">
                    <AlertTriangle className="h-3 w-3" />
                    <span className="hidden sm:inline">No apto</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
