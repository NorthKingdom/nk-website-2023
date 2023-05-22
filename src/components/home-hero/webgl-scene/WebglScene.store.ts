import { create } from 'zustand'

interface ShieldStateEvent {
  type: 'POINTER_OVER' | 'POINTER_OUT' | 'EXPAND' | 'COLLAPSE' | 'TRANSITION_START' | 'TRANSITION_END'
  payload?: any
}

interface WebglSceneStore {
  shieldState: 'idle' | 'hovered' | 'expanding' | 'expanded' | 'collapsing' | 'collapsed'
  dispatchShieldStateEvent: (event: ShieldStateEvent) => void
  config: {
    SHIELD_INNER_SIZE: [number, number]
    SHIELD_VIEWPORT_WIDTH: {
      portrait: number
      landscape: number
    }
  }
  get: () => WebglSceneStore
  set: (state: Partial<WebglSceneStore>) => void
  shieldAnchor: [number, number, number]
  shieldScaleIdle: number
  shieldScaleFullscreen: number
  hovered: boolean
  stiffness: number
  damping: number
}

export const useWebglSceneStore = create<WebglSceneStore>()((set, get) => ({
  shieldState: 'idle',
  dispatchShieldStateEvent: (event: ShieldStateEvent) => {
    console.log('dispatchShieldStateEvent', event, 'current shield state', get().shieldState)
    const { shieldState: currentShieldState } = get()
    switch (event.type) {
      case 'POINTER_OVER':
        set({ shieldState: 'hovered', hovered: true })
        break
      case 'POINTER_OUT':
        if (currentShieldState === 'hovered') {
          set({ shieldState: 'idle' })
        }
        set({ hovered: false })
        break
      case 'EXPAND':
        set({ shieldState: 'expanding' })
        break
      case 'COLLAPSE':
        set({ shieldState: 'collapsing' })
        break
      case 'TRANSITION_END':
        if (currentShieldState === 'expanding') {
          set({ shieldState: 'expanded' })
        } else if (currentShieldState === 'collapsing') {
          set({ shieldState: 'collapsed' })
        }
        break
    }
  },
  config: {
    SHIELD_INNER_SIZE: [3.4, 4.5],
    SHIELD_VIEWPORT_WIDTH: {
      portrait: 0.66,
      landscape: 0.18,
    },
  },
  get,
  set,
  shieldAnchor: [0, 0, 0],
  shieldScaleIdle: 1,
  shieldScaleFullscreen: 1,
  hovered: false,
  stiffness: 1000,
  damping: 100,
}))
