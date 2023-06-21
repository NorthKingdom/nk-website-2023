/* eslint-disable react-hooks/exhaustive-deps */
import { useTexture, useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { noop } from '@utils/noop'
import type { AnimationPlaybackControls } from 'framer-motion'
import { animate, useMotionValue } from 'framer-motion'
import { button, useControls } from 'leva'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { Uniform } from 'three'
import { useWebglSceneStore } from './WebglScene.store'
import shieldVideoFS from './shaders/shield-video-fs.glsl'
import shieldVideoVS from './shaders/shield-video-vs.glsl'
import type { HomeHero as HomeHeroPayload } from '@customTypes/cms'
import { useShieldLightLeakColorTextTrack } from './ShieldVideo.hooks'
import isEmpty from 'ramda/es/isEmpty'

const SHIELD_VIDEO_DIMENTIONS = [9, 5]

export const MOTION_CONFIG = {
  HOVER: {
    type: 'spring',
    stiffness: 1500,
    damping: 100,
  },
  TRANSITION_IN: {
    duration: 0.6,
    ease: [0, 0.55, 0.45, 1], // ease out circ
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

interface ShieldVideoProps {
  src: string
  debug?: boolean
  scale?: number
  z?: number
  fullscreen?: boolean
  onTransitionStart?: (shieldState: string) => void
  onTransitionEnd?: (shieldState: string) => void
  shieldLightLeakColorVtt: HomeHeroPayload['shieldLightLeakColorVtt']
  [key: string]: any
}

/**
 * Shield video texture
 */
export const ShieldVideo = forwardRef(
  (
    {
      src,
      debug = false,
      scale = 1,
      z = 0,
      fullscreen = false,
      shieldLightLeakColorVtt,
      onTransitionStart = noop,
      onTransitionEnd = noop,
      ...props
    }: ShieldVideoProps,
    ref: React.Ref<THREE.Mesh>
  ) => {
    const $mesh = useRef<THREE.Mesh>(null!)
    const $rotationContainer = useRef<THREE.Group>(null!)
    const set = useWebglSceneStore((state) => state.set)
    const shieldState = useWebglSceneStore((state) => state.shieldState)
    const isSceneLoaded = useWebglSceneStore((state) => state.isSceneLoaded)
    const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
    const shieldScaleFullscreen = useWebglSceneStore((state) => state.shieldScaleFullscreen)
    const isShieldVideoPlaying = useWebglSceneStore((state) => state.isShieldVideoPlaying)

    /**
     * TODO: remove in production ====================================================
     */
    const [_, setControls] = useControls('Shield video', () => ({
      timestamp: {
        value: 0,
        editable: false,
      },
    }))

    const videoTexture = useVideoTexture(src, {
      start: true,
      ontimeupdate: (e) => setControls({ timestamp: (e.target as HTMLVideoElement).currentTime }),
    })

    useControls(
      'Shield video',
      {
        pause: button(
          () => {
            set({ isShieldVideoPlaying: false })
          },
          { disabled: !isShieldVideoPlaying }
        ),
        play: button(
          () => {
            set({ isShieldVideoPlaying: true })
          },
          { disabled: isShieldVideoPlaying }
        ),
      },
      [isShieldVideoPlaying]
    )

    useEffect(() => {
      if (!videoTexture) return
      const video = videoTexture.image as HTMLVideoElement
      isShieldVideoPlaying ? video.play() : video.pause()
    }, [videoTexture, isShieldVideoPlaying])

    /**
     * =============================================================================
     */

    const maskTexture = useTexture('/images/shield-mask-sharp.png')
    const uniforms = useMemo(
      () => ({
        uTime: new Uniform(0),
        uVideo: new Uniform(videoTexture),
        uMask: new Uniform(maskTexture),
      }),
      []
    )

    useShieldLightLeakColorTextTrack(videoTexture?.image, shieldLightLeakColorVtt)

    /*
     * Set/animate video scale based on shield state
     */
    const scaleMotionValue = useMotionValue(scale * 0.1)
    useEffect(() => set({ shieldScaleMotionValue: scaleMotionValue }), [scaleMotionValue])
    useEffect(() => {
      $mesh.current.scale.setScalar(scaleMotionValue.get())
    }, [])

    useEffect(() => {
      let videoScale = scale
      let motionData = {}

      switch (shieldState) {
        case 'initial':
          videoScale = scale * 0.1
          break
        case 'transition-in':
          videoScale = scale
          motionData = MOTION_CONFIG.TRANSITION_IN
          break
        case 'expanding':
        case 'expanded':
          videoScale = shieldScaleFullscreen
          motionData = MOTION_CONFIG.EXPAND
          break
        case 'idle':
          videoScale = scale
          motionData = MOTION_CONFIG.HOVER
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

      if (isEmpty(motionData)) {
        scaleMotionValue.set(videoScale)
        $mesh.current.scale.setScalar(videoScale)
        return
      }

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
    }, [shieldState, isSceneLoaded])

    useFrame(({ clock }) => {
      if (!$mesh.current) return
      // @ts-ignore
      $mesh.current.material.uniforms.uTime.value = clock.getElapsedTime()
    })

    // rotate shield video on transition in
    useEffect(() => {
      let ctrls
      if (shieldState === 'transition-in') {
        ctrls = animate(-Math.PI, 0, {
          ...(MOTION_CONFIG.TRANSITION_IN as Partial<AnimationPlaybackControls>),
          duration: MOTION_CONFIG.TRANSITION_IN.duration * 0.7,
          onUpdate: (v) => {
            if (!$rotationContainer.current) return
            $rotationContainer.current.rotation.y = v
          },
        })
      }
    }, [shieldState])

    return (
      <group ref={$rotationContainer}>
        <mesh ref={mergeRefs([ref, $mesh])} position-z={z} {...props}>
          <planeGeometry attach="geometry" args={[SHIELD_VIDEO_DIMENTIONS[0], SHIELD_VIDEO_DIMENTIONS[1], 32, 32]} />
          <shaderMaterial
            depthTest={false}
            vertexShader={shieldVideoVS}
            fragmentShader={shieldVideoFS}
            uniforms={uniforms}
            toneMapped={false}
            transparent={true}
          />
        </mesh>
        {debug && (
          <mesh scale={scale} position-z={z + 0.1} {...props}>
            <planeGeometry attach="geometry" args={[SHIELD_VIDEO_DIMENTIONS[0], SHIELD_VIDEO_DIMENTIONS[1], 32, 32]} />
            <meshBasicMaterial attach="material" color="white" transparent wireframe opacity={0.2} />
          </mesh>
        )}
      </group>
    )
  }
)
ShieldVideo.displayName = 'ShieldVideo'
