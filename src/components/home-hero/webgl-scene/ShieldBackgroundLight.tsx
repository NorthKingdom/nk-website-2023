/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import type { ReactThreeFiber } from '@react-three/fiber'
import { Uniform, Color } from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { mergeRefs } from 'react-merge-refs'
import shieldBlurVS from './shaders/shield-blur-bg-vs.glsl'
import shieldBlurFS from './shaders/shield-blur-bg-fs.glsl'
import { useWebglSceneStore } from './WebglScene.store'
import { useOnSceneLightColorChange } from './WebglScene.hooks'

const ShieldBackgroundLightMaterial = shaderMaterial(
  {
    uTime: 0,
    uOpacity: 0.4,
    uColor: new Color('#00fff5'),
    uMask: null,
  },
  shieldBlurVS,
  shieldBlurFS
)

extend({ ShieldBackgroundLightMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      shieldBackgroundLightMaterial: ReactThreeFiber.Object3DNode<
        // @ts-ignore
        ShieldBackgroundLightMaterial,
        typeof ShieldBackgroundLightMaterial
      >
    }
  }
}

export const ShieldBackgroundLight = forwardRef((props: any, ref: React.Ref<THREE.Mesh>) => {
  const $mesh = useRef<THREE.Mesh>(null!)
  const shieldScaleMotionValue = useWebglSceneStore((state) => state.shieldScaleMotionValue)
  const maskTexture = useTexture('/images/shield-feather-mask-01.png')

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uOpacity: new Uniform(0.4),
      uColor: new Uniform(new Color('#00fff5')),
      uMask: new Uniform(maskTexture),
    }),
    []
  )

  useOnSceneLightColorChange((color) => {
    if (!$mesh.current) return
    ;($mesh.current.material as any).uniforms.uColor.value = color
  })

  useEffect(() => {
    if (!shieldScaleMotionValue) return
    shieldScaleMotionValue.on('change', (v) => {
      if (!$mesh.current) return
      $mesh.current.scale.setScalar(v * props.scale)
    })
  }, [shieldScaleMotionValue])

  useFrame(({ clock }) => {
    if (!$mesh.current) return
    // @ts-ignore
    $mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <group>
      <mesh ref={mergeRefs([ref, $mesh])} {...props}>
        <planeGeometry attach="geometry" args={[3, 4, 32, 32]} />
        <shieldBackgroundLightMaterial
          uniforms={uniforms}
          toneMapped={false}
          transparent={true}
          key={ShieldBackgroundLightMaterial.key}
        />
        {/* <shaderMaterial
          vertexShader={shieldBlurVS}
          fragmentShader={shieldBlurFS}
          uniforms={uniforms}
          toneMapped={false}
          transparent={true}
        /> */}
      </mesh>
      {props.debug && (
        <mesh {...props}>
          <planeGeometry attach="geometry" args={[3, 4, 32, 32]} />
          <meshBasicMaterial color="red" wireframe />
        </mesh>
      )}
    </group>
  )
})
ShieldBackgroundLight.displayName = 'ShieldBackgroundLight'
