import React, { useEffect, useRef, useState } from 'react'
import styles from './CaseMediaGrid.module.scss'
import { MediaGridItemPayload } from '@customTypes/cms'
import { MediaGridItem } from '@components/media-grid-item'

interface CaseMediaGridProps {
  slotOne?: MediaGridItemPayload
  slotTwo?: MediaGridItemPayload
  slotThree?: MediaGridItemPayload
  slotFour?: MediaGridItemPayload
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
        imgs[0].onerror = (e) => {
          console.log(`error`, e)
        }

        if (imgs[0].complete) {
          imgs.forEach((img) => {
            if (img.naturalHeight / img.naturalWidth > tempRatio) {
              tempMX = Math.max(img.naturalHeight, tempMX)
              tempRatio = img.naturalHeight / img.naturalWidth

              sMH(tempMX)
            }
          })
        } else {
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
      }

      if (videos.length > 0) {
        videos[0].onloadeddata = () => {
          videos.forEach((v) => {
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
