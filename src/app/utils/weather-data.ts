import { getCityCoordinates } from './get-city-coordinates'

const API_KEY = '82262800c2a3ee5adab3f3ddd78da87e' 

export async function getWeatherData(cityName: string) {
  try {
    const { lat, lng } = await getCityCoordinates(cityName)

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`
    )

    const data = await res.json()

    if (!res.ok) throw new Error(data.message || 'Failed to fetch weather')

    // You can format/slice the forecast here as needed
    return {
      location: cityName,
      today: data.list[0],
      tomorrow: data.list[8], // 8*3 = 24h after now
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
    throw error
  }
}
