import { forwardRef, useEffect, useRef } from 'react'
import { Html, useCursor } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useBreakpointFrom } from '@hooks/use-breakpoint'
import { useWebglSceneStore } from './WebglScene.store'
import { animate, useMotionValue } from 'framer-motion'
import { MOTION_CONFIG } from './ShieldVideo'

interface ShieldContainerProps {
  z?: number
  children: React.ReactNode
  debug?: boolean
  [key: string]: any
}

const useCalculateShieldLayout = () => {
  const set = useWebglSceneStore((state) => state.set)
  const config = useWebglSceneStore((state) => state.config)

  const { SHIELD_INNER_SIZE, SHIELD_VIEWPORT_WIDTH } = config

  const camera = useThree((state) => state.camera)
  const viewport = useThree((state) => state.viewport)
  const isDesktopBp = useBreakpointFrom('desktopSmall')

  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0])
  const screenOrientation = width > height ? 'landscape' : 'portrait'

  const _scaleIdle = (width * SHIELD_VIEWPORT_WIDTH[screenOrientation]) / SHIELD_INNER_SIZE[0]
  const _scaleFullscreen = Math.max(width / SHIELD_INNER_SIZE[0], height / SHIELD_INNER_SIZE[1]) / _scaleIdle
  const _positionX = isDesktopBp ? -SHIELD_INNER_SIZE[0] * _scaleIdle * 0.5 : 0

  useEffect(() => {
    set({
      shieldScaleIdle: _scaleIdle,
      shieldScaleFullscreen: _scaleFullscreen,
      shieldAnchor: [_positionX, 0, 0],
    })
  }, [set, _scaleIdle, _scaleFullscreen, _positionX])
}

export const ShieldContainer = forwardRef(
  ({ z = 0, children, debug = false, ...props }: ShieldContainerProps, ref: React.Ref<THREE.Group>) => {
    const inner = useRef<THREE.Group>(null!)
    const shieldState = useWebglSceneStore((state) => state.shieldState)
    const dispatchShieldStateEvent = useWebglSceneStore((state) => state.dispatchShieldStateEvent)
    const config = useWebglSceneStore((state) => state.config)
    const shieldAnchor = useWebglSceneStore((state) => state.shieldAnchor)
    const shieldScaleIdle = useWebglSceneStore((state) => state.shieldScaleIdle)

    const { SHIELD_INNER_SIZE } = config

    useCalculateShieldLayout()
    useCursor(shieldState === 'hovered')

    const innerContainerOffsetMotionValue = useMotionValue(0)

    // useEffect(() => {
    //   let ctrls: any
    //   if (shieldState === 'transition-in') {
    //     innerContainerOffsetMotionValue.set((-shieldAnchor[0] * 1) / shieldScaleIdle)
    //     ctrls = animate(innerContainerOffsetMotionValue, 0, {
    //       ...(MOTION_CONFIG.TRANSITION_IN as any),
    //       onUpdate: (v) => {
    //         if (!inner.current) return
    //         inner.current.position.x = v
    //       },
    //     })
    //   }

    //   return () => {
    //     ctrls?.stop()
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [shieldState, shieldAnchor])

    // useEffect(() => {
    //   console.log('shield container')
    //   console.log(inner.current)
    // }, [])

    return (
      <group ref={ref} {...props} position={shieldAnchor} scale={shieldScaleIdle}>
        <group ref={inner}>
          {children}
          <mesh
            onPointerOver={() => dispatchShieldStateEvent({ type: 'POINTER_OVER' })}
            onPointerOut={() => dispatchShieldStateEvent({ type: 'POINTER_OUT' })}
          >
            <planeGeometry args={[...(SHIELD_INNER_SIZE.map((d) => d * 1.5) as [number, number]), 32, 32]} />
            <meshBasicMaterial
              color="cyan"
              wireframe={debug}
              transparent={true}
              opacity={debug ? 0.2 : 0}
              depthWrite={false}
            />
          </mesh>
          {debug && (
            <>
              <Html center>
                <div style={{ width: '2px', height: '100px', background: 'red', transform: 'translateX(50px)' }} />
                <div style={{ width: '100px', height: '2px', background: 'red', transform: 'translateY(-50px)' }} />
              </Html>
              <mesh position-z={0.1}>
                <planeGeometry args={[...SHIELD_INNER_SIZE, 32, 32]} />
                <meshBasicMaterial color="red" wireframe />
              </mesh>
            </>
          )}
        </group>
      </group>
    )
  }
)
ShieldContainer.displayName = 'ShieldContainer'
