"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Check, Navigation } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InteractiveMap } from "./interactive-map"
import { useToast } from "@/hooks/use-toast"

interface MapSelectorProps {
  surveyData: any
  onComplete: (data: any) => void
}

export function MapSelector({ surveyData, onComplete }: MapSelectorProps) {
  const [selectedArea, setSelectedArea] = useState<any>(null)
  const [coordinates, setCoordinates] = useState<[number, number]>([19.076, 72.8777]) // Mumbai default
  const [manualArea, setManualArea] = useState("")
  const [useManualArea, setUseManualArea] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const { toast } = useToast()

  // Get coordinates based on city (expanded geocoding)
  useEffect(() => {
    const cityCoordinates: { [key: string]: [number, number] } = {
      mumbai: [19.076, 72.8777],
      delhi: [28.6139, 77.209],
      bangalore: [12.9716, 77.5946],
      bengaluru: [12.9716, 77.5946],
      chennai: [13.0827, 80.2707],
      kolkata: [22.5726, 88.3639],
      hyderabad: [17.385, 78.4867],
      pune: [18.5204, 73.8567],
      ahmedabad: [23.0225, 72.5714],
      jaipur: [26.9124, 75.7873],
      lucknow: [26.8467, 80.9462],
      kanpur: [26.4499, 80.3319],
      nagpur: [21.1458, 79.0882],
      indore: [22.7196, 75.8577],
      thane: [19.2183, 72.9781],
      bhopal: [23.2599, 77.4126],
      visakhapatnam: [17.6868, 83.2185],
      pimpri: [18.6298, 73.7997],
      patna: [25.5941, 85.1376],
      vadodara: [22.3072, 73.1812],
      ludhiana: [30.901, 75.8573],
      agra: [27.1767, 78.0081],
      nashik: [19.9975, 73.7898],
      faridabad: [28.4089, 77.3178],
      meerut: [28.9845, 77.7064],
      rajkot: [22.3039, 70.8022],
      kalyan: [19.2437, 73.1355],
      vasai: [19.4912, 72.8054],
      varanasi: [25.3176, 82.9739],
      srinagar: [34.0837, 74.7973],
      aurangabad: [19.8762, 75.3433],
      dhanbad: [23.7957, 86.4304],
      amritsar: [31.634, 74.8723],
      navi: [19.033, 73.0297],
      allahabad: [25.4358, 81.8463],
      prayagraj: [25.4358, 81.8463],
      howrah: [22.5958, 88.2636],
      ranchi: [23.3441, 85.3096],
      gwalior: [26.2183, 78.1828],
      jabalpur: [23.1815, 79.9864],
      coimbatore: [11.0168, 76.9558],
      vijayawada: [16.5062, 80.648],
      jodhpur: [26.2389, 73.0243],
      madurai: [9.9252, 78.1198],
      raipur: [21.2514, 81.6296],
      kota: [25.2138, 75.8648],
      chandigarh: [30.7333, 76.7794],
      guwahati: [26.1445, 91.7362],
    }

    const cityKey = surveyData.city.toLowerCase().replace(/\s+/g, "")
    if (cityCoordinates[cityKey]) {
      setCoordinates(cityCoordinates[cityKey])
    }
  }, [surveyData.city])

  // Get user's current location
  const getCurrentLocation = () => {
    setUseCurrentLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoordinates([latitude, longitude])
          setUseCurrentLocation(false)
          toast({
            title: "Location updated",
            description: `Using your current location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          })
        },
        (error) => {
          setUseCurrentLocation(false)
          toast({
            title: "Location access denied",
            description: "Using city coordinates instead.",
            variant: "destructive",
          })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      )
    } else {
      setUseCurrentLocation(false)
      toast({
        title: "Geolocation not supported",
        description: "Using city coordinates instead.",
        variant: "destructive",
      })
    }
  }

  const handleAreaCalculated = (area: number, coords: [number, number][], bounds: any) => {
    if (area > 0 && coords.length >= 3) {
      const areaData = {
        coordinates: coordinates,
        area: area,
        latitude: coordinates[0],
        longitude: coordinates[1],
        polygon: coords,
        bounds: bounds,
        method: "map_drawing",
      }
      setSelectedArea(areaData)
    } else {
      setSelectedArea(null)
    }
  }

  const handleManualAreaSubmit = () => {
    if (manualArea && Number.parseFloat(manualArea) > 0) {
      const areaData = {
        coordinates: coordinates,
        area: Number.parseFloat(manualArea),
        latitude: coordinates[0],
        longitude: coordinates[1],
        polygon: [
          [coordinates[0], coordinates[1]],
          [coordinates[0] + 0.001, coordinates[1]],
          [coordinates[0] + 0.001, coordinates[1] + 0.001],
          [coordinates[0], coordinates[1] + 0.001],
        ],
        bounds: null,
        method: "manual_input",
      }
      setSelectedArea(areaData)
    }
  }

  const handleConfirm = () => {
    if (selectedArea) {
      onComplete(selectedArea)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="h-6 w-6 text-orange-500 mr-2" />
          Select Installation Area
        </CardTitle>
        <CardDescription>
          Draw your installation area on the satellite map by connecting dots, or enter the area manually.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Location Info */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">
            {surveyData.city}, {surveyData.state}
          </Badge>
          <Badge variant="outline">{surveyData.areaType}</Badge>
          <Badge variant="secondary">
            {coordinates[0].toFixed(4)}, {coordinates[1].toFixed(4)}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={useCurrentLocation}
            className="ml-auto bg-transparent"
          >
            <Navigation className="h-4 w-4 mr-2" />
            {useCurrentLocation ? "Getting Location..." : "Use Current Location"}
          </Button>
        </div>

        {/* Area Input Method Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={`cursor-pointer transition-all ${!useManualArea ? "ring-2 ring-orange-500" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id="map-draw"
                  name="area-method"
                  checked={!useManualArea}
                  onChange={() => setUseManualArea(false)}
                />
                <Label htmlFor="map-draw" className="font-semibold">
                  Draw on Satellite Map
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Click points on the satellite map to outline your installation area
              </p>
            </CardContent>
          </Card>

          <Card className={`cursor-pointer transition-all ${useManualArea ? "ring-2 ring-orange-500" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  id="manual-area"
                  name="area-method"
                  checked={useManualArea}
                  onChange={() => setUseManualArea(true)}
                />
                <Label htmlFor="manual-area" className="font-semibold">
                  Enter Area Manually
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">Enter the area in square meters if you know it</p>
            </CardContent>
          </Card>
        </div>

        {/* Manual Area Input */}
        {useManualArea && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div>
              <Label htmlFor="area-input">Area (Square Meters)</Label>
              <Input
                id="area-input"
                type="number"
                placeholder="e.g., 150"
                value={manualArea}
                onChange={(e) => setManualArea(e.target.value)}
                min="1"
                step="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tip: For rectangular areas, multiply length × width in meters
              </p>
            </div>
            <Button onClick={handleManualAreaSubmit} disabled={!manualArea || Number.parseFloat(manualArea) <= 0}>
              Set Area
            </Button>
          </motion.div>
        )}

        {/* Interactive Map */}
        {!useManualArea && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <InteractiveMap
              latitude={coordinates[0]}
              longitude={coordinates[1]}
              onAreaCalculated={handleAreaCalculated}
            />
          </motion.div>
        )}

        {/* Instructions */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Instructions:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {!useManualArea ? (
              <>
                <li>• Click "Start Drawing" to begin selecting your area</li>
                <li>• Click on the satellite map to add points around your installation area</li>
                <li>• Connect at least 3 points to form a polygon</li>
                <li>• The area will be calculated automatically in real-time</li>
                <li>• Use "Undo" to remove the last point or "Clear" to start over</li>
              </>
            ) : (
              <>
                <li>• Measure your available space in meters</li>
                <li>• For rooftops: Length × Width of usable roof area</li>
                <li>• For ground installations: Total available land area</li>
                <li>• Exclude areas with permanent shadows or obstructions</li>
              </>
            )}
          </ul>
        </div>

        {/* Confirmation */}
        {selectedArea && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center text-green-800 dark:text-green-200">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Area Selected
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {selectedArea.area.toLocaleString()} m² | Method: {selectedArea.method.replace("_", " ")}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Estimated {Math.floor(selectedArea.area / 1.75)} panels (
                      {((Math.floor(selectedArea.area / 1.75) * 0.4) / 1000).toFixed(1)} kW system)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleConfirm}
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              Confirm Area Selection
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
