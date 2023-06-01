import { useState } from 'react'
import { useOnScroll } from './use-on-scroll'

export const useIsScrollingDown = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useOnScroll(({ direction }) => {
    if (direction === 1 && !isScrollingDown) {
      setIsScrollingDown(true)
    } else if (direction === -1 && isScrollingDown) {
      setIsScrollingDown(false)
    }
  })

  return isScrollingDown
}
