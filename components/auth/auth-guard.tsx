"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authService, type AuthUser } from "@/lib/auth-utils"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = false, 
  requireAdmin = false, 
  redirectTo 
}: AuthGuardProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)

        if (requireAuth && !currentUser) {
          router.push(redirectTo || "/auth/login")
          return
        }

        if (requireAdmin && currentUser?.role !== "admin") {
          router.push("/dashboard")
          return
        }

        // Redirect authenticated users away from auth pages
        if (currentUser && window.location.pathname.startsWith("/auth/")) {
          router.push("/dashboard")
          return
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (requireAuth) {
          router.push(redirectTo || "/auth/login")
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [requireAuth, requireAdmin, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (requireAdmin && user?.role !== "admin") {
    return null
  }

  return <>{children}</>
}