import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import vertexShader from './shaders/vs.glsl'
import fragmentShader from './shaders/fs.glsl'
import { Mesh } from 'three'

const MovingPlane = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>(null)

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
    }),
    []
  )

  useFrame((state) => {
    const { clock } = state
    if (mesh.current) {
      // @ts-ignore
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial fragmentShader={fragmentShader} vertexShader={vertexShader} uniforms={uniforms} wireframe />
    </mesh>
  )
}

export const Scene = (props: any) => {
  return (
    <Canvas camera={{ position: [1.0, 1.5, 1.0] }} {...props}>
      <MovingPlane />
    </Canvas>
  )
}
