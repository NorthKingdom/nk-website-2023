import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import pick from 'ramda/src/pick'
import omit from 'ramda/src/omit'
import cx from 'clsx'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
import { getContentfulImageSrc } from '@utils/contentful'
import { VideoPlayer } from '@components/video-player'
import styles from './Media.module.scss'
import type { VideoPayload, ResponsiveImagePayload } from '@customTypes/cms'

// @TODO: add support for light background loader animation
// @TODO: check that the source is from contentful before adding Image query params

export interface VideoMediaProps extends VideoPayload {
  index?: number
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

export interface ImageMediaProps extends ResponsiveImagePayload {
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

  const videoPlayerProps = omit(['__typename', 'desktopVideoCollection', 'mobileVideoCollection', 'posterImage'], props)
  const imageProps = pick(['width', 'height', 'style'], props)

  // console.log(props)

  return (
    <>
      {props?.__typename === 'Video' || props?.desktopVideoCollection ? (
        <VideoPlayer
          className={cx(styles['media'], props.className)}
          poster={(props as VideoMediaProps).posterImage.url}
          src={props as VideoMediaProps}
          onError={() => setLoaded(false)}
          onCanPlay={() => setLoaded(true)}
          {...videoPlayerProps}
          // poster={props.caseHeroImage ? undefined : (props as VideoMediaProps).posterImage.url}
        />
      ) : props?.__typename === 'ResponsiveImage' ? (
        <Image
          className={cx(styles['media'], props.className)}
          fetchPriority={props?.index === 0 || props.caseHeroImage ? 'high' : 'auto'}
          loading={props.caseHeroImage ? 'eager' : 'lazy'}
          src={getContentfulImageSrc(src)}
          alt={(props as ImageMediaProps).altText}
          fill={true}
          onError={() => setLoaded(false)}
          onLoadingComplete={() => setLoaded(true)}
          {...imageProps}
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
