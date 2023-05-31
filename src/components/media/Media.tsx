import React from 'react'
import { VideoPlayer } from '@components/video-player'
import type { Video, ResponsiveImage } from '@customTypes/cms'
import Image from 'next/image'
import { getContentfulImageSrc } from '@utils/contentful'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'

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

  if (props.caseHero) {
    console.log(props.caseHero, props.client)
    console.log(`casehero layout id is: `, props.caseHero && props.client === 'RIOT' ? 'layoutidid' : '_no id_')
  }

  return (
    <>
      {props?.__typename === 'Video' || props?.desktopVideoCollection ? (
        <VideoPlayer poster={(props as VideoMediaProps).posterImage.url} src={props as VideoMediaProps} {...props} />
      ) : props?.__typename === 'ResponsiveImage' ? (
        <AnimatePresence>
          <motion.div
            layoutId={props.caseHero && props.client === 'RIOT' ? 'layoutidid' : ''}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
          >
            <img
              //

              src="/dummy/riotxarcane-map.jpg"
              // exit={{ scale: 14, transition: { duration: 0 } }}
            />
          </motion.div>
        </AnimatePresence>
      ) : null}
    </>
  )
}
