"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Thermometer, Wind, MapPin, RefreshCw, CloudRain } from "lucide-react"
import WeatherChart from "./weather-chart"
import WeatherAlerts from "./weather-alerts"
import PrecipitationChart from "./precipitation-chart"
import { motion, AnimatePresence } from "framer-motion"

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

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
}

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
      <motion.div variants={cardVariants} initial="initial" animate="animate">
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
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border rounded-md mt-2 max-h-60 overflow-y-auto"
                  >
                    <ul className="divide-y">
                      {searchResults.map((result) => (
                        <motion.li
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
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
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
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
              <Button onClick={handleCustomLocation}>Aplicar</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex justify-center items-center p-8"
          >
            <RefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
          </motion.div>
        ) : error ? (
          <motion.div key="error" variants={cardVariants} initial="initial" animate="animate" exit="exit">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">Erro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">{error}</p>
                <Button onClick={() => fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude)} className="mt-4">
                  Tentar Novamente
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : weatherData ? (
          <motion.div key="data" className="space-y-6" variants={cardVariants} initial="initial" animate="animate">
            {/* Clima Atual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="flex items-center gap-2">Clima Atual em {selectedLocation.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude)}
                  >
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </CardTitle>
                <CardDescription>Última atualização: {formatTime(weatherData.current.time)}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                  <Thermometer className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Temperatura</p>
                    <p className="text-2xl font-bold">{weatherData.current.temperature_2m.toFixed(1)}°C</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
                  <Wind className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Vento</p>
                    <p className="text-2xl font-bold">{weatherData.current.wind_speed_10m.toFixed(1)} km/h</p>
                  </div>
                </div>
                {weatherData.current.precipitation !== undefined && (
                  <div className="flex items-center gap-2 p-4 bg-sky-50 rounded-lg">
                    <CloudRain className="w-8 h-8 text-sky-600" />
                    <div>
                      <p className="text-sm text-gray-500">Precipitação</p>
                      <p className="text-2xl font-bold">{weatherData.current.precipitation} mm</p>
                    </div>
                  </div>
                )}
                {weatherData.current.wind_gusts_10m !== undefined && (
                  <div className="flex items-center gap-2 p-4 bg-yellow-50 rounded-lg">
                    <Wind className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-sm text-gray-500">Rajadas</p>
                      <p className="text-2xl font-bold">{weatherData.current.wind_gusts_10m.toFixed(1)} km/h</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

             <WeatherAlerts data={weatherData} locationName={selectedLocation.name} />

            {/* Gráficos e Alertas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeatherChart data={weatherData} />
              <PrecipitationChart data={weatherData} />
            </div>
           
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
