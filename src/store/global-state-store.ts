import { create } from 'zustand'
import Lenis from '@studio-freight/lenis'
interface GlobalState {
  get: () => GlobalState
  debug: boolean
  setDebug: (debug: boolean) => void
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void
  showShield: boolean
  setShowShield: (showShield: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
  toggleMenu: () => void
  lenis: Lenis | null
  setLenis: (lenis: Lenis | null) => void
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
}))
