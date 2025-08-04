"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Calendar, Shield, Edit, Save, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { AuthGuard } from "@/components/auth/auth-guard"
import { authService } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
      setName(currentUser?.name || "")
      setEmail(currentUser?.email || "")
    }
    loadUser()
  }, [])

  const handleSave = async () => {
    try {
      await authService.updateProfile({ name })
      const updatedUser = await authService.getCurrentUser()
      setUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error("Profile update error:", error)
    }
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  const handleCancel = () => {
    setName(user?.name || "")
    setEmail(user?.email || "")
    setIsEditing(false)
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account information and preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            <User className="h-6 w-6 text-orange-500 mr-2" />
                            Personal Information
                          </CardTitle>
                          <CardDescription>Update your personal details</CardDescription>
                        </div>
                        {!isEditing ? (
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleCancel}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button size="sm" onClick={handleSave}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          {isEditing ? (
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your full name"
                            />
                          ) : (
                            <p className="text-sm font-medium p-2 bg-muted rounded">{user?.name}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          {isEditing ? (
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email"
                            />
                          ) : (
                            <p className="text-sm font-medium p-2 bg-muted rounded">{user?.email}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Account Status */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-6 w-6 text-green-500 mr-2" />
                        Account Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Account Type</span>
                        <Badge variant={user?.role === "admin" ? "default" : "secondary"}>
                          {user?.role === "admin" ? "Admin" : "User"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Status</span>
                        <Badge variant="default" className="bg-green-500">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Member Since</span>
                        <span className="text-sm text-muted-foreground">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Calendar className="h-4 w-4 mr-2" />
                        Download Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
