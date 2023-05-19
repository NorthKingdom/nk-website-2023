/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useMemo, useRef, useContext } from 'react'
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
import { ShieldContainerContext } from './ShieldContainer'

interface ShieldVideoProps {
  debug?: boolean
  scale?: number
  z?: number
  fullscreen?: boolean
  onFullscreenTransitionStart?: (isFullscreen: boolean) => void
  onFullscreenTransitionEnd?: (isFullscreen: boolean) => void
  [key: string]: any
}

const SHIELD_VIDEO_DIMENTIONS = [9, 5]

export const ShieldVideo = forwardRef(
  (
    {
      debug = false,
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
    const scaleMotionValue = useMotionValue(scale)
    const { scaleFullscreen } = useContext(ShieldContainerContext)

    useEffect(() => {
      if (!$mesh.current) return

      let animationControls: AnimationPlaybackControls

      const videoScale = fullscreen ? scaleFullscreen : scale

      if (scaleMotionValue.get() === videoScale) return

      const motionConfig = {
        collapse: {
          duration: 0.9,
          ease: [0.87, 0, 0.13, 1],
        },
        expand: {
          duration: 1.2,
          ease: [1, 0, 0.1, 1],
        },
      }

      animationControls = animate(scaleMotionValue, videoScale, {
        ...(motionConfig[fullscreen ? 'expand' : 'collapse'] as Partial<AnimationPlaybackControls>),
        onPlay: () => {
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
        <mesh></mesh>
        {debug && (
          <mesh scale={scale} position-z={z + 0.1} {...props}>
            <planeGeometry attach="geometry" args={[SHIELD_VIDEO_DIMENTIONS[0], SHIELD_VIDEO_DIMENTIONS[1], 32, 32]} />
            <meshBasicMaterial attach="material" color="white" transparent wireframe opacity={0.2} />
          </mesh>
        )}
      </>
    )
  }
)
ShieldVideo.displayName = 'ShieldVideo'
