"use client"

import { motion } from "framer-motion"
import { Calculator, Wrench, FileText, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ServicesSection() {
  const services = [
    {
      icon: Calculator,
      title: "Solar Estimation",
      description:
        "Accurate calculation of solar panels required and energy generation based on your location and consumption.",
      features: [
        "Area-based calculations",
        "Weather data integration",
        "Energy consumption analysis",
        "Cost-benefit analysis",
      ],
      image: "/images/solar-estimation-experts.jpg",
    },
    {
      icon: Wrench,
      title: "Installation Help",
      description: "Professional installation services with certified technicians and quality equipment.",
      features: ["Certified installers", "Quality equipment", "Safety compliance", "Warranty support"],
      image: "/images/installation-worker.jpg",
    },
    {
      icon: FileText,
      title: "Subsidy Guidance",
      description: "Complete assistance with government subsidy applications and documentation.",
      features: ["Document preparation", "Application filing", "Status tracking", "Approval assistance"],
      image: "/images/solar-estimation-experts.jpg",
    },
    {
      icon: BarChart3,
      title: "Performance Monitoring",
      description: "Real-time monitoring and analytics of your solar system performance.",
      features: ["Live monitoring", "Performance reports", "Maintenance alerts", "Energy analytics"],
      image: "/images/performance-monitoring.jpg",
    },
  ]

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solar energy solutions from estimation to installation and beyond.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 service-card-hover group overflow-hidden transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={`${service.title} - Solar service`}
                    className="w-full h-full object-cover transition-all duration-700 image-zoom"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 group-hover:from-black/40" />
                  <service.icon className="absolute bottom-4 left-4 h-8 w-8 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-orange-300" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardHeader className="transition-colors duration-300 group-hover:bg-orange-50 dark:group-hover:bg-orange-950">
                  <CardTitle className="transition-colors duration-300 group-hover:text-orange-600">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="transition-colors duration-300 group-hover:text-orange-700 dark:group-hover:text-orange-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="transition-colors duration-300 group-hover:bg-orange-50 dark:group-hover:bg-orange-950">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground transition-colors duration-300 group-hover:text-orange-600"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 transition-transform duration-300 group-hover:scale-150" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
