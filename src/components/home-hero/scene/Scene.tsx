import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { useGlobalStateStore } from '@store'
import { ShieldContainer } from './ShieldContainer'
import { PlayButton } from './PlayButton'
import { noop } from '@utils/noop'

const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const ShieldVideo = dynamic(() => import('./ShieldVideo').then((Mod) => Mod.ShieldVideo), { ssr: false })
const ShieldBackgroundLight = dynamic(
  () => import('./ShieldBackgroundLight').then((Mod) => Mod.ShieldBackgroundLight),
  { ssr: false }
)

interface SceneProps {
  visible?: boolean
  fullscreen: boolean
  onLoaded?: () => void
  onCtaClick: () => void
  [key: string]: any
}

export const Scene = ({
  visible = true,
  fullscreen = false,
  onLoaded = noop,
  onCtaClick = noop,
  ...props
}: SceneProps) => {
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
        <ShieldContainer debug={false}>
          <ShieldVideo
            fullscreen={fullscreen}
            onFullscreenTransitionStart={onFullscreenTransitionStart}
            onFullscreenTransitionEnd={onFullscreenTransitionEnd}
          />
          <ShieldBackgroundLight scale={1.7} position-z={-1} />
          <PlayButton onClick={onCtaClick} />
        </ShieldContainer>

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
