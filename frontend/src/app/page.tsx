"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarcodeScanner } from "../app/components/aplv/barcode-scanner"
import { ScanLine, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleScanSuccess = async (barcode: string) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/products/barcode/${barcode}`
      )
      const data = await response.json()
      setScanResult(data)
      setIsScanning(false)
    } catch (error) {
      console.error("Error fetching product:", error)
      setScanResult({
        error: "Producto no encontrado",
        barcode: barcode,
      })
      setIsScanning(false)
    } finally {
      setLoading(false)
    }
  }

  const handleScanError = (error: string) => {
    console.error("Scan error:", error)
    setScanResult({ error: error })
  }

  const resetScan = () => {
    setScanResult(null)
    setIsScanning(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Escanear producto</h1>
        {isScanning && (
          <Button
            variant="outline"
            onClick={() => setIsScanning(false)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Cancelar
          </Button>
        )}
      </div>

      {/* Scanner */}
      {!scanResult && !isScanning && (
        <div className="text-center space-y-6">
          <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-12">
            <ScanLine className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Listo para escanear
            </h2>
            <p className="text-slate-600 mb-6">
              Presiona el botón para abrir la cámara y escanear un código de barras
            </p>
            <Button
              onClick={() => setIsScanning(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 h-auto text-lg gap-2 rounded-lg"
            >
              <ScanLine className="h-5 w-5" />
              Abrir cámara
            </Button>
          </div>
        </div>
      )}

      {/* Scanner active */}
      {isScanning && (
        <BarcodeScanner
          isScanning={isScanning}
          onScanSuccess={handleScanSuccess}
          onScanError={handleScanError}
        />
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
            Buscando producto...
          </div>
        </div>
      )}

      {/* Results */}
      {scanResult && !loading && (
        <div className="space-y-4">
          {scanResult.error ? (
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900">Producto no encontrado</h3>
                  <p className="text-sm text-red-700 mt-1">
                    {scanResult.message || "El código de barras no está en nuestra base de datos"}
                  </p>
                  <p className="text-xs text-red-600 mt-2 font-mono">
                    Código: {scanResult.barcode}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl border-2 p-6 ${
              scanResult.isSafe
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
            }`}>
              <div className="flex items-start gap-4">
                <CheckCircle
                  className={`h-6 w-6 flex-shrink-0 mt-1 ${
                    scanResult.isSafe ? "text-green-600" : "text-red-600"
                  }`}
                />
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    scanResult.isSafe ? "text-green-900" : "text-red-900"
                  }`}>
                    {scanResult.isSafe ? "✓ Producto seguro" : "✗ No recomendado"}
                  </h3>
                  <p className={`text-sm mt-2 ${
                    scanResult.isSafe ? "text-green-700" : "text-red-700"
                  }`}>
                    <strong>{scanResult.name}</strong> - {scanResult.brand}
                  </p>

                  {scanResult.allIngredients && (
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Ingredientes:</p>
                      <div className="flex flex-wrap gap-2">
                        {scanResult.allIngredients.map((ing: string) => (
                          <span
                            key={ing}
                            className="text-xs bg-white/50 px-2 py-1 rounded-full"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {scanResult.riskyIngredients?.length > 0 && (
                    <div className="mt-4 p-3 bg-red-100/50 rounded-lg border border-red-200">
                      <p className="text-xs font-semibold text-red-900">
                        ⚠️ Ingredientes con riesgo APLV:
                      </p>
                      <ul className="text-xs text-red-800 mt-1 space-y-1">
                        {scanResult.riskyIngredients.map((ing: string) => (
                          <li key={ing}>• {ing}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={resetScan}
            variant="outline"
            size="lg"
            className="w-full gap-2"
          >
            <ScanLine className="h-4 w-4" />
            Escanear otro producto
          </Button>
        </div>
      )}
    </div>
  )
}
