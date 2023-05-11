import { useState, useCallback } from 'react'
import { useResize } from './use-resize'

const isSSR = typeof window === 'undefined'

export const useWindowSize = ({
  wait = 100,
}: {
  wait?: number
} = {}): {
  width: number
  height: number
} => {
  const getWindowSize = useCallback(
    () => ({
      width: isSSR ? 0 : window.innerWidth,
      height: isSSR ? 0 : window.innerHeight,
    }),
    []
  )
  const [windowSize, setWindowSize] = useState(getWindowSize)

  useResize(
    () => {
      setWindowSize(getWindowSize)
    },
    { wait }
  )

  return windowSize
}
