import React, { useEffect, useRef, useState } from 'react'
import styles from './HomeHero.module.scss'
import { bemify } from '@utils/bemify'
import { use100vh } from 'react-div-100vh'
import dynamic from 'next/dynamic'
import { Loader } from '@components/loader'
import { useGlobalStateStore } from '@store'
import { Modal } from '@components/modal'
import { CloseButton } from '@components/close-button'
import { useInView } from 'framer-motion'
import { useWebglSceneStore } from './webgl-scene/WebglScene.store'
import type { HomeHero as HomeHeroProps } from '@customTypes/cms'
import { TextBlock } from '@components/text-block'
import { ContentWrapper } from '@components/content-wrapper/ContentWrapper'
const bem = bemify(styles, 'homeHero')
const videoModalBem = bemify(styles, 'videoPlayerModal')

const WebglScene = dynamic(() => import('./webgl-scene/WebglScene').then((Mod) => Mod.WebglScene), {
  ssr: false,
})

const VideoPlayer = dynamic(() => import('@components/video-player').then((Mod) => Mod.VideoPlayer), {
  ssr: false,
})

export const HomeHero = ({ statement, showreelVideo, shieldVideo }: HomeHeroProps) => {
  const [loaded, setLoaded] = useState(false)
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
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

        {/* image to improve LCP */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          aria-hidden={true}
          alt=""
          className={bem('lcp')}
          width={99999}
          height={99999}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTk5OTlweCIgaGVpZ2h0PSI5OTk5OXB4IiB2aWV3Qm94PSIwIDAgOTk5OTkgOTk5OTkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiIGZpbGwtb3BhY2l0eT0iMCI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijk5OTk5IiBoZWlnaHQ9Ijk5OTk5Ij48L3JlY3Q+CiAgICA8L2c+Cjwvc3ZnPg=="
        />

        <div aria-hidden="true" className={bem('overlay')} data-visible={!loaded}>
          <Loader className={bem('loader')} />
        </div>

        <h1 className={bem('title')} aria-label="North Kingdom">
          North Kingdom
        </h1>

        <Modal visible={showVideoPlayer} animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4 } }}>
          <CloseButton
            className={videoModalBem('closeButton')}
            onClick={() => dispatchShieldStateEvent({ type: 'COLLAPSE' })}
          />
          {loaded && (
            <VideoPlayer
              className={videoModalBem('videoPlayer')}
              autoPlay={true}
              playsInline={true}
              src={showreelVideo}
              controls={true}
              poster=""
            />
          )}
        </Modal>
      </div>
      <TextBlock copyLeft={statement} theme="dark" notch={false} />
    </>
  )
}
