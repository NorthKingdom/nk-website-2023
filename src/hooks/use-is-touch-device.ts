import { useState, useEffect } from 'react'

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  return isTouchDevice
}
