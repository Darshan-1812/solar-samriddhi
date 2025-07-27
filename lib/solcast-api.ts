// Solcast API integration utility
export interface SolcastData {
  ghi: number
  hours: number
  dni?: number
  dhi?: number
}

export class SolcastAPI {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey = "dkVZL9ZX-bCSbr3pWwpkEnU-7cA34Yfd") {
    this.apiKey = apiKey
    this.baseUrl = "https://api.solcast.com.au"
  }

  async getRadiationData(latitude: number, longitude: number): Promise<SolcastData> {
    try {
      // In production, uncomment this for real API call
      /*
      const response = await fetch(
        `${this.baseUrl}/radiation/forecasts?latitude=${latitude}&longitude=${longitude}&api_key=${this.apiKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Solcast API error: ${response.status}`)
      }

      const data = await response.json()
      return this.processRadiationData(data)
      */

      // Mock data for demo (remove in production)
      return this.getMockRadiationData(latitude, longitude)
    } catch (error) {
      console.error("Solcast API error:", error)
      // Fallback to mock data
      return this.getMockRadiationData(latitude, longitude)
    }
  }

  private getMockRadiationData(latitude: number, longitude: number): SolcastData {
    // Mock GHI based on latitude (higher for southern India)
    let ghi: number
    if (latitude < 15) {
      ghi = 6.1 // Southern India (higher solar irradiance)
    } else if (latitude < 20) {
      ghi = 5.8 // Central India
    } else if (latitude < 25) {
      ghi = 5.5 // Northern India
    } else {
      ghi = 5.2 // Far northern regions
    }

    // Adjust for longitude (western regions get slightly more sun)
    if (longitude < 75) {
      ghi += 0.2
    }

    return {
      ghi: Math.round(ghi * 10) / 10,
      hours: 8.5, // Average peak sun hours in India
      dni: ghi * 0.8, // Direct Normal Irradiance
      dhi: ghi * 0.3, // Diffuse Horizontal Irradiance
    }
  }

  private processRadiationData(apiData: any): SolcastData {
    // Process real Solcast API response
    // This would extract and average the radiation data
    const forecasts = apiData.forecasts || []

    if (forecasts.length === 0) {
      throw new Error("No radiation data available")
    }

    // Calculate average GHI from forecasts
    const avgGhi =
      forecasts.reduce((sum: number, forecast: any) => {
        return sum + (forecast.ghi || 0)
      }, 0) / forecasts.length

    return {
      ghi: Math.round(avgGhi * 10) / 10,
      hours: 8.5, // This would be calculated from the data
      dni: avgGhi * 0.8,
      dhi: avgGhi * 0.3,
    }
  }
}

// Solar energy calculation function (matching your Python code)
export function solarEnergyPotential(ghi: number, efficiency: number, theta: number, timePeriod: number): number {
  const thetaRad = (theta * Math.PI) / 180
  const energyPotential = ghi * efficiency * Math.cos(thetaRad) * timePeriod
  return energyPotential
}

// Calculate number of panels and system specifications
export function calculateSolarSystem(area: number, ghi: number, sunHours: number) {
  const efficiency = 0.18 // 18% panel efficiency
  const panelAreaM2 = 1.75 // 1.75 m² per panel (corrected from 17.5)
  const panelCapacityKW = 0.4 // 400W per panel

  // Calculate energy potential per square meter
  const energyPotentialPerM2 = solarEnergyPotential(ghi, efficiency, 0, 1)

  // Calculate number of panels
  const numPanels = Math.floor(area / panelAreaM2)
  const systemCapacity = numPanels * panelCapacityKW

  // Calculate yearly generation
  const dailyGeneration = energyPotentialPerM2 * area * sunHours
  const yearlyGeneration = dailyGeneration * 365

  return {
    numPanels,
    systemCapacity,
    yearlyGeneration,
    dailyGeneration,
    energyPotentialPerM2,
  }
}
