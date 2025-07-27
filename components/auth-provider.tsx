"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { createSupabaseClient, type Profile } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  isSupabaseConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Check if Supabase is configured
  const supabase = createSupabaseClient()
  const isSupabaseConfigured = supabase !== null

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // If Supabase is not configured, use mock authentication
    if (!isSupabaseConfigured) {
      console.log("Supabase not configured, using mock authentication")
      // Check for existing mock session
      try {
        const savedUser = localStorage.getItem("solar-samriddhi-user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setProfile(userData)
        }
      } catch (error) {
        console.error("Error loading mock user:", error)
      }
      setLoading(false)
      return
    }

    // Real Supabase authentication
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)

          if (session?.user) {
            await fetchProfile(session.user.id)
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      }

      setLoading(false)
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email)

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }

      setLoading(false)

      // Handle redirects based on auth events
      if (event === "SIGNED_IN") {
        router.push("/dashboard")
      } else if (event === "SIGNED_OUT") {
        router.push("/")
      }
    })

    return () => subscription.unsubscribe()
  }, [mounted, isSupabaseConfigured, router])

  const fetchProfile = async (userId: string) => {
    if (!supabase) return

    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching profile:", error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error("Error in fetchProfile:", error)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true)

    try {
      if (!isSupabaseConfigured) {
        // Mock signup
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockUser = {
          id: Date.now().toString(),
          email: email,
          full_name: fullName,
          role: "user",
          created_at: new Date().toISOString(),
        }
        setUser(mockUser as any)
        setProfile(mockUser as Profile)
        localStorage.setItem("solar-samriddhi-user", JSON.stringify(mockUser))
        return
      }

      const { data, error } = await supabase!.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      if (data.user && !data.session) {
        throw new Error("Please check your email and click the confirmation link to complete registration.")
      }
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    try {
      if (!isSupabaseConfigured) {
        // Mock signin with demo accounts
        await new Promise((resolve) => setTimeout(resolve, 1000))

        let mockUser
        if (email === "darshangirase18@gmail.com" && password === "admin123") {
          mockUser = {
            id: "admin",
            email: email,
            full_name: "Darshan Girase",
            role: "admin",
          }
        } else if (email === "demo@solarsamriddhi.com" && password === "demo123") {
          mockUser = {
            id: "demo",
            email: email,
            full_name: "Demo User",
            role: "user",
          }
        } else if (email && password && password.length >= 6) {
          mockUser = {
            id: Date.now().toString(),
            email: email,
            full_name: email.split("@")[0],
            role: "user",
          }
        } else {
          throw new Error("Invalid email or password")
        }

        setUser(mockUser as any)
        setProfile(mockUser as Profile)
        localStorage.setItem("solar-samriddhi-user", JSON.stringify(mockUser))
        return
      }

      const { data, error } = await supabase!.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)

    try {
      if (!isSupabaseConfigured) {
        // Mock signout
        setUser(null)
        setProfile(null)
        setSession(null)
        localStorage.removeItem("solar-samriddhi-user")
        return
      }

      const { error } = await supabase!.auth.signOut()
      if (error) throw error

      setUser(null)
      setProfile(null)
      setSession(null)
    } catch (error) {
      console.error("Sign out error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in")

    try {
      if (!isSupabaseConfigured) {
        // Mock update
        const updatedProfile = { ...profile, ...updates } as Profile
        setProfile(updatedProfile)
        localStorage.setItem("solar-samriddhi-user", JSON.stringify(updatedProfile))
        return
      }

      const { error } = await supabase!
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      await fetchProfile(user.id)
    } catch (error) {
      console.error("Update profile error:", error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      if (!isSupabaseConfigured) {
        // Mock reset
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return
      }

      const { error } = await supabase!.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
    } catch (error) {
      console.error("Reset password error:", error)
      throw error
    }
  }

  // Don't render until mounted
  if (!mounted) {
    return null
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    isSupabaseConfigured,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
