import { useRef, useState, useMemo } from 'react'
import styles from './ImageMarquee.module.scss'
import { bemify } from '@utils/bemify'
import cx from 'clsx'
import { MotionValue, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useOnScroll } from '@hooks/use-on-scroll'
import { clamp, map } from '@utils/math'
import type { ImageMarquee as ImageMarqueeData, ImageMarqueeItem as ImageMarqueeItemData } from '@customTypes/cms'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
const bem = bemify(styles, 'imageMarquee')
import Image from 'next/image'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'

interface ImageMarqueeProps extends ImageMarqueeData {
  height?: number
  className?: string
  style?: React.CSSProperties
}

export const ImageMarquee = ({ className = '', style = {}, images = { items: [] } }: ImageMarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isMobileBreakpoint = useBreakpointUntil('tablet')
  const progressMotionValue = useMotionValue(0)

  useOnScroll(
    ({ progress }) => {
      progressMotionValue.set(clamp(map(progress, 0, 0.66, 0, 1), 0, 1))
    },
    { target: ref }
  )

  const rows = useMemo(() => {
    const originalItems = images.items
    let finalItems = [...originalItems]

    if (!originalItems.length) return []

    // MIN ITEMS MOBILE: 3 x 3 = 9
    // MIN ITEMS DESKTOP 3 x 7 = 21
    const NUM_OF_ROWS = 3
    const NUM_OF_ITEMS_PER_ROW = isMobileBreakpoint ? 3 : 7
    const NUM_OF_ITEMS = NUM_OF_ROWS * NUM_OF_ITEMS_PER_ROW

    const isItemsListTooShort = originalItems.length < NUM_OF_ITEMS
    const isItemsListTooLong = originalItems.length > NUM_OF_ITEMS

    if (isItemsListTooShort) {
      let i = 0
      while (finalItems.length < NUM_OF_ITEMS) {
        finalItems.push(originalItems[i])
        i++
        i = i % originalItems.length
      }
    } else if (isItemsListTooLong) {
      finalItems = finalItems.slice(0, NUM_OF_ITEMS)
    }

    const rows: ImageMarqueeData['images']['items'][] = []

    for (let i = 0; i < finalItems.length; i += NUM_OF_ITEMS_PER_ROW) {
      rows.push(finalItems.slice(i, i + NUM_OF_ITEMS_PER_ROW))
    }

    return rows
  }, [images, isMobileBreakpoint])

  return (
    <div ref={ref} className={cx(bem(), className)} style={style}>
      <div className={bem('stickyContainer')}>
        {rows.map((row, i) => (
          <div key={i} className={bem('row')}>
            {row.map((item, j) => {
              const itemIndex = i * row.length + j
              const revealIndex = (itemIndex % row.length) + i + 1
              const revealThreshold = revealIndex / (row.length + 2) + i * 0.03
              return (
                <ImageMarqueeItem
                  key={j}
                  {...item}
                  scrollProgress={progressMotionValue}
                  revealThreshold={revealThreshold}
                  // debug
                />
              )
            })}
          </div>
        ))}

        {/* <motion.div
          style={{
            position: 'absolute',
            top: 0, 
            width: '100%',
            height: '1px',
            background: 'red',
            transformOrigin: 'left',
            scaleX: progressMotionValue,
          }}
        ></motion.div> */}
      </div>
    </div>
  )
}

interface ImageMarqueeItemProps extends ImageMarqueeItemData {
  scrollProgress: MotionValue
  revealThreshold: number
  debug?: boolean
}

export const ImageMarqueeItem = ({ debug = false, ...props }: ImageMarqueeItemProps) => {
  const [revealed, setRevealed] = useState(false)
  const { revealThreshold } = props

  useMotionValueEvent(props.scrollProgress, 'change', (latest) => {
    if (latest > revealThreshold) {
      if (!revealed) setRevealed(true)
    } else {
      if (revealed) setRevealed(false)
    }
  })

  const { src: clientLogoSrc } = useContentfulMediaSrc(props.clientLogo, { width: 300, quality: 95 })
  const { src: relatedImageSrc } = useContentfulMediaSrc(props.relatedImage, {
    width: 300,
    quality: 95,
  })

  return (
    <div className={bem('item')}>
      {debug && <div className={bem('debug')}>{Number(props.revealThreshold).toFixed(2)}</div>}
      {/* logo */}
      <Image
        className={bem('image')}
        data-revealed={!revealed}
        alt={props.clientName}
        src={clientLogoSrc}
        width={217}
        height={140}
      />
      {/* related image */}
      <Image
        className={bem('image')}
        data-revealed={revealed}
        alt={props.clientName}
        src={relatedImageSrc}
        width={217}
        height={140}
      />
    </div>
  )
}
