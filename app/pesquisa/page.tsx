import WeatherDashboard from "@/components/weather-dashboard"

export default function PesquisaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Pesquisa Meteorológica</h1>
        <p className="text-center text-gray-600 mb-8">
          Pesquise qualquer cidade do mundo para obter dados meteorológicos detalhados e alertas de desastres naturais.
        </p>
        <WeatherDashboard />
      </div>
    </div>
  )
}
