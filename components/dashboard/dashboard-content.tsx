"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, MapPin, FileText, BarChart3 } from "lucide-react"
import { SurveyForm } from "./survey-form"
import { MapSelector } from "./map-selector"
import { SolarCalculator } from "./solar-calculator"
import { ReportGenerator } from "./report-generator"

type Step = "survey" | "map" | "calculator" | "report"

export function DashboardContent() {
  const [currentStep, setCurrentStep] = useState<Step>("survey")
  const [surveyData, setSurveyData] = useState<any>(null)
  const [mapData, setMapData] = useState<any>(null)
  const [calculationData, setCalculationData] = useState<any>(null)

  const steps = [
    { id: "survey", title: "Survey", icon: FileText, description: "Fill out your requirements" },
    { id: "map", title: "Area Selection", icon: MapPin, description: "Select your installation area" },
    { id: "calculator", title: "Solar Calculator", icon: Calculator, description: "Calculate solar requirements" },
    { id: "report", title: "Report", icon: BarChart3, description: "View your solar report" },
  ]

  const handleSurveyComplete = (data: any) => {
    setSurveyData(data)
    setCurrentStep("map")
  }

  const handleMapComplete = (data: any) => {
    setMapData(data)
    setCurrentStep("calculator")
  }

  const handleCalculationComplete = (data: any) => {
    setCalculationData(data)
    setCurrentStep("report")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "survey":
        return <SurveyForm onComplete={handleSurveyComplete} />
      case "map":
        return <MapSelector surveyData={surveyData} onComplete={handleMapComplete} />
      case "calculator":
        return <SolarCalculator surveyData={surveyData} mapData={mapData} onComplete={handleCalculationComplete} />
      case "report":
        return <ReportGenerator surveyData={surveyData} mapData={mapData} calculationData={calculationData} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-8">Solar Energy Dashboard</h1>

        <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h2 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-2">
            🌟 Welcome to Solar Samriddhi Demo!
          </h2>
          <p className="text-sm text-orange-700 dark:text-orange-300">
            This is a fully functional demo of our solar energy calculation platform. Follow the steps below to
            calculate your solar requirements and generate a detailed report.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center space-x-3 ${
                    currentStep === step.id
                      ? "text-orange-500"
                      : steps.findIndex((s) => s.id === currentStep) > index
                        ? "text-green-500"
                        : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      currentStep === step.id
                        ? "bg-orange-500 text-white"
                        : steps.findIndex((s) => s.id === currentStep) > index
                          ? "bg-green-500 text-white"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-16 h-0.5 mx-4 ${
                      steps.findIndex((s) => s.id === currentStep) > index ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </motion.div>
    </div>
  )
}
