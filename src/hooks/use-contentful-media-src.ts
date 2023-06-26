import { getMimeTypeFromFilename } from '@utils/media-mime-types'
import { useBreakpointUntil } from './use-breakpoint'
import type { VideoPayload, ResponsiveImagePayload, AssetPayload } from '@customTypes/cms'

type Srcset = {
  url: string
  type: string
}[]

export interface ContentfulMediaSrcImageOptions {
  format?: 'webp' | 'jpg' | 'png' | 'gif' | 'svg' | 'avif'
  width?: number
  height?: number
  quality?: number
}

interface ContentfulMediaSrcVideoOptions {}

interface ContentfulMediaSrcOptions extends ContentfulMediaSrcImageOptions, ContentfulMediaSrcVideoOptions {}

/**
 * This hook is used to get the src and srcset for a media object (VideoPayload | ResponsiveImage) from Contentful based on the current breakpoint
 * @param {VideoPayload | ResponsiveImagePayload} media VideoPayload or ResponsiveImagePayload object from Contentful
 * @returns {Object} The location of the event
 */

export const useContentfulMediaSrc = (
  media: VideoPayload | ResponsiveImagePayload | AssetPayload,
  options: ContentfulMediaSrcOptions = {}
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
  const isAsset = media.__typename === 'Asset'

  if (isVideo) {
    const video = media as VideoPayload
    const { items: sources } = isMobileBreakpoint ? video.mobileVideoCollection : video.desktopVideoCollection

    return {
      src: sources[0]?.url ?? '',
      srcset: sources.map(({ url }) => ({ url, type: getMimeTypeFromFilename(url) ?? '' })),
    }
  } else if (isImage || isAsset) {
    const image = isAsset
      ? { mobileImage: { ...media }, desktopImage: { ...media } }
      : (media as ResponsiveImagePayload)
    const src = isMobileBreakpoint ? image.mobileImage.url : image.desktopImage.url

    const imageParams: { [key: string]: any } = {
      q: options.quality ?? '80',
      fit: 'thumb',
      fm: options.format ?? 'webp',
    }

    if (!!options.width) imageParams.w = options.width
    if (!!options.height) imageParams.h = options.height

    const imageParamsString = new URLSearchParams(imageParams).toString()

    return {
      src: `${src}?${imageParamsString}`,
      srcset: [],
    }
  }

  return {
    src: '',
    srcset: [],
  }
}
