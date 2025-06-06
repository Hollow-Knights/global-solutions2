import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  if (!latitude || !longitude) {
    return NextResponse.json({ error: "Latitude e longitude são obrigatórias" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,wind_gusts_10m&timezone=auto`,
    )

    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API Open-Meteo")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
