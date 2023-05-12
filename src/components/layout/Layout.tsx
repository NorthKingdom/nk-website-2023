import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { Header } from '@components/header'
import { Footer } from '@components/footer'
import styles from './Layout.module.scss'
import { useLenisStore } from '@hooks/use-lenis'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const rafId = useRef<number>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = useIsTouchDevice()
  const [lenis, setLenis] = useLenisStore((state) => [state.lenis, state.setLenis])

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    window.scrollTo(0, 0)

    // TODO: disable smooth scroll mobile
    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: isTouchDevice,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTouchDevice])

  return (
    <>
      <Header />
      <main ref={wrapperRef} className={styles.main}>
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
        <div className={styles['footer-spacer']}></div>
      </main>
      <Footer />
    </>
  )
}
