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
      className="mt-4 border-2 border-dashed"
      style={{
        borderColor: isSafe ? "#34d399" : "#ef4444",
      }}
    >
      <CardHeader className="pb-2 flex flex-row items-start gap-2">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0 ${
            isSafe ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isSafe ? (
            <ShieldCheck className="h-5 w-5" />
          ) : (
            <AlertTriangle className="h-5 w-5" />
          )}
        </div>
        <div className="flex-1">
          <CardTitle className="text-sm">
            {isSafe ? "✓ Apto para APLV" : "✗ NO apto para APLV"}
          </CardTitle>
          <CardDescription className="text-xs">{productName}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isSafe ? (
          <p className="text-xs text-slate-600">
            ✓ No se encontraron derivados de leche en los ingredientes.
          </p>
        ) : (
          <>
            <p className="text-xs text-slate-600 mb-2">
              ⚠️ Se encontraron estos ingredientes de riesgo:
            </p>
            <ul className="flex flex-wrap gap-1">
              {riskyIngredients.map((ing) => (
                <li
                  key={ing}
                  className="text-[11px] rounded-full bg-red-50 px-2 py-[2px] text-red-700 border border-red-100"
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
