// frontend/src/app/(root)/page.tsx
"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, Search, ShieldCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Intro Card */}
      <div className="rounded-lg border-2 border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-lg font-bold text-emerald-900">
              Alimentos seguros para APLV
            </h2>
            <p className="text-sm text-emerald-700 mt-1">
              Revisa etiquetas en segundos. Tranquilidad en el súper y en casa.
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {/* Scan Card */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-lg hover:border-emerald-300 transition cursor-pointer">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-base">
                Escanear producto
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Sube foto de etiqueta → resultado al instante.
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <ScanLine className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Search Card */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-lg hover:border-emerald-300 transition cursor-pointer">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-base">
                Buscar producto
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Encuentra productos por nombre o marca.
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Safe List Card */}
        <div className="rounded-lg border border-slate-200 bg-white p-4 hover:shadow-lg hover:border-emerald-300 transition cursor-pointer">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-base">
                Productos aptos
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Acceso rápido a tu lista de seguros.
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="font-semibold text-slate-900 text-base mb-2">
          Últimos escaneos
        </h3>
        <p className="text-sm text-slate-500">
          Aquí aparecerán tus productos escaneados recientemente.
        </p>
      </div>
    </div>
  )
}
