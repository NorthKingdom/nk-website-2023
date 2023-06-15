import { useState } from 'react'
import styles from './FeaturedVideo.module.scss'
import { bemify } from '@utils/bemify'
import type { FeaturedVideo as FeaturedVideoProps } from '@customTypes/cms'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { Media } from '@components/media'
const bem = bemify(styles, 'featuredVideo')

export const FeaturedVideo = (props: FeaturedVideoProps) => {
  const [showOverlay, setShowOverlay] = useState(true)

  return (
    <div className={bem()}>
      <Media
        {...props.video}
        autoPlay={false}
        muted={true}
        controls={true}
        onPlay={() => setShowOverlay(false)}
        onPause={() => setShowOverlay(true)}
      />
      <ContentWrapper className={bem('overlay')} theme="transparent" data-show={showOverlay}>
        <h2 className={bem('textBlock')}>{props.title}</h2>
        <p className={bem('textBlock')}>{props.description}</p>
      </ContentWrapper>
    </div>
  )
}
