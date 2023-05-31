import React, { useEffect, useRef, useState } from 'react'
import { VideoPlayer } from '@components/video-player'
import type { Video, ResponsiveImage } from '@customTypes/cms'
import Image from 'next/image'
import { getContentfulImageSrc } from '@utils/contentful'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
import styles from './Media.module.scss'

// @TODO: add support for light background loader animation

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
  const [loaded, setLoaded] = useState(false)
  const [loaderAnimationComplete, setLoaderAnimationComplete] = useState(false)
  const loadingOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loadingOverlayRef.current || !loaded) return

    loadingOverlayRef.current.addEventListener(
      'transitionend',
      () => {
        setLoaderAnimationComplete(true)
      },
      { once: true }
    )
  }, [loaded])

  return (
    <>
      {props?.__typename === 'Video' || props?.desktopVideoCollection ? (
        <VideoPlayer
          poster={(props as VideoMediaProps).posterImage.url}
          src={props as VideoMediaProps}
          onError={() => setLoaded(false)}
          onCanPlay={() => setLoaded(true)}
          {...props}
        />
      ) : props?.__typename === 'ResponsiveImage' ? (
        <Image
          fetchPriority={props?.index === 0 ? 'high' : 'auto'}
          src={getContentfulImageSrc(src)}
          alt={(props as ImageMediaProps).altText}
          aria-hidden={Boolean((props as ImageMediaProps).altText)}
          fill={true}
          onError={() => setLoaded(false)}
          onLoadingComplete={() => setLoaded(true)}
          {...props}
        />
      ) : null}
      <div
        ref={loadingOverlayRef}
        aria-hidden="true"
        className={styles['loading-overlay']}
        data-asset-loaded={loaded}
        data-load-out-animation-complete={loaderAnimationComplete}
        data-theme="dark"
      />
    </>
  )
}
