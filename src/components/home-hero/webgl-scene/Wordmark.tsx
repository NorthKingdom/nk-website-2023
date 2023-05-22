/* eslint-disable react/no-children-prop */
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useBreakpointFrom } from '@hooks/use-breakpoint'
import { useWebglSceneStore } from './WebglScene.store'
// import { useControls } from 'leva'

export const Wordmark = () => {
  const { config, shieldAnchor, shieldScaleIdle } = useWebglSceneStore()
  const { SHIELD_INNER_SIZE } = config

  const viewport = useThree((state) => state.viewport)
  const { width, height } = viewport

  const isDesktopBp = useBreakpointFrom('desktopSmall')
  const fontSize = 0.125
  // const { fontSize } = useControls({
  //   fontSize: { value: 0.125, min: 0.01, max: 3, step: 0.01 },
  // })

  return (
    <>
      {isDesktopBp ? (
        <>
          <Word
            position-z={0.01}
            position-x={-(SHIELD_INNER_SIZE[0] * 0.5 * shieldScaleIdle) + shieldAnchor[0]}
            anchorX="right"
            fontSize={fontSize * width}
          >
            North
          </Word>
          <Word position-z={0.01} anchorX="left" fontSize={fontSize * width}>
            Kingdom
          </Word>
        </>
      ) : (
        <Word
          position-z={0.01}
          position-x={-width * 0.5}
          position-y={-height * 0.5}
          maxWidth={width}
          lineHeight={0.9}
          anchorX="left"
          anchorY="bottom"
          fontSize={1.2}
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

export const Word = ({ children, ...props }: WordProps) => {
  const color = new THREE.Color(0xffffff)
  const fontProps = {
    font: '/fonts/FKGroteskNeue/woff/FKGroteskNeue-Regular.woff',
    fontSize: 1,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  }
  return <Text {...fontProps} {...props} material-color={color} children={children} />
}
