"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+91 93569 61167",
      subtitle: "Mon-Sat 9AM-7PM",
    },
    {
      icon: Mail,
      title: "Email",
      details: "darshangirase18@gmail.com",
      subtitle: "We reply within 24 hours",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "Pune, Maharashtra",
      subtitle: "Visit our experience center",
    },
    {
      icon: Clock,
      title: "Support",
      details: "24/7 Available",
      subtitle: "Emergency support",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your solar journey? Contact our experts for personalized consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={info.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <info.icon className="h-6 w-6 text-orange-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">{info.title}</h4>
                        <p className="text-sm font-medium">{info.details}</p>
                        <p className="text-xs text-muted-foreground">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-4">Why Choose Solar Samriddhi?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                  Free consultation and site assessment
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                  Government-approved installations
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                  Complete subsidy assistance
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2" />
                  25-year performance warranty
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Phone Number" type="tel" />
                </div>
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="City" />
                <Textarea placeholder="Tell us about your solar requirements..." rows={4} />
                <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
