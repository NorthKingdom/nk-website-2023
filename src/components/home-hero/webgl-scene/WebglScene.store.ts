import { create } from 'zustand'

interface WebglSceneStore {
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
}

export const useWebglSceneStore = create<WebglSceneStore>()((set, get) => ({
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
}))
