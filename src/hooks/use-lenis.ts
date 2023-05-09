import { RefObject, useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import { create } from 'zustand'

interface LenisState {
  lenis: Lenis | null
  setLenis: (lenis: Lenis | null) => void
}

export const useLenisStore = create<LenisState>()((set) => ({
  lenis: null,
  setLenis: (lenis) => set({ lenis }),
}))

/**
 * Sets up Lenis instance
 * NOTE! Should only be used once
 */
export function useLenis({
  wrapperRef,
  contentRef,
  smooth = true,
}: {
  wrapperRef: RefObject<HTMLDivElement | null | undefined>
  contentRef: RefObject<HTMLDivElement | null | undefined>
  smooth?: boolean
}) {
  const rafId = useRef<number | null>(null)
  const [lenis, setLenis] = useLenisStore((state) => [state.lenis, state.setLenis])

  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    // TODO: disable smooth scroll mobile
    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: smooth,
    })

    setLenis(lenis)

    const scrollFnc = (time: number) => {
      lenis.raf(time)
      rafId.current = requestAnimationFrame(scrollFnc)
    }

    rafId.current = requestAnimationFrame(scrollFnc)

    return () => {
      lenis.destroy()
      setLenis(null)
      cancelAnimationFrame(rafId.current!)
    }
  }, [smooth, setLenis])

  // Prevent Lenis scrolling when a modal is open
  //   useEffect(() => {
  //     if (!lenis) return
  //     if (modalOpen) {
  //       lenis.stop()
  //     } else {
  //       lenis.start()
  //     }
  //   },  modalOpen])
}
