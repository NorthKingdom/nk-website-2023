import React from 'react'
import styles from './CaseListItem.module.scss'
import { bemify } from '@utils/bemify'
import type { Case } from '@customTypes/cms'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useInViewAnimation } from '@hooks/use-inview-animation'
const bem = bemify(styles, 'caseListItem')
import { Media } from '@components/media/Media'
import Link from 'next/link'

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
  slug = '',
  client = '',
  index,
  alt = '',
  thumbnail,
}: CaseListItemProps) => {
  const $container = useInViewAnimation('animate-image-fade-up')

  const mediaProps =
    thumbnail?.__typename === 'Video'
      ? {
          playsinline: true,
          autoPlay: true,
          muted: true,
        }
      : thumbnail?.__typename === 'ResponsiveImage'
      ? {
          width: 400,
          height: 400 * (10 / 16),
        }
      : {}

  return (
    <Link href="/case/[case]" as={`/case/${slug ?? title}`}>
      <div ref={$container} className={className} style={style}>
        <AspectRatio ratio={16 / 10} className={bem('thumbnailContainer')}>
          <Media className={bem('thumbnail')} {...thumbnail} {...mediaProps} index={index} />
        </AspectRatio>
        <div className={bem('content')}>
          <h3 className={bem('client')}>{client}</h3>
          <h4 className={bem('projectTitle')}>{title}</h4>
        </div>
      </div>
    </Link>
  )
}
