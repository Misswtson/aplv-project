"use client"

import { useState } from "react"
import { Home, ScanLine, Search, ShieldCheck, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SafeKidsLogo } from "../logo"

type Props = {
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

export function ResponsiveNav({ activeTab, onTabChange, children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "scan", label: "Escanear", icon: ScanLine },
    { id: "search", label: "Buscar", icon: Search },
    { id: "safe-list", label: "Seguros", icon: ShieldCheck },
    { id: "profile", label: "Perfil", icon: User },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onTabChange("home")} className="flex items-center gap-3 hover:opacity-80 transition">
            <SafeKidsLogo />
            <div className="flex flex-col hidden sm:block">
              <span className="text-lg font-bold text-blue-900">SafeKids </span>
              <span className="text-xs text-slate-600">Alimentos seguros APLV</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className={`gap-2 ${
                  activeTab === item.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium hover:bg-blue-100 transition border-2 border-blue-200">
              <span className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-xs font-bold">
                A
              </span>
              <span className="text-slate-700">Aaron</span>
            </button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white p-3 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                onClick={() => {
                  onTabChange(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full justify-start gap-2 ${
                  activeTab === item.id
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : ""
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t-2 border-slate-200 h-20">
        <div className="flex items-center justify-around h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
                activeTab === item.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
