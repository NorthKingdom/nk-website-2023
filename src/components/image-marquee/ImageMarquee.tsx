import React, { useMemo } from 'react'
import styles from './ImageMarquee.module.scss'
import { bemify } from '@utils/bemify'
import cx from 'clsx'
import { motion, useMotionValue } from 'framer-motion'
import { useOnScroll } from '@hooks/use-on-scroll'
import { map } from '@utils/math'
import type { ImageMarquee as ImageMarqueeData } from '@customTypes/cms'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
const bem = bemify(styles, 'imageMarquee')
import Image from 'next/image'

interface ImageMarqueeProps extends ImageMarqueeData {
  height?: number
  className?: string
  style?: React.CSSProperties
}

export const ImageMarquee = ({ className = '', style = {}, images = { items: [] } }: ImageMarqueeProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const isMobileBreakpoint = useBreakpointUntil('tablet')
  const progressMotionValue = useMotionValue(0)

  useOnScroll(
    ({ progress }) => {
      progressMotionValue.set(map(progress, 0, 0.66, 0, 1))
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
        console.log('push original image', i)
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
            {row.map((item, j) => (
              <div key={`${item.clientName}=${i}`} className={bem('item')}>
                <Image
                  className={bem('image')}
                  alt={item.clientName}
                  src={item.clientLogo.desktopImage.url}
                  width={217}
                  height={140}
                />
              </div>
            ))}
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
