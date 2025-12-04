"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, LogOut, Edit2 } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-5 w-5 text-emerald-600" />
            Mi perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Child profile */}
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs font-semibold text-slate-600 mb-2">Perfil del niño/a</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                L
              </div>
              <div>
                <p className="text-sm font-semibold">Lucía</p>
                <p className="text-xs text-slate-500">Nacimiento: 15 Jan 2020</p>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs font-semibold text-slate-600 mb-2">Alergias registradas</p>
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-[11px] text-red-700 border border-red-100">
                APLV (Leche)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <Button variant="outline" className="w-full" size="sm">
              <Edit2 className="h-4 w-4 mr-2" />
              Editar perfil
            </Button>
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              size="sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="pt-4">
          <p className="text-xs text-blue-900">
            <strong>Tip:</strong> Mantén tu perfil actualizado para que los resultados sean precisos.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
