"use client"

import { WeatherForecast } from '@/lib/types/weather'
import { TemperatureChart } from './charts/temperature-chart'
import { WeatherMetricsChart } from './charts/weather-metrics-chart'

interface WeatherChartsProps {
  data: WeatherForecast
}

export function WeatherCharts({ data }: WeatherChartsProps) {
  return (
    <div className="space-y-8">
      <TemperatureChart data={data.daily} />
      <WeatherMetricsChart data={data.daily} />
    </div>
  )
}