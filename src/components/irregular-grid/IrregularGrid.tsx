import React from 'react'
import styles from './IrregularGrid.module.scss'
import { bemify } from '@utils/bemify'
import { ResponsiveImage, Video } from '@customTypes/cms'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
const bem = bemify(styles, 'irregularGrid')

interface IrregularGridProps {
  media: (ResponsiveImage | Video)[]
}

const MEDIA_ASPECT = {
  mobile: [165 / 220, 165 / 220, 165 / 220, 165 / 220],
  desktop: [571 / 390, 452 / 316, 452 / 316, 217 / 230],
}

export const IrregularGrid = ({ media }: IrregularGridProps) => {
  const isUntilTablet = useBreakpointUntil('tablet')
  const mediaAspectRatios = isUntilTablet ? MEDIA_ASPECT.mobile : MEDIA_ASPECT.desktop

  return (
    <div className={bem()}>
      <div className={bem('left')}>
        <AspectRatio ratio={mediaAspectRatios[0]} className={bem('left__mediaContainer')}>
          <Media {...media[0]} className={bem('media')} />
        </AspectRatio>
        <AspectRatio ratio={mediaAspectRatios[1]} className={bem('left__mediaContainer')}>
          <Media {...media[1]} className={bem('media')} />
        </AspectRatio>
      </div>

      <div className={bem('right')}>
        <AspectRatio ratio={mediaAspectRatios[3]} className={bem('right__mediaContainer')}>
          <Media {...media[2]} className={bem('media')} />
        </AspectRatio>
        <AspectRatio ratio={mediaAspectRatios[3]} className={bem('right__mediaContainer')}>
          <Media {...media[3]} className={bem('media')} />
        </AspectRatio>
      </div>
    </div>
  )
}
