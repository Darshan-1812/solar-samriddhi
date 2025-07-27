"use client"

import { motion } from "framer-motion"
import { Shield, Award } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "Trusted Solutions",
      description: "Government-approved solar solutions with quality assurance and comprehensive warranty support.",
      image: "/images/trusted-solutions.jpg",
    },
    {
      icon: Award,
      title: "Expert Team",
      description: "Certified solar engineers and installation professionals with years of industry experience.",
      image: "/images/expert-team-engineer.jpg",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-orange-500">Solar Samriddhi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are India's leading solar energy platform, helping thousands of families and businesses transition to
            clean, renewable energy with accurate calculations and professional guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-xl text-center feature-card-hover transition-all duration-300 group stagger-animation"
            >
              <div className="relative mb-6 overflow-hidden rounded-lg">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={`${feature.title} - Solar energy solution`}
                  className="w-full h-48 object-cover transition-all duration-500 image-zoom"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-75" />
                <feature.icon className="absolute bottom-4 right-4 h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 transition-colors duration-300 group-hover:text-orange-500">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-lg transition-colors duration-300 group-hover:text-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
