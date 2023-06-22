import React from 'react'
import styles from './MediaGridItem.module.scss'
import { bemify } from '@utils/bemify'
import type { MediaGridItemPayload } from '@customTypes/cms'
import { Media } from '@components/media/Media'
const bem = bemify(styles, 'mediaGridItem')

interface MediaGridItemProps {
  item: MediaGridItemPayload | undefined
  maxHeight: number
}

export const MediaGridItem = ({ item, maxHeight }: MediaGridItemProps) => {
  return (
    <div
      data-isempty={item === undefined || item === null}
      data-offset={item?.offset}
      style={{ '--maxHeight': `${maxHeight}px` }}
      className={styles['mediaGridItem']}
    >
      {item && <Media {...item.media} className={bem('videoPlayerContainer')} autoPlay={true} />}
    </div>
  )
}
