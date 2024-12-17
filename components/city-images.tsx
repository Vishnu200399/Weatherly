"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getUnsplashImages } from "@/lib/unsplash"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface ImageData {
  url: string
  alt: string
  credit: {
    name: string
    link: string
  }
  sourceUrl: string
}

interface CityImagesProps {
  city: string
}

export function CityImages({ city }: CityImagesProps) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true

    const fetchImages = async () => {
      if (!city) return
      
      setLoading(true)
      try {
        const imageData = await getUnsplashImages(city, 5)
        
        if (!mounted) return
        
        if (imageData.length === 0) {
          toast({
            title: "No images found",
            description: `Couldn't find images for ${city}. Please try another search.`,
            variant: "destructive",
          })
          return
        }
        
        setImages(imageData)
      } catch (error) {
        if (!mounted) return
        
        toast({
          title: "Error loading images",
          description: "Failed to load city images. Please try again later.",
          variant: "destructive",
        })
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchImages()

    return () => {
      mounted = false
    }
  }, [city, toast])

  if (loading) {
    return (
      <Card className="w-full p-6" id="images">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="aspect-video rounded-xl" />
          ))}
        </div>
      </Card>
    )
  }

  if (images.length === 0) return null

  return (
    <Card className="w-full p-6 bg-gradient-to-br from-background to-muted" id="images">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Discover {city}</h3>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem 
              key={index} 
              className="pl-2 md:pl-4 basis-full md:basis-1/2"
            >
              <a
                href={image.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <figure className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  <figcaption className="absolute inset-0 flex items-end justify-start p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white">
                      Photo by {image.credit.name}
                    </span>
                  </figcaption>
                </figure>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-4 bg-background/90 hover:bg-background" />
        <CarouselNext className="hidden md:flex -right-4 bg-background/90 hover:bg-background" />
      </Carousel>
    </Card>
  )
}