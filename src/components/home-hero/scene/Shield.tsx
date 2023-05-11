/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useMemo, useRef } from 'react'
import { useVideoTexture, useTexture } from '@react-three/drei'
import { Vector2, Uniform, Color } from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import { mergeRefs } from 'react-merge-refs'
import shieldVideoVS from './shaders/shield-video-vs.glsl'
import shieldVideoFS from './shaders/shield-video-fs.glsl'
import shieldBlurVS from './shaders/shield-blur-bg-vs.glsl'
import shieldBlurFS from './shaders/shield-blur-bg-fs.glsl'

const ShieldForeground = forwardRef((props: any, ref: React.Ref<THREE.Mesh>) => {
  const $mesh = useRef<THREE.Mesh>(null!)
  const videoTexture = useVideoTexture('/dummy/EA_NFS_Heat_Studio_case_study_30s.mp4', { start: true })
  const maskTexture = useTexture('/images/shield-mask-sharp.png')

  //   const { imageSize, frameSize } = useMemo(
  //     () => ({
  //       imageSize: new Vector2(16, 9),
  //       frameSize: new Vector2(16, 9),
  //     }),
  //     []
  //   )

  const uniforms = useMemo(
    () => ({
      uTime: new Uniform(0),
      uVideo: new Uniform(videoTexture),
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
      <planeGeometry attach="geometry" args={[9, 5, 32, 32]} />
      <shaderMaterial
        vertexShader={shieldVideoVS}
        fragmentShader={shieldVideoFS}
        uniforms={uniforms}
        toneMapped={false}
        transparent={true}
      />
    </mesh>
  )
})
ShieldForeground.displayName = 'ShieldForeground'

const ShieldBackground = forwardRef((props: any, ref: React.Ref<THREE.Mesh>) => {
  //   const { imageSize, frameSize } = useMemo(
  //     () => ({
  //       imageSize: new Vector2(3, 4),
  //       frameSize: new Vector2(3, 4),
  //     }),
  //     []
  //   )
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
ShieldBackground.displayName = 'ShieldBackground'

export const Shield = forwardRef((props: any, ref: React.Ref<THREE.Mesh>) => {
  const { lod = 'high' } = props

  const size = useThree((state) => state.size)
  const resolution = useMemo(() => new Vector2(size.width, size.height), [size.width, size.height])

  if (lod === 'high') {
    return <ShieldForeground ref={ref} {...props} resolution={resolution} />
  }

  return <ShieldBackground ref={ref} {...props} resolution={resolution} />
})

Shield.displayName = 'Shield'
