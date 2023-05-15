import React, { useEffect, useState } from 'react'
import styles from './Slideshow.module.scss'
import { bemify } from '@utils/bemify'
import { AnimatePresence, motion } from 'framer-motion'
import { Image } from '@components/image'
import { Arrow } from '@components/arrow'
import { ResponsiveImage } from '@customTypes/cms'
const bem = bemify(styles, 'slideshow')

interface SlideshowProps {
  automaticallyChange: boolean
  showIndicators: boolean
  showArrows: boolean
  srcSet: ResponsiveImage[]
}

export const Slideshow = ({ automaticallyChange, showIndicators, showArrows, srcSet }: SlideshowProps) => {
  const [[count, direction], setCount] = useState([0, 0])

  const variants = {
    enter: (direction: number) => {
      return {
        opacity: 0,
        x: direction > 0 ? `100%` : `-100%`,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction > 0 ? `-100%` : `100%`,
        opacity: 0,
      }
    },
  }

  useEffect(() => {
    let interval: NodeJS.Timer
    if (automaticallyChange) {
      interval = setInterval(() => {
        setCount((c) => (c[0] + 1 === srcSet.length ? [0, 1] : [c[0] + 1, 1]))
      }, 3000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [automaticallyChange, count])

  return (
    <div className={styles['slideshow']}>
      <div className={bem('imageContainer')}>
        {showArrows && (
          <div
            className={bem('left')}
            onClick={() => setCount((c) => (c[0] - 1 === -1 ? [srcSet.length - 1, -1] : [c[0] - 1, -1]))}
          >
            <Arrow direction="left" fill={'white'} />
          </div>
        )}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            key={`img-${count}`}
            className={bem('motion')}
          >
            <Image srcSet={srcSet[count]} />
          </motion.div>
        </AnimatePresence>
        {showArrows && (
          <div
            className={bem('right')}
            onClick={() => setCount((c) => (c[0] + 1 === srcSet.length ? [0, 1] : [c[0] + 1, 1]))}
          >
            <Arrow direction="right" fill={'white'} />
          </div>
        )}
      </div>
      {showIndicators && (
        <div className={bem('indicatorsContainer')}>
          {srcSet.map((s, i) => (
            <div
              data-active={count === i}
              className={bem('indicator')}
              onClick={() => setCount([i, count > i ? -1 : 1])}
            />
          ))}
        </div>
      )}
    </div>
  )
}
