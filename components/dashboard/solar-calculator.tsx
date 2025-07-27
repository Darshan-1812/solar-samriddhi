"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calculator, Zap, Leaf, IndianRupee, TrendingUp, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface SolarCalculatorProps {
  surveyData: any
  mapData: any
  onComplete: (data: any) => void
}

export function SolarCalculator({ surveyData, mapData, onComplete }: SolarCalculatorProps) {
  const [calculating, setCalculating] = useState(true)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Solar energy calculation function (based on your Python code)
  const solarEnergyPotential = (ghi: number, efficiency: number, theta: number, timePeriod: number) => {
    const thetaRad = (theta * Math.PI) / 180 // Convert to radians
    const energyPotential = ghi * efficiency * Math.cos(thetaRad) * timePeriod
    return energyPotential
  }

  // Simulate Solcast API call
  const fetchSolcastData = async (latitude: number, longitude: number) => {
    try {
      // In real implementation, this would call Solcast API
      // const response = await fetch(`https://api.solcast.com.au/radiation/forecasts?latitude=${latitude}&longitude=${longitude}&api_key=dkVZL9ZX-bCSbr3pWwpkEnU-7cA34Yfd`)

      // Mock Solcast data based on location
      const mockGHI = latitude > 20 ? 5.2 : latitude > 15 ? 5.8 : 6.1 // Higher GHI for southern latitudes
      const mockHours = 8.5 // Average sun hours in India

      return {
        ghi: mockGHI,
        hours: mockHours,
      }
    } catch (error) {
      throw new Error("Failed to fetch solar irradiance data")
    }
  }

  useEffect(() => {
    const calculateSolar = async () => {
      setCalculating(true)
      setError(null)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Get solar data from Solcast API (mocked)
        const solcastData = await fetchSolcastData(mapData.latitude, mapData.longitude)

        const monthlyBill = Number.parseInt(surveyData.electricityBill)
        const area = mapData.area
        const ghi = solcastData.ghi
        const sunHours = solcastData.hours

        // Solar calculation parameters
        const efficiency = 0.18 // 18% panel efficiency
        const theta = 0 // Optimal tilt angle
        const timePeriod = 1 // 1 hour

        // Calculate energy potential per square meter
        const energyPotentialPerM2 = solarEnergyPotential(ghi, efficiency, theta, timePeriod)

        // Solar panel specifications
        const panelAreaM2 = 1.75 // 1.75 square meters per panel (updated from your 17.5)
        const panelCapacityKW = 0.4 // 400W per panel

        // Calculate number of panels
        const numPanels = Math.floor(area / panelAreaM2)
        const systemCapacity = numPanels * panelCapacityKW

        // Calculate yearly generation
        const dailyGeneration = energyPotentialPerM2 * area * sunHours
        const yearlyGeneration = dailyGeneration * 365

        // Financial calculations
        const electricityRate = 6 // ₹6 per kWh
        const yearlySavings = yearlyGeneration * electricityRate
        const systemCost = systemCapacity * 50000 // ₹50,000 per kW
        const paybackPeriod = systemCost / yearlySavings

        // Environmental impact
        const carbonReduction = yearlyGeneration * 0.82 // kg CO2 per kWh

        const calculationResults = {
          panelsRequired: numPanels,
          systemCapacity: systemCapacity,
          yearlyGeneration: Math.round(yearlyGeneration),
          yearlySavings: Math.round(yearlySavings),
          carbonReduction: Math.round(carbonReduction),
          systemCost: Math.round(systemCost),
          paybackPeriod: Math.round(paybackPeriod * 10) / 10,
          ghi: ghi,
          sunHours: sunHours,
          area: area,
          monthlyData: [
            { month: "Jan", generation: Math.round(yearlyGeneration * 0.08) },
            { month: "Feb", generation: Math.round(yearlyGeneration * 0.09) },
            { month: "Mar", generation: Math.round(yearlyGeneration * 0.1) },
            { month: "Apr", generation: Math.round(yearlyGeneration * 0.09) },
            { month: "May", generation: Math.round(yearlyGeneration * 0.08) },
            { month: "Jun", generation: Math.round(yearlyGeneration * 0.07) },
            { month: "Jul", generation: Math.round(yearlyGeneration * 0.06) },
            { month: "Aug", generation: Math.round(yearlyGeneration * 0.07) },
            { month: "Sep", generation: Math.round(yearlyGeneration * 0.08) },
            { month: "Oct", generation: Math.round(yearlyGeneration * 0.09) },
            { month: "Nov", generation: Math.round(yearlyGeneration * 0.1) },
            { month: "Dec", generation: Math.round(yearlyGeneration * 0.09) },
          ],
          costBreakdown: [
            { name: "Solar Panels", value: systemCost * 0.4, color: "#FF7043" },
            { name: "Inverter", value: systemCost * 0.2, color: "#FFA726" },
            { name: "Installation", value: systemCost * 0.25, color: "#42A5F5" },
            { name: "Other Components", value: systemCost * 0.15, color: "#66BB6A" },
          ],
        }

        setResults(calculationResults)
      } catch (error) {
        setError("Failed to calculate solar requirements. Please try again.")
        console.error("Calculation error:", error)
      } finally {
        setCalculating(false)
      }
    }

    calculateSolar()
  }, [surveyData, mapData])

  const handleComplete = () => {
    onComplete(results)
  }

  if (calculating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-6 w-6 text-orange-500 mr-2" />
            Calculating Solar Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
            <div>
              <h3 className="text-lg font-semibold">Processing Your Data</h3>
              <p className="text-muted-foreground">
                Fetching solar irradiance data and calculating energy requirements...
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Location: {mapData.latitude.toFixed(4)}, {mapData.longitude.toFixed(4)} | Area: {mapData.area} m²
              </p>
            </div>
            <Progress value={66} className="w-full max-w-md mx-auto" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-6 w-6 text-orange-500 mr-2" />
            Solar Energy Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-6 w-6 text-orange-500 mr-2" />
            Solar Energy Calculation Results
          </CardTitle>
          <CardDescription>
            Based on location ({mapData.latitude.toFixed(4)}, {mapData.longitude.toFixed(4)}), area ({mapData.area} m²),
            and solar irradiance data
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Solar Data Info */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="font-semibold text-orange-600">Global Horizontal Irradiance</h4>
              <p className="text-2xl font-bold">{results.ghi} kWh/m²/day</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600">Peak Sun Hours</h4>
              <p className="text-2xl font-bold">{results.sunHours} hours/day</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Installation Area</h4>
              <p className="text-2xl font-bold">{results.area} m²</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">{results.panelsRequired}</h3>
              <p className="text-muted-foreground">Solar Panels Required</p>
              <p className="text-sm text-muted-foreground mt-1">{results.systemCapacity} kW System</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">{results.yearlyGeneration.toLocaleString()}</h3>
              <p className="text-muted-foreground">kWh/Year Generation</p>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round(results.yearlyGeneration / 12).toLocaleString()} kWh/month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardContent className="p-6 text-center">
              <IndianRupee className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">₹{results.yearlySavings.toLocaleString()}</h3>
              <p className="text-muted-foreground">Yearly Savings</p>
              <p className="text-sm text-muted-foreground mt-1">
                ₹{Math.round(results.yearlySavings / 12).toLocaleString()}/month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardContent className="p-6 text-center">
              <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold">{Math.round(results.carbonReduction / 1000)}</h3>
              <p className="text-muted-foreground">Tons CO₂ Reduced/Year</p>
              <p className="text-sm text-muted-foreground mt-1">Environmental Impact</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Energy Generation</CardTitle>
              <CardDescription>Expected solar energy generation throughout the year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  generation: {
                    label: "Generation (kWh)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="generation" fill="var(--color-generation)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle>System Cost Breakdown</CardTitle>
              <CardDescription>Total system cost: ₹{results.systemCost.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  panels: { label: "Solar Panels", color: "#FF7043" },
                  inverter: { label: "Inverter", color: "#FFA726" },
                  installation: { label: "Installation", color: "#42A5F5" },
                  other: { label: "Other Components", color: "#66BB6A" },
                }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.costBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {results.costBreakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-background border rounded-lg p-2 shadow-lg">
                              <p className="font-semibold">{data.name}</p>
                              <p className="text-sm">₹{data.value.toLocaleString()}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Financial Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">System Cost</h3>
                <p className="text-2xl font-bold text-red-600">₹{results.systemCost.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">One-time investment</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Payback Period</h3>
                <p className="text-2xl font-bold text-orange-600">{results.paybackPeriod} years</p>
                <p className="text-sm text-muted-foreground">Return on investment</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">25-Year Savings</h3>
                <p className="text-2xl font-bold text-green-600">₹{(results.yearlySavings * 25).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total lifetime savings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <Button
          onClick={handleComplete}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          size="lg"
        >
          Generate Detailed Report
        </Button>
      </motion.div>
    </div>
  )
}
