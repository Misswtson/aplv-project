"use client"
import "./globals.css";
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, ScanLine, Search, User } from "lucide-react"
import HomePage from "./page"
import ScanPage from "./scan/page"
import SearchPage from "./search/page"
import SafeListPage from "./safe-list/page"
import ProfilePage from "./profile/page"


export default function RootLayout() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900">
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between border-b bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                APLV
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">APLV Helper</span>
                <span className="text-[11px] text-slate-500">Para madres y padres</span>
              </div>
            </div>
            {/* Child profile pill */}
            <button className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium hover:bg-slate-200 transition">
              <span className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold">
              </span>
              <span className="hidden sm:inline">Aaron</span>
            </button>
          </header>

          {/* Main content with Tabs */}
          <main className="flex-1 overflow-y-auto pb-24 sm:pb-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-col h-full"
            >
              {/* Tab Contents */}
              <TabsContent value="home" className="flex-1 px-4 py-4 data-[state=active]:flex">
                <HomePage />
              </TabsContent>

              <TabsContent value="scan" className="flex-1 px-4 py-4 data-[state=active]:flex">
                <ScanPage />
              </TabsContent>

              <TabsContent value="search" className="flex-1 px-4 py-4 data-[state=active]:flex">
                <SearchPage />
              </TabsContent>

              <TabsContent value="safe-list" className="flex-1 px-4 py-4 data-[state=active]:flex">
                <SafeListPage />
              </TabsContent>

              <TabsContent value="profile" className="flex-1 px-4 py-4 data-[state=active]:flex">
                <ProfilePage />
              </TabsContent>

              {/* Bottom Navigation Tabs - Sticky */}
              <TabsList className="fixed bottom-0 left-0 right-0 z-50 h-16 w-full rounded-none border-t bg-white flex items-center justify-around px-0 sm:relative sm:sticky sm:bottom-0">
                <TabsTrigger
                  value="home"
                  className="flex flex-col items-center gap-1 data-[state=active]:text-emerald-600"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-[10px] font-medium">Inicio</span>
                </TabsTrigger>

                <TabsTrigger
                  value="scan"
                  className="flex flex-col items-center gap-1 data-[state=active]:text-emerald-600"
                >
                  <ScanLine className="h-5 w-5" />
                  <span className="text-[10px] font-medium">Escanear</span>
                </TabsTrigger>

                <TabsTrigger
                  value="search"
                  className="flex flex-col items-center gap-1 data-[state=active]:text-emerald-600"
                >
                  <Search className="h-5 w-5" />
                  <span className="text-[10px] font-medium">Buscar</span>
                </TabsTrigger>

                <TabsTrigger
                  value="safe-list"
                  className="flex flex-col items-center gap-1 data-[state=active]:text-emerald-600"
                >
                  <div className="h-5 w-5 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-medium">Seguros</span>
                </TabsTrigger>

                <TabsTrigger
                  value="profile"
                  className="flex flex-col items-center gap-1 data-[state=active]:text-emerald-600"
                >
                  <User className="h-5 w-5" />
                  <span className="text-[10px] font-medium">Perfil</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </main>
        </div>
      </body>
    </html>
  )
}

import { ShieldCheck } from "lucide-react"