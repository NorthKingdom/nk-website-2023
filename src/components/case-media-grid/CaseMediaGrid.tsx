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

      console.log([...imgs, ...videos])

      if (imgs.length > 0) {
        console.log(imgs[0])
        imgs[0].onerror = (e) => {
          console.log(`eer`, e)
        }

        if (imgs[0].complete) {
          console.log(`load`)
          imgs.forEach((img) => {
            console.log(`img`, img, img.naturalHeight / img.naturalWidth, tempRatio)
            if (img.naturalHeight / img.naturalWidth > tempRatio) {
              tempMX = Math.max(img.naturalHeight, tempMX)
              tempRatio = img.naturalHeight / img.naturalWidth
              console.log(tempMX, tempRatio)
              sMH(tempMX)
            }
          })
        } else {
          imgs[0].onload = () => {
            console.log(`load`)
            imgs.forEach((img) => {
              console.log(`img`, img, img.naturalHeight / img.naturalWidth, tempRatio)
              if (img.naturalHeight / img.naturalWidth > tempRatio) {
                tempMX = Math.max(img.naturalHeight, tempMX)
                tempRatio = img.naturalHeight / img.naturalWidth
                console.log(tempMX, tempRatio)
                sMH(tempMX)
              }
            })
          }
        }
      }

      if (videos.length > 0) {
        console.log(`vid`)
        videos[0].onloadeddata = () => {
          console.log(`vid loaded data`)
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
