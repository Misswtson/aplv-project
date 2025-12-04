// frontend/src/app/(root)/scan/page.tsx
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, Upload, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react"
import { ScanResultCard } from "../../components/scan-result-card"

type ScanResult = {
  productName: string
  isSafe: boolean
  riskyIngredients: string[]
  allIngredients: string[]
}

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) {
      setFile(f)
      setPreview(URL.createObjectURL(f))
      setResult(null)
      setError(null)
    }
  }

  async function handleScan() {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      // Call your backend Express API
      const response = await fetch("http://localhost:4000/api/scan", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data: ScanResult = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar la imagen")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ScanLine className="h-5 w-5 text-emerald-600" />
            Escanear producto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File input */}
          <label className="block">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition">
              <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
              <p className="text-sm font-medium text-slate-700">
                Clic para subir o arrastra una imagen
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG o GIF (máx. 10MB)
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </label>

          {/* Preview */}
          {preview && (
            <div className="relative rounded-lg overflow-hidden border border-slate-200">
              <img src={preview} alt="Preview" className="w-full h-auto" />
            </div>
          )}

          {/* Scan button */}
          <Button
            onClick={handleScan}
            disabled={!file || loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analizando...
              </>
            ) : (
              <>
                <ScanLine className="h-4 w-4 mr-2" />
                Escanear ahora
              </>
            )}
          </Button>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 border border-red-100">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <ScanResultCard
              productName={result.productName}
              isSafe={result.isSafe}
              riskyIngredients={result.riskyIngredients}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
