import React, { useEffect, useRef, useState } from 'react'
import styles from './HomeHero.module.scss'
import { bemify } from '@utils/bemify'
import { use100vh } from 'react-div-100vh'
import dynamic from 'next/dynamic'
import { Loader } from '@components/loader'
import { PlayButton } from '@components/play-button'
import { VideoPlayer } from '@components/video-player'
import { useGlobalStateStore } from '@store'
import { Modal } from '@components/modal'
const bem = bemify(styles, 'homeHero')

const Scene = dynamic(() => import('./scene/Scene').then((Mod) => Mod.Scene), {
  ssr: false,
  loading: () => <Loader className={bem('loader')} />,
})

interface HomeHeroProps {}

export const HomeHero = (props: HomeHeroProps) => {
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const frameloop = showVideoPlayer ? 'never' : 'always'
  const lenis = useGlobalStateStore((state) => state.lenis)

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
      <Scene
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        frameloop={frameloop}
        eventSource={$container}
        eventPrefix="client"
        cta={<PlayButton onClick={() => setShowVideoPlayer(true)} />}
      />
      <Modal visible={showVideoPlayer}>
        <button
          onClick={() => setShowVideoPlayer(false)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 1001,
            cursor: 'pointer',
          }}
        >
          Close
        </button>
        <VideoPlayer
          className={bem('videoPlayer')}
          autoPlay={true}
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
