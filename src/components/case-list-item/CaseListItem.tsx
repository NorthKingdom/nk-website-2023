import React from 'react'
import styles from './CaseListItem.module.scss'
import { bemify } from '@utils/bemify'
import type { Case } from '@customTypes/cms'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useInViewAnimation } from '@hooks/use-inview-animation'
import cx from 'clsx'
import { getContentfulImageSrc } from '@utils/contentful'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
const bem = bemify(styles, 'caseListItem')

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
  thumbnailMobile,
}: CaseListItemProps) => {
  const $container = useInViewAnimation('animate-image-fade-up')
  const bpMobile = useBreakpointUntil('tablet')
  const thumbnailSrc = bpMobile ? thumbnailMobile : thumbnail ?? thumbnail
  const imageSrc = getContentfulImageSrc(thumbnailSrc) ?? 'images/case-thumb-fallback.webp'

  return (
    <div ref={$container} className={cx(bem(), className)} style={style}>
      <AspectRatio ratio={16 / 10} className={bem('imageContainer')}>
        <img
          className={bem('image')}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          src={imageSrc}
          alt={alt}
          aria-hidden={Boolean(alt)}
        />
      </AspectRatio>
      <div className={bem('content')}>
        <h3 className={bem('client')}>{client}</h3>
        <h4 className={bem('projectTitle')}>{title}</h4>
      </div>
    </div>
  )
}
