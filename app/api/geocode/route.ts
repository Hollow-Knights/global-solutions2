import { type NextRequest, NextResponse } from "next/server"

interface GeocodingResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
  admin2?: string
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "Nome da cidade é obrigatório" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=pt&format=json`,
    )

    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API de geocodificação")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API de geocodificação:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
