// Mock weather data generator
export const getWeatherData = (cityName) => {
  // This would be replaced by an actual API call in a real app
  const conditions = ['Sunny', 'Cloudy', 'Rain', 'Snow', 'Thunderstorm']
  const randomCondition = () =>
    conditions[Math.floor(Math.random() * conditions.length)]
  const randomTemp = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)
  // Days of the week starting from today
  const days = ['Today', 'Tomorrow']
  return {
    current: {
      temp: randomTemp(10, 35),
      condition: randomCondition(),
      humidity: randomTemp(30, 90),
      wind: randomTemp(0, 30),
    },
    forecast: days.map((day) => ({
      day,
      temp: randomTemp(10, 35),
      condition: randomCondition(),
    })),
  }
}
