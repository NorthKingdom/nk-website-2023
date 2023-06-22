import React from 'react'
import styles from './CaseListItem.module.scss'
import { bemify } from '@utils/bemify'
import type { CasePayload } from '@customTypes/cms'
import type { ContentfulMediaSrcImageOptions } from '@hooks/use-contentful-media-src'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useInViewAnimation } from '@hooks/use-inview-animation'
const bem = bemify(styles, 'caseListItem')
import { Media } from '@components/media/Media'
import cx from 'clsx'
import Link from 'next/link'
import { useIsTouchDevice } from '@hooks/use-is-touch-device'
import Image from 'next/image'

interface CaseListItemProps extends CasePayload {
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
  slug = '',
  client = '',
  index,
  alt = '',
  thumbnail,
}: CaseListItemProps) => {
  const containerRef = useInViewAnimation('animate-image-fade-up')
  const blurredThumbBgRef = React.useRef<HTMLImageElement>(null)
  const isTouchDevice = useIsTouchDevice()

  const mediaProps =
    thumbnail?.__typename === 'Video'
      ? {
          playsInline: true,
          autoPlay: true,
          muted: true,
        }
      : thumbnail?.__typename === 'ResponsiveImage'
      ? {
          width: 400,
          height: 400 * (10 / 16),
        }
      : {}

  const blurredThumbBgSrc = getBlurredThumbBgSrc(thumbnail, {
    width: 400,
  })

  return (
    <div ref={containerRef} className={cx(bem(), className)} style={style}>
      <Link href="/case/[case]" as={`/case/${slug ?? title}`}>
        <div className={bem('thumbnailContainer')}>
          <AspectRatio ratio={16 / 10} className={bem('thumbnailBox')}>
            <Media className={bem('thumbnail')} {...thumbnail} {...mediaProps} index={index} alt={alt} />
          </AspectRatio>
          {!isTouchDevice && !!blurredThumbBgSrc && (
            <Image
              ref={blurredThumbBgRef}
              className={bem('thumbnailBg')}
              aria-hidden="true"
              alt="case blurred background thumbnail"
              src={blurredThumbBgSrc}
              fill
            />
          )}
        </div>
        <div className={bem('content')}>
          <h3 className={bem('client')}>{client}</h3>
          <h4 className={bem('projectTitle')}>{title}</h4>
        </div>
      </Link>
    </div>
  )
}

function getBlurredThumbBgSrc(thumbnail: CasePayload['thumbnail'], options: ContentfulMediaSrcImageOptions = {}) {
  if (!thumbnail) return null

  const thumbSrc =
    thumbnail?.__typename === 'ResponsiveImage'
      ? thumbnail.mobileImage.url ?? thumbnail.desktopImage.url
      : thumbnail.posterImage.url

  const imageParams: { [key: string]: any } = {
    q: options.quality ?? '20',
    fit: 'thumb',
    fm: options.format ?? 'webp',
  }

  if (!!options.width) imageParams.w = options.width
  if (!!options.height) imageParams.h = options.height

  const imageParamsString = new URLSearchParams(imageParams).toString()

  return `${thumbSrc}?${imageParamsString}`
}
