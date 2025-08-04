"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/auth/user-menu"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Subsidies", href: "#subsidies" },
    { name: "Contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Update scrolled state
      setIsScrolled(currentScrollY > 10)

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            isScrolled ? "glass-card shadow-lg backdrop-blur-md bg-white/80 dark:bg-gray-900/80" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Simple Brand */}
              <Link href="/" className="text-xl font-bold text-foreground hover:text-orange-500 transition-colors">
                Solar Samriddhi
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
                  </Link>
                ))}
              </div>

              {/* Right side */}
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <UserMenu />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden py-4 space-y-2 border-t border-border/50"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="px-3 py-2 space-y-2">
                    <div className="flex justify-center">
                      <UserMenu />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
