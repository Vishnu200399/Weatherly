export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15)
}

export function formatTemperature(celsius: number): string {
  return `${celsius}°C`
}