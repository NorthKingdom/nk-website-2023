import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useMotionValue, animate } from 'framer-motion'
import type { Material } from 'three'

interface BlackOverlayProps {
  show: boolean
}
export const BlackOverlay = ({ show = true }: BlackOverlayProps) => {
  const ref = useRef<THREE.Mesh>(null!)
  const viewport = useThree((state) => state.viewport)

  const blockoutOverlayOpacity = useMotionValue(1)
  useEffect(() => {
    if (!show) {
      animate(blockoutOverlayOpacity, 0, {
        duration: 1,
        onUpdate: (v) => {
          if (ref.current) {
            ;(ref.current.material as Material).opacity = v
          }
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    <mesh ref={ref} position-z={0.01} scale={viewport.height}>
      <planeGeometry attach="geometry" args={[10, 10, 1]} />
      <meshBasicMaterial attach="material" color="black" transparent={true} depthWrite={false} />
    </mesh>
  )
}
