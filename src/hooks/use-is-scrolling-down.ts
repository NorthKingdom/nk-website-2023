import { useState } from 'react'
import { useOnScroll } from './use-on-scroll'

/**
 * Check if user is scrolling down
 * @param threshold Minimum scroll distance to consider scrolling down
 * @returns {boolean} Whether user is scrolling down
 */
export const useIsScrollingDown = (threshold = 30) => {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useOnScroll(({ direction, scroll }) => {
    if (scroll < threshold && isScrollingDown) setIsScrollingDown(false)

    if (direction === 1 && !isScrollingDown) {
      setIsScrollingDown(true)
    } else if (direction === -1 && isScrollingDown) {
      setIsScrollingDown(false)
    }
  })

  return isScrollingDown
}
