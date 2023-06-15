import React from 'react'
import styles from './FullbleedMedia.module.scss'
import { Media } from '@components/media'
import type { ImageMediaProps, VideoMediaProps } from '@components/media'
import { AspectRatio } from '@components/aspect-ratio/AspectRatio'
import { useBreakpointFrom } from '@hooks/use-breakpoint'

function getMediaAspect(media: ImageMediaProps | VideoMediaProps, isDesktopBp: boolean) {
  if (!media) return 0
  if (media.__typename === 'ResponsiveImage') {
    const image = isDesktopBp ? media.desktopImage : media.mobileImage
    return image.width / image.height
  } else if (media.__typename === 'Video') {
    const videoCollection = isDesktopBp ? media.desktopVideoCollection : media.mobileVideoCollection
    const video = videoCollection.items[0]
    return video.width / video.height
  } else {
    return 0
  }
}

export const FullbleedMedia = (props: ImageMediaProps | VideoMediaProps) => {
  const isDesktopBp = useBreakpointFrom('tablet')

  const mediaAspectRatio = getMediaAspect(props, isDesktopBp)

  return (
    <AspectRatio ratio={mediaAspectRatio} className={styles['fullbleedMedia']}>
      <Media {...props} />
    </AspectRatio>
  )
}
