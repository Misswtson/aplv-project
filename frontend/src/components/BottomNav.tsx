"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex flex-col items-center justify-center flex-1 py-2 ${
      pathname === path ? "text-blue-600 font-semibold" : "text-gray-500"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex z-50">
      <Link href="/" className={linkClass("/")}>
        <span>🏠</span>
        <span className="text-xs">Inicio</span>
      </Link>

      <Link href="/scan" className={linkClass("/scan")}>
        <span>📷</span>
        <span className="text-xs">Escanear</span>
      </Link>

      <Link href="/search" className={linkClass("/search")}>
        <span>🔎</span>
        <span className="text-xs">Buscar</span>
      </Link>
    </nav>
  );
}
