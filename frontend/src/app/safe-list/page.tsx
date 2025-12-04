// frontend/src/app/(root)/safe-list/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShieldCheck, Loader2 } from "lucide-react"

type SafeProduct = {
  id: number
  name: string
  brand: string
  category?: string
}

export default function SafeListPage() {
  const [products, setProducts] = useState<SafeProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSafeProducts() {
      try {
        const response = await fetch("http://localhost:4000/api/products?safe=true")
        if (!response.ok) throw new Error("Error al cargar productos")

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido")
      } finally {
        setLoading(false)
      }
    }

    fetchSafeProducts()
  }, [])

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Productos aptos para APLV
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
            </div>
          ) : error ? (
            <p className="text-xs text-red-600 text-center py-4">{error}</p>
          ) : products.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">
              No hay productos registrados aún.
            </p>
          ) : (
            <div className="space-y-2">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="rounded-lg border border-emerald-100 bg-emerald-50/40 px-3 py-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-emerald-900">{p.name}</p>
                      <p className="text-xs text-emerald-700">{p.brand}</p>
                      {p.category && (
                        <p className="text-[11px] text-emerald-600 mt-1">{p.category}</p>
                      )}
                    </div>
                    <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
