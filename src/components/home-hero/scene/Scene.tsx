import { Canvas } from '@react-three/fiber'
import { Html, Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { noop } from '@utils/noop'
import { useGlobalStateStore } from '@store'
import { ShieldContainer } from './ShieldContainer'

const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const ShieldVideo = dynamic(() => import('./ShieldVideo').then((Mod) => Mod.ShieldVideo), { ssr: false })
const ShieldBackgroundLight = dynamic(
  () => import('./ShieldBackgroundLight').then((Mod) => Mod.ShieldBackgroundLight),
  { ssr: false }
)

interface SceneProps {
  visible?: boolean
  fullscreen: boolean
  cta: JSX.Element
  [key: string]: any
}

export const Scene = ({ visible = true, fullscreen = false, cta, ...props }: SceneProps) => {
  const isMenuOpen = useGlobalStateStore((state) => state.isMenuOpen)
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

  useEffect(() => {
    setFrameloop(isMenuOpen ? 'never' : 'always')
  }, [isMenuOpen])

  useEffect(() => {
    setFrameloop(visible ? 'always' : 'never')
  }, [visible])

  const onFullscreenTransitionStart = (isFullscreen: boolean) => {
    if (!isFullscreen) {
      setFrameloop('always')
    }
  }

  const onFullscreenTransitionEnd = (isFullscreen: boolean) => {
    if (isFullscreen) {
      setFrameloop('never')
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 5] }} frameloop={frameloop} {...props}>
      <Suspense fallback={null}>
        <Effects />
        <ShieldContainer position-x={-1.05}>
          <ShieldVideo
            // debug
            scale={0.55}
            z={1}
            fullscreen={fullscreen}
            onFullscreenTransitionStart={onFullscreenTransitionStart}
            onFullscreenTransitionEnd={onFullscreenTransitionEnd}
          />
          <ShieldBackgroundLight scale={1} />
        </ShieldContainer>
        <Html position-x={-1.05} position-z={1} center zIndexRange={[100, 0]}>
          {cta}
        </Html>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
