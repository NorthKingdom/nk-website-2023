import React from 'react'
import Image from 'next/image'
import styles from './CaseListItem.module.scss'
import { bemify } from '@utils/bemify'
import type { Case } from '@customTypes/cms'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useInViewAnimation } from '@hooks/use-inview-animation'
import { getContentfulImageSrc } from '@utils/contentful'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
const bem = bemify(styles, 'caseListItem')
import { VideoPlayer } from '@components/video-player'
import type { Video } from '@customTypes/cms'

// TODO: replace with image and video component

interface CaseListItemProps extends Case {
  className?: string
  style?: React.CSSProperties
  aspectRatio?: number
  index: number
  alt?: string
}

export const CaseListItem = ({
  className = '',
  style = {},
  title = '',
  client = '',
  index,
  alt = '',
  thumbnail,
}: CaseListItemProps) => {
  const $container = useInViewAnimation('animate-image-fade-up')
  const { src } = useContentfulMediaSrc(thumbnail)

  return (
    <div ref={$container} className={className} style={style}>
      <AspectRatio ratio={16 / 10} className={bem('thumbnailContainer')}>
        {thumbnail?.__typename === 'Video' ? (
          <VideoPlayer
            className={bem('thumbnail')}
            poster={(thumbnail as Video).posterImage.url}
            playsinline
            src={thumbnail as Video}
            muted={true}
            autoPlay={true}
            controls={false}
          />
        ) : thumbnail?.__typename === 'Image' ? (
          <Image
            width={400}
            height={400 * (10 / 16)}
            className={bem('thumbnail')}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            src={getContentfulImageSrc(src)}
            alt={alt}
            aria-hidden={Boolean(alt)}
          />
        ) : null}
      </AspectRatio>
      <div className={bem('content')}>
        <h3 className={bem('client')}>{client}</h3>
        <h4 className={bem('projectTitle')}>{title}</h4>
      </div>
    </div>
  )
}
