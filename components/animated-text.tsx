"use client"

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedText({ children, className = '', delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
        }
      )
    }
  }, [delay])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}