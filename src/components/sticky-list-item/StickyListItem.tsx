import React from 'react'
import styles from './StickyListItem.module.scss'
import { bemify } from '@utils/bemify'
import { VideoPlayer } from '@components/video-player'
import { Image } from '@components/image'
import { Slideshow } from '@components/slideshow'
import { AwardItem } from '@components/award-item'
import { Video, ResponsiveImage, AwardList, Link } from '@customTypes/cms'
import { List } from '@components/list'
const bem = bemify(styles, 'stickyListItem')

interface StickyListItemProps {
  header: string
  description: string
  mediaCollection: {
    items: Video[] | ResponsiveImage[]
  }
  subList?: AwardList
  automaticallyChange?: boolean
  showIndicators?: boolean
  showArrows?: boolean
  link?: Link
}

export const StickyListItem = ({
  header,
  description,
  mediaCollection,
  subList = { awards: [] },
  automaticallyChange = true,
  showIndicators = false,
  showArrows = false,
  link,
}: StickyListItemProps) => {
  console.log(mediaCollection.items[0])
  return (
    <div className={styles['stickyListItem']}>
      <div className={bem('leftContainer')}>
        <h3>{header}</h3>
        <div className={bem('stickyMediaContainer')}>
          {mediaCollection.items.length > 1 ? (
            <Slideshow
              automaticallyChange={automaticallyChange}
              showIndicators={showIndicators}
              showArrows={showArrows}
              srcSet={mediaCollection.items as ResponsiveImage[]}
            />
          ) : mediaCollection.items[0].__typename === 'Video' ||
            (mediaCollection.items[0] as Video).desktopVideoCollection ? (
            <VideoPlayer
              playsinline
              loop
              autoPlay
              controls={false}
              poster={(mediaCollection.items[0] as Video).posterImage.url}
              src={mediaCollection.items[0] as Video}
            />
          ) : (
            <Image srcSet={mediaCollection.items[0] as ResponsiveImage} />
          )}
          {/* TODO :: Change into next/link ? */}
          {link && (
            <a href={link.url} target={'_blank'} className={bem('label')}>
              {link.copy}
            </a>
          )}
        </div>
      </div>
      <div className={bem('rightContainer')}>
        <p>{description}</p>
        {subList && (
          <div className={bem('listContainer')}>
            <List items={subList.awards} renderItem={AwardItem} />
          </div>
        )}
      </div>
    </div>
  )
}
