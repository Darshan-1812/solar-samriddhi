"use client"

import { Navbar } from "@/components/navbar"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <DashboardContent />
        </main>
      </div>
    </AuthGuard>
  )
}
