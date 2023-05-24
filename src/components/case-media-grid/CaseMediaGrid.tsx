import React, { useEffect, useRef, useState } from 'react'
import styles from './CaseMediaGrid.module.scss'
import { bemify } from '@utils/bemify'
import { MediaGridItem as MediaGridItemType } from '@customTypes/cms'
import { MediaGridItem } from '@components/media-grid-item'
const bem = bemify(styles, 'caseMediaGrid')

interface CaseMediaGridProps {
  slotOne?: MediaGridItemType
  slotTwo?: MediaGridItemType
  slotThree?: MediaGridItemType
  slotFour?: MediaGridItemType
}

export const CaseMediaGrid = ({ slotOne, slotTwo, slotThree, slotFour }: CaseMediaGridProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [maxHeight, sMH] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const imgs = ref.current.querySelectorAll(`img`)
      const videos = ref.current.querySelectorAll(`video`)
      let tempMX = 0
      let tempRatio = 0

      if (imgs.length > 0) {
        imgs[0].onload = () => {
          imgs.forEach((img) => {
            if (img.naturalHeight / img.naturalWidth > tempRatio) {
              tempMX = Math.max(img.naturalHeight, tempMX)
              tempRatio = img.naturalHeight / img.naturalWidth
              sMH(tempMX)
            }
          })
        }
      }

      if (videos.length > 0) {
        videos[0].onloadeddata = () => {
          videos.forEach((v) => {
            console.log(`v`, v.videoHeight / v.videoWidth, tempRatio)
            if (v.videoHeight / v.videoWidth > tempRatio) {
              tempMX = Math.max(v.videoHeight, tempMX)
              tempRatio = v.videoHeight / v.videoWidth
              sMH(tempMX)
            }
          })
        }
      }
    }
  }, [ref])

  return (
    <div ref={ref} className={styles['caseMediaGrid']}>
      <MediaGridItem maxHeight={maxHeight} item={slotOne} />
      <MediaGridItem maxHeight={maxHeight} item={slotTwo} />
      <MediaGridItem maxHeight={maxHeight} item={slotThree} />
      <MediaGridItem maxHeight={maxHeight} item={slotFour} />
    </div>
  )
}
