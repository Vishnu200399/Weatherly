"use client"

import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ForecastData } from '@/lib/types/weather'
import { useTheme } from 'next-themes'
import { scaleIn } from '@/lib/animations'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface TemperatureChartProps {
  data: ForecastData[]
}

export function TemperatureChart({ data }: TemperatureChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const isDark = theme === 'dark'

  const chartData: ChartData<'line'> = {
    labels: data.map(day => day.date),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map(day => day.temperature),
        borderColor: isDark ? '#60a5fa' : '#2563eb', // bright blue for dark, darker blue for light
        backgroundColor: isDark ? 'rgba(96, 165, 250, 0.5)' : 'rgba(37, 99, 235, 0.5)',
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: isDark ? '#60a5fa' : '#2563eb',
        pointBorderColor: isDark ? '#60a5fa' : '#2563eb',
        pointHoverBackgroundColor: isDark ? '#93c5fd' : '#1d4ed8',
        pointHoverBorderColor: isDark ? '#93c5fd' : '#1d4ed8',
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
          color: isDark ? '#e5e7eb' : '#374151', // gray-200 for dark, gray-700 for light
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
        <CardTitle>Temperature Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}