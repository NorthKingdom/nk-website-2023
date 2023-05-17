/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useVideoTexture, useTexture } from '@react-three/drei'
import { Uniform } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { mergeRefs } from 'react-merge-refs'
import shieldVideoVS from './shaders/shield-video-vs.glsl'
import shieldVideoFS from './shaders/shield-video-fs.glsl'
import { useMotionValue } from 'framer-motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import { animate } from 'framer-motion'
import { noop } from '@utils/noop'

interface ShieldVideoProps {
  scale?: number
  z?: number
  fullscreen?: boolean
  onFullscreenTransitionStart?: (isFullscreen: boolean) => void
  onFullscreenTransitionEnd?: (isFullscreen: boolean) => void
  [key: string]: any
}

const SHIELD_VIDEO_DIMENTIONS = [9, 5]
const SHIELD_INNER_VIDEO_DIMENSIONS = [3, 4]

export const ShieldVideo = forwardRef(
  (
    {
      scale = 1,
      z = 0,
      fullscreen = false,
      onFullscreenTransitionStart = noop,
      onFullscreenTransitionEnd = noop,
      ...props
    }: ShieldVideoProps,
    ref: React.Ref<THREE.Mesh>
  ) => {
    const $mesh = useRef<THREE.Mesh>(null!)
    const videoTexture = useVideoTexture('/dummy/EA_NFS_Heat_Studio_case_study_30s.mp4', { start: true })
    const maskTexture = useTexture('/images/shield-mask-sharp.png')

    const uniforms = useMemo(
      () => ({
        uTime: new Uniform(0),
        uVideo: new Uniform(videoTexture),
        uMask: new Uniform(maskTexture),
      }),
      []
    )

    const viewport = useThree((state) => state.viewport)
    const camera = useThree((state) => state.camera)
    const scaleMotionValue = useMotionValue(scale)

    useEffect(() => {
      if (!$mesh.current) return

      let animationControls: AnimationPlaybackControls

      const viewportSize = viewport.getCurrentViewport(camera, [0, 0, z])
      const fullscreenScale = Math.max(
        viewportSize.width / SHIELD_INNER_VIDEO_DIMENSIONS[0],
        viewportSize.height / SHIELD_INNER_VIDEO_DIMENSIONS[1]
      )
      const videoScale = fullscreen ? fullscreenScale : scale

      if (scaleMotionValue.get() === videoScale) return

      animationControls = animate(scaleMotionValue, videoScale, {
        duration: 0.9,
        ease: [0.87, 0, 0.13, 1],
        onPlay: () => {
          console.log('transition start', fullscreen)
          onFullscreenTransitionStart(fullscreen)
        },
        onUpdate: (value) => {
          $mesh.current.scale.set(value, value, value)
        },
        onComplete: () => {
          onFullscreenTransitionEnd(fullscreen)
        },
      })

      return () => {
        animationControls?.stop()
      }
    }, [fullscreen])

    useFrame(({ clock }) => {
      if (!$mesh.current) return
      // @ts-ignore
      $mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
      <>
        <mesh ref={mergeRefs([ref, $mesh])} scale={scale} position-z={z} {...props}>
          <planeGeometry attach="geometry" args={[SHIELD_VIDEO_DIMENTIONS[0], SHIELD_VIDEO_DIMENTIONS[1], 32, 32]} />
          <shaderMaterial
            vertexShader={shieldVideoVS}
            fragmentShader={shieldVideoFS}
            uniforms={uniforms}
            toneMapped={false}
            transparent={true}
          />
        </mesh>
        {/* <mesh scale={scale} position-z={z + 0.1} {...props}>
          <planeGeometry
            attach="geometry"
            args={[SHIELD_INNER_VIDEO_DIMENSIONS[0], SHIELD_INNER_VIDEO_DIMENSIONS[1], 32, 32]}
          />
          <meshBasicMaterial attach="material" color="red" transparent wireframe />
        </mesh> */}
      </>
    )
  }
)
ShieldVideo.displayName = 'ShieldVideo'
