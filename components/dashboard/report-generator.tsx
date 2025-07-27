"use client"

import { motion } from "framer-motion"
import { FileText, Download, Phone, MessageCircle, Gift } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ReportGeneratorProps {
  surveyData: any
  mapData: any
  calculationData: any
}

export function ReportGenerator({ surveyData, mapData, calculationData }: ReportGeneratorProps) {
  const handleDownloadPDF = () => {
    // In real implementation, generate PDF report
    console.log("Downloading PDF report...")
  }

  const handleInstallationHelp = () => {
    // Redirect to installation service
    console.log("Requesting installation help...")
  }

  const handleSubsidyApplication = () => {
    // Redirect to subsidy application
    console.log("Applying for subsidy...")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 text-orange-500 mr-2" />
            Solar Energy Report
          </CardTitle>
          <CardDescription>Your personalized solar energy solution summary</CardDescription>
        </CardHeader>
      </Card>

      {/* Report Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Project Details</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Location:</span> {surveyData.city}, {surveyData.state}
                  </p>
                  <p>
                    <span className="font-medium">Area Type:</span> {surveyData.areaType}
                  </p>
                  <p>
                    <span className="font-medium">Installation Area:</span> {mapData.area} m²
                  </p>
                  <p>
                    <span className="font-medium">Current Bill:</span> ₹{surveyData.electricityBill}/month
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">System Specifications</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Solar Panels:</span> {calculationData.panelsRequired} units
                  </p>
                  <p>
                    <span className="font-medium">System Capacity:</span> {calculationData.systemCapacity} kW
                  </p>
                  <p>
                    <span className="font-medium">Annual Generation:</span>{" "}
                    {calculationData.yearlyGeneration.toLocaleString()} kWh
                  </p>
                  <p>
                    <span className="font-medium">System Cost:</span> ₹{calculationData.systemCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <h4 className="font-semibold text-green-700 dark:text-green-300">Annual Savings</h4>
                <p className="text-2xl font-bold text-green-600">₹{calculationData.yearlySavings.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300">Payback Period</h4>
                <p className="text-2xl font-bold text-blue-600">{calculationData.paybackPeriod.toFixed(1)} years</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300">CO₂ Reduction</h4>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(calculationData.carbonReduction / 1000)} tons/year
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subsidy Eligibility */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-6 w-6 text-green-500 mr-2" />
              Subsidy Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div>
                  <h4 className="font-semibold">PM-Surya Ghar Yojana</h4>
                  <p className="text-sm text-muted-foreground">Central Government Subsidy</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Eligible
                  </Badge>
                  <p className="text-sm font-semibold mt-1">Up to ₹78,000</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div>
                  <h4 className="font-semibold">State Solar Subsidy</h4>
                  <p className="text-sm text-muted-foreground">{surveyData.state} Government</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Eligible
                  </Badge>
                  <p className="text-sm font-semibold mt-1">Up to ₹25,000</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300">Total Potential Subsidy</h4>
                <p className="text-2xl font-bold text-orange-600">₹1,03,000</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Effective system cost after subsidy: ₹{(calculationData.systemCost - 103000).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Choose your preferred action to proceed with your solar installation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handleInstallationHelp}
                className="h-auto p-6 flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <Phone className="h-8 w-8" />
                <span className="font-semibold">Get Installation Help</span>
                <span className="text-xs opacity-90">Connect with certified installers</span>
              </Button>

              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-2 bg-transparent"
              >
                <Download className="h-8 w-8" />
                <span className="font-semibold">Download PDF Report</span>
                <span className="text-xs text-muted-foreground">Detailed technical report</span>
              </Button>

              <Button
                onClick={handleSubsidyApplication}
                className="h-auto p-6 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Gift className="h-8 w-8" />
                <span className="font-semibold">Apply for Subsidy</span>
                <span className="text-xs opacity-90">Get assistance with applications</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Support */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Need Expert Consultation?</h3>
            <p className="text-muted-foreground mb-4">
              Our solar experts are available to answer your questions and provide personalized guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call +91 93569 61167
              </Button>
              <Button variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
