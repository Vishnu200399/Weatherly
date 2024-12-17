"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Droplets, Wind } from "lucide-react"
import { formatTemperature } from "@/lib/utils/temperature"
import { WeatherData } from "@/lib/types/weather"

interface WeatherCardProps {
  data: WeatherData
}

export function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">{data.location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <img
                src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt={data.description}
                className="w-10 h-10"
              />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatTemperature(data.temperature)}</p>
              <p className="text-sm text-muted-foreground capitalize">{data.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Droplets className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{data.humidity}%</p>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
              <Wind className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{data.windSpeed} m/s</p>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}