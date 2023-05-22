import React, { useEffect, useRef, useState } from 'react'
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib'
import { mergeRefs } from 'react-merge-refs'
import { extend, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { distortionEffect } from './DistortionEffect'
import { usePointer } from '@hooks/use-pointer'

extend({
  EffectComposer,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
})

const CONFIG = {
  VELOCITY_MULTIPLIER: 100,
  VELOCITY_RESTITUTION: 0.999,
}

export const Effects = React.forwardRef<EffectComposer>((props, ref) => {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const size = useThree((s) => s.size)
  const { width, height } = size
  const camera = useThree((s) => s.camera)
  const [aspect] = useState(() => new THREE.Vector2(width, height))
  const composer = useRef<EffectComposer>()
  const bloomPass = useRef<UnrealBloomPass | undefined>()
  const distortionPass = useRef<ShaderPass>(null)

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(width, height)
    }

    if (bloomPass.current) {
      bloomPass.current.resolution.set(width, height)
    }
  }, [width, height])

  useFrame(() => {
    velocity.current *= CONFIG.VELOCITY_RESTITUTION
    if (distortionPass.current) {
      // distortionPass.current.uniforms.uVelocity.value = velocity.current
    }

    if (composer.current) {
      composer.current.render()
    }
  }, 1)

  const velocity = useRef(0)

  usePointer({
    onMove: (_, { position, delta }) => {
      velocity.current = (delta.x ** 2 + delta.y ** 2) * CONFIG.VELOCITY_MULTIPLIER
      console.log(velocity.current)

      if (distortionPass.current) {
        distortionPass.current.uniforms.uMouse.value.x = position.x
        distortionPass.current.uniforms.uMouse.value.y = 1 - position.y
      }
    },
  })

  return (
    <effectComposer ref={mergeRefs([ref, composer])} args={[gl]}>
      <renderPass attach="passes-0" scene={scene} camera={camera} />
      <shaderPass ref={distortionPass} attach="passes-1" args={[distortionEffect]} />
      {/* <unrealBloomPass attach="passes-2" args={[aspect, 0.8, 0.2, 0.11]} /> */}
    </effectComposer>
  )
})
Effects.displayName = 'Effects'
