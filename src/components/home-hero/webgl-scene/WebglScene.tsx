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

const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const ShieldVideo = dynamic(() => import('./ShieldVideo').then((Mod) => Mod.ShieldVideo), { ssr: false })
const ShieldBackgroundLight = dynamic(
  () => import('./ShieldBackgroundLight').then((Mod) => Mod.ShieldBackgroundLight),
  { ssr: false }
)

interface WebglProps {
  visible?: boolean
  onLoaded?: () => void
  [key: string]: any
}

export const WebglScene = ({ visible = true, onLoaded = noop, ...props }: WebglProps) => {
  const set = useWebglSceneStore((state) => state.set)
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
  const isMenuOpen = useGlobalStateStore((state) => state.isMenuOpen)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

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
    <Canvas camera={{ position: [0, 0, 5] }} frameloop={frameloop} {...props}>
      <Suspense fallback={null}>
        <Effects />
        <ShieldContainer debug={false}>
          <ShieldVideo position-z={0.02} />
          <ShieldBackgroundLight scale={1.7} position-z={-1} />
          <PlayButton onClick={() => dispatchShieldStateEvent({ type: 'EXPAND' })} />
        </ShieldContainer>
        <Wordmark />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
