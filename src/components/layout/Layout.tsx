import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { Header } from '@components/header'
import { Footer } from '@components/footer'
import styles from './Layout.module.scss'
import { useGlobalStateStore } from '@store/global-state-store'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  hideFooter: boolean
}

export function Layout({ children, hideFooter, ...props }: LayoutProps) {
  const router = useRouter()
  const rafId = useRef<number>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = useIsTouchDevice()
  const setLenis = useGlobalStateStore((state) => state.setLenis)

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    window.scrollTo(0, 0)

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          ref={wrapperRef}
          className={styles.main}
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ease: 'circOut' } }}
          exit={{ opacity: 0, transition: { ease: 'circIn' } }}
          transition={{ duration: 0.1 }}
        >
          <div ref={contentRef} className={styles.content} key={router.route}>
            {children}
          </div>
          {!hideFooter && (
            <>
              <div className={styles['footer-spacer']}></div>
              <Footer />
            </>
          )}
        </motion.main>
      </AnimatePresence>
    </>
  )
}
