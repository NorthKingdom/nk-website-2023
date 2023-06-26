import React from 'react'
import { bemify } from '@utils/bemify'
import { Media } from '@components/media/Media'
import styles from './MediaGridItem.module.scss'
import type { MediaGridItemPayload } from '@customTypes/cms'
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
