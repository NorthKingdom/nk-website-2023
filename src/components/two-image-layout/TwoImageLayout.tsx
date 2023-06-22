import React from 'react'
import { bemify } from '@utils/bemify'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import styles from './TwoImageLayout.module.scss'
import type { ResponsiveImagePayload } from '@customTypes/cms'
const bem = bemify(styles, 'twoImageLayout')

interface TwoImageLayoutProps {
  leftSrcSet: ResponsiveImagePayload
  leftCaption?: string
  rightSrcSet: ResponsiveImagePayload
  rightCaption?: string
  leftAlt: string
  rightAlt: string
}

export const TwoImageLayout = ({ leftSrcSet, leftCaption, rightSrcSet, rightCaption }: TwoImageLayoutProps) => {
  return (
    <section className={styles['twoImageLayout']}>
      <div className={`${bem('container')} ${bem('container--left')}`}>
        <AspectRatio ratio={690 / 517}>
          <Media {...leftSrcSet} className={bem('image')} />
        </AspectRatio>
        {leftCaption && <p className={bem('caption')}>{leftCaption}</p>}
      </div>
      <div className={`${bem('container')} ${bem('container--right')}`}>
        <AspectRatio ratio={690 / 517}>
          <Media {...rightSrcSet} className={bem('image')} />
        </AspectRatio>
        {rightCaption && <p className={bem('caption')}>{rightCaption}</p>}
      </div>
    </section>
  )
}
