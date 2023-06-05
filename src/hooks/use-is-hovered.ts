import { useMemo, useState } from 'react'

export function useIsHovered({ enabled } = { enabled: true }) {
  const [isHovered, setIsHovered] = useState(false)

  const eventListeners = useMemo(
    () => ({
      onMouseEnter: () => enabled && setIsHovered(true),
      onMouseLeave: () => enabled && setIsHovered(false),
    }),
    [enabled]
  )

  return [isHovered, eventListeners] as [boolean, typeof eventListeners]
}
