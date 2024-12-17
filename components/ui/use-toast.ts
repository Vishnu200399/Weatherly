"use client"

import { useState, useEffect, useCallback } from "react"

interface Toast {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(({ title, description, variant = "default" }: Toast) => {
    setToasts((current) => [...current, { title, description, variant }])
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((current) => current.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  return { toast, toasts }
}