/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useMemo, useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { Uniform, Color } from 'three'
import { useFrame } from '@react-three/fiber'
import { mergeRefs } from 'react-merge-refs'
import shieldBlurVS from './shaders/shield-blur-bg-vs.glsl'
import shieldBlurFS from './shaders/shield-blur-bg-fs.glsl'

export const ShieldBackgroundLight = forwardRef((props: any, ref: React.Ref<THREE.Mesh>) => {
  const $mesh = useRef<THREE.Mesh>(null!)
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

  useFrame(({ clock }) => {
    if (!$mesh.current) return
    // @ts-ignore
    $mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={mergeRefs([ref, $mesh])} {...props}>
      <planeGeometry attach="geometry" args={[3, 4, 32, 32]} />
      <shaderMaterial
        vertexShader={shieldBlurVS}
        fragmentShader={shieldBlurFS}
        uniforms={uniforms}
        toneMapped={false}
        transparent={true}
      />
    </mesh>
  )
})
ShieldBackgroundLight.displayName = 'ShieldBackgroundLight'
