import { CloseButton } from '@components/close-button'
import { Loader as LoaderSVG } from '@components/loader'
import { Modal } from '@components/modal'
import { TextBlock } from '@components/text-block'
import type { HomeHero as HomeHeroProps } from '@customTypes/cms'
import { useGlobalStateStore } from '@store'
import { bemify } from '@utils/bemify'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { use100vh } from 'react-div-100vh'
import styles from './HomeHero.module.scss'
import includes from 'ramda/es/includes'
import { useWebglSceneStore } from './webgl-scene/WebglScene.store'
import { EASINGS } from '@utils/motion-guidelines'

const bem = bemify(styles, 'homeHero')
const videoModalBem = bemify(styles, 'videoPlayerModal')

const WebglScene = dynamic(() => import('./webgl-scene/WebglScene').then((Mod) => Mod.WebglScene), { ssr: false })
const VideoPlayer = dynamic(() => import('@components/video-player').then((Mod) => Mod.VideoPlayer), { ssr: false })

const MOTION_CONFIG = {
  LOADER_EXIT: {
    scale: 0.05,
    transition: {
      delay: 0.2,
      duration: 0.7,
      ease: EASINGS.EASE_IN_CIRC,
    },
  },
  MODAL_SHOW: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.4 },
  },
}

export const HomeHero = ({ statement, showreelVideo, shieldVideo, shieldLightLeakColorVtt }: HomeHeroProps) => {
  const $container = useRef<HTMLDivElement>(null)
  const height100vh = use100vh() as number
  const set = useWebglSceneStore((state) => state.set)
  const isSceneLoaded = useWebglSceneStore((state) => state.isSceneLoaded)
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
  const lenis = useGlobalStateStore((state) => state.lenis)
  const isInView = useInView($container)

  const showVideoPlayer = includes(shieldState, ['expanding', 'expanded'])
  const preventScroll = includes(shieldState, ['expanding', 'expanded', 'collapsing'])

  // prevent scroll when shield is expanded
  useEffect(() => (preventScroll ? lenis?.stop() : lenis?.start()), [preventScroll, lenis])

  return (
    <>
      <div ref={$container} className={bem()} style={{ height: height100vh }}>
        <WebglScene
          className={bem('webglScene')}
          onLoaded={() => set({ isSceneLoaded: true })}
          visible={isInView}
          shieldVideo={shieldVideo}
          shieldLightLeakColorVtt={shieldLightLeakColorVtt}
          eventSource={$container}
          eventPrefix="client"
        />

        {/* image to improve LCP */}
        <LCPimage />

        <Loader
          show={!isSceneLoaded}
          onAnimateOut={() => dispatchShieldStateEvent({ type: 'LOADER_OUT_TRANSITION_END' })}
        />

        <div aria-hidden="true" className={bem('overlay')} data-visible={!isSceneLoaded} />

        <h1 className={bem('title')} aria-label="North Kingdom">
          North Kingdom
        </h1>

        <Modal visible={showVideoPlayer} animate={MOTION_CONFIG.MODAL_SHOW}>
          <CloseButton
            className={videoModalBem('closeButton')}
            onClick={() => dispatchShieldStateEvent({ type: 'COLLAPSE' })}
          />
          {isSceneLoaded && (
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

const Loader = ({ show, onAnimateOut }: { show: boolean; onAnimateOut: () => void }) => (
  <AnimatePresence initial={false}>
    {show && (
      <motion.div
        className={bem('loader')}
        style={{ x: '-50%', y: '-50%' }}
        exit={MOTION_CONFIG.LOADER_EXIT}
        onAnimationComplete={onAnimateOut}
      >
        <LoaderSVG />
      </motion.div>
    )}
  </AnimatePresence>
)

const LCPimage = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    aria-hidden={true}
    alt=""
    className={bem('lcp')}
    width={99999}
    height={99999}
    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTk5OTlweCIgaGVpZ2h0PSI5OTk5OXB4IiB2aWV3Qm94PSIwIDAgOTk5OTkgOTk5OTkiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiIGZpbGwtb3BhY2l0eT0iMCI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9Ijk5OTk5IiBoZWlnaHQ9Ijk5OTk5Ij48L3JlY3Q+CiAgICA8L2c+Cjwvc3ZnPg=="
  />
)
