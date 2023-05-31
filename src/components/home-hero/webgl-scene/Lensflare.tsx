import { extend, useFrame, useThree } from '@react-three/fiber'
import { lerp, rubberbandIfOutOfBounds } from '@utils/math'
import { useWebglSceneStore } from './WebglScene.store'
import { useRef, useMemo } from 'react'
import { Vector3, Uniform } from 'three'
import { shaderMaterial, useTexture } from '@react-three/drei'
import lensflareVS from './shaders/lensflare-vs.glsl'
import lensflareFS from './shaders/lensflare-fs.glsl'
import type { ReactThreeFiber } from '@react-three/fiber'
import { closestAngle } from '@utils/math'

const DIMENSIONS = [9, 12] as [number, number]
const SCALE_FACTOR = 3

const LensflareMaterial = shaderMaterial({ uMask: null }, lensflareVS, lensflareFS)

extend({ LensflareMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      lensflareMaterial: ReactThreeFiber.Object3DNode<
        // @ts-ignore
        LensflareMaterial,
        typeof LensflareMaterial
      >
    }
  }
}

interface LensflareProps {
  debug?: boolean
}

export const Lensflare: React.FC = ({ debug = false, ...props }: LensflareProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  const shieldAnchor = useWebglSceneStore((state) => state.shieldAnchor)
  const shieldScaleIdle = useWebglSceneStore((state) => state.shieldScaleIdle)
  const viewport = useThree((state) => state.viewport)
  const maskTexture = useTexture('/images/shield-feather-mask-01.png')
  const scale = (viewport.height / DIMENSIONS[1] / shieldScaleIdle) * SCALE_FACTOR

  const uniforms = useMemo(
    () => ({
      uMask: new Uniform(maskTexture),
    }),
    []
  )

  const normalizedShieldAnchor = useMemo(
    () => new Vector3(shieldAnchor[0] / viewport.width, shieldAnchor[1] / viewport.height, 0),
    [shieldAnchor, viewport.width, viewport.height]
  )

  const angle = useRef({
    current: 0,
    target: 0,
  }).current

  const dist = useRef({
    current: 0,
    target: 0,
  }).current

  useFrame(({ pointer }, delta) => {
    dist.target = Math.sqrt(
      Math.pow(pointer.x - normalizedShieldAnchor.x, 2) + Math.pow(pointer.y - normalizedShieldAnchor.y, 2)
    )
    dist.target = rubberbandIfOutOfBounds(dist.target, 1, 4)
    dist.current = lerp(dist.current, dist.target, 0.15, delta)

    angle.target = Math.atan2(pointer.x - normalizedShieldAnchor.x, -1 * (pointer.y - normalizedShieldAnchor.y))
    angle.target = closestAngle(angle.current, angle.target)
    angle.current = lerp(angle.current, angle.target, 0.15, delta)

    ref.current.rotation.z = angle.current
    ref.current.scale.setScalar(dist.current * scale)
  })

  return (
    <group ref={ref} {...props} scale={scale}>
      <mesh>
        <planeGeometry attach="geometry" args={[...DIMENSIONS, 1, 1]} />
        <lensflareMaterial
          attach="material"
          uniforms={uniforms}
          toneMapped={false}
          transparent={true}
          key={LensflareMaterial.key}
        />
      </mesh>
      {debug && (
        <mesh>
          <planeGeometry attach="geometry" args={[...DIMENSIONS, 1, 1]} />
          <meshBasicMaterial attach="material" color="white" wireframe />
        </mesh>
      )}
    </group>
  )
}
