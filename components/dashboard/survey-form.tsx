"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Zap, Home, Factory, Wheat, ImageIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SurveyFormProps {
  onComplete: (data: any) => void
}

export function SurveyForm({ onComplete }: SurveyFormProps) {
  const [formData, setFormData] = useState({
    electricityBill: "",
    city: "",
    state: "",
    areaType: "",
    roofImage: null as File | null,
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, roofImage: file })
    }
  }

  const areaTypes = [
    {
      id: "rooftop",
      label: "Rooftop",
      icon: Home,
      description: "Residential or commercial rooftop",
      image: "/images/rooftop-installation.png",
    },
    {
      id: "farm",
      label: "Farm Land",
      icon: Wheat,
      description: "Agricultural land installation",
      image: "/images/solar-farm-landscape.png",
    },
    {
      id: "industrial",
      label: "Industrial",
      icon: Factory,
      description: "Industrial facility",
      image: "/images/industrial-solar.png",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-6 w-6 text-orange-500 mr-2" />
          Solar Requirements Survey
        </CardTitle>
        <CardDescription>Please provide your details to calculate the perfect solar solution for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Electricity Bill */}
          <div className="space-y-2">
            <Label htmlFor="bill">Monthly Electricity Bill (₹)</Label>
            <Input
              id="bill"
              type="number"
              placeholder="e.g., 3500"
              value={formData.electricityBill}
              onChange={(e) => setFormData({ ...formData, electricityBill: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g., Mumbai"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="telangana">Telangana</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Area Type */}
          <div className="space-y-4">
            <Label>Installation Area Type</Label>
            <RadioGroup
              value={formData.areaType}
              onValueChange={(value) => setFormData({ ...formData, areaType: value })}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {areaTypes.map((type) => (
                <div key={type.id}>
                  <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                  <Label
                    htmlFor={type.id}
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 area-type-card group transform hover:scale-105 hover:shadow-lg ${
                      formData.areaType === type.id
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-950 shadow-lg scale-105"
                        : "border-muted hover:border-orange-300"
                    }`}
                  >
                    <div className="relative w-full h-24 mb-3 overflow-hidden rounded-md">
                      <img
                        src={type.image || "/placeholder.svg"}
                        alt={`${type.label} solar installation`}
                        className="w-full h-full object-cover transition-all duration-500 image-zoom"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-75" />
                      <type.icon className="absolute bottom-1 right-1 h-5 w-5 text-white transition-all duration-300 group-hover:scale-125 group-hover:text-orange-300" />

                      {/* Selection indicator */}
                      {formData.areaType === type.id && (
                        <div className="absolute top-1 left-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                    <span className="font-semibold transition-colors duration-300 group-hover:text-orange-600">
                      {type.label}
                    </span>
                    <span className="text-sm text-muted-foreground text-center transition-colors duration-300 group-hover:text-orange-500">
                      {type.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Upload Roof/Area Image (Optional)</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
              <input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Label htmlFor="image" className="cursor-pointer">
                {formData.roofImage ? (
                  <div className="space-y-2">
                    <ImageIcon className="h-8 w-8 text-green-500 mx-auto" />
                    <p className="text-sm font-medium text-green-600">{formData.roofImage.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </Label>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="info">Additional Information (Optional)</Label>
            <Textarea
              id="info"
              placeholder="Any specific requirements or questions..."
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            disabled={!formData.electricityBill || !formData.city || !formData.state || !formData.areaType}
          >
            Continue to Area Selection
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
