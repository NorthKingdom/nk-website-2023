import { Canvas } from '@react-three/fiber'
import { Html, Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import { noop } from '@utils/noop'

const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const ShieldVideo = dynamic(() => import('./ShieldVideo').then((Mod) => Mod.ShieldVideo), { ssr: false })
const ShieldBackgroundLight = dynamic(
  () => import('./ShieldBackgroundLight').then((Mod) => Mod.ShieldBackgroundLight),
  { ssr: false }
)

interface SceneProps {
  fullscreen: boolean
  cta: JSX.Element
  [key: string]: any
}

export const Scene = ({ fullscreen = false, cta, ...props }: SceneProps) => {
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')

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
        <ShieldVideo
          scale={0.6}
          z={1}
          fullscreen={fullscreen}
          onFullscreenTransitionStart={onFullscreenTransitionStart}
          onFullscreenTransitionEnd={onFullscreenTransitionEnd}
        />
        <ShieldBackgroundLight scale={1.1} />
        <Html center>{cta}</Html>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

{
  /* <Html center>
          <h1
            style={{
              fontSize: '8vw',
              marginRight: '45vw',
            }}
          >
            North
          </h1>
        </Html>
        <Html center>
          <h1
            style={{
              fontSize: '8vw',
              marginLeft: '55vw',
            }}
          >
            Kingdom
          </h1>
        </Html> */
}
{
  /* Shield video */
}
