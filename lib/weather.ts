import { WEATHER_API } from './config/api'
import { kelvinToCelsius } from './utils/temperature'
import { formatDate } from './utils/date'
import { WeatherForecast } from './types/weather'

export async function getWeatherData(location: string): Promise<WeatherForecast> {
  try {
    // Fetch current weather
    const currentResponse = await fetch(
      `${WEATHER_API.baseUrl}${WEATHER_API.endpoints.current}?q=${encodeURIComponent(
        location
      )}&appid=${WEATHER_API.key}`
    )

    if (currentResponse.status === 404) {
      throw new Error('City not found')
    }

    if (!currentResponse.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const currentData = await currentResponse.json()

    // Fetch 5-day forecast (the free API provides 5-day forecast, not 7-day)
    const forecastResponse = await fetch(
      `${WEATHER_API.baseUrl}${WEATHER_API.endpoints.forecast}?q=${encodeURIComponent(
        location
      )}&appid=${WEATHER_API.key}`
    )

    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data')
    }

    const forecastData = await forecastResponse.json()

    // Process daily forecast data
    const dailyForecasts = forecastData.list
      .filter((_: any, index: number) => index % 8 === 0) // Get one reading per day
      .slice(0, 5) // Limit to 5 days
      .map((day: any) => ({
        date: formatDate(day.dt),
        temperature: kelvinToCelsius(day.main.temp),
        humidity: day.main.humidity,
        windSpeed: Math.round(day.wind.speed * 10) / 10,
        description: day.weather[0].description,
        icon: day.weather[0].icon,
      }))

    return {
      current: {
        location: currentData.name,
        temperature: kelvinToCelsius(currentData.main.temp),
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 10) / 10,
        icon: currentData.weather[0].icon,
      },
      daily: dailyForecasts,
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'City not found') {
        throw new Error('City not found')
      }
      console.error('Weather API Error:', error)
    }
    throw new Error('Failed to fetch weather data')
  }
}