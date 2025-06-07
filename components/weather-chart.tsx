"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

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

interface WeatherChartProps {
  data: WeatherData
}

export default function WeatherChart({ data }: WeatherChartProps) {
  // Preparar dados para os próximos 24 horas
  const chartData = data.hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    fullTime: new Date(time).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    temperatura: Math.round(data.hourly.temperature_2m[index] * 10) / 10,
    umidade: Math.round(data.hourly.relative_humidity_2m[index]),
    vento: Math.round(data.hourly.wind_speed_10m[index] * 10) / 10,
    chuva: Math.round((data.hourly.precipitation[index] || 0) * 10) / 10,
    rajadas: Math.round((data.hourly.wind_gusts_10m[index] || 0) * 10) / 10,
  }))

  // Encontrar valores min/max para escalonamento
  const tempMin = Math.min(...chartData.map((d) => d.temperatura))
  const tempMax = Math.max(...chartData.map((d) => d.temperatura))
  const humidityMin = Math.min(...chartData.map((d) => d.umidade))
  const humidityMax = Math.max(...chartData.map((d) => d.umidade))
  const windMin = Math.min(...chartData.map((d) => d.vento))
  const windMax = Math.max(...chartData.map((d) => d.vento))

  const normalizeValue = (value: number, min: number, max: number) => {
    if (max === min) return 50
    return ((value - min) / (max - min)) * 80 + 10
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Temperatura e Umidade (24h)</CardTitle>
          <CardDescription>Previsão horária para as próximas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Legenda */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Temperatura (°C)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Umidade (%)</span>
              </div>
            </div>

            {/* Gráfico SVG */}
            <div className="relative">
              <svg width="100%" height="300" className="border rounded">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={50 + i * 50}
                    x2="100%"
                    y2={50 + i * 50}
                    stroke="#e5e7eb"
                    strokeDasharray="2,2"
                  />
                ))}

                {/* Temperatura line */}
                <polyline
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  points={chartData
                    .map(
                      (d, i) =>
                        `${50 + (i * (100 / 24)) * 8},${250 - normalizeValue(d.temperatura, tempMin, tempMax) * 2}`,
                    )
                    .join(" ")}
                />

                {/* Umidade line */}
                <polyline
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  points={chartData
                    .map(
                      (d, i) =>
                        `${50 + (i * (100 / 24)) * 8},${250 - normalizeValue(d.umidade, humidityMin, humidityMax) * 2}`,
                    )
                    .join(" ")}
                />

                {/* Data points */}
                {chartData.map((d, i) => (
                  <g key={i}>
                    <circle
                      cx={50 + i * (100 / 24) * 8}
                      cy={250 - normalizeValue(d.temperatura, tempMin, tempMax) * 2}
                      r="3"
                      fill="#ef4444"
                    />
                    <circle
                      cx={50 + i * (100 / 24) * 8}
                      cy={250 - normalizeValue(d.umidade, humidityMin, humidityMax) * 2}
                      r="3"
                      fill="#3b82f6"
                    />
                  </g>
                ))}

                {/* Y-axis labels */}
                <text x="10" y="55" fontSize="12" fill="#666">
                  Alto
                </text>
                <text x="10" y="155" fontSize="12" fill="#666">
                  Médio
                </text>
                <text x="10" y="255" fontSize="12" fill="#666">
                  Baixo
                </text>
              </svg>
            </div>

            {/* Tabela de dados */}
            <div className="max-h-40 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Hora</th>
                    <th className="p-2 text-left">Temp (°C)</th>
                    <th className="p-2 text-left">Umidade (%)</th>
                    <th className="p-2 text-left">Chuva (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.slice(0, 12).map((d, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{d.time}</td>
                      <td className="p-2 text-red-600 font-medium">{d.temperatura}°</td>
                      <td className="p-2 text-blue-600 font-medium">{d.umidade}%</td>
                      <td className="p-2 text-blue-600 font-medium">{d.chuva}mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Velocidade do Vento (24h)</CardTitle>
          <CardDescription>Previsão da velocidade do vento por hora</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Legenda */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Vento (km/h)</span>
              </div>
            </div>

            {/* Gráfico SVG */}
            <div className="relative">
              <svg width="100%" height="300" className="border rounded">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={50 + i * 50}
                    x2="100%"
                    y2={50 + i * 50}
                    stroke="#e5e7eb"
                    strokeDasharray="2,2"
                  />
                ))}

                {/* Vento line */}
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  points={chartData
                    .map(
                      (d, i) => `${50 + (i * (100 / 24)) * 8},${250 - normalizeValue(d.vento, windMin, windMax) * 2}`,
                    )
                    .join(" ")}
                />

                {/* Data points */}
                {chartData.map((d, i) => (
                  <circle
                    key={i}
                    cx={50 + i * (100 / 24) * 8}
                    cy={250 - normalizeValue(d.vento, windMin, windMax) * 2}
                    r="3"
                    fill="#10b981"
                  />
                ))}

                {/* Y-axis labels */}
                <text x="10" y="55" fontSize="12" fill="#666">
                  Alto
                </text>
                <text x="10" y="155" fontSize="12" fill="#666">
                  Médio
                </text>
                <text x="10" y="255" fontSize="12" fill="#666">
                  Baixo
                </text>
              </svg>
            </div>

            {/* Tabela de dados */}
            <div className="max-h-40 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Hora</th>
                    <th className="p-2 text-left">Vento (km/h)</th>
                    <th className="p-2 text-left">Intensidade</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.slice(0, 12).map((d, i) => (
                    <tr key={i} className="border-b">
                      <td className="p-2">{d.time}</td>
                      <td className="p-2 text-green-600 font-medium">{d.vento}</td>
                      <td className="p-2">{d.vento < 10 ? "Fraco" : d.vento < 25 ? "Moderado" : "Forte"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
