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
import { useWebglSceneStore } from './webgl-scene/WebglScene.store'
import type { HomeHero as HomeHeroProps } from '@customTypes/cms'
import { Description } from '@components/description'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
const bem = bemify(styles, 'homeHero')
const videoModalBem = bemify(styles, 'videoPlayerModal')

const WebglScene = dynamic(() => import('./webgl-scene/WebglScene').then((Mod) => Mod.WebglScene), {
  ssr: false,
  loading: () => <Loader className={bem('loader')} />,
})

export const HomeHero = ({ statement, showreelVideo, shieldVideo }: HomeHeroProps) => {
  const [loaded, setLoaded] = useState(false)
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
  // const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const lenis = useGlobalStateStore((state) => state.lenis)
  const isInView = useInView($container)

  useEffect(() => {
    if (!lenis) return
    if (['expanding', 'expanded', 'collapsing'].includes(shieldState)) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [shieldState, lenis])

  const showVideoPlayer = shieldState === 'expanding' || shieldState === 'expanded'

  return (
    <>
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
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          shieldVideo={shieldVideo}
          eventSource={$container}
          eventPrefix="client"
        />

        <div aria-hidden="true" className={bem('overlay')} data-visible={!loaded} />

        <h1 className={bem('title')} aria-label="North Kingdom">
          North Kingdom
        </h1>

        <Modal visible={showVideoPlayer} animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}>
          <CloseButton
            className={videoModalBem('closeButton')}
            onClick={() => dispatchShieldStateEvent({ type: 'COLLAPSE' })}
          />
          <VideoPlayer
            className={videoModalBem('videoPlayer')}
            autoPlay={true}
            playsinline={true}
            src={showreelVideo}
            controls={true}
            poster=""
          />
        </Modal>
      </div>
      <ContentWrapper className={bem('statement')}>
        <Description copyLeft={statement} theme="dark" />
      </ContentWrapper>
    </>
  )
}
