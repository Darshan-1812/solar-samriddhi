"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Square, Trash2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface InteractiveMapProps {
  latitude: number
  longitude: number
  onAreaCalculated: (area: number, coordinates: [number, number][], bounds: any) => void
}

export function InteractiveMap({ latitude, longitude, onAreaCalculated }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const polygonRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [coordinates, setCoordinates] = useState<[number, number][]>([])
  const [area, setArea] = useState<number>(0)
  const [isDrawing, setIsDrawing] = useState(false)

  // Calculate area using Shoelace formula
  const calculatePolygonArea = (coords: [number, number][]) => {
    if (coords.length < 3) return 0

    let area = 0
    const n = coords.length

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n
      area += coords[i][0] * coords[j][1]
      area -= coords[j][0] * coords[i][1]
    }

    area = Math.abs(area) / 2

    // Convert from degrees to square meters (approximate)
    // 1 degree ≈ 111,320 meters at equator
    const metersPerDegree = 111320 * Math.cos((latitude * Math.PI) / 180)
    const areaInSquareMeters = area * metersPerDegree * metersPerDegree

    return Math.round(areaInSquareMeters)
  }

  useEffect(() => {
    if (!mapRef.current) return

    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      const L = (await import("leaflet")).default

      // Fix for default markers
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      // Initialize map
      const map = L.map(mapRef.current!).setView([latitude, longitude], 18)

      // Add satellite tile layer
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "© Esri",
        maxZoom: 20,
      }).addTo(map)

      // Add OpenStreetMap overlay for labels
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        opacity: 0.3,
        maxZoom: 20,
      }).addTo(map)

      mapInstanceRef.current = map

      // Handle map clicks for drawing
      map.on("click", (e: any) => {
        if (!isDrawing) return

        const { lat, lng } = e.latlng
        const newCoords = [...coordinates, [lat, lng] as [number, number]]

        // Add marker
        const marker = L.circleMarker([lat, lng], {
          radius: 6,
          fillColor: "#ff7043",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map)

        // Add click number
        marker.bindTooltip(`${newCoords.length}`, {
          permanent: true,
          direction: "center",
          className: "coordinate-tooltip",
        })

        markersRef.current.push(marker)
        setCoordinates(newCoords)

        // Update polygon
        if (newCoords.length >= 2) {
          if (polygonRef.current) {
            map.removeLayer(polygonRef.current)
          }

          // Create polygon (close it if more than 2 points)
          const polygonCoords = newCoords.length > 2 ? [...newCoords, newCoords[0]] : newCoords

          polygonRef.current = L.polygon(polygonCoords, {
            color: "#ff7043",
            weight: 2,
            opacity: 0.8,
            fillColor: "#ff7043",
            fillOpacity: 0.2,
          }).addTo(map)

          // Calculate and update area
          if (newCoords.length >= 3) {
            const calculatedArea = calculatePolygonArea(newCoords)
            setArea(calculatedArea)
            onAreaCalculated(calculatedArea, newCoords, polygonRef.current.getBounds())
          }
        }
      })
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
      }
    }
  }, [latitude, longitude, isDrawing])

  const startDrawing = () => {
    setIsDrawing(true)
    setCoordinates([])
    setArea(0)
    clearMap()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearMap = () => {
    if (!mapInstanceRef.current) return

    // Remove all markers
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = []

    // Remove polygon
    if (polygonRef.current) {
      mapInstanceRef.current.removeLayer(polygonRef.current)
      polygonRef.current = null
    }

    setCoordinates([])
    setArea(0)
    onAreaCalculated(0, [], null)
  }

  const undoLastPoint = () => {
    if (coordinates.length === 0) return

    const newCoords = coordinates.slice(0, -1)
    setCoordinates(newCoords)

    // Remove last marker
    if (markersRef.current.length > 0) {
      const lastMarker = markersRef.current.pop()
      mapInstanceRef.current.removeLayer(lastMarker)
    }

    // Update polygon
    if (polygonRef.current) {
      mapInstanceRef.current.removeLayer(polygonRef.current)
      polygonRef.current = null
    }

    if (newCoords.length >= 2) {
      const L = require("leaflet")
      const polygonCoords = newCoords.length > 2 ? [...newCoords, newCoords[0]] : newCoords

      polygonRef.current = L.polygon(polygonCoords, {
        color: "#ff7043",
        weight: 2,
        opacity: 0.8,
        fillColor: "#ff7043",
        fillOpacity: 0.2,
      }).addTo(mapInstanceRef.current)

      if (newCoords.length >= 3) {
        const calculatedArea = calculatePolygonArea(newCoords)
        setArea(calculatedArea)
        onAreaCalculated(calculatedArea, newCoords, polygonRef.current.getBounds())
      }
    } else {
      setArea(0)
      onAreaCalculated(0, [], null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          {!isDrawing ? (
            <Button onClick={startDrawing} className="bg-green-600 hover:bg-green-700">
              <Square className="h-4 w-4 mr-2" />
              Start Drawing
            </Button>
          ) : (
            <Button onClick={stopDrawing} variant="outline">
              Finish Drawing
            </Button>
          )}
          <Button onClick={undoLastPoint} variant="outline" disabled={coordinates.length === 0}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Undo
          </Button>
          <Button onClick={clearMap} variant="outline" disabled={coordinates.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>

        <div className="flex gap-2">
          <Badge variant="secondary">Points: {coordinates.length}</Badge>
          {area > 0 && <Badge variant="default">Area: {area.toLocaleString()} m²</Badge>}
        </div>
      </div>

      {/* Instructions */}
      {isDrawing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-3"
        >
          <p className="text-sm text-orange-800 dark:text-orange-200 font-medium">
            📍 Click on the map to add points and create your installation area. Connect at least 3 points to calculate
            the area.
          </p>
        </motion.div>
      )}

      {/* Map Container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-96 rounded-lg border-2 border-muted shadow-lg"
          style={{ minHeight: "400px" }}
        />

        {/* Area Display Overlay */}
        {area > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border"
          >
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Selected Area</p>
              <p className="text-2xl font-bold text-orange-600">{area.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">square meters</p>
            </div>
          </motion.div>
        )}

        {/* Coordinates Display */}
        {coordinates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border max-w-xs"
          >
            <p className="text-sm font-medium mb-2">Coordinates ({coordinates.length} points):</p>
            <div className="max-h-24 overflow-y-auto text-xs space-y-1">
              {coordinates.map((coord, index) => (
                <div key={index} className="flex justify-between">
                  <span>Point {index + 1}:</span>
                  <span>
                    {coord[0].toFixed(6)}, {coord[1].toFixed(6)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Area Calculation Info */}
      {area > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Total Area</p>
              <p className="text-xl font-bold text-green-600">{area.toLocaleString()} m²</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">Estimated Panels</p>
              <p className="text-xl font-bold text-green-600">{Math.floor(area / 1.75)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800 dark:text-green-200">System Capacity</p>
              <p className="text-xl font-bold text-green-600">
                {((Math.floor(area / 1.75) * 0.4) / 1000).toFixed(1)} kW
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
