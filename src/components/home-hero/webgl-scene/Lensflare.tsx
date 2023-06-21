import { extend, useFrame, useThree } from '@react-three/fiber'
import { lerp, rubberbandIfOutOfBounds } from '@utils/math'
import { useWebglSceneStore } from './WebglScene.store'
import { useRef, useMemo, useEffect, use } from 'react'
import { Vector3, Uniform, type Material } from 'three'
import { shaderMaterial, useTexture } from '@react-three/drei'
import lensflareVS from './shaders/lensflare-vs.glsl'
import lensflareFS from './shaders/lensflare-fs.glsl'
import type { ReactThreeFiber } from '@react-three/fiber'
import { closestAngle } from '@utils/math'
import { animate, useMotionValue } from 'framer-motion'
import { useOnSceneLightColorChange } from './WebglScene.hooks'

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
  const ref = useRef<THREE.Group>(null!)
  const blockoutOverlayRef = useRef<THREE.Mesh>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  const shieldState = useWebglSceneStore((state) => state.shieldState)
  const shieldAnchor = useWebglSceneStore((state) => state.shieldAnchor)
  const shieldScaleIdle = useWebglSceneStore((state) => state.shieldScaleIdle)
  const viewport = useThree((state) => state.viewport)
  const maskTexture = useTexture('/images/shield-feather-mask-01.png')
  const scale = (viewport.height / DIMENSIONS[1] / shieldScaleIdle) * SCALE_FACTOR
  const lightColor = useWebglSceneStore((state) => state.lightColor)

  const uniforms = useMemo(
    () => ({
      uMask: new Uniform(maskTexture),
      uColor: new Uniform(lightColor),
    }),
    []
  )

  useOnSceneLightColorChange((color) => {
    if (!meshRef.current) return
    ;(meshRef.current.material as any).uniforms.uColor.value = color
  })

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
    dist.current = lerp(dist.current, dist.target, 0.2, delta)

    angle.target = Math.atan2(pointer.x - normalizedShieldAnchor.x, -1 * (pointer.y - normalizedShieldAnchor.y))
    angle.target = closestAngle(angle.current, angle.target)
    angle.current = lerp(angle.current, angle.target, 0.02, delta)

    ref.current.rotation.z = angle.current
    ref.current.scale.x = dist.current * scale
    ref.current.scale.y = dist.current * scale
  })

  const blockoutOverlayOpacity = useMotionValue(1)
  useEffect(() => {
    let ctrls
    if (shieldState === 'transition-in') {
      animate(blockoutOverlayOpacity, 0, {
        duration: 1,
        onUpdate: (v) => {
          if (blockoutOverlayRef.current) {
            ;(blockoutOverlayRef.current.material as Material).opacity = v
          }
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shieldState])

  return (
    <group ref={ref} {...props} scale={scale}>
      <mesh ref={blockoutOverlayRef} position-z={0.01} scale={viewport.height}>
        <planeGeometry attach="geometry" args={[10, 10, 1]} />
        <meshBasicMaterial attach="material" color="black" transparent={true} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        <planeGeometry attach="geometry" args={[...DIMENSIONS, 1, 1]} />
        <lensflareMaterial
          depthWrite={false}
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
