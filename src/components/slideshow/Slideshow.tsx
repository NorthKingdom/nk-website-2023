import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { bemify } from '@utils/bemify'
import { Arrow } from '@components/arrow'
import { Media } from '@components/media'
import styles from './Slideshow.module.scss'
import type { ResponsiveImagePayload, VideoPayload } from '@customTypes/cms'
const bem = bemify(styles, 'slideshow')

interface SlideshowProps {
  automaticallyChange: boolean
  showIndicators: boolean
  showArrows: boolean
  srcSet: (ResponsiveImagePayload | VideoPayload)[]
  showCaption?: boolean
  caption?: string
}

export const Slideshow = ({
  automaticallyChange,
  showIndicators,
  showArrows,
  srcSet,
  caption,
  showCaption = false,
}: SlideshowProps) => {
  const [[count, direction], setCount] = useState([0, 0])
  const ref = useRef<HTMLDivElement>(null)

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
    if (automaticallyChange && ref.current) {
      if (srcSet[count].__typename === 'Video') {
        const v2 = ref.current.querySelector(`video`)
        v2?.play()

        v2!.onended = () => {
          setCount((c) => (c[0] + 1 === srcSet.length ? [0, 1] : [c[0] + 1, 1]))
        }
      } else {
        interval = setInterval(() => {
          setCount((c) => (c[0] + 1 === srcSet.length ? [0, 1] : [c[0] + 1, 1]))
        }, 3000)
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [automaticallyChange, ref, count])

  return (
    <div ref={ref} className={styles['slideshow']}>
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
            <Media {...srcSet[count]} />
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
      <div data-hascaption={showCaption} className={bem('informationContainer')}>
        {showCaption && !!caption && (
          <motion.p
            key={`caption-for-image-${count}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {caption}
          </motion.p>
        )}
        {showIndicators && (
          <div className={bem('indicatorsContainer')}>
            {srcSet.map((s, i) => (
              <div
                key={`indicator-${i}`}
                data-active={count === i}
                className={bem('indicator')}
                onClick={() => setCount([i, count > i ? -1 : 1])}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
