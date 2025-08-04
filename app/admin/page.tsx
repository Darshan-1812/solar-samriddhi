"use client"

import { motion } from "framer-motion"
import { Users, BarChart3, Settings, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { AuthGuard } from "@/components/auth/auth-guard"
import { authService } from "@/lib/auth-utils"
import { useState, useEffect } from "react"

export default function AdminPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  const adminStats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "text-blue-500" },
    { title: "Solar Calculations", value: "5,678", icon: BarChart3, color: "text-green-500" },
    { title: "Active Sessions", value: "89", icon: Shield, color: "text-orange-500" },
    { title: "System Health", value: "99.9%", icon: Settings, color: "text-purple-500" },
  ]

  return (
    <AuthGuard requireAuth={true} requireAdmin={true}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {adminStats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest user activities and system events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registration</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Solar calculation completed</p>
                          <p className="text-xs text-muted-foreground">5 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">System backup completed</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system health and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Response Time</span>
                        <span className="text-sm font-medium text-green-600">120ms</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database Status</span>
                        <span className="text-sm font-medium text-green-600">Healthy</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Server Uptime</span>
                        <span className="text-sm font-medium text-green-600">99.9%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Connections</span>
                        <span className="text-sm font-medium text-blue-600">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
