/* eslint-disable react/no-children-prop */
import { use, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Mask, Text, useMask } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { animate, useMotionValue } from 'framer-motion'
import { useBreakpointFrom } from '@hooks/use-breakpoint'
import { useWebglSceneStore } from './WebglScene.store'
import type { AnimationPlaybackControls } from 'framer-motion'
// import { useControls } from 'leva'

const VIDEO_SHIELD_OFFSET_MULTIPLIER = 0.7

const MOTION_CONFIG = {
  HOVER: {
    type: 'spring',
    stiffness: 1500,
    damping: 100,
  },
  TRANSITION_IN: {
    duration: 0.6,
    delay: 0.22,
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

const WORD_MASK_ID = {
  LEFT: 1,
  RIGHT: 2,
}

export const Wordmark = () => {
  const leftWordRef = useRef<THREE.Group>(null!)
  const rightWordRef = useRef<THREE.Group>(null!)

  const { config, shieldAnchor, shieldScaleIdle, shieldState } = useWebglSceneStore()
  const { SHIELD_INNER_SIZE } = config

  const viewport = useThree((state) => state.viewport)
  const { width, height } = viewport

  const isDesktopBp = useBreakpointFrom('desktopSmall')
  const fontSize = 0.125
  // const { fontSize } = useControls({
  //   fontSize: { value: 0.125, min: 0.01, max: 3, step: 0.01 },
  // })

  const offsetAbsMotionValue = useMotionValue(-width * 0.25)

  useEffect(() => {
    if (!leftWordRef.current || !rightWordRef.current) return
    leftWordRef.current.position.x = -offsetAbsMotionValue.get()
    rightWordRef.current.position.x = offsetAbsMotionValue.get()
  }, [])

  useEffect(() => {
    /*
     * Set video scale based on shield state
     */
    let offsetAbs = 0
    let motionData = {}

    if (!leftWordRef.current || !rightWordRef.current) return

    switch (shieldState) {
      case 'loading':
        offsetAbs = -width * 0.5
      case 'idle':
        offsetAbs = 0
        break
      case 'transition-in':
        offsetAbs = 0
        motionData = MOTION_CONFIG.TRANSITION_IN
        break
      case 'expanding':
      case 'expanded':
        offsetAbs = width * 0.5
        motionData = MOTION_CONFIG.EXPAND
        break
      case 'hovered':
        offsetAbs = shieldScaleIdle * VIDEO_SHIELD_OFFSET_MULTIPLIER
        motionData = MOTION_CONFIG.HOVER
        break
      case 'collapsing':
        offsetAbs = 0
        motionData = MOTION_CONFIG.COLLAPSE
      default:
        offsetAbs = 0
    }

    /*
     * Short circuit if:
     * If the video is already at the desired scale
     * No mesh is available
     */
    if (!leftWordRef.current || !rightWordRef.current) return
    if (offsetAbsMotionValue.get() === offsetAbs) return

    let animationControls: AnimationPlaybackControls

    animationControls = animate(offsetAbsMotionValue, offsetAbs, {
      ...(motionData as Partial<AnimationPlaybackControls>),
      onUpdate: (value) => {
        if (!leftWordRef.current || !rightWordRef.current) return
        leftWordRef.current.position.x = -value
        rightWordRef.current.position.x = value
      },
    })

    return () => {
      animationControls?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shieldState])

  const stencilPropsWordLeft = useMask(WORD_MASK_ID.LEFT, true)
  const stencilPropsWordRight = useMask(WORD_MASK_ID.RIGHT, true)

  const transformMaterialStencilProps = (props: { [key: string]: any }) => {
    return Object.entries(props).reduce((acc, [key, value]) => {
      const newKey = `material-${key}`
      return { ...acc, [newKey]: value }
    }, {} as any)
  }

  return (
    <>
      {isDesktopBp ? (
        <>
          <Mask id={WORD_MASK_ID.LEFT} colorWrite={false} position-x={width * 0.5}>
            <planeGeometry args={[width, height]} />
          </Mask>
          <group ref={leftWordRef}>
            <Word
              position-z={0.01}
              position-x={-(SHIELD_INNER_SIZE[0] * 0.5 * shieldScaleIdle) + shieldAnchor[0]}
              anchorX="right"
              fontSize={fontSize * width}
              loaded={shieldState !== 'loading'}
              {...transformMaterialStencilProps(stencilPropsWordLeft)}
            >
              North
            </Word>
          </group>

          <Mask id={WORD_MASK_ID.RIGHT} colorWrite={false} position-x={-width * 0.5 + SHIELD_INNER_SIZE[0]}>
            <planeGeometry args={[width, height]} />
          </Mask>
          <group ref={rightWordRef}>
            <Word
              position-z={0.01}
              anchorX="left"
              fontSize={fontSize * width}
              loaded={shieldState !== 'loading'}
              {...transformMaterialStencilProps(stencilPropsWordRight)}
            >
              Kingdom
            </Word>
          </group>
        </>
      ) : (
        <Word
          position-z={0.03}
          position-x={-width * 0.5}
          position-y={-height * 0.45}
          maxWidth={width}
          lineHeight={0.9}
          anchorX="left"
          anchorY="bottom"
          fontSize={width * 0.25}
        >
          North Kingdom
        </Word>
      )}
    </>
  )
}

interface WordProps {
  children: React.ReactNode
  [key: string]: any
}

export const Word = ({ children, loaded = false, ...props }: WordProps) => {
  const color = new THREE.Color(0xffffff)
  const fontProps = {
    font: '/fonts/FKGroteskNeue/woff/FKGroteskNeue-Regular.woff',
    fontSize: 1,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
    'material-transparent': true,
    'material-opacity': 0,
  }

  const ref = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    if (!ref.current) return
    let ctrls: any
    if (loaded) {
      ctrls = animate((ref.current.material as any).opacity, 1, {
        ...(MOTION_CONFIG.TRANSITION_IN as Partial<AnimationPlaybackControls>),
        ease: 'linear',
        delay: MOTION_CONFIG.TRANSITION_IN.delay ?? 0 + 0.1,
        onUpdate: (v) => ((ref.current.material as any).opacity = v),
      })
    }

    return () => {
      ctrls?.stop()
    }
  }, [loaded])

  return <Text ref={ref} {...fontProps} {...props} material-color={color} children={children} />
}
