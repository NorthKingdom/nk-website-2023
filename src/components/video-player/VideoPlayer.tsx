import React from 'react'
import styles from './VideoPlayer.module.scss'
import { bemify } from '@utils/bemify'
const bem = bemify(styles, 'videoPlayer')

interface VideoPlayerProps {
  src: {
    url: string
  }[]
  className?: string
  poster: string
  playsinline?: boolean
  controls?: boolean
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
}

export const VideoPlayer = ({
  className,
  src,
  poster,
  playsinline = false,
  controls = false,
  muted = true,
  loop = false,
  autoPlay = false,
}: VideoPlayerProps) => {
  return (
    <video
      className={`${styles['videoPlayer']} ${className}`}
      poster={poster}
      playsInline={playsinline}
      // TODO :: Create custom controls and switch this to false
      controls={true}
      muted={muted}
      autoPlay={autoPlay}
      loop={loop}
    >
      {src.map((s, i: number) => {
        // TODO :: fix 'type'
        return <source key={`video-src-${i}`} src={s.url} type="video/mp4" />
      })}

      {controls && <div>controls</div>}
    </video>
  )
}
