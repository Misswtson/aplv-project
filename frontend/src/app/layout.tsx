import "./globals.css";
import BottomNav from "../components/BottomNav";

export const metadata = {
  title: "APLV App",
  description: "Scanner de productos aptos APLV",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}
        <BottomNav/>
      </body>
    </html>
  );
}
