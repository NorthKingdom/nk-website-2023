import Lenis from '@studio-freight/lenis'
import ResizeObserver from 'resize-observer-polyfill'
import { useEffect, useRef, MutableRefObject } from 'react'
import { map, clamp } from '@/utils/math'
import { useGlobalStateStore } from '@/store/global-state-store'
import { debounce } from '@/utils/debounce'

export type LenisScrollEvent = {
  scroll: number // current scroll position
  limit: number // scroll limit
  velocity: number // scroll velocity
  progress: number // scroll progress [0, 1]
  direction: -1 | 1 // scroll direction
}
export type LenisCallback = (event: LenisScrollEvent) => void

type LenisOptions = {
  enabled?: boolean
  target?: MutableRefObject<HTMLDivElement | null | undefined>
}

/**
 * Hook to listen to scroll events from Lenis
 * If target element is provided, progress will be calculated based on scroll position of target element in the following way:
 * - 0   when the top of target element comes into view
 * - 0.5 when the target element is in the middle of the scrollable container
 * - 1   when the top
 *
 * @param callback {LenisCallback} - callback to be called on scroll
 * @param options  {LenisOptions}  - options
 */
export function useOnScroll(callback: LenisCallback, options: LenisOptions = {}) {
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis
  const { enabled } = { enabled: true, ...options }
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  /**
   * Measure and save target element size (if provided)
   */
  const targetSize = useRef({ width: 0, height: 0, top: 0, bottom: 0 })
  const windowSize = useRef({ width: 0, height: 0 })

  useEffect(() => {
    if (!options.target?.current || !lenis) return
    const target = options.target.current

    const resizeHandler = debounce(() => {
      // Calculate target offset from the top of the scrollable container
      const info = {
        x: { targetOffset: 0 },
        y: { targetOffset: 0 },
      }

      if (options.target?.current !== lenis?.options.content) {
        let node = target as HTMLElement
        while (node && node !== lenis?.options.content) {
          info.x.targetOffset += node.offsetLeft
          info.y.targetOffset += node.offsetTop
          node = node.offsetParent as HTMLElement
        }
      }

      targetSize.current.width = target.clientWidth ?? 0
      targetSize.current.height = target.clientHeight ?? 0
      targetSize.current.top = info.y.targetOffset
      targetSize.current.bottom = info.y.targetOffset + targetSize.current.height

      windowSize.current.width = window.innerWidth
      windowSize.current.height = window.innerHeight
    }, 100)

    resizeHandler()

    window.addEventListener('resize', resizeHandler, { passive: true })
    lenis.options.content.addEventListener('resize', resizeHandler, { passive: true })
    const lenisContainerResizeObserver = new ResizeObserver(resizeHandler)
    lenisContainerResizeObserver.observe(lenis.options.content)

    return () => {
      window.removeEventListener('resize', resizeHandler)
      lenis.options.content.removeEventListener('resize', resizeHandler)
      lenisContainerResizeObserver.unobserve(lenis.options.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])

  /**
   * Listen to scroll events from Lenis
   */
  useEffect(() => {
    if (!lenis || !enabled) return

    // console.log('useOnScroll', lenis, options.target?.current)

    // If a target element is passed, calculate scroll progress based on scroll position of target element
    const scrollHandler = options.target?.current
      ? (event: LenisScrollEvent) => {
          const { scroll } = event
          const { top: targetTop, bottom: targetBottom } = targetSize.current

          const targetScrollProgress = clamp(
            map(scroll, targetTop - windowSize.current.height, targetBottom, 0, 1),
            0,
            1
          )

          savedCallback.current({
            ...event,
            progress: targetScrollProgress,
          })
        }
      : (event: LenisScrollEvent) => savedCallback.current(event)

    lenis.on('scroll', scrollHandler)

    return () => {
      lenis.off('scroll', scrollHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, callback, enabled])
}
