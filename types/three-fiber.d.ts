import { ReactThreeFiber } from '@react-three/fiber'
import { EffectComposer, ShaderPass } from 'three-stdlib'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      effectComposer: ReactThreeFiber.Node<EffectComposer, typeof EffectComposer>
      renderPass: ReactThreeFiber.Node<RenderPass, typeof RenderPass>
      unrealBloomPass: ReactThreeFiber.Node<UnrealBloomPass, typeof UnrealBloomPass>
      shaderPass: ReactThreeFiber.Node<ShaderPass, typeof ShaderPass>
    }
  }
}
