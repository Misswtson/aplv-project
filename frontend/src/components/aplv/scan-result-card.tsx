// frontend/src/components/aplv/scan-result-card.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AlertTriangle, ShieldCheck } from "lucide-react"

type Props = {
  productName: string
  isSafe: boolean
  riskyIngredients: string[]
}

export function ScanResultCard({ productName, isSafe, riskyIngredients }: Props) {
  return (
    <Card
      className="mt-4 border-2"
      style={{
        borderColor: isSafe ? "#10b981" : "#ef4444",
      }}
    >
      <CardHeader className="pb-3" style={{ backgroundColor: isSafe ? "#ecfdf5" : "#fef2f2" }}>
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
              isSafe ? "bg-emerald-200 text-emerald-700" : "bg-red-200 text-red-700"
            }`}
          >
            {isSafe ? (
              <ShieldCheck className="h-6 w-6" />
            ) : (
              <AlertTriangle className="h-6 w-6" />
            )}
          </div>
          <div>
            <CardTitle className="text-lg" style={{ color: isSafe ? "#065f46" : "#7f1d1d" }}>
              {isSafe ? "✓ Apto para APLV" : "✗ NO apto para APLV"}
            </CardTitle>
            <CardDescription style={{ color: isSafe ? "#047857" : "#dc2626" }}>
              {productName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isSafe ? (
          <p className="text-sm text-slate-600">
            ✓ No se encontraron derivados de leche en los ingredientes.
          </p>
        ) : (
          <>
            <p className="text-sm text-slate-600 mb-3 font-semibold">
              ⚠️ Se encontraron estos ingredientes de riesgo:
            </p>
            <ul className="flex flex-wrap gap-2">
              {riskyIngredients.map((ing) => (
                <li
                  key={ing}
                  className="text-xs rounded-full bg-red-50 px-3 py-1 text-red-700 border border-red-200 font-medium"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  )
}
