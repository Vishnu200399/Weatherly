import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchHistory {
  location: string
  timestamp: number
}

interface User {
  id: string
  email: string
  name: string
  searchHistory: SearchHistory[]
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => void
  addToSearchHistory: (location: string) => void
  removeFromHistory: (timestamp: number) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      signIn: async (email: string, password: string) => {
        // Simulate API call
        const user = {
          id: '1',
          email,
          name: email.split('@')[0],
          searchHistory: []
        }
        set({ user, isAuthenticated: true })
      },
      signUp: async (email: string, password: string, name: string) => {
        // Simulate API call
        const user = {
          id: '1',
          email,
          name,
          searchHistory: []
        }
        set({ user, isAuthenticated: true })
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false })
      },
      addToSearchHistory: (location: string) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                searchHistory: [
                  { location, timestamp: Date.now() },
                  ...state.user.searchHistory
                ].slice(0, 10) // Keep only last 10 searches
              }
            : null
        }))
      },
      removeFromHistory: (timestamp: number) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                searchHistory: state.user.searchHistory.filter(
                  (item) => item.timestamp !== timestamp
                )
              }
            : null
        }))
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)