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

// Icon config (CDN-based markers)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Utility to re-center map on selection
const ChangeMapView = ({ center }: { center: [number, number] | null }) => {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.flyTo(center, 4)
    }
  }, [center, map])
  return null
}

// Main map props
type City = {
  id: number
  name: string
  country: string
  lat: number
  lng: number
}

type MapProps = {
  cities?: City[] // Optional with fallback
  selectedCity: City | null
  setSelectedCity: (city: City) => void
  darkMode: boolean
}

export const Map = ({
  cities = [], // ⛑ Prevents undefined.map error
  selectedCity,
  setSelectedCity,
  darkMode,
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

      <ChangeMapView center={selectedCity ? [selectedCity.lat, selectedCity.lng] : null} />

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
                <p>🌤 28°C | Clear Sky</p>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}
