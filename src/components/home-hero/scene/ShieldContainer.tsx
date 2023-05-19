import { forwardRef, createContext, useMemo, useContext, useState } from 'react'
import { Html, useCursor } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useBreakpointFrom } from '@hooks/use-breakpoint'

interface ShieldContainerProps {
  z?: number
  children: React.ReactNode
  debug?: boolean
  [key: string]: any
}

const SHIELD_INNER_DIMENSIONS = [3.4, 4.5]
const SHIELD_VW_WIDTH = {
  portrait: 0.66,
  landscape: 0.18,
}

export const ShieldContainerContext = createContext({
  position: [0, 0, 0],
  hovered: false,
  scaleIdle: 1,
  scaleFullscreen: 1,
})

export const ShieldContainer = forwardRef(
  ({ z = 0, children, debug = true, ...props }: ShieldContainerProps, ref: React.Ref<THREE.Group>) => {
    const camera = useThree((state) => state.camera)
    const viewport = useThree((state) => state.viewport)
    const isDesktopBp = useBreakpointFrom('desktopSmall')

    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
    const screenOrientation = width > height ? 'landscape' : 'portrait'

    const scaleIdle = (width * SHIELD_VW_WIDTH[screenOrientation]) / SHIELD_INNER_DIMENSIONS[0]
    const scaleFullscreen =
      Math.max(width / SHIELD_INNER_DIMENSIONS[0], height / SHIELD_INNER_DIMENSIONS[1]) / scaleIdle

    const positionX = isDesktopBp ? -SHIELD_INNER_DIMENSIONS[0] * scaleIdle * 0.5 : 0
    const position = useMemo(() => [positionX, 0, z], [positionX, z])

    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    return (
      <ShieldContainerContext.Provider value={{ hovered, position, scaleIdle, scaleFullscreen }}>
        <group ref={ref} {...props} position={[position[0], position[1], position[2]]} scale={scaleIdle}>
          {children}
          <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
            <planeBufferGeometry args={[...SHIELD_INNER_DIMENSIONS.map((d) => d * 1.5), 32, 32]} />
            <meshBasicMaterial color="cyan" wireframe={debug} transparent={true} opacity={debug ? 0.2 : 0} />
          </mesh>
          {debug && (
            <>
              <Html center>
                <div style={{ width: '2px', height: '100px', background: 'red', transform: 'translateX(50px)' }} />
                <div style={{ width: '100px', height: '2px', background: 'red', transform: 'translateY(-50px)' }} />
              </Html>
              <mesh position-z={0.1}>
                <planeBufferGeometry args={[...SHIELD_INNER_DIMENSIONS, 32, 32]} />
                <meshBasicMaterial color="red" wireframe />
              </mesh>
            </>
          )}
        </group>
      </ShieldContainerContext.Provider>
    )
  }
)
ShieldContainer.displayName = 'ShieldContainer'
