import React from 'react'
import styles from './IrregularGrid.module.scss'
import { bemify } from '@utils/bemify'
import type { IrregularGridPayload } from '@customTypes/cms'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useBreakpointUntil } from '@hooks/use-breakpoint'
const bem = bemify(styles, 'irregularGrid')

type IrregularGridProps = IrregularGridPayload['itemsCollection']

const MEDIA_ASPECT = {
  mobile: [165 / 220, 165 / 220, 165 / 220, 165 / 220],
  desktop: [571 / 390, 452 / 316, 452 / 316, 217 / 230],
}

export const IrregularGrid = ({ items }: IrregularGridProps) => {
  const isUntilTablet = useBreakpointUntil('tablet')
  const mediaAspectRatios = isUntilTablet ? MEDIA_ASPECT.mobile : MEDIA_ASPECT.desktop

  return (
    <div className={bem()}>
      <div className={bem('left')}>
        <div className={bem('left__mediaContainer')}>
          <AspectRatio ratio={mediaAspectRatios[0]}>
            <Media {...items[0].media} />
          </AspectRatio>
          {!!items[0].caption && <p className={bem('caption')}>{items[0].caption}</p>}
        </div>
        <div className={bem('left__mediaContainer')}>
          <AspectRatio ratio={mediaAspectRatios[1]}>
            <Media {...items[1].media} />
          </AspectRatio>
          {!!items[1].caption && <p className={bem('caption')}>{items[1].caption}</p>}
        </div>
      </div>

      <div className={bem('right')}>
        <div className={bem('right__mediaContainer')}>
          <AspectRatio ratio={mediaAspectRatios[2]}>
            <Media {...items[2].media} />
          </AspectRatio>
          {!!items[2].caption && <p className={bem('caption')}>{items[2].caption}</p>}
        </div>

        <div className={bem('right__mediaContainer')}>
          <AspectRatio ratio={mediaAspectRatios[3]}>
            <Media {...items[3].media} />
          </AspectRatio>
          {!!items[3].caption && <p className={bem('caption')}>{items[3].caption}</p>}
        </div>
      </div>
    </div>
  )
}
