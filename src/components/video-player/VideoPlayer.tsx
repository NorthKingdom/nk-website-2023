import React, { useEffect, useId, useRef } from 'react'
import styles from './VideoPlayer.module.scss'
import { bemify } from '@utils/bemify'
import { Video } from '@customTypes/cms'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const bem = bemify(styles, 'videoPlayer')

const _plyrControls = `
<div class="plyr__controls">
    <button type="button" class="plyr__controls__item plyr__control" aria-label="Play, {title}" data-plyr="play">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
    </button>
    <div class="plyr__controls__item plyr__progress__container">
    <div class="plyr__progress">
        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
        <span role="tooltip" class="plyr__tooltip">00:00</span>
    </div>
    </div>
    <button type="button" class="${styles.customIcon} plyr__controls__item plyr__control" data-plyr="fullscreen">
    <svg class="icon--pressed" role="presentation"><use xlink:href="/icons/fullscreen-icon-definition.svg#exit-fullscreen"></use></svg>
    <svg class="icon--not-pressed" role="presentation"><use xlink:href="/icons/fullscreen-icon-definition.svg#enter-fullscreen"></use></svg>
    <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
    <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
</button>
    <button type="button" class="plyr__controls__item plyr__control" aria-label="Mute" data-plyr="mute">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
    </button>
</div>
`

interface VideoPlayerProps {
  src: Video
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
  const id = useId()

  useEffect(() => {
    const p = new Plyr(`#${CSS.escape(id)}`, {
      controls: controls ? _plyrControls : [],
      muted: muted,
      autoplay: autoPlay,
      clickToPlay: !playsinline,
      loop: {
        active: loop,
      },
      fullscreen: {
        enabled: !playsinline,
        fallback: true,
        iosNative: true,
        container: undefined,
      },
    })

    if (autoPlay) {
      p.play()
    }
  }, [])

  return (
    <div className={`${styles['videoPlayer']} ${className}`}>
      <video id={id} poster={poster} muted={muted}>
        {/* TODO :: Fix which array to loop through based on device desktopVideo or mobileVideo */}
        {src.desktopVideoCollection.items.map((s, i: number) => {
          // TODO :: fix 'type'
          return <source key={`video-src-${i}`} src={s.url} type="video/mp4" />
        })}

        {controls && <div>controls</div>}
      </video>
    </div>
  )
}
