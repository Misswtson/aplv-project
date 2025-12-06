export function SafeKidsLogo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeMap = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
  }

  return (
    <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold`}>
      <span className="text-xs">APLV</span>
    </div>
  )
}
