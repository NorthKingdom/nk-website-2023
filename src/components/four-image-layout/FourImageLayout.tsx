import React from 'react'
import styles from './FourImageLayout.module.scss'
import { bemify } from '@utils/bemify'
import { ResponsiveImage, Video } from '@customTypes/cms'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
const bem = bemify(styles, 'fourImageLayout')

interface FourImageLayoutProps {
  media: (ResponsiveImage | Video)[]
}

export const FourImageLayout = ({ media }: FourImageLayoutProps) => {
  return (
    <div className={styles['fourImageLayout']}>
      <div className={bem('left')}>
        <div className={bem('left__mediaContainer')}>
          <AspectRatio ratio={571 / 390} className={bem('aspectRatioLeft')}>
            <Media {...media[0]} className={bem('media')} />
          </AspectRatio>
        </div>
        <div className={bem('left__mediaContainer')}>
          <AspectRatio ratio={452 / 316} className={bem('aspectRatioLeft')}>
            <Media {...media[1]} className={bem('media')} />
          </AspectRatio>
        </div>
      </div>

      <div className={bem('right')}>
        <div className={bem('right__mediaContainer')}>
          <AspectRatio ratio={452 / 316} className={bem('aspectRatioRight')}>
            <Media {...media[2]} className={bem('media')} />
          </AspectRatio>
        </div>

        <div className={bem('right__mediaContainer')}>
          <AspectRatio ratio={217 / 230} className={bem('aspectRatioRight')}>
            <Media {...media[3]} className={bem('media')} />
          </AspectRatio>
        </div>
      </div>
    </div>
  )
}
