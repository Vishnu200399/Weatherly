"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedText } from "@/components/animated-text"
import { staggerFadeInUp, slideInLeft, slideInRight } from "@/lib/animations"

const team = [
  {
    name: "Sarah Johnson",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Full-stack developer with a passion for creating intuitive user experiences.",
  },
  {
    name: "Michael Chen",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Designer focused on creating beautiful and functional interfaces.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&auto=format&fit=crop&q=80",
    bio: "Product strategist with experience in weather and climate applications.",
  },
]

export default function AboutPage() {
  const headerRef = useRef<HTMLElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      slideInLeft(headerRef.current.querySelector('.title')!)
      slideInRight(headerRef.current.querySelector('.description')!)
    }
    if (teamRef.current) {
      const teamCards = teamRef.current.querySelectorAll('.team-card')
      staggerFadeInUp(Array.from(teamCards), 0.3)
    }
  }, [])

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <section className="space-y-4" ref={headerRef}>
          <AnimatedText className="title text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Weather Info Generator
          </AnimatedText>
          <AnimatedText 
            className="description text-muted-foreground"
            delay={0.2}
          >
            Weather Info Generator is your go-to platform for accurate, real-time
            weather information. Our mission is to provide users with reliable
            weather data in a beautiful, easy-to-understand format.
          </AnimatedText>
        </section>

        <section className="space-y-8">
          <AnimatedText className="text-2xl font-bold tracking-tighter">
            Our Team
          </AnimatedText>
          <div className="grid gap-6 md:grid-cols-3" ref={teamRef}>
            {team.map((member, index) => (
              <Card key={member.name} className="team-card transform transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-primary mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}