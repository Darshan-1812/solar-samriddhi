"use client"

import { motion } from "framer-motion"
import { ExternalLink, IndianRupee, Home, Factory } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SubsidiesSection() {
  const subsidies = [
    {
      title: "PM-Surya Ghar Yojana",
      description: "Free electricity for 1 crore households through rooftop solar installations",
      subsidy: "Up to ₹78,000",
      eligibility: "Residential",
      icon: Home,
      features: [
        "Up to 40% central subsidy",
        "Additional state subsidies",
        "Net metering facility",
        "Easy loan availability",
      ],
      link: "https://pmsuryaghar.gov.in",
    },
    {
      title: "Rooftop Solar Scheme 2024",
      description: "Central Financial Assistance for rooftop solar PV systems",
      subsidy: "Up to ₹94,000",
      eligibility: "Residential & Commercial",
      icon: Home,
      features: [
        "40% subsidy for up to 3kW",
        "20% subsidy for 3-10kW",
        "Group housing society benefits",
        "REC mechanism support",
      ],
      link: "https://solarrooftop.gov.in",
    },
    {
      title: "KUSUM Scheme",
      description: "Solar pumps and grid-connected solar power plants for farmers",
      subsidy: "Up to ₹4.8 Lakh",
      eligibility: "Farmers & Cooperatives",
      icon: Factory,
      features: [
        "60% subsidy for solar pumps",
        "30% bank loan facility",
        "Grid-connected solar plants",
        "Farmer producer organizations",
      ],
      link: "https://kusum.online",
    },
  ]

  return (
    <section id="subsidies" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Government <span className="text-orange-500">Subsidies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take advantage of various government schemes and subsidies to make solar energy more affordable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subsidies.map((subsidy, index) => (
            <motion.div
              key={subsidy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <subsidy.icon className="h-8 w-8 text-orange-500" />
                    <Badge variant="secondary">{subsidy.eligibility}</Badge>
                  </div>
                  <CardTitle className="text-xl">{subsidy.title}</CardTitle>
                  <CardDescription>{subsidy.description}</CardDescription>
                  <div className="flex items-center text-2xl font-bold text-green-600 mt-2">
                    <IndianRupee className="h-6 w-6 mr-1" />
                    {subsidy.subsidy}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {subsidy.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <a href={subsidy.link} target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Need Help with Subsidy Applications?</h3>
            <p className="text-muted-foreground mb-6">
              Our experts will guide you through the entire subsidy application process, from documentation to approval,
              ensuring you get maximum benefits.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              Get Subsidy Assistance
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
