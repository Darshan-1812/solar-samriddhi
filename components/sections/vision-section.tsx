"use client"

import { motion } from "framer-motion"
import { Target, Globe, Zap } from "lucide-react"

export function VisionSection() {
  return (
    <section id="vision" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-orange-500">Vision</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <Target className="h-8 w-8 text-orange-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Future</h3>
                <p className="text-muted-foreground">
                  To make India energy independent by promoting solar adoption across every household, farm, and
                  business, contributing to a cleaner and greener tomorrow.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Globe className="h-8 w-8 text-green-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
                <p className="text-muted-foreground">
                  Reduce carbon footprint by 10 million tons annually through widespread solar adoption, helping combat
                  climate change and preserve our planet for future generations.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Zap className="h-8 w-8 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Energy Democracy</h3>
                <p className="text-muted-foreground">
                  Empower every Indian with access to clean, affordable solar energy, making renewable power accessible
                  to all economic segments of society.
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
            <div className="glass-card p-8 rounded-2xl group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src="/images/solar-vision-farm.jpg"
                  alt="Solar Vision - Large solar power station at sunset representing our vision for renewable energy future"
                  className="w-full h-64 object-cover transition-all duration-700 card-image-hover image-zoom"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/20" />

                {/* Animated border on hover */}
                <div className="absolute inset-0 border-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </div>
              <blockquote className="text-lg italic text-center transition-colors duration-300 group-hover:text-orange-600">
                "By 2030, we envision Solar Samriddhi as the catalyst that transforms India into a solar-powered nation,
                where every rooftop generates clean energy and every family enjoys energy independence."
              </blockquote>
              <p className="text-center mt-4 font-semibold text-orange-500 transition-all duration-300 group-hover:scale-105">
                - Solar Samriddhi Team
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
