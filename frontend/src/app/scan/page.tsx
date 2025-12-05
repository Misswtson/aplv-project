// frontend/src/app/(root)/scan/page.tsx
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, AlertTriangle, ShieldCheck, Loader2, X } from "lucide-react"
import { BarcodeScanner } from "../components/aplv/barcode-scanner"
import { ScanResultCard } from "../components/aplv/scan-result-card"

type ScanResult = {
  id: number
  name: string
  brand: string
  barcode: string
  isSafe: boolean
  riskyIngredients: string[]
  allIngredients: string[]
}

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastBarcode, setLastBarcode] = useState<string | null>(null)

  async function handleScanSuccess(barcode: string) {
    setLastBarcode(barcode)
    setIsScanning(false)
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(
        `http://localhost:4000/api/products/barcode/${barcode}`
      )

      if (!response.ok) {
        throw new Error(`Producto no encontrado. Código: ${barcode}`)
      }

      const data: ScanResult = await response.json()
      setResult(data)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al buscar el producto"
      )
      console.error("Scan error:", err)
    } finally {
      setLoading(false)
    }
  }

  function handleScanError(errorMsg: string) {
    setError(errorMsg)
    setIsScanning(false)
  }

  function handleNewScan() {
    setResult(null)
    setError(null)
    setIsScanning(true)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 py-6">
      {/* Header Card */}
      <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-emerald-100/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-emerald-900">
            <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <ScanLine className="h-6 w-6" />
            </div>
            Escanear código de barras
          </CardTitle>
          <p className="text-sm text-emerald-700 mt-2">
            Abre la cámara y apunta el código. Obtendrás al instante si es apto para APLV.
          </p>
        </CardHeader>
      </Card>

      {/* Main Scanner Card */}
      <Card className="border-2 border-slate-200 overflow-hidden">
        <CardContent className="p-0">
          {isScanning ? (
            <>
              {/* Active Scanner */}
              <div className="p-4 bg-slate-900">
                <BarcodeScanner
                  isScanning={isScanning}
                  onScanSuccess={handleScanSuccess}
                  onScanError={handleScanError}
                />
              </div>

              {/* Cancel Button */}
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <Button
                  onClick={() => setIsScanning(false)}
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-red-200 font-semibold"
                >
                  <X className="h-5 w-5 mr-2" />
                  Cancelar escaneo
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Inactive state */}
              <div className="p-8 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-100 mx-auto flex items-center justify-center">
                  <ScanLine className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    Listo para escanear
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Abre la cámara para escanear el código de barras del producto
                  </p>
                </div>
                {lastBarcode && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-600">Último escaneo:</p>
                    <p className="text-sm font-mono font-bold text-blue-900">
                      {lastBarcode}
                    </p>
                  </div>
                )}
                <Button
                  onClick={() => setIsScanning(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 h-auto text-lg rounded-lg"
                >
                  <ScanLine className="h-6 w-6 mr-2" />
                  Abrir cámara
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="pt-6 flex items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-blue-900 font-semibold">Buscando producto...</span>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 px-4 py-3 border-2 border-red-200">
          <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Error en la búsqueda</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <Button
              onClick={handleNewScan}
              size="sm"
              className="mt-3 bg-red-600 hover:bg-red-700 text-white"
            >
              Intentar de nuevo
            </Button>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <>
          <ScanResultCard
            productName={result.name}
            isSafe={result.isSafe}
            riskyIngredients={result.riskyIngredients}
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 mb-1">Marca</p>
              <p className="font-semibold text-slate-900">{result.brand}</p>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 mb-1">Código</p>
              <p className="font-mono text-sm font-bold text-slate-900">{result.barcode}</p>
            </div>
          </div>
          <Button
            onClick={handleNewScan}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 h-auto"
          >
            <ScanLine className="h-5 w-5 mr-2" />
            Escanear otro producto
          </Button>
        </>
      )}

      {/* Info Card */}
      <Card className="bg-blue-50 border-2 border-blue-200">
        <CardContent className="pt-4 pb-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Tip:</strong> Para mejores resultados, asegúrate que el código esté bien
            iluminado y centrado en la pantalla.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
