import { createSupabaseClient } from "@/lib/supabase"

export interface AuthUser {
  id: string
  email: string
  name?: string
  role: "user" | "admin"
  createdAt?: string
}

export class AuthService {
  private supabase = createSupabaseClient()

  // Check if user is authenticated
  async getCurrentUser(): Promise<AuthUser | null> {
    if (!this.supabase) {
      // Mock authentication fallback
      const savedUser = localStorage.getItem("solar-samriddhi-user")
      if (savedUser) {
        try {
          return JSON.parse(savedUser)
        } catch {
          return null
        }
      }
      return null
    }

    try {
      const { data: { user }, error } = await this.supabase.auth.getUser()
      if (error || !user) return null

      // Get profile data
      const { data: profile } = await this.supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      return {
        id: user.id,
        email: user.email!,
        name: profile?.full_name || user.user_metadata?.full_name,
        role: profile?.role || "user",
        createdAt: user.created_at,
      }
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  }

  // Sign up new user
  async signUp(email: string, password: string, fullName: string): Promise<AuthUser> {
    if (!this.supabase) {
      // Mock signup
      const mockUser: AuthUser = {
        id: Date.now().toString(),
        email,
        name: fullName,
        role: "user",
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("solar-samriddhi-user", JSON.stringify(mockUser))
      return mockUser
    }

    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    if (!data.user) throw new Error("Failed to create user")

    return {
      id: data.user.id,
      email: data.user.email!,
      name: fullName,
      role: "user",
      createdAt: data.user.created_at,
    }
  }

  // Sign in user
  async signIn(email: string, password: string): Promise<AuthUser> {
    if (!this.supabase) {
      // Mock signin with demo accounts
      let mockUser: AuthUser

      if (email === "darshangirase18@gmail.com" && password === "admin123") {
        mockUser = {
          id: "admin",
          email,
          name: "Darshan Girase",
          role: "admin",
        }
      } else if (email === "demo@solarsamriddhi.com" && password === "demo123") {
        mockUser = {
          id: "demo",
          email,
          name: "Demo User",
          role: "user",
        }
      } else if (email && password && password.length >= 6) {
        mockUser = {
          id: Date.now().toString(),
          email,
          name: email.split("@")[0],
          role: "user",
        }
      } else {
        throw new Error("Invalid email or password")
      }

      localStorage.setItem("solar-samriddhi-user", JSON.stringify(mockUser))
      return mockUser
    }

    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    if (!data.user) throw new Error("Failed to sign in")

    // Get profile data
    const { data: profile } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    return {
      id: data.user.id,
      email: data.user.email!,
      name: profile?.full_name || data.user.user_metadata?.full_name,
      role: profile?.role || "user",
      createdAt: data.user.created_at,
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    if (!this.supabase) {
      localStorage.removeItem("solar-samriddhi-user")
      return
    }

    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  // Reset password
  async resetPassword(email: string): Promise<void> {
    if (!this.supabase) {
      // Mock reset - just simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      return
    }

    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
  }

  // Update user profile
  async updateProfile(updates: Partial<{ name: string; phone: string; city: string; state: string }>): Promise<void> {
    const user = await this.getCurrentUser()
    if (!user) throw new Error("No user logged in")

    if (!this.supabase) {
      // Mock update
      const savedUser = localStorage.getItem("solar-samriddhi-user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        const updatedUser = { ...userData, ...updates }
        localStorage.setItem("solar-samriddhi-user", JSON.stringify(updatedUser))
      }
      return
    }

    const { error } = await this.supabase
      .from("profiles")
      .update({
        full_name: updates.name,
        phone: updates.phone,
        city: updates.city,
        state: updates.state,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) throw error
  }
}

export const authService = new AuthService()