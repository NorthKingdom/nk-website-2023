import type { HomeHero as HomeHeroPayload } from '@customTypes/cms'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useGlobalStateStore } from '@store'
import { noop } from '@utils/noop'
import cx from 'clsx'
import { useControls } from 'leva'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { Color } from 'three'
import { Lensflare } from './Lensflare'
import { PlayButton } from './PlayButton'
import { ShieldContainer } from './ShieldContainer'
import { useOnSceneLightColorChange } from './WebglScene.hooks'
import styles from './WebglScene.module.scss'
import { useWebglSceneStore } from './WebglScene.store'
import { Wordmark } from './Wordmark'
import includes from 'ramda/es/includes'
import { BlackOverlay } from './BlackOverlay'

const Perf = dynamic(() => import('r3f-perf').then((Mod) => Mod.Perf), { ssr: false })
const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const ShieldVideo = dynamic(() => import('./ShieldVideo').then((Mod) => Mod.ShieldVideo), { ssr: false })
const ShieldBackgroundLight = dynamic(
  () => import('./ShieldBackgroundLight').then((Mod) => Mod.ShieldBackgroundLight),
  { ssr: false }
)

interface WebglSceneProps extends Pick<HomeHeroPayload, 'shieldVideo' | 'shieldLightLeakColorVtt'> {
  visible?: boolean
  onLoaded?: () => void
  [key: string]: any
}

export const WebglScene = ({
  visible = true,
  shieldVideo,
  shieldLightLeakColorVtt,
  className = '',
  onLoaded = noop,
  ...props
}: WebglSceneProps) => {
  const debug = useGlobalStateStore((state) => state.debug)
  const set = useWebglSceneStore((state) => state.set)
  const getWebglSceneState = useWebglSceneStore((state) => state.get)
  const setWebglSceneState = useWebglSceneStore((state) => state.set)
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
  const isMenuOpen = useGlobalStateStore((state) => state.isMenuOpen)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')
  const { src: videoSrc } = useContentfulMediaSrc(shieldVideo)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onLoaded, [])

  useEffect(() => setFrameloop(isMenuOpen ? 'never' : 'always'), [isMenuOpen])
  useEffect(() => setFrameloop(visible ? 'always' : 'never'), [visible])
  useEffect(() => setFrameloop(shieldState === 'expanded' ? 'never' : 'always'), [shieldState])

  // TODO: remove in production
  const [_, setControls] = useControls('WebglScene', () => ({
    lightColor: {
      name: 'Light Color',
      value: '#31B5FF',
      onEditStart: () => {
        setWebglSceneState({ isEditing: true, isShieldVideoPlaying: false })
      },
      onEditEnd: () => {
        setWebglSceneState({ isEditing: false })
      },
      onChange: (v) => {
        if (getWebglSceneState().isEditing) setWebglSceneState({ lightColor: new Color(v) })
      },
    },
  }))

  useOnSceneLightColorChange((color) => setControls({ lightColor: `#${color.getHexString()}` }))

  // cleanup
  useEffect(() => {
    return () => dispatchShieldStateEvent({ type: 'RESET' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Canvas
      className={cx(styles['webglCanvas'], className)}
      camera={{ position: [0, 0, 10] }}
      frameloop={frameloop}
      gl={{ powerPreference: 'high-performance', antialias: false }}
      {...props}
    >
      {debug && <Perf position="top-left" />}
      <Suspense fallback={null}>
        <Effects />

        <BlackOverlay show={shieldState === 'initial'} />

        <ShieldContainer>
          <ShieldVideo
            position-z={0.02}
            src={videoSrc}
            visible={shieldState !== 'initial'}
            onClick={() => dispatchShieldStateEvent({ type: 'CLICKED_SHIELD_VIDEO' })}
            shieldLightLeakColorVtt={shieldLightLeakColorVtt}
          />

          <ShieldBackgroundLight scale={2.2} position-z={-0.1} />

          <PlayButton
            onClick={() => dispatchShieldStateEvent({ type: 'CLICKED_SHIELD_VIDEO' })}
            data-visible={includes(shieldState, ['idle', 'hovered'])}
          />

          <Lensflare />
        </ShieldContainer>

        <Wordmark />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
