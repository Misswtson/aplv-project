// frontend/src/components/aplv/barcode-scanner.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, X, AlertTriangle } from "lucide-react"
import { BrowserMultiFormatReader } from "@zxing/browser"

type Props = {
  onScanSuccess: (barcode: string) => void
  onScanError: (error: string) => void
  isScanning: boolean
}

export function BarcodeScanner({ onScanSuccess, onScanError, isScanning }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)

  useEffect(() => {
    if (!isScanning || !videoRef.current) return

    const initScanner = async () => {
      try {
        const reader = new BrowserMultiFormatReader()
        readerRef.current = reader

        // Listar dispositivos de video disponibles
        const videoInputDevices = await reader.listVideoInputDevices()

        if (videoInputDevices.length === 0) {
          throw new Error("No se encontraron cámaras disponibles")
        }

        // Usar cámara trasera si existe, si no usar la primera
        const selectedDeviceId =
          videoInputDevices.find((d) =>
            d.label.toLowerCase().includes("back")
          )?.deviceId || videoInputDevices[0].deviceId

        // Iniciar escaneo
        await reader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result) => {
            if (result) {
              const barcode = result.getText()
              console.log("Barcode detected:", barcode)
              onScanSuccess(barcode)
              reader.reset()
              setInitialized(false)
            }
          }
        )

        setInitialized(true)
        setError(null)
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Error al inicializar el escáner"
        console.error("Scanner error:", err)
        setError(errorMsg)
        onScanError(errorMsg)
      }
    }

    initScanner()

    return () => {
      if (readerRef.current) {
        readerRef.current.reset()
      }
      setInitialized(false)
    }
  }, [isScanning, onScanSuccess, onScanError])

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border-2 border-red-200">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isScanning && (
        <div className="relative rounded-lg overflow-hidden border-2 border-emerald-300 bg-black">
          <video
            ref={videoRef}
            className="w-full h-96 object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {/* Overlay scanning frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-40 border-4 border-emerald-400 rounded-lg opacity-75 shadow-lg shadow-emerald-400/50" />
          </div>
          {/* Scanning corners */}
          <div className="absolute top-20 left-16 w-8 h-8 border-t-4 border-l-4 border-emerald-400" />
          <div className="absolute top-20 right-16 w-8 h-8 border-t-4 border-r-4 border-emerald-400" />
          <div className="absolute bottom-20 left-16 w-8 h-8 border-b-4 border-l-4 border-emerald-400" />
          <div className="absolute bottom-20 right-16 w-8 h-8 border-b-4 border-r-4 border-emerald-400" />

          {!initialized && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
