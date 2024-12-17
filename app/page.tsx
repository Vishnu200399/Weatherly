"use client"

import { useState, useEffect, useRef } from "react"
import { Cloud, Search, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WeatherCard } from "@/components/weather-card"
import { WeatherCharts } from "@/components/weather-charts"
import { Features } from "@/components/features"
import { SearchHistory } from "@/components/search-history"
import { CityImages } from "@/components/city-images"
import { LocationMap } from "@/components/location-map"
import { getWeatherData } from "@/lib/weather"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AnimatedText } from "@/components/animated-text"
import { fadeInUp, staggerFadeInUp } from "@/lib/animations"
import { WeatherForecast } from "@/lib/types/weather"

export default function Home() {
  const [location, setLocation] = useState("")
  const [currentCity, setCurrentCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { user, addToSearchHistory } = useAuth()

  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      fadeInUp(heroRef.current)
    }
    if (formRef.current) {
      fadeInUp(formRef.current)
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!location) return

    setLoading(true)
    setError(null)
    setWeatherData(null)
    setCurrentCity("")

    try {
      const data = await getWeatherData(location)
      setWeatherData(data)
      setCurrentCity(location)
      if (user) {
        addToSearchHistory(location)
      }
      setLocation("")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message === "City not found" 
          ? "City not found. Please check the spelling and try again." 
          : "Failed to fetch weather data. Please try again.")
        toast({
          title: "Error",
          description: error.message === "City not found" 
            ? "City not found. Please check the spelling and try again." 
            : "Failed to fetch weather data. Please try again.",
          variant: "destructive",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center" ref={heroRef}>
            <div className="space-y-2">
              <AnimatedText className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {user ? `Welcome, ${user.name}!` : "Get Real-Time Weather Updates"}
              </AnimatedText>
              <AnimatedText 
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                delay={0.2}
              >
                Accurate weather information for any location, anytime. Plan your day with confidence.
              </AnimatedText>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form onSubmit={handleSearch} className="flex space-x-2" ref={formRef}>
                <Input
                  placeholder="Enter city or location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Cloud className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 space-y-8">
        {error && (
          <Alert variant="destructive" className="max-w-4xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {weatherData && (
          <>
            <div className="w-full max-w-4xl mx-auto">
              <WeatherCard data={weatherData.current} />
            </div>
            <div className="w-full max-w-4xl mx-auto">
              <WeatherCharts data={weatherData} />
            </div>
          </>
        )}

        {currentCity && <CityImages city={currentCity} />}
        
        {currentCity && <LocationMap location={currentCity} />}

        {user && <SearchHistory />}
      </div>

      <Features />
    </div>
  )
}