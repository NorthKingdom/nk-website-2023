import { create } from 'zustand'
import Lenis from '@studio-freight/lenis'
interface GlobalState {
  get: () => GlobalState
  debug: boolean
  setDebug: (debug: boolean) => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void
  themeTriggers: {
    id: string
    theme: 'dark' | 'light'
    top: number
  }[]
  registerThemeTrigger: (trigger: { id: string; theme: 'dark' | 'light'; top: number }) => void
  showShield: boolean
  setShowShield: (showShield: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
  toggleMenu: () => void
  lenis: Lenis | null
  setLenis: (lenis: Lenis | null) => void
  featuredCases: any[]
  setFeaturedCases: (arr: any[]) => void
  isComingFromACasePage: boolean
  setIsComingFromACasePage: (isOnPage: boolean) => void
}

export const useGlobalStateStore = create<GlobalState>()((set, get) => ({
  get,
  debug: false,
  setDebug: (debug) => set({ debug }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  themeTriggers: [],
  registerThemeTrigger: (trigger) =>
    set((state) => ({
      themeTriggers: [...state.themeTriggers, trigger].sort((a, b) => a.top - b.top),
    })),
  showShield: false,
  setShowShield: (showShield) => set({ showShield }),
  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  toggleMenu: () =>
    set((state) => ({
      isMenuOpen: !state.isMenuOpen,
    })),
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
  featuredCases: [],
  setFeaturedCases: (featuredCases) => set({ featuredCases }),
  isComingFromACasePage: false,
  setIsComingFromACasePage: (isComingFromACasePage: boolean) => set({ isComingFromACasePage }),
}))
