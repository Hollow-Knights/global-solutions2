"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudRain } from "lucide-react"
import { motion } from "framer-motion"

interface WeatherData {
  current: {
    time: string
    temperature_2m: number
    wind_speed_10m: number
    precipitation?: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    wind_speed_10m: number[]
    precipitation: number[]
  }
}

interface PrecipitationChartProps {
  data: WeatherData
}

export default function PrecipitationChart({ data }: PrecipitationChartProps) {
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
    precipitacao: Math.round((data.hourly.precipitation[index] || 0) * 100) / 100,
  }))

  // Calcular estatísticas de precipitação
  const totalPrecipitation = chartData.reduce((sum, item) => sum + item.precipitacao, 0)
  const maxPrecipitation = Math.max(...chartData.map((item) => item.precipitacao))
  const hasPrecipitation = totalPrecipitation > 0

  // Classificar a intensidade da chuva
  const classifyRainIntensity = (mm: number) => {
    if (mm === 0) return { label: "Sem chuva", color: "text-gray-500" }
    if (mm < 2.5) return { label: "Chuva fraca", color: "text-blue-400" }
    if (mm < 10) return { label: "Chuva moderada", color: "text-blue-600" }
    if (mm < 50) return { label: "Chuva forte", color: "text-blue-800" }
    return { label: "Chuva extrema", color: "text-red-600" }
  }

  // Determinar a altura máxima das barras (em pixels)
  const maxBarHeight = 150
  const getBarHeight = (value: number) => {
    if (maxPrecipitation === 0) return 0
    return (value / maxPrecipitation) * maxBarHeight
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Precipitação (Chuva)
          </CardTitle>
          <CardDescription>Previsão de chuva para as próximas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Resumo da precipitação */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-700 mb-1">Total em 24h</div>
                <div className="text-2xl font-bold text-blue-800">{totalPrecipitation.toFixed(1)} mm</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-700 mb-1">Máxima por hora</div>
                <div className="text-2xl font-bold text-blue-800">{maxPrecipitation.toFixed(1)} mm</div>
                <div className={`text-xs ${classifyRainIntensity(maxPrecipitation).color}`}>
                  {classifyRainIntensity(maxPrecipitation).label}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-700 mb-1">Probabilidade</div>
                <div className="text-2xl font-bold text-blue-800">{hasPrecipitation ? "Alta" : "Baixa"}</div>
                <div className="text-xs text-blue-600">
                  {hasPrecipitation ? "Chuva prevista nas próximas horas" : "Sem previsão de chuva significativa"}
                </div>
              </div>
            </div>

            {/* Gráfico de barras para precipitação */}
            <div className="relative h-[220px] border-b border-l">
              {/* Eixo Y - Valores */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                <span>50mm</span>
                <span>25mm</span>
                <span>10mm</span>
                <span>5mm</span>
                <span>0mm</span>
              </div>

              {/* Barras de precipitação */}
              <div className="absolute left-8 right-0 bottom-0 flex items-end justify-between h-[200px]">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-full">
                    <div
                      className={`w-4/5 ${
                        item.precipitacao === 0
                          ? "bg-gray-100"
                          : item.precipitacao < 2.5
                            ? "bg-blue-300"
                            : item.precipitacao < 10
                              ? "bg-blue-500"
                              : item.precipitacao < 50
                                ? "bg-blue-700"
                                : "bg-red-600"
                      }`}
                      style={{
                        height: `${getBarHeight(item.precipitacao)}px`,
                        minHeight: item.precipitacao > 0 ? "4px" : "1px",
                      }}
                      title={`${item.fullTime}: ${item.precipitacao}mm`}
                    ></div>
                    {index % 3 === 0 && <span className="text-xs mt-1 text-gray-500">{item.time}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Legenda de intensidade */}
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100"></div>
                <span>Sem chuva</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-300"></div>
                <span>Fraca (&lt;2.5mm)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500"></div>
                <span>Moderada (2.5-10mm)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-700"></div>
                <span>Forte (10-50mm)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-600"></div>
                <span>Extrema (&gt;50mm)</span>
              </div>
            </div>

            {/* Tabela detalhada */}
            <div className="max-h-40 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Hora</th>
                    <th className="p-2 text-left">Precipitação (mm)</th>
                    <th className="p-2 text-left">Intensidade</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => {
                    const intensity = classifyRainIntensity(item.precipitacao)
                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.time}</td>
                        <td className="p-2 font-medium">{item.precipitacao.toFixed(1)}</td>
                        <td className={`p-2 ${intensity.color}`}>{intensity.label}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Informações educativas */}
            <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-200">
              <h4 className="font-medium mb-1">Sobre precipitação:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>1mm de chuva equivale a 1 litro de água por metro quadrado</li>
                <li>Chuvas acima de 30mm em 24h podem causar alagamentos em áreas urbanas</li>
                <li>Precipitação acima de 50mm/h é considerada extremamente forte</li>
                <li>Chuvas persistentes aumentam o risco de deslizamentos em encostas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
