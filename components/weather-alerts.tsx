"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, AlertCircle, Info, Shield } from "lucide-react"
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

interface WeatherAlert {
  level: "info" | "warning" | "danger" | "critical"
  title: string
  description: string
  icon: React.ReactNode
  recommendations: string[]
}

interface WeatherAlertsProps {
  data: WeatherData
  locationName: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function WeatherAlerts({ data, locationName }: WeatherAlertsProps) {
  const generateAlerts = (): WeatherAlert[] => {
    const alerts: WeatherAlert[] = []

    // Dados atuais
    const currentWind = data.current.wind_speed_10m || 0
    const currentGusts = data.current.wind_gusts_10m || 0
    const currentRain = data.current.precipitation || 0

    // Análise das próximas 24 horas
    const next24Hours = {
      maxWind: Math.max(...data.hourly.wind_speed_10m.slice(0, 24)),
      maxGusts: Math.max(...data.hourly.wind_gusts_10m.slice(0, 24)),
      totalRain: data.hourly.precipitation.slice(0, 24).reduce((sum, val) => sum + val, 0),
      maxHourlyRain: Math.max(...data.hourly.precipitation.slice(0, 24)),
    }

    // ALERTAS CRÍTICOS - Risco extremo de desastres
    if (next24Hours.maxGusts > 120 || next24Hours.maxHourlyRain > 100) {
      alerts.push({
        level: "critical",
        title: "ALERTA CRÍTICO - RISCO EXTREMO",
        description: "Condições meteorológicas extremamente perigosas detectadas",
        icon: <AlertTriangle className="h-5 w-5" />,
        recommendations: [
          "🚨 EVITE SAIR DE CASA - Permaneça em local seguro",
          "🏠 Afaste-se de janelas e portas de vidro",
          "⚡ Desligue equipamentos elétricos não essenciais",
          "📱 Mantenha celular carregado para emergências",
          "🌊 Evite áreas próximas a rios, córregos e encostas",
          "🚗 NÃO dirija em condições extremas",
        ],
      })
    }

    // ALERTAS DE PERIGO - Alto risco
    else if (
      next24Hours.maxGusts > 90 ||
      next24Hours.maxHourlyRain > 50 ||
      (next24Hours.maxWind > 70 && next24Hours.totalRain > 30)
    ) {
      alerts.push({
        level: "danger",
        title: "ALERTA DE PERIGO - ALTO RISCO",
        description: "Condições meteorológicas perigosas previstas",
        icon: <AlertTriangle className="h-5 w-5" />,
        recommendations: [
          "⚠️ Evite atividades ao ar livre",
          "🌳 Cuidado com queda de árvores e galhos",
          "🚗 Dirija com extrema cautela",
          "🏠 Verifique se portas e janelas estão bem fechadas",
          "📦 Remova objetos soltos de quintais e varandas",
          "🔦 Tenha lanternas e pilhas à disposição",
        ],
      })
    }

    // ALERTAS DE ATENÇÃO - Risco moderado
    else if (next24Hours.maxWind > 60 || next24Hours.maxHourlyRain > 25 || next24Hours.totalRain > 50) {
      alerts.push({
        level: "warning",
        title: "ALERTA DE ATENÇÃO - RISCO MODERADO",
        description: "Condições meteorológicas adversas esperadas",
        icon: <AlertCircle className="h-5 w-5" />,
        recommendations: [
          "🌂 Leve guarda-chuva e roupas adequadas",
          "🚗 Reduza a velocidade ao dirigir",
          "⚡ Possibilidade de interrupção de energia elétrica",
          "📱 Acompanhe atualizações meteorológicas",
          "🏠 Verifique sistemas de drenagem",
          "🌳 Evite ficar embaixo de árvores",
        ],
      })
    }

    // Alertas específicos por tipo de fenômeno

    // Chuva intensa
    if (next24Hours.totalRain > 80) {
      alerts.push({
        level: next24Hours.totalRain > 150 ? "danger" : "warning",
        title: "ALERTA DE CHUVA INTENSA",
        description: `Previsão de ${next24Hours.totalRain.toFixed(1)}mm de chuva em 24h`,
        icon: <AlertCircle className="h-5 w-5" />,
        recommendations: [
          "🌊 Risco de alagamentos e enchentes",
          "🚗 Evite vias conhecidas por alagamentos",
          "🏠 Limpe calhas e ralos preventivamente",
          "📱 Tenha números de emergência à mão",
          "🎒 Prepare kit de emergência",
        ],
      })
    }

    // Ventos fortes
    if (next24Hours.maxWind > 80) {
      alerts.push({
        level: next24Hours.maxWind > 100 ? "danger" : "warning",
        title: "ALERTA DE VENTOS FORTES",
        description: `Ventos de até ${next24Hours.maxWind.toFixed(0)} km/h previstos`,
        icon: <AlertCircle className="h-5 w-5" />,
        recommendations: [
          "🌳 Risco de queda de árvores e galhos",
          "🏠 Risco de destelhamentos",
          "⚡ Possível interrupção de energia",
          "🚗 Cuidado com veículos altos (caminhões, ônibus)",
          "📦 Remova objetos que possam voar",
        ],
      })
    }

    // Combinação perigosa
    if (next24Hours.maxWind > 50 && next24Hours.totalRain > 40) {
      alerts.push({
        level: "warning",
        title: "ALERTA COMBINADO - CHUVA E VENTO",
        description: "Combinação de chuva forte e ventos intensos",
        icon: <AlertTriangle className="h-5 w-5" />,
        recommendations: [
          "⚠️ Risco aumentado de acidentes",
          "🌳 Maior probabilidade de queda de árvores",
          "⚡ Alto risco de falta de energia",
          "🚗 Evite viagens desnecessárias",
          "🏠 Reforce proteções da casa",
        ],
      })
    }

    // Se não há alertas, mostrar condições normais
    if (alerts.length === 0) {
      alerts.push({
        level: "info",
        title: "CONDIÇÕES NORMAIS",
        description: "Não há alertas meteorológicos para sua região",
        icon: <Shield className="h-5 w-5" />,
        recommendations: [
          "✅ Condições meteorológicas dentro da normalidade",
          "🌤️ Aproveite para atividades ao ar livre",
          "📱 Continue acompanhando a previsão",
          "🌱 Bom momento para cuidar do jardim",
        ],
      })
    }

    return alerts
  }

  const alerts = generateAlerts()

  const getAlertStyle = (level: string) => {
    switch (level) {
      case "critical":
        return "border-red-600 bg-red-50 text-red-900"
      case "danger":
        return "border-red-500 bg-red-50 text-red-800"
      case "warning":
        return "border-yellow-500 bg-yellow-50 text-yellow-800"
      case "info":
        return "border-green-500 bg-green-50 text-green-800"
      default:
        return "border-gray-300 bg-gray-50 text-gray-800"
    }
  }

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "critical":
      case "danger":
        return <AlertTriangle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      case "info":
        return <Shield className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Sistema de Alertas Meteorológicos
          </CardTitle>
          <CardDescription>Monitoramento de condições que podem causar desastres em {locationName}</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {alerts.map((alert, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Alert className={getAlertStyle(alert.level)}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.level)}
                    <div className="flex-1">
                      <AlertTitle className="text-lg font-bold mb-2">{alert.title}</AlertTitle>
                      <AlertDescription className="mb-3 text-base">{alert.description}</AlertDescription>
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">Recomendações:</p>
                        <ul className="text-sm space-y-1">
                          {alert.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-xs mt-1">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Alert>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
