'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Sidebar } from '@/app/components/sidebar'
import { getWeatherData } from '@/app/utils/weather-data'

const Map = dynamic(() => import('@/app/components/map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

type City = {
  id: number | string
  name: string
  country: string
  lat: number
  lng: number
}

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [weatherData, setWeatherData] = useState<{
    temp: number
    description: string
  } | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  const handleCitySelect = async (city: City) => {
    setSelectedCity(city)
    try {
      const data = await getWeatherData(city.name)
      setWeatherData({
        temp: data.today.main.temp,
        description: data.today.weather[0].description,
      })
    } catch (error) {
      console.error('❌ Failed to fetch weather data:', error)
      setWeatherData(null)
    }
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <Sidebar
        cities={[]} // dynamic cities only now
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        isOpen={true}
        isMobile={false}
        darkMode={darkMode}
      />

      <main className="flex-1 relative">
        <Map
          cities={selectedCity ? [selectedCity] : []}
          selectedCity={selectedCity}
          setSelectedCity={handleCitySelect}
          weatherData={weatherData}
          darkMode={darkMode}
        />
      </main>
    </div>
  )
}
