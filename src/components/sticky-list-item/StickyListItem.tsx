import React from 'react'
import styles from './StickyListItem.module.scss'
import { bemify } from '@utils/bemify'
import { Slideshow } from '@components/slideshow'
import { AwardItem } from '@components/award-item'
import { Video, ResponsiveImage, AwardList, Link as LinkType } from '@customTypes/cms'
import { List } from '@components/list'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import Link from 'next/link'
const bem = bemify(styles, 'stickyListItem')

interface StickyListItemProps {
  header: string
  description: string
  mediaCollection: {
    items: (Video | ResponsiveImage)[]
  }
  subList?: AwardList
  automaticallyChange?: boolean
  showIndicators?: boolean
  showArrows?: boolean
  link?: LinkType
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
              srcSet={mediaCollection.items as (ResponsiveImage | Video)[]}
            />
          ) : (
            <AspectRatio ratio={333 / 188}>
              <Media {...mediaCollection.items[0]} />
            </AspectRatio>
          )}
          {link && (
            <Link href={link.url} className={bem('label')}>
              {link.copy}
            </Link>
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
