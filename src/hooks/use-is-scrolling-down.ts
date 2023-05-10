import { useEffect, useState } from 'react'

let scrollTop = 0
let previousScrollTop = 0
let rafId: Number | null = null

export const useIsScrollingDown = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  const scrollHandler = (e: any) => {
    if (!rafId) {
      rafId = requestAnimationFrame(() => loop(e))
    }
  }

  const loop = (e: any) => {
    scrollTop = e.target.scrollTop
    setIsScrollingDown(scrollTop <= 0 ? false : previousScrollTop < scrollTop)
    previousScrollTop = scrollTop
    cancelAnimationFrame(rafId as number)
    rafId = null
  }

  useEffect(() => {
    const root = document.getElementById('__next')

    if (!root) return
    root.addEventListener('scroll', scrollHandler)

    return () => {
      root.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return isScrollingDown
}
