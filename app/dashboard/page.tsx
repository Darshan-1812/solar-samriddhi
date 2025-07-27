"use client"

import { Navbar } from "@/components/navbar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
// Wrap the dashboard with ProtectedRoute
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <DashboardContent />
        </main>
      </div>
    </ProtectedRoute>
  )
}
