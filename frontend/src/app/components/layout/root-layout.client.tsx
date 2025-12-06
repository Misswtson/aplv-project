"use client"

import { useState } from "react"
import { ResponsiveNav } from "./responsive-nav"
import HomePage from "../../page"
import ScanPage from "../../scan/page"
import SearchPage from "../../search/page"
import SafeListPage from "../../safe-list/page"
import ProfilePage from "../../profile/page"

export function RootLayoutClient() {
  const [activeTab, setActiveTab] = useState("home")

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />
      case "scan":
        return <ScanPage />
      case "search":
        return <SearchPage />
      case "safe-list":
        return <SafeListPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <ResponsiveNav activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </ResponsiveNav>
  )
}
