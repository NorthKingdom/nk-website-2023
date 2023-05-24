import React, { useEffect } from 'react'
import styles from './MediaGridItem.module.scss'
import { bemify } from '@utils/bemify'
import { Video, ResponsiveImage, MediaGridItem as MediaGridItemType } from '@customTypes/cms'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
const bem = bemify(styles, 'mediaGridItem')

interface MediaGridItemProps {
  item: MediaGridItemType | undefined
  maxHeight: number
}

export const MediaGridItem = ({ item, maxHeight }: MediaGridItemProps) => {
  return (
    <div data-offset={item?.offset} style={{ '--maxHeight': `${maxHeight}px` }} className={styles['mediaGridItem']}>
      {item && (
        <>
          {item.media.__typename === 'Video' || (item.media as Video).desktopVideoCollection ? (
            <VideoPlayer
              playsinline={true}
              muted={true}
              autoPlay={true}
              controls={false}
              loop={true}
              poster={`/dummy/showreelposter.jpg`}
              src={item?.media as Video}
            />
          ) : (
            <Image srcSet={item?.media as ResponsiveImage} />
          )}
        </>
      )}
    </div>
  )
}
