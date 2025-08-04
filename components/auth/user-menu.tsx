"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, LogOut, Settings, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { authService, type AuthUser } from "@/lib/auth-utils"
import { useToast } from "@/hooks/use-toast"

export function UserMenu() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Error loading user:", error)
      }
    }

    loadUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" asChild>
          <a href="/auth/login">Login</a>
        </Button>
        <Button size="sm" asChild>
          <a href="/auth/register">Get Started</a>
        </Button>
      </div>
    )
  }

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-orange-500 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.name || "User"}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard" className="cursor-pointer">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/profile" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Profile
          </a>
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <a href="/admin" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Admin
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}