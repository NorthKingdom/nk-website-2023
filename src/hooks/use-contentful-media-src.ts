import type { Video, ResponsiveImage } from '@customTypes/cms'
import { useBreakpointUntil } from './use-breakpoint'
import { getMimeTypeFromFilename } from '@utils/media-mime-types'

type Srcset = {
  url: string
  type: string
}[]

/**
 * This hook is used to get the src and srcset for a media object (Video | ResponsiveImage) from Contentful based on the current breakpoint
 * @param {Video | ResponsiveImage} media Video or ResponsiveImage object from Contentful
 * @returns {Object} The location of the event
 */
export const useContentfulMediaSrc = (
  media: Video | ResponsiveImage
): {
  src: string
  srcset: Srcset
} => {
  const isMobileBreakpoint = useBreakpointUntil('tablet')

  if (!media) {
    return {
      src: '',
      srcset: [],
    }
  }

  const isVideo = media.__typename === 'Video'
  const isImage = media.__typename === 'ResponsiveImage'

  if (isVideo) {
    const video = media as Video
    const { items: sources } = isMobileBreakpoint ? video.mobileVideoCollection : video.desktopVideoCollection

    return {
      src: sources[0]?.url ?? '',
      srcset: sources.map(({ url }) => ({ url, type: getMimeTypeFromFilename(url) ?? '' })),
    }
  } else if (isImage) {
    const image = media as ResponsiveImage
    const src = isMobileBreakpoint ? image.mobileImage.url : image.desktopImage.url

    // @TODO: image URL transformations here

    return {
      src,
      srcset: [],
    }
  }

  return {
    src: '',
    srcset: [],
  }
}
