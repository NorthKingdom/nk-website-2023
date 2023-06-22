import { useState } from 'react'
import { bemify } from '@utils/bemify'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
import { Media } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import styles from './FeaturedVideo.module.scss'
import type { FeaturedVideoPayload } from '@customTypes/cms'
const bem = bemify(styles, 'featuredVideo')

export const FeaturedVideo = (props: FeaturedVideoPayload) => {
  const [showOverlay, setShowOverlay] = useState(true)

  return (
    <AspectRatio className={bem()} ratio={16 / 9} data-debug>
      <Media {...props.video} autoPlay={false} muted={true} controls={true} onPlay={() => setShowOverlay(false)} />
      <ContentWrapper className={bem('overlay')} theme="transparent" data-show={showOverlay}>
        <h2 className={bem('textBlock')}>{props.title}</h2>
        <p className={bem('textBlock')}>{props.description}</p>
      </ContentWrapper>
    </AspectRatio>
  )
}
