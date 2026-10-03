import { create } from 'zustand'

export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  seedColor: string
  language: string
}

export interface RecentTool {
  id: string
  name: string
  timestamp: number
}

export interface AppState {
  settings: AppSettings
  recentTools: RecentTool[]
  favorites: string[]

  // Actions
  updateSettings: (settings: Partial<AppSettings>) => void
  addRecentTool: (id: string, name: string) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const defaultSettings: AppSettings = {
  theme: 'system',
  seedColor: '#0061A4',
  language: localStorage.getItem('redaktor-language') || 'en',
}

const loadSettings = (): AppSettings => {
  const saved = localStorage.getItem('redaktor-settings')
  if (saved) {
    try {
      return { ...defaultSettings, ...JSON.parse(saved) }
    } catch {
      return defaultSettings
    }
  }
  return defaultSettings
}

const loadRecentTools = (): RecentTool[] => {
  const saved = localStorage.getItem('redaktor-recent-tools')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

const loadFavorites = (): string[] => {
  const saved = localStorage.getItem('redaktor-favorites')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return []
    }
  }
  return []
}

export const useAppStore = create<AppState>((set, get) => ({
  settings: loadSettings(),
  recentTools: loadRecentTools(),
  favorites: loadFavorites(),

  updateSettings: (updates) =>
    set((state) => {
      const newSettings = { ...state.settings, ...updates }
      localStorage.setItem('redaktor-settings', JSON.stringify(newSettings))
      return { settings: newSettings }
    }),

  addRecentTool: (id, name) =>
    set((state) => {
      const filtered = state.recentTools.filter((t) => t.id !== id)
      const newRecentTools = [
        { id, name, timestamp: Date.now() },
        ...filtered.slice(0, 9),
      ]
      localStorage.setItem('redaktor-recent-tools', JSON.stringify(newRecentTools))
      return { recentTools: newRecentTools }
    }),

  toggleFavorite: (id) =>
    set((state) => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id]
      localStorage.setItem('redaktor-favorites', JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    }),

  isFavorite: (id) => get().favorites.includes(id),
}))
