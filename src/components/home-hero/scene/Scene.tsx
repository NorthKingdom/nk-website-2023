import { Canvas } from '@react-three/fiber'
import { Html, Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const Shield = dynamic(() => import('./Shield').then((Mod) => Mod.Shield), { ssr: false })

interface SceneProps {
  cta: JSX.Element
  [key: string]: any
}

export const Scene = ({ cta, ...props }: SceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} {...props}>
      <Suspense fallback={null}>
        <Effects />
        <Shield lod="low" scale={1.1} />
        <Shield scale={0.6} position-z={1} />
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
