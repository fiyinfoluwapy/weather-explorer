export async function getCityCoordinates(cityName: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    cityName
  )}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'weather-explorer-app (teedire@gmail.com)',
    },
  })

  const data = await res.json()

  if (!data || data.length === 0) {
    throw new Error('City not found')
  }

  const { lat, lon, display_name } = data[0]

  // Try to extract country from display_name
  const parts = display_name?.split(',').map((part) => part.trim())
  const country = parts?.[parts.length - 1] || 'Unknown'

  return {
    lat: parseFloat(lat),
    lng: parseFloat(lon),
    country,
  }
}
