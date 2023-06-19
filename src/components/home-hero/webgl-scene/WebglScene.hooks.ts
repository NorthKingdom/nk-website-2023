import { noop } from '@utils/noop'
import { useWebglSceneStore } from './WebglScene.store'
import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { Color } from 'three'

export function useOnSceneLightColorChange(callback: (color: Color) => void = noop, options = {}) {
  const callbackRef = useRef(callback)
  const lightColor = useWebglSceneStore((state) => state.lightColor)
  const previousColor = useRef(lightColor)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const currentColor = previousColor.current.clone()

    const controls = animate(0, 1, {
      duration: 2,
      ease: 'linear',
      onUpdate: (v) => {
        callbackRef.current(currentColor.lerp(lightColor, v))
      },
    })
    return () => {
      controls.stop()
    }
  }, [lightColor])
}
