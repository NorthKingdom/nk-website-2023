import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { useGlobalStateStore } from '@store'
import { ShieldContainer } from './ShieldContainer'
import { PlayButton } from './PlayButton'
import { noop } from '@utils/noop'
import { Wordmark } from './Wordmark'
import { useWebglSceneStore } from './WebglScene.store'
import type { Video } from '@customTypes/cms'
import { useContentfulMediaSrc } from '@hooks/use-contentful-media-src'
import { Lensflare } from './Lensflare'
import styles from './WebglScene.module.scss'

const Perf = dynamic(() => import('r3f-perf').then((Mod) => Mod.Perf), { ssr: false })
const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const ShieldVideo = dynamic(() => import('./ShieldVideo').then((Mod) => Mod.ShieldVideo), { ssr: false })
const ShieldBackgroundLight = dynamic(
  () => import('./ShieldBackgroundLight').then((Mod) => Mod.ShieldBackgroundLight),
  { ssr: false }
)

interface WebglSceneProps {
  shieldVideo: Video
  visible?: boolean
  onLoaded?: () => void
  [key: string]: any
}

export const WebglScene = ({ visible = true, shieldVideo, onLoaded = noop, ...props }: WebglSceneProps) => {
  const debug = useGlobalStateStore((state) => state.debug)
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
  const isMenuOpen = useGlobalStateStore((state) => state.isMenuOpen)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')
  const { src: videoSrc } = useContentfulMediaSrc(shieldVideo)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onLoaded, [])

  useEffect(() => {
    setFrameloop(isMenuOpen ? 'never' : 'always')
  }, [isMenuOpen])

  useEffect(() => {
    setFrameloop(visible ? 'always' : 'never')
  }, [visible])

  useEffect(() => {
    setFrameloop(shieldState === 'expanded' ? 'never' : 'always')
  }, [shieldState])

  return (
    <Canvas className={styles['webglCanvas']} camera={{ position: [0, 0, 5] }} frameloop={frameloop} {...props}>
      {debug && <Perf position="top-left" />}
      <Suspense fallback={null}>
        <Effects />
        <ShieldContainer debug={false}>
          <ShieldVideo position-z={0.02} src={videoSrc} visible={true} />
          <ShieldBackgroundLight scale={2.2} position-z={-0.1} visible={true} debug={false} />
          <PlayButton onClick={() => dispatchShieldStateEvent({ type: 'EXPAND' })} />
          <Lensflare />
        </ShieldContainer>
        <Wordmark />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
