// components/Sidebar.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'

type City = {
  id: number | string
  name: string
  country: string
  lat: number
  lon: number
}

type SidebarProps = {
  cities: City[]
  onCitySelect: (city: City) => void
  selectedCity: City | null
  isOpen: boolean
  isMobile: boolean
  darkMode: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({
  cities,
  onCitySelect,
  selectedCity,
  isOpen,
  isMobile,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCities, setFilteredCities] = useState<City[]>(cities)

  useEffect(() => {
    const filtered = searchTerm
      ? cities.filter((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : cities
    setFilteredCities(filtered)
  }, [searchTerm, cities])

  if (!isOpen) return null

  return (
    <aside
      className={`${isMobile ? 'fixed inset-0 z-50 w-full h-full' : 'w-80'} 
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
        flex flex-col shadow-lg transition-all duration-300`}
    >
      <div className="p-4 border-b dark:border-gray-700 sticky top-0 bg-inherit z-10">
        <h2 className="text-xl font-semibold mb-4">Weather App</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-2 pl-9 rounded-lg border 
              ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} 
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
            aria-label="Search cities"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <ul className="py-2">
          {filteredCities.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No matching cities.
            </li>
          ) : (
            filteredCities.map((city) => (
              <li
                key={city.id}
                className={`px-4 py-3 cursor-pointer transition-colors duration-200
                  ${
                    selectedCity?.id === city.id
                      ? darkMode
                        ? 'bg-blue-900/30'
                        : 'bg-blue-100'
                      : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                onClick={() => onCitySelect(city)}
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {city.country}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  )
}
