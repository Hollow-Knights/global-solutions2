"use client"

import WeatherDashboard from "@/components/weather-dashboard"
import { motion } from "framer-motion"

export default function PesquisaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-2 text-gray-800"
        >
          Pesquisa Meteorológica
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-600 mb-8"
        >
          Pesquise qualquer cidade do mundo para obter dados meteorológicos detalhados e alertas de desastres naturais.
        </motion.p>
        <WeatherDashboard />
      </div>
    </div>
  )
}
