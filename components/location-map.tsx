"use client"

import { useEffect, useState } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import { MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LocationMapProps {
  location: string
}

interface Coordinates {
  lat: number
  lng: number
}

const containerStyle = {
  width: "100%",
  height: "400px",
}

const defaultCenter = {
  lat: 51.5074,
  lng: -0.1278,
}

export function LocationMap({ location }: LocationMapProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const geocodeLocation = async () => {
      if (!location) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        )

        const data = await response.json()

        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location
          setCoordinates({ lat, lng })
        } else {
          setError("Location not found")
        }
      } catch (err) {
        setError("Failed to load map")
      } finally {
        setLoading(false)
      }
    }

    geocodeLocation()
  }, [location])

  if (loading) {
    return (
      <Card className="w-full p-4 mt-8">
        <Skeleton className="w-full h-[400px] rounded-lg" />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full p-8 mt-8 text-center">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium">{error}</p>
      </Card>
    )
  }

  return (
    <Card className="w-full p-4 mt-8" id="map">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates || defaultCenter}
          zoom={12}
          options={{
            styles: [
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
              },
              {
                featureType: "landscape",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }, { lightness: 17 }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }, { lightness: 18 }],
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }, { lightness: 16 }],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#dedede" }, { lightness: 21 }],
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }],
              },
              {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.fill",
                stylers: [{ color: "#fefefe" }, { lightness: 20 }],
              },
              {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
              },
            ],
          }}
        >
          {coordinates && <Marker position={coordinates} />}
        </GoogleMap>
      </LoadScript>
    </Card>
  )
}