import type { Metadata } from "next"
import './globals.css'
import { UserProvider } from "../lib/userContext";
import { RootLayoutClient } from "./components/layout/root-layout.client"

export const metadata: Metadata = {
  title: "SafeKids APLV - Alimentos seguros para tu familia",
  description: "Escanea códigos de barras y verifica ingredientes APLV al instante. Niños seguros, padres tranquilos.",
  keywords: "APLV, alergia leche, alimentos seguros, scanner productos, familia, Chile",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
        <RootLayoutClient />
      </body>
    </html>
  )
}
