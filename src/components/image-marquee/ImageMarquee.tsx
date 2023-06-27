import { useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import { useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import cx from 'clsx'
import { useOnScroll } from '@hooks/use-on-scroll'
import { clamp, map } from '@utils/math'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
import { bemify } from '@utils/bemify'
import styles from './ImageMarquee.module.scss'
import type { ImageMarqueePayload, ImageMarqueeItemPayload } from '@customTypes/cms'
const bem = bemify(styles, 'imageMarquee')

interface ImageMarqueeProps extends ImageMarqueePayload {
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

    const rows: ImageMarqueePayload['images']['items'][] = []

    for (let i = 0; i < finalItems.length; i += NUM_OF_ITEMS_PER_ROW) {
      rows.push(finalItems.slice(i, i + NUM_OF_ITEMS_PER_ROW))
    }

    return rows
  }, [images, isMobileBreakpoint])

  const [revealed, setRevealed] = useState(false)

  useMotionValueEvent(progressMotionValue, 'change', (latest) => {
    if (latest > 0.4) {
      if (!revealed) setRevealed(true)
    }
  })

  return (
    <div ref={ref} className={cx(bem(), className)} style={style}>
      <div className={bem('stickyContainer')}>
        {rows.map((row, i) => (
          <div key={i} className={bem('row')}>
            <ImageMarqueeRow index={i} items={row} revealed={revealed} />
            <ImageMarqueeRow index={i} items={row} revealed={revealed} aria-hidden={true} />
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

const ImageMarqueeRow = ({
  index: rowIndex,
  items: row,
  revealed = false,
  ...props
}: {
  index: number
  revealed?: boolean
  items: ImageMarqueePayload['images']['items']
}) => {
  return (
    <div className={bem('rowMarqueeContent')} {...props}>
      {row.map((item, j) => {
        const itemIndex = rowIndex * row.length + j
        const revealIndex = (itemIndex % row.length) + rowIndex + 1
        const revealThreshold = (revealIndex / (row.length + 2)) * 0.5 + rowIndex * 0.03
        return (
          <ImageMarqueeItem
            key={j}
            {...item}
            revealed={revealed}
            revealThreshold={revealThreshold}
            // debug
          />
        )
      })}
    </div>
  )
}

interface ImageMarqueeItemProps extends ImageMarqueeItemPayload {
  revealThreshold: number
  revealed?: boolean
  debug?: boolean
}

export const ImageMarqueeItem = ({ debug = false, revealed, ...props }: ImageMarqueeItemProps) => {
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
        style={{
          '--reveal-delay': `${props.revealThreshold}s`,
        }}
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
        style={{
          '--reveal-delay': `${props.revealThreshold}s`,
        }}
        width={217}
        height={140}
      />
    </div>
  )
}
