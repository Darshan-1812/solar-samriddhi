"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Leaf, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Beautiful Rustic Solar House */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-image-hover transition-all duration-500"
        style={{
          backgroundImage: "url('/images/hero-rustic-solar-house.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 solar-gradient opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
              Solar Samriddhi
            </span>
            <br />
            <span className="text-white drop-shadow-lg">Power Your Future</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Calculate the perfect solar solution for your home, farm, or business. Get accurate estimates, government
            subsidies, and professional installation guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
              asChild
            >
              <Link href="/auth/register">
                Get Solar Estimate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <Link href="#about">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            <div className="glass-card p-6 rounded-xl">
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground">10,000+</h3>
              <p className="text-muted-foreground">Solar Installations</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Leaf className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground">50,000 tons</h3>
              <p className="text-muted-foreground">CO₂ Reduced</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground">₹2 Crore+</h3>
              <p className="text-muted-foreground">Savings Generated</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements to highlight the beautiful garden and solar integration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-20 left-10 hidden lg:block"
      >
        <div className="glass-card p-4 rounded-full">
          <Leaf className="h-6 w-6 text-green-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute top-32 right-16 hidden lg:block"
      >
        <div className="glass-card p-4 rounded-full">
          <Zap className="h-6 w-6 text-orange-500" />
        </div>
      </motion.div>
    </section>
  )
}
