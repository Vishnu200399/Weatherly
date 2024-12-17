"use client"

import { useEffect, useRef } from 'react'
import { Cloud, Globe, Clock } from "lucide-react"
import { staggerFadeInUp } from '@/lib/animations'
import { AnimatedText } from './animated-text'

const features = [
  {
    title: "Real-time Data",
    description: "Get up-to-the-minute weather information from reliable sources.",
    icon: Cloud,
  },
  {
    title: "Global Coverage",
    description: "Access weather data for locations worldwide.",
    icon: Globe,
  },
  {
    title: "24/7 Access",
    description: "Check weather updates anytime, day or night.",
    icon: Clock,
  },
]

export function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (featuresRef.current) {
      const featureElements = featuresRef.current.querySelectorAll('.feature-card')
      staggerFadeInUp(Array.from(featureElements))
    }
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3" ref={featuresRef}>
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="feature-card flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <AnimatedText className="text-xl font-bold mb-2" delay={index * 0.2}>
                {feature.title}
              </AnimatedText>
              <AnimatedText 
                className="text-muted-foreground"
                delay={index * 0.2 + 0.1}
              >
                {feature.description}
              </AnimatedText>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}