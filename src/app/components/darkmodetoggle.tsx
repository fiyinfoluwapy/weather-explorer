import React from 'react'
import { SunIcon, MoonIcon } from 'lucide-react'
export const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full transition-colors duration-200 
        ${darkMode ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  )
}
