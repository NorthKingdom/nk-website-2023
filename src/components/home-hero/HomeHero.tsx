import React, { useEffect, useRef, useState } from 'react'
import styles from './HomeHero.module.scss'
import { bemify } from '@utils/bemify'
import { use100vh } from 'react-div-100vh'
import dynamic from 'next/dynamic'
import { Loader } from '@components/loader'
import { VideoPlayer } from '@components/video-player'
import { useGlobalStateStore } from '@store'
import { Modal } from '@components/modal'
import { CloseButton } from '@components/close-button'
import { useInView } from 'framer-motion'
const bem = bemify(styles, 'homeHero')
const videoModalBem = bemify(styles, 'videoPlayerModal')

const WebglScene = dynamic(() => import('./webgl-scene/WebglScene').then((Mod) => Mod.WebglScene), {
  ssr: false,
  loading: () => <Loader className={bem('loader')} />,
})

interface HomeHeroProps {}

export const HomeHero = (props: HomeHeroProps) => {
  const [loaded, setLoaded] = useState(false)
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const lenis = useGlobalStateStore((state) => state.lenis)
  const isInView = useInView($container)

  useEffect(() => {
    if (!lenis) return
    if (showVideoPlayer) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [showVideoPlayer, lenis])

  return (
    <div
      className={bem()}
      ref={$container}
      style={{
        position: 'relative',
        height: height100vh,
        width: ' 100%',
        backgroundColor: 'var(--color-black)',
        touchAction: 'auto',
      }}
    >
      <WebglScene
        onLoaded={() => setLoaded(true)}
        visible={isInView}
        fullscreen={showVideoPlayer}
        onCtaClick={() => setShowVideoPlayer(true)}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        eventSource={$container}
        eventPrefix="client"
      />

      <h1 className={bem('title')} aria-label="North Kingdom">
        North Kingdom
      </h1>

      <h2 className={bem('statement')} data-visible={loaded && !showVideoPlayer}>
        A global design studio that creates experiences, services and products which play meaningful roles in people’s
        lives
      </h2>

      <Modal visible={showVideoPlayer} animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}>
        <CloseButton className={videoModalBem('closeButton')} onClick={() => setShowVideoPlayer(false)} />
        <VideoPlayer
          className={videoModalBem('videoPlayer')}
          autoPlay={true}
          playsinline={true}
          src={{
            muted: true,
            loop: true,
            autoPlay: true,
            srcCollection: {
              items: [
                {
                  url: '/dummy/showreel23.mp4',
                },
              ],
            },
            posterImage: { url: '/dummy/showreel-poster.jpg' },
          }}
          poster=""
        />
      </Modal>
    </div>
  )
}
