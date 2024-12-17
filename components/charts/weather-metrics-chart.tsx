"use client"

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ForecastData } from '@/lib/types/weather'
import { useTheme } from 'next-themes'
import { scaleIn } from '@/lib/animations'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface WeatherMetricsChartProps {
  data: ForecastData[]
}

export function WeatherMetricsChart({ data }: WeatherMetricsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  const chartData: ChartData<'bar'> = {
    labels: data.map(day => day.date),
    datasets: [
      {
        label: 'Humidity (%)',
        data: data.map(day => day.humidity),
        backgroundColor: isDark ? 'rgba(147, 51, 234, 0.8)' : 'rgba(124, 58, 237, 0.8)', // purple
        borderColor: isDark ? '#a855f7' : '#7c3aed',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Wind Speed (m/s)',
        data: data.map(day => day.windSpeed),
        backgroundColor: isDark ? 'rgba(236, 72, 153, 0.8)' : 'rgba(219, 39, 119, 0.8)', // pink
        borderColor: isDark ? '#ec4899' : '#db2777',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 12,
            weight: '500' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#374151' : '#ffffff',
        titleColor: isDark ? '#e5e7eb' : '#374151',
        bodyColor: isDark ? '#e5e7eb' : '#374151',
        borderColor: isDark ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)',
        },
        ticks: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(209, 213, 219, 0.5)',
        },
        ticks: {
          color: isDark ? '#e5e7eb' : '#374151',
          font: {
            size: 11,
          },
        },
      },
    },
  }

  useEffect(() => {
    if (chartRef.current) {
      scaleIn(chartRef.current)
    }
  }, [])

  return (
    <Card ref={chartRef} className="w-full">
      <CardHeader>
        <CardTitle>Weather Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}