"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RegisterForm } from "@/components/auth/register-form"
import { createSupabaseClient } from "@/lib/supabase"

export default function RegisterPage() {
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
            <CardTitle className="text-2xl font-bold">Join Solar Samriddhi</CardTitle>
            <CardDescription>Create your account to start your solar journey</CardDescription>
          </CardHeader>
          <CardContent>
            {!isSupabaseConfigured && (
              <Alert className="mb-4 border-blue-200 bg-blue-50 text-blue-800">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Demo Mode: Supabase not configured. Registration will work locally for testing.
                </AlertDescription>
              </Alert>
            )}

            <RegisterForm />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
