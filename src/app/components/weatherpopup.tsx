import React from 'react'
import { Popup } from 'react-leaflet'
import {
  CloudRainIcon,
  SunIcon,
  CloudIcon,
  CloudSnowIcon,
  CloudLightningIcon,
  WindIcon,
} from 'lucide-react'
const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'rain':
      return <CloudRainIcon className="h-6 w-6 text-blue-500" />
    case 'sunny':
      return <SunIcon className="h-6 w-6 text-yellow-500" />
    case 'cloudy':
      return <CloudIcon className="h-6 w-6 text-gray-500" />
    case 'snow':
      return <CloudSnowIcon className="h-6 w-6 text-blue-200" />
    case 'thunderstorm':
      return <CloudLightningIcon className="h-6 w-6 text-purple-500" />
    default:
      return <WindIcon className="h-6 w-6 text-gray-400" />
  }
}
export const WeatherPopup = ({ city, weatherData, onClose, darkMode }) => {
  return (
    <Popup className={darkMode ? 'dark-popup' : ''}>
      <div
        className={`p-1 max-w-xs ${darkMode ? 'text-white' : 'text-gray-800'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{city.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        {/* Current Weather */}
        <div
          className={`p-3 rounded-lg mb-3 ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {weatherData.current.temp}°C
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {weatherData.current.condition}
              </div>
            </div>
            <div className="flex flex-col items-center">
              {getWeatherIcon(weatherData.current.condition)}
              <div className="text-xs mt-1">
                Humidity: {weatherData.current.humidity}%
              </div>
            </div>
          </div>
        </div>
        {/* Forecast */}
        <div className="grid grid-cols-2 gap-2">
          {weatherData.forecast.map((day, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <div className="text-xs font-medium mb-1">{day.day}</div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{day.temp}°C</div>
                {getWeatherIcon(day.condition)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  )
}
