"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoginForm } from "@/components/auth/login-form"
import { createSupabaseClient } from "@/lib/supabase"

export default function LoginPage() {
  const supabase = createSupabaseClient()
  const isSupabaseConfigured = supabase !== null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card">
          <CardHeader className="text-center">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-orange-500">Solar Samriddhi</h1>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your Solar Samriddhi account</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSupabaseConfigured && (
              <Alert className="mb-4 border-blue-200 bg-blue-50 text-blue-800">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Demo Mode: Supabase not configured. Using mock authentication for testing.
                </AlertDescription>
              </Alert>
            )}

            <LoginForm />

            <div className="mt-4 text-center">
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Demo accounts - show always for testing */}
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Admin Login:</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Email: darshangirase18@gmail.com</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Password: admin123</p>
              </div>

              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Demo Login:</p>
                <p className="text-xs text-green-600 dark:text-green-400">Email: demo@solarsamriddhi.com</p>
                <p className="text-xs text-green-600 dark:text-green-400">Password: demo123</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
