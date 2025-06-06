"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Thermometer, Wind, MapPin, RefreshCw } from "lucide-react"
import WeatherChart from "./weather-chart"
import WeatherAlerts from "./weather-alerts"
import PrecipitationChart from "./precipitation-chart"

interface WeatherData {
  current: {
    time: string
    temperature_2m: number
    wind_speed_10m: number
    precipitation?: number
    wind_gusts_10m?: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
    precipitation: number[]
    wind_gusts_10m: number[]
  }
}

interface Location {
  name: string
  latitude: number
  longitude: number
}

interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
  admin2?: string
}

const defaultLocations: Location[] = [
  { name: "Berlin", latitude: 52.52, longitude: 13.41 },
  { name: "São Paulo", latitude: -23.55, longitude: -46.63 },
  { name: "Nova York", latitude: 40.71, longitude: -74.01 },
  { name: "Londres", latitude: 51.51, longitude: -0.13 },
  { name: "Tóquio", latitude: 35.68, longitude: 139.69 },
]

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location>(defaultLocations[0])
  const [customLat, setCustomLat] = useState("")
  const [customLon, setCustomLon] = useState("")

  const [citySearch, setCitySearch] = useState("")
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`)

      if (!response.ok) {
        throw new Error("Erro ao buscar dados meteorológicos")
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const searchCity = async (query: string) => {
    if (!query.trim()) return

    setSearchLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/geocode?city=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error("Erro ao buscar dados de localização")
      }

      const data = await response.json()

      if (data.results && data.results.length > 0) {
        setSearchResults(data.results)
      } else {
        setSearchResults([])
        setError("Nenhuma cidade encontrada com esse nome")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  const selectCity = (result: GeocodingResult) => {
    const newLocation: Location = {
      name: `${result.name}, ${result.country}${result.admin1 ? `, ${result.admin1}` : ""}`,
      latitude: result.latitude,
      longitude: result.longitude,
    }

    setSelectedLocation(newLocation)
    setSearchResults([])
    setCitySearch("")
  }

  useEffect(() => {
    fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude)
  }, [selectedLocation])

  const handleCustomLocation = () => {
    const lat = Number.parseFloat(customLat)
    const lon = Number.parseFloat(customLon)

    if (isNaN(lat) || isNaN(lon)) {
      setError("Por favor, insira coordenadas válidas")
      return
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError("Coordenadas fora do intervalo válido")
      return
    }

    const customLocation: Location = {
      name: `Personalizado (${lat}, ${lon})`,
      latitude: lat,
      longitude: lon,
    }

    setSelectedLocation(customLocation)
    setCustomLat("")
    setCustomLon("")
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Seleção de Localização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Localização
          </CardTitle>
          <CardDescription>Pesquise pelo nome da cidade ou selecione uma cidade predefinida</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pesquisa por nome de cidade */}
          <div className="space-y-2">
            <Label htmlFor="city-search">Nome da Cidade</Label>
            <div className="flex gap-2">
              <Input
                id="city-search"
                placeholder="Ex: São Paulo, Rio de Janeiro"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchCity(citySearch)}
              />
              <Button onClick={() => searchCity(citySearch)} disabled={searchLoading || !citySearch.trim()}>
                {searchLoading ? "Buscando..." : "Buscar"}
              </Button>
            </div>

            {/* Resultados da pesquisa */}
            {searchResults.length > 0 && (
              <div className="border rounded-md mt-2 max-h-60 overflow-y-auto">
                <ul className="divide-y">
                  {searchResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => selectCity(result)}
                    >
                      <div>
                        <p className="font-medium">{result.name}</p>
                        <p className="text-sm text-gray-500">
                          {result.country}
                          {result.admin1 ? `, ${result.admin1}` : ""}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Selecionar
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {defaultLocations.map((location) => (
              <Button
                key={location.name}
                variant={selectedLocation.name === location.name ? "default" : "outline"}
                onClick={() => setSelectedLocation(location)}
                size="sm"
              >
                {location.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                placeholder="-23.55"
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                step="0.01"
                min="-90"
                max="90"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                placeholder="-46.63"
                value={customLon}
                onChange={(e) => setCustomLon(e.target.value)}
                step="0.01"
                min="-180"
                max="180"
              />
            </div>
            <Button onClick={handleCustomLocation}>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Sistema de Alertas */}
      {weatherData && <WeatherAlerts data={weatherData} locationName={selectedLocation.name} />}

      {/* Condições Atuais */}
      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weatherData.current.temperature_2m}°C</div>
              <p className="text-xs text-muted-foreground">Atualizado em {formatTime(weatherData.current.time)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vento</CardTitle>
              <Wind className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{weatherData.current.wind_speed_10m} km/h</div>
              <p className="text-xs text-muted-foreground">Velocidade atual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Localização</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{selectedLocation.name}</div>
              <p className="text-xs text-muted-foreground">
                {selectedLocation.latitude.toFixed(2)}, {selectedLocation.longitude.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gráficos */}
      {weatherData && <WeatherChart data={weatherData} />}

      {/* Gráfico de Precipitação */}
      {weatherData && <PrecipitationChart data={weatherData} />}

      {/* Controles */}
      <div className="flex justify-center">
        <Button
          onClick={() => fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude)}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Atualizando..." : "Atualizar Dados"}
        </Button>
      </div>

      {/* Erro */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
