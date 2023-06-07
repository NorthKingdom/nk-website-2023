import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Lenis from '@studio-freight/lenis'
import { Header } from '@components/header'
import styles from './Layout.module.scss'
import { useGlobalStateStore } from '@store/global-state-store'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { useNextCssRemovalPrevention } from '@hooks/use-next-css-removal-prevention'

const Footer = dynamic(() => import('@components/footer').then((Mod) => Mod.Footer), {
  ssr: false,
  suspense: false,
})

interface LayoutProps {
  children: React.ReactNode
  footerTheme?: 'light' | 'dark'
  hideFooter?: boolean
}

const variants = {
  initial: {
    opacity: 1,
    x: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { ease: 'circOut' },
  },
  exit: {
    opacity: 1,
    x: 0,
    transition: { ease: 'circOut' },
  },
}

export function Layout({ children, hideFooter = false, footerTheme }: LayoutProps) {
  const router = useRouter()
  const rafId = useRef<number>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = useIsTouchDevice()
  const isMenuOpen = useGlobalStateStore((state) => state.isMenuOpen)
  const lenis = useGlobalStateStore((state) => state.lenis)
  const setLenis = useGlobalStateStore((state) => state.setLenis)
  const setIsComingFromACasePage = useGlobalStateStore((state) => state.setIsComingFromACasePage)
  const removeExpiredStyles = useNextCssRemovalPrevention()

  /*
   * Initialize lenis
   */
  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return

    window.scrollTo(0, 0)

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smoothTouch: !isTouchDevice,
      smoothWheel: !isTouchDevice,
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

  /*
   * Stop lenis when menu is open
   */
  useEffect(() => {
    if (!lenis) return

    if (isMenuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [lenis, isMenuOpen])

  useEffect(() => {
    console.log(`mount`)
    return () => {
      console.log(`setting`, router.route === '/case/[case]')
      setIsComingFromACasePage(router.route === '/case/[case]')
    }
  }, [router])

  /*
   * Scroll to top when page transition starts
   */
  const onPageTransitionStart = (variant: 'animate' | 'exit') => {
    if (lenis && variant === 'animate') {
      // lenis.scrollTo(0, { immediate: true })
      // setTimeout(() => {
      lenis.stop()
      console.log(`scroll to immediate `)
      lenis.scrollTo(0, { immediate: true })
      lenis.start()
      // }, 500)
    }
  }

  const onPageTransitionEnd = (variant: 'animate' | 'exit') => {
    if (variant === 'animate') removeExpiredStyles()
  }

  return (
    <>
      <Header />
      <div ref={wrapperRef} className={styles.main}>
        <div ref={contentRef}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={router.asPath}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              onAnimationStart={onPageTransitionStart}
              onAnimationComplete={onPageTransitionEnd}
              transition={{ duration: 0.1 }}
            >
              <div className={styles.content}>{children}</div>
              {!hideFooter && <Footer theme={footerTheme} />}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
