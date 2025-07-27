"use client"

import { motion } from "framer-motion"
import { Home, Smartphone, Wifi, Battery, TrendingUp } from "lucide-react"

export function TechnologySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Smart <span className="text-orange-500">Solar Homes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your home into a smart, energy-efficient solar-powered residence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
              <Home className="h-8 w-8 text-blue-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Modern Architecture</h3>
                <p className="text-muted-foreground">
                  Solar panels seamlessly integrate with contemporary home designs, enhancing both aesthetics and
                  functionality.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Smartphone className="h-8 w-8 text-green-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Monitoring</h3>
                <p className="text-muted-foreground">
                  Monitor your solar energy production and home consumption in real-time through mobile apps.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Battery className="h-8 w-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Energy Storage</h3>
                <p className="text-muted-foreground">
                  Store excess solar energy for use during evenings and cloudy days with advanced battery systems.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <TrendingUp className="h-8 w-8 text-purple-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Increased Value</h3>
                <p className="text-muted-foreground">
                  Solar installations increase property value while reducing electricity bills by up to 90%.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/images/modern-solar-house.webp"
                alt="Modern home with solar panels - Smart solar technology integration"
                className="w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-2xl" />

              {/* Overlay information */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-900/95 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">25+</p>
                    <p className="text-xs text-muted-foreground">Years Warranty</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">90%</p>
                    <p className="text-xs text-muted-foreground">Bill Reduction</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
              >
                <Wifi className="h-4 w-4" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute top-16 right-4 bg-yellow-500 text-white p-2 rounded-full shadow-lg"
              >
                <Battery className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
