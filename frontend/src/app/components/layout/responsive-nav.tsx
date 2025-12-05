// frontend/src/components/layout/responsive-nav.tsx
"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, ScanLine, Search, ShieldCheck, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  activeTab: string
  onTabChange: (tab: string) => void
  children: React.ReactNode
}

export function ResponsiveNav({ activeTab, onTabChange, children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-emerald-900">APLV Helper</span>
              <span className="text-xs text-slate-600">Para madres y padres</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={activeTab === "home" ? "default" : "outline"}
              onClick={() => onTabChange("home")}
              className={activeTab === "home" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <Home className="h-4 w-4 mr-2" />
              Inicio
            </Button>
            <Button
              variant={activeTab === "scan" ? "default" : "outline"}
              onClick={() => onTabChange("scan")}
              className={activeTab === "scan" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <ScanLine className="h-4 w-4 mr-2" />
              Escanear
            </Button>
            <Button
              variant={activeTab === "search" ? "default" : "outline"}
              onClick={() => onTabChange("search")}
              className={activeTab === "search" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button
              variant={activeTab === "safe-list" ? "default" : "outline"}
              onClick={() => onTabChange("safe-list")}
              className={activeTab === "safe-list" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Seguros
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "outline"}
              onClick={() => onTabChange("profile")}
              className={activeTab === "profile" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <User className="h-4 w-4 mr-2" />
              Perfil
            </Button>
          </nav>

          {/* Profile & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium hover:bg-emerald-100 transition border-2 border-emerald-200">
              <span className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                A
              </span>
              <span className="text-slate-700">Aaron</span>
            </button>

            {/* Mobile Menu Toggle */}
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
          <div className="md:hidden border-t border-slate-200 bg-slate-50 p-3 space-y-2">
            <Button
              variant={activeTab === "home" ? "default" : "outline"}
              onClick={() => {
                onTabChange("home")
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Inicio
            </Button>
            <Button
              variant={activeTab === "scan" ? "default" : "outline"}
              onClick={() => {
                onTabChange("scan")
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start"
            >
              <ScanLine className="h-4 w-4 mr-2" />
              Escanear
            </Button>
            <Button
              variant={activeTab === "search" ? "default" : "outline"}
              onClick={() => {
                onTabChange("search")
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button
              variant={activeTab === "safe-list" ? "default" : "outline"}
              onClick={() => {
                onTabChange("safe-list")
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start"
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Productos Seguros
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "outline"}
              onClick={() => {
                onTabChange("profile")
                setMobileMenuOpen(false)
              }}
              className="w-full justify-start"
            >
              <User className="h-4 w-4 mr-2" />
              Perfil
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      {/* Mobile Bottom Navigation (shows only on small screens) */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t-2 border-slate-200 h-20">
        <div className="flex items-center justify-around h-full">
          <button
            onClick={() => onTabChange("home")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
              activeTab === "home"
                ? "text-emerald-600 bg-emerald-50"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-semibold">Inicio</span>
          </button>
          <button
            onClick={() => onTabChange("scan")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
              activeTab === "scan"
                ? "text-emerald-600 bg-emerald-50"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ScanLine className="h-6 w-6" />
            <span className="text-xs font-semibold">Escanear</span>
          </button>
          <button
            onClick={() => onTabChange("search")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
              activeTab === "search"
                ? "text-emerald-600 bg-emerald-50"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Search className="h-6 w-6" />
            <span className="text-xs font-semibold">Buscar</span>
          </button>
          <button
            onClick={() => onTabChange("safe-list")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
              activeTab === "safe-list"
                ? "text-emerald-600 bg-emerald-50"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xs font-semibold">Seguros</span>
          </button>
          <button
            onClick={() => onTabChange("profile")}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition ${
              activeTab === "profile"
                ? "text-emerald-600 bg-emerald-50"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs font-semibold">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
