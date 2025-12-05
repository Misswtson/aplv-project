// frontend/src/components/aplv/barcode-scanner.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, X, AlertTriangle, Zap } from "lucide-react"
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

        const videoInputDevices = await reader.listVideoInputDevices()

        if (videoInputDevices.length === 0) {
          throw new Error("No se encontraron cámaras disponibles")
        }

        const selectedDeviceId =
          videoInputDevices.find((d) =>
            d.label.toLowerCase().includes("back")
          )?.deviceId || videoInputDevices[0].deviceId

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
        <div className="flex items-center gap-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border-2 border-red-200">
          <AlertTriangle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Error en el escáner</p>
            <p className="text-xs mt-1">{error}</p>
          </div>
        </div>
      )}

      {isScanning && (
        <>
          {/* Scanner Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black border-4 border-emerald-400 shadow-2xl shadow-emerald-500/30">
            {/* Video */}
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              style={{ transform: "scaleX(-1)" }}
            />

            {/* Animated Scanning Frame */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Main scanning box */}
              <div className="relative w-72 h-48">
                {/* Corner top-left */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-emerald-400" />
                {/* Corner top-right */}
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-emerald-400" />
                {/* Corner bottom-left */}
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-emerald-400" />
                {/* Corner bottom-right */}
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-emerald-400" />

                {/* Center box outline */}
                <div className="w-full h-full border-2 border-emerald-400 rounded-lg opacity-50" />

                {/* Animated line scan */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-emerald-400 to-transparent animate-pulse" />
                  <div
                    className="absolute left-0 right-0 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-20 animate-pulse"
                    style={{
                      animation: "scan 2s infinite",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Loading indicator */}
            {!initialized && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                  <p className="text-emerald-300 text-sm font-semibold">Inicializando cámara...</p>
                </div>
              </div>
            )}

            {/* Top instruction */}
            <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/50">
                <Zap className="h-4 w-4 text-emerald-400" />
                <p className="text-sm text-emerald-300 font-semibold">Apunta el código de barras</p>
              </div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
              <div className="text-xs text-emerald-300 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
                Escaneo automático
              </div>
            </div>
          </div>

          <style>{`
            @keyframes scan {
              0% {
                top: -100%;
              }
              100% {
                top: 100%;
              }
            }
          `}</style>
        </>
      )}
    </div>
  )
}
