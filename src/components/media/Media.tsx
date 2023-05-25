import React from 'react'
import { VideoPlayer } from '@components/video-player'
import type { Video, ResponsiveImage } from '@customTypes/cms'
import Image from 'next/image'
import { getContentfulImageSrc } from '@utils/contentful'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'

interface VideoMediaProps extends Video {
  index?: number
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

interface ImageMediaProps extends ResponsiveImage {
  index?: number
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

/**
 * Component that renders either a video player or an image component based on the type of media passed in.
 * @param {Video | Image} props - The media object from Contentful (either "Video" or "ResponsiveImage")
 * @returns {JSX.Element} - The media component (either a video player or an image component)
 */
export const Media = (props: VideoMediaProps | ImageMediaProps) => {
  const { src } = useContentfulMediaSrc(props)

  console.log(props)
  console.log(src)

  return (
    <>
      {props?.__typename === 'Video' || props?.desktopVideoCollection ? (
        <VideoPlayer poster={(props as VideoMediaProps).posterImage.url} src={props as VideoMediaProps} {...props} />
      ) : props?.__typename === 'ResponsiveImage' ? (
        <Image
          fetchPriority={props?.index === 0 ? 'high' : 'auto'}
          src={getContentfulImageSrc(src)}
          alt={(props as ImageMediaProps).altText}
          aria-hidden={Boolean((props as ImageMediaProps).altText)}
          fill={true}
          // width={150}
          // height={200}
          {...props}
        />
      ) : null}
    </>
  )
}
