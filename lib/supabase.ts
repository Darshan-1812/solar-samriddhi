import { createClient } from "@supabase/supabase-js"

// Fallback values for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Only create client if we have real credentials
export const supabase =
  supabaseUrl.includes("placeholder") || supabaseAnonKey.includes("placeholder")
    ? null
    : createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      })

// Safe client creation function
export function createSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase credentials not found. Using mock authentication.")
    return null
  }

  if (process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder")) {
    console.warn("Using placeholder Supabase URL. Please configure real credentials.")
    return null
  }

  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })
}

// Database types
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  phone?: string
  city?: string
  state?: string
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

export interface SolarCalculation {
  id: string
  user_id: string
  city: string
  state: string
  area_type: string
  electricity_bill: number
  installation_area: number
  panels_required: number
  system_capacity: number
  yearly_generation: number
  yearly_savings: number
  system_cost: number
  payback_period: number
  carbon_reduction: number
  coordinates: any
  created_at: string
}
