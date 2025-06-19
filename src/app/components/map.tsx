// src/app/components/map.tsx
'use client'

import React, { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Smooth fly-to map view on selection
const ChangeMapView = ({ center }: { center: [number, number] | null }) => {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.flyTo(center, 5, { duration: 1.2 })
    }
  }, [center, map])
  return null
}

// Types
type City = {
  id: number | string
  name: string
  country: string
  lat: number
  lng: number
}

type WeatherData = {
  temp: number
  description: string
}

type MapProps = {
  cities?: City[]
  selectedCity: City | null
  setSelectedCity: (city: City) => void
  darkMode: boolean
  weatherData?: WeatherData | null
}

// Main Map Component
const Map = ({
  cities = [],
  selectedCity,
  setSelectedCity,
  darkMode,
  weatherData,
}: MapProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0])

  useEffect(() => {
    if (selectedCity) {
      setMapCenter([selectedCity.lat, selectedCity.lng])
    }
  }, [selectedCity])

  const mapStyle = darkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <MapContainer
      center={mapCenter}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url={mapStyle}
      />

      <ChangeMapView
        center={selectedCity ? [selectedCity.lat, selectedCity.lng] : null}
      />

      {cities.map((city) => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          eventHandlers={{
            click: () => setSelectedCity(city),
          }}
        >
          {selectedCity?.id === city.id && (
            <Popup>
              <div>
                <h2 className="font-semibold">{city.name}</h2>
                <p>{city.country}</p>
                {weatherData ? (
                  <p>🌤 {weatherData.temp}°C | {weatherData.description}</p>
                ) : (
                  <p>Loading weather...</p>
                )}
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
