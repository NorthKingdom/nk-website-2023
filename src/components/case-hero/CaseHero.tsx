import React, { useEffect, useState } from 'react'
import styles from './CaseHero.module.scss'
import { bemify } from '@utils/bemify'
import { motion, AnimatePresence } from 'framer-motion'
import { Media } from '@components/media'
import { useGlobalStateStore } from '@store/global-state-store'
import type { CaseHeroPayload } from '@customTypes/cms'
const bem = bemify(styles, 'caseHero')
import Lenis from '@studio-freight/lenis'

const CASE_HERO_IN_ANIMATION_DURATION = 0.7
interface CaseHeroProps {
  client: string
  caseName: string
  media: CaseHeroPayload['heroMedia']
}

export const CaseHero = ({ client, caseName, media }: CaseHeroProps) => {
  const [isIn, setIsIn] = useState(false)
  const isComingFromACasePage = useGlobalStateStore((state) => state.isComingFromACasePage)
  const lenis = useGlobalStateStore((state) => state.lenis) as Lenis

  useEffect(() => {
    setTimeout(() => {
      setIsIn(true)
    }, 250)
  }, [])

  const allowScroll = () => {
    lenis.start()
  }

  const start = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }

  return (
    <AnimatePresence initial={isComingFromACasePage}>
      <motion.section
        key={`${client}-${caseName}`}
        className={styles['caseHero']}
        initial={{ opacity: 1, height: `100vh` }}
        animate={{ opacity: 1, height: `100%`, transition: { duration: CASE_HERO_IN_ANIMATION_DURATION } }}
        onAnimationComplete={allowScroll}
        onAnimationStart={start}
      >
        <motion.img
          key="shield-img"
          src="/images/shield-mask-local2.png"
          className={bem('shieldMask')}
          initial={{ scale: 2 }}
          animate={{ scale: 14, transition: { duration: CASE_HERO_IN_ANIMATION_DURATION } }}
        />
        <div className={bem('some')}>
          <Media
            {...media}
            index={0}
            caseHeroImage
            controls={false}
            muted={true}
            autoPlay={true}
            loop={true}
            playsInline={true}
          />
        </div>
        <div className={styles['caseHero__description']}>
          <AnimatePresence>
            {!isIn && isComingFromACasePage ? (
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
  )
}
