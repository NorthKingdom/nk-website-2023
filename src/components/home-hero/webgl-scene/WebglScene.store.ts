import type { MotionValue } from 'framer-motion'
import { create } from 'zustand'
import { Color } from 'three'

interface ShieldStateEvent {
  type:
    | 'LOADER_OUT_TRANSITION_END'
    | 'POINTER_OVER'
    | 'POINTER_OUT'
    | 'CLICKED_SHIELD_VIDEO'
    | 'COLLAPSE'
    | 'TRANSITION_START'
    | 'TRANSITION_END'
    | 'RESET'
  payload?: any
}

interface WebglSceneStore {
  isSceneLoaded: boolean
  shieldState: 'initial' | 'transition-in' | 'idle' | 'hovered' | 'expanding' | 'expanded' | 'collapsing' | 'collapsed'
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
  shieldScaleMotionValue: MotionValue | null
  stiffness: number
  damping: number
  lightColor: Color
  isEditing: boolean
  isShieldVideoPlaying: boolean
}

export const useWebglSceneStore = create<WebglSceneStore>()((set, get) => ({
  isSceneLoaded: false,
  shieldState: 'initial',
  dispatchShieldStateEvent: (event: ShieldStateEvent) => {
    // console.log('dispatchShieldStateEvent', event, 'current shield state', get().shieldState)
    const { shieldState: currentShieldState } = get()

    if (event.type === 'RESET') {
      set({ shieldState: 'initial', isSceneLoaded: false })
      return
    }

    switch (currentShieldState) {
      case 'initial':
        if (event.type === 'LOADER_OUT_TRANSITION_END') {
          set({ shieldState: 'transition-in' })
        }
        break
      case 'transition-in':
        if (event.type === 'TRANSITION_END') {
          set({ shieldState: 'idle' })
        }
        break
      case 'idle':
        if (event.type === 'POINTER_OVER') {
          set({ shieldState: 'hovered' })
        }
        if (event.type === 'CLICKED_SHIELD_VIDEO') {
          set({ shieldState: 'expanding' })
        }
        break
      case 'hovered':
        if (event.type === 'POINTER_OUT') {
          set({ shieldState: 'idle' })
        }
        if (event.type === 'CLICKED_SHIELD_VIDEO') {
          set({ shieldState: 'expanding' })
        }
        break
      case 'expanding':
        if (event.type === 'TRANSITION_END') {
          set({ shieldState: 'expanded' })
        }
        break
      case 'expanded':
        if (event.type === 'COLLAPSE') {
          set({ shieldState: 'collapsing' })
        }
        break
      case 'collapsing':
        if (event.type === 'TRANSITION_END') {
          set({ shieldState: 'idle' })
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
  shieldScaleMotionValue: null,
  hovered: false,
  stiffness: 1000,
  damping: 100,
  lightColor: new Color('#31B5FF'),
  isEditing: false,
  isShieldVideoPlaying: true,
}))
