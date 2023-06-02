import React, { useEffect, useState } from 'react'
import styles from './CaseHero.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage } from '@customTypes/cms'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@components/media'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
import { useGlobalStateStore } from '@store/global-state-store'
const bem = bemify(styles, 'caseHero')
import Lenis from '@studio-freight/lenis'
interface CaseHeroProps {
  client: string
  caseName: string
  src: Video | ResponsiveImage
}

export const CaseHero = ({ client, caseName, src }: CaseHeroProps) => {
  const bpBeforeDesktopSmall = useBreakpointUntil('desktopSmall')
  const [isIn, setIsIn] = useState(false)
  const isComingFromACasePage = useGlobalStateStore((state) => state.isComingFromACasePage)
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis

  useEffect(() => {
    console.log(`receiving`, isComingFromACasePage)
  }, [isComingFromACasePage])

  useEffect(() => {
    setTimeout(() => {
      setIsIn(true)
    }, 250)
  }, [])

  const allowScroll = () => {
    console.log(`animationend`)
    lenis.start()
  }

  const start = () => {
    console.log(`srtart going`)
  }

  return (
    <>
      <AnimatePresence initial={isComingFromACasePage}>
        {/* {!hasRouted.current && ( */}

        {/* // )} */}
        {/* </AnimatePresence> */}
        <motion.section
          className={styles['caseHero']}
          initial={{ height: `100vh` }}
          animate={{ height: `100%`, transition: { duration: 1 } }}
          onAnimationComplete={allowScroll}
          onAnimationStart={start}
          // exit={{height: `100vh`}}
        >
          <motion.img
            key="shield-img"
            src="/images/shield-mask-local2.png"
            // src="/images/shield-mask-local2-orange.png"
            style={{
              // scale: 2,
              // y,
              position: `absolute`,
              top: 0,
              left: 0,
              // width: `100%`,
              // height: `100vh`,
              width: `100%`,
              height: `100%`,
              zIndex: 1,
              objectFit: `cover`,
            }}
            initial={{ scale: 2 }}
            animate={{ scale: 14, transition: { duration: 1 } }} //, delay: 0.5 } }}

            // animate={{ height: `100%` }}
            // exit={{ scale: 14, transition: { duration: 0 } }}
          />
          <div className={bem('some')}>
            <Media
              {...src}
              index={0}
              caseHeroImage
              controls={false}
              muted={true}
              autoPlay={true}
              loop={true}
              playsinline={true}
            />
          </div>
          <div className={styles['caseHero__description']}>
            <AnimatePresence>
              {!isIn ? (
                <motion.p
                  key={'up-next-text-name'}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4 }}
                >
                  Next up
                </motion.p>
              ) : (
                <motion.p
                  key={'case-client-name'}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.4 }}
                >
                  {client}
                </motion.p>
              )}
            </AnimatePresence>
            <h1>{caseName}</h1>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  )
}
