// API configuration
export const WEATHER_API = {
  key: "bc1f57a5f70f279a92f73816ea8bea1f",
  baseUrl: "https://api.openweathermap.org/data/2.5",
  endpoints: {
    current: "/weather",
    forecast: "/forecast"
  }
} as const

export const UNSPLASH_API = {
  key: "0Ky-YmriIozm-EYEteuNQVFN10M0A5W56Aq3_a5dI6g",
  baseUrl: "https://api.unsplash.com"
} as const