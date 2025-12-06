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
  const scanDoneRef = useRef(false)

  useEffect(() => {
    if (!isScanning || !videoRef.current) return

    const initScanner = async () => {
      try {
        if (!videoRef.current) {
          throw new Error("Video element not available")
        }

        scanDoneRef.current = false
        const reader = new BrowserMultiFormatReader()
        readerRef.current = reader

        const videoInputDevices = await BrowserMultiFormatReader.listVideoInputDevices()

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
            if (result && !scanDoneRef.current) {
              const barcode = result.getText()
              console.log("Barcode detected:", barcode)
              scanDoneRef.current = true
              onScanSuccess(barcode)
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
          <div className="relative rounded-2xl overflow-hidden bg-black border-4 border-blue-400 shadow-2xl shadow-blue-500/30">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              style={{ transform: "scaleX(-1)" }}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-48">
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-blue-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-blue-400" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-blue-400" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-blue-400" />
                <div className="w-full h-full border-2 border-blue-400 rounded-lg opacity-50" />
              </div>
            </div>

            {!initialized && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  <p className="text-blue-300 text-sm font-semibold">Inicializando cámara...</p>
                </div>
              </div>
            )}

            <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/50">
                <Zap className="h-4 w-4 text-blue-400" />
                <p className="text-sm text-blue-300 font-semibold">Apunta el código de barras</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
