import React from 'react'
import styles from './StickyListItem.module.scss'
import { bemify } from '@utils/bemify'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
import { Slideshow } from '@components/slideshow'
import { Video, ResponsiveImage } from '@customTypes/cms'
import { List } from '@components/list'
const bem = bemify(styles, 'stickyListItem')

interface StickyListItemProps {
  isVideoAsset: boolean
  header: string
  copy: string
  srcSet: Video | ResponsiveImage[] | ResponsiveImage
  containsList?: boolean
  items?: any[]
  automaticallyChange?: boolean
  showIndicators?: boolean
  showArrows?: boolean
  renderItem?: (item: any) => JSX.Element
}

export const StickyListItem = ({
  isVideoAsset,
  header,
  copy,
  srcSet,
  containsList = false,
  items = [],
  automaticallyChange = true,
  showIndicators = false,
  showArrows = false,
  renderItem = () => <div />,
}: StickyListItemProps) => {
  return (
    <div className={styles['stickyListItem']}>
      <div className={bem('leftContainer')}>
        <h3>{header}</h3>
        <div className={bem('stickyMediaContainer')}>
          {isVideoAsset ? (
            <VideoPlayer
              playsinline
              loop
              autoPlay
              poster={(srcSet as Video).posterImage.url} //'/dummy/showreelposter/jpg'
              src={srcSet as Video} // '/dummy/showreel23.mp4'
            />
          ) : Array.isArray(srcSet) ? (
            <Slideshow
              automaticallyChange={automaticallyChange}
              showIndicators={showIndicators}
              showArrows={showArrows}
              srcSet={srcSet}
            />
          ) : (
            <Image srcSet={srcSet as ResponsiveImage} />
          )}
        </div>
      </div>
      <div className={bem('rightContainer')}>
        <p>{copy}</p>
        {containsList && (
          <div className={bem('listContainer')}>
            <List items={items} renderItem={renderItem} />
          </div>
        )}
      </div>
    </div>
  )
}
