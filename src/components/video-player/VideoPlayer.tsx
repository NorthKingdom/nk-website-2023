import React, { useEffect, useId, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBreakpointFrom } from '@hooks/use-breakpoint'
import { noop } from '@utils/noop'
import { PlayButton } from '@components/play-button'
import { CloseButton } from '@components/close-button'
import styles from './VideoPlayer.module.scss'
import type { ComponentPropsWithoutRef } from 'react'
import type { VideoPayload } from '@customTypes/cms'
import 'plyr/dist/plyr.css'

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

interface VideoPlayerProps extends Omit<ComponentPropsWithoutRef<'video'>, 'src'> {
  src: VideoPayload
  className?: string
  poster?: string
  playsInline?: boolean
  controls?: boolean
  muted?: boolean
  autoPlay?: boolean
  loop?: boolean
}

export const VideoPlayer = ({
  className,
  src,
  poster,
  playsInline = false,
  controls = false,
  muted = true,
  loop = false,
  autoPlay = false,
  onCanPlay = noop,
  onPlay = noop,
  ...props
}: VideoPlayerProps) => {
  const id = useId()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const bpFromDesktopSmall = useBreakpointFrom('desktopSmall')
  const [hasStartedPlayback, setHasStartedPlayback] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [plyrInstance, setPlyrInstance] = React.useState<any>(null)

  const usePlyr = !autoPlay || controls
  const showPlayButton = usePlyr && !hasStartedPlayback

  useEffect(() => {
    if (!usePlyr) return

    let plyr: any

    async function instantiatePlyr() {
      const Plyr = (await import('plyr')).default
      plyr = new Plyr(`#${CSS.escape(id)}`, {
        controls: controls ? _plyrControls : [],
        muted: muted,
        autoplay: autoPlay,
        hideControls: false,
        clickToPlay: !playsInline,
        loop: {
          active: loop,
        },
        fullscreen: {
          enabled: !playsInline,
          fallback: true,
          iosNative: true,
          container: `#video-player-${CSS.escape(id)}`,
        },
      })

      // event listeners
      plyr.on('enterfullscreen', () => setIsFullscreen(true))
      plyr.on('exitfullscreen', () => setIsFullscreen(false))

      // autoplay fix
      if (autoPlay && playsInline) {
        plyr.play()
      }

      setPlyrInstance(plyr)
    }

    instantiatePlyr()

    return () => {
      plyr.destroy()
    }
  }, [usePlyr])

  useEffect(() => {
    if (!plyrInstance) return
    plyrInstance.toggleControls(hasStartedPlayback)
  }, [plyrInstance, hasStartedPlayback])

  /**
   * Fix for onCanPlay event not firing when an autoplaying video is already loaded.
   */
  useEffect(() => {
    if (!videoRef.current) return
    // @ts-ignore
    if (videoRef.current.readyState >= 3) onCanPlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hasMobileVideo = src.mobileVideoCollection.items.length > 0

  const srcset = useMemo(() => {
    const sources = [
      ...(!bpFromDesktopSmall && hasMobileVideo ? src.mobileVideoCollection.items : src.desktopVideoCollection.items),
    ]

    return sources.sort((_, filenameB) => {
      const fileExtensionB = filenameB.url.split('.').pop()
      return fileExtensionB === 'webm' ? 1 : -1
    })
  }, [src, bpFromDesktopSmall, hasMobileVideo])

  return (
    <div id={`video-player-${id}`} className={`${styles['videoPlayer']} ${className}`} style={props.style}>
      <video
        ref={videoRef}
        id={id}
        data-id={id}
        poster={poster}
        data-poster={poster}
        playsInline={playsInline}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
        onCanPlay={onCanPlay}
        onPlay={(event) => {
          setHasStartedPlayback(true)
          onPlay(event)
        }}
        {...props}
      >
        {srcset.map((s) => (
          <source key={s.url} src={s.url} type={s.contentType} />
        ))}
      </video>
      <AnimatePresence>
        {showPlayButton && (
          <div role="presentation" className={styles['playBtnContainer']}>
            <PlayButton
              as={motion.button}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="button"
              aria-label="Play video"
              data-show={true}
              onClick={() => plyrInstance?.play()}
            />
          </div>
        )}
      </AnimatePresence>

      {isFullscreen && (
        <div role="presentation" className={styles['exitFullscreenBtnContainer']}>
          <CloseButton
            type="button"
            aria-label="Exit fullscreen"
            data-show={true}
            onClick={() => plyrInstance?.fullscreen.exit()}
          />
        </div>
      )}
    </div>
  )
}
