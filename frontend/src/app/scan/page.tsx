"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        const devices =
          await BrowserMultiFormatReader.listVideoInputDevices();

        const backCamera = devices.find((d) =>
          d.label.toLowerCase().includes("back")
        );

        const deviceId = backCamera?.deviceId || devices[0]?.deviceId;
        if (!deviceId) {
          setError("No se encontró cámara disponible.");
          return;
        }

        codeReader.decodeFromVideoDevice(
          deviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              setResult(result.getText());
              console.log("Código detectado:", result.getText());
            }
          }
        );
      } catch (err) {
        setError("No se pudo iniciar la cámara.");
        console.error(err);
      }
    };

    startScanner();

    // ⛔ No existe codeReader.reset()
    // 🟢 Se detiene la cámara manualmente aquí:
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;

        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Escanear código</h1>

      {error && <p className="text-red-500">{error}</p>}

      <video
        ref={videoRef}
        className="rounded-lg border w-full max-w-md mx-auto"
      />

      {result && (
        <p className="mt-4 p-3 bg-green-100 border text-green-700 rounded">
          Código detectado: <strong>{result}</strong>
        </p>
      )}
    </main>
  );
}
