import { RefObject, useEffect, useState } from 'react'
import { noop } from '@utils/noop'

/**
 * Hook to listen to css transition events
 * @param ref Object reference to the element
 * @param onTransitionFire Function to be called when the transition fires
 * @param onTransitionStart Function to be called when the transition starts
 * @param onTransitionEnd Function to be called when the transition ends or is cancelled
 * @returns isTransitioning Boolean value to indicate if the element is transitioning
 */
export function useCssTransitionEvents(
  ref: RefObject<HTMLElement>,
  {
    onTransitionFire,
    onTransitionStart,
    onTransitionEnd,
  }: {
    onTransitionFire: () => void
    onTransitionStart: () => void
    onTransitionEnd: () => void
  } = {
    onTransitionFire: noop,
    onTransitionStart: noop,
    onTransitionEnd: noop,
  }
) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const handleTransitionStart = () => {
      setIsTransitioning(true)
      onTransitionStart()
    }

    const handleTransitionEnd = () => {
      setIsTransitioning(false)
      onTransitionEnd()
    }

    const handleTransitionFire = () => {
      onTransitionFire()
      setIsTransitioning(true)
    }

    ref.current.addEventListener('transitionstart', handleTransitionStart)
    ref.current.addEventListener('transitionend', handleTransitionEnd)
    ref.current.addEventListener('transitioncancel', handleTransitionEnd)
    ref.current.addEventListener('transitionfire', handleTransitionFire)

    return () => {
      ref.current?.removeEventListener('transitionstart', handleTransitionStart)
      ref.current?.removeEventListener('transitionend', handleTransitionEnd)
      ref.current?.removeEventListener('transitioncancel', handleTransitionEnd)
      ref.current?.removeEventListener('transitionfire', handleTransitionFire)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isTransitioning
}
