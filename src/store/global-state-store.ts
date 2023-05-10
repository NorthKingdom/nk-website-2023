import { create } from 'zustand'

interface GlobalState {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void
  showShield: boolean
  setShowShield: (showShield: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
  toggleMenu: () => void
}

export const useGlobalStateStore = create<GlobalState>()((set) => ({
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
}))