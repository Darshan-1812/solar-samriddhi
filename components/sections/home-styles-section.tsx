"use client"

import { motion } from "framer-motion"
import { Home, Leaf, Star, Award } from "lucide-react"
import { Card } from "@/components/ui/card"

export function HomeStylesSection() {
  const homeStyles = [
    {
      title: "Traditional Charm",
      description: "Solar panels complement classic architecture beautifully",
      image: "/images/rustic-solar-house.jpg",
      features: ["Stone & Brick Homes", "Red Tile Roofs", "Garden Integration", "Heritage Preservation"],
      icon: Home,
    },
    {
      title: "Modern Elegance",
      description: "Sleek solar integration with contemporary design",
      image: "/images/modern-solar-house.webp",
      features: ["Clean Lines", "Large Windows", "Minimalist Design", "Smart Technology"],
      icon: Star,
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solar for Every <span className="text-orange-500">Home Style</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether your home is traditional or modern, solar panels can be beautifully integrated to enhance both
            aesthetics and energy efficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {homeStyles.map((style, index) => (
            <motion.div
              key={style.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={style.image || "/placeholder.svg"}
                    alt={`${style.title} - Solar installation on ${style.title.toLowerCase()} home`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Floating icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="absolute top-4 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg"
                  >
                    <style.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Bottom overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{style.title}</h3>
                    <p className="text-white/90 mb-4">{style.description}</p>

                    <div className="grid grid-cols-2 gap-2">
                      {style.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <Leaf className="h-3 w-3 text-green-400 mr-2" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Perfect Solar Integration for Your Home</h3>
            <p className="text-muted-foreground mb-6">
              Our expert team ensures solar panels complement your home's unique architecture while maximizing energy
              production. From rustic stone houses to modern minimalist designs, we make solar beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold">
                  Get Free Design Consultation
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors">
                  View More Examples
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
