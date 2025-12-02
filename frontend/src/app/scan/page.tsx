"use client";

import { useEffect, useRef, useState } from "react";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err: any) {
        console.error("Camera error:", err);

        if (err.name === "NotAllowedError") {
          setError("Debes permitir acceso a la cámara para usar esta función.");
        } else if (err.name === "NotFoundError") {
          setError("No se encontró una cámara en este dispositivo.");
        } else {
          setError("No se pudo acceder a la cámara.");
        }
      }
    };

    startCamera();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Escanear código</h1>

      {error && <p className="text-red-500">{error}</p>}

      <video
        ref={videoRef}
        className="rounded-lg border w-full max-w-md mx-auto"
        autoPlay
        playsInline
        muted
      />
    </main>
  );
}
