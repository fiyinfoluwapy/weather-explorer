'use client'

import { useState } from 'react'
import { Sidebar } from '@/app/components/sidebar'
import { Map } from '@/app/components/map'
import { cities } from '@/app/utils/cities'
import { getWeatherData } from '@/app/utils/weather-data'

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [weatherData, setWeatherData] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const handleCitySelect = async (city) => {
    setSelectedCity(city)
    try {
      const data = await getWeatherData(city.lat, city.lng)
      setWeatherData(data)
      setShowPopup(true)
    } catch (error) {
      console.error('Failed to fetch weather data:', error)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        cities={cities}
        selectedCity={selectedCity}
        onCitySelect={handleCitySelect}
        isOpen={isSidebarOpen}
        isMobile={false}
        darkMode={darkMode}
      />

      <main className="flex-1 relative">
        <Map
          selectedCity={selectedCity}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          weatherData={weatherData}
          darkMode={darkMode}
        />
      </main>
    </div>
  )
}
