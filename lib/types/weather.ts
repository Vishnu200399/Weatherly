export interface WeatherData {
  location: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

export interface ForecastData {
  date: string
  temperature: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
}

export interface WeatherForecast {
  current: WeatherData
  daily: ForecastData[]
}