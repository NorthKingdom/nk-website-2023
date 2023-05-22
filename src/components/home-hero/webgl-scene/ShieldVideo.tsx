/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useVideoTexture, useTexture } from '@react-three/drei'
import { Uniform } from 'three'
import { useFrame } from '@react-three/fiber'
import { mergeRefs } from 'react-merge-refs'
import shieldVideoVS from './shaders/shield-video-vs.glsl'
import shieldVideoFS from './shaders/shield-video-fs.glsl'
import { animate, useMotionValue } from 'framer-motion'
import type { AnimationPlaybackControls } from 'framer-motion'
import { noop } from '@utils/noop'
import { useWebglSceneStore } from './WebglScene.store'

interface ShieldVideoProps {
  debug?: boolean
  scale?: number
  z?: number
  fullscreen?: boolean
  onTransitionStart?: (shieldState: string) => void
  onTransitionEnd?: (shieldState: string) => void
  [key: string]: any
}

const SHIELD_VIDEO_DIMENTIONS = [9, 5]

const MOTION_CONFIG = {
  HOVER: {
    type: 'spring',
    stiffness: 1500,
    damping: 100,
  },
  COLLAPSE: {
    duration: 0.9,
    ease: [0.87, 0, 0.13, 1],
  },
  EXPAND: {
    duration: 1.2,
    ease: [1, 0, 0.1, 1],
  },
}

export const ShieldVideo = forwardRef(
  (
    {
      debug = false,
      scale = 1,
      z = 0,
      fullscreen = false,
      onTransitionStart = noop,
      onTransitionEnd = noop,
      ...props
    }: ShieldVideoProps,
    ref: React.Ref<THREE.Mesh>
  ) => {
    const $mesh = useRef<THREE.Mesh>(null!)

    const shieldState = useWebglSceneStore((state) => state.shieldState)
    const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
    const shieldScaleFullscreen = useWebglSceneStore((state) => state.shieldScaleFullscreen)

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

    useEffect(() => {
      /*
       * Set video scale based on shield state
       */
      let videoScale = scale
      let motionData = {}

      switch (shieldState) {
        case 'expanding':
        case 'expanded':
          videoScale = shieldScaleFullscreen
          motionData = MOTION_CONFIG.EXPAND
          break
        case 'hovered':
          videoScale = scale * 1.3
          motionData = MOTION_CONFIG.HOVER
          break
        case 'collapsing':
          videoScale = scale
          motionData = MOTION_CONFIG.COLLAPSE
        default:
          videoScale = scale
      }

      /*
       * Short circuit if:
       * If the video is already at the desired scale
       * No mesh is available
       */
      if (scaleMotionValue.get() === videoScale) return
      if (!$mesh.current) return

      let animationControls: AnimationPlaybackControls

      animationControls = animate(scaleMotionValue, videoScale, {
        ...(motionData as Partial<AnimationPlaybackControls>),
        onPlay: () => {
          dispatchShieldStateEvent({ type: 'TRANSITION_START' })
          onTransitionStart(shieldState)
        },
        onUpdate: (value) => {
          $mesh.current.scale.set(value, value, value)
        },
        onComplete: () => {
          dispatchShieldStateEvent({ type: 'TRANSITION_END' })
          onTransitionEnd(shieldState)
        },
      })

      return () => {
        animationControls?.stop()
      }
    }, [shieldState])

    useFrame(({ clock }) => {
      if (!$mesh.current) return
      // @ts-ignore
      $mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
      <>
        <mesh ref={mergeRefs([ref, $mesh])} position-z={z} {...props}>
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
