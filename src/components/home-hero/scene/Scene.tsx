import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Html } from '@react-three/drei'
import dynamic from 'next/dynamic'

const Effects = dynamic(() => import('./Effects').then((Mod) => Mod.Effects), { ssr: false })
const Shield = dynamic(() => import('./Shield').then((Mod) => Mod.Shield), { ssr: false })

export const Scene = (props: any) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} {...props}>
      <Suspense fallback={null}>
        <Effects />
        <Shield lod="low" scale={1.1} />
        <Shield scale={0.75} position-z={0.1} />
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
