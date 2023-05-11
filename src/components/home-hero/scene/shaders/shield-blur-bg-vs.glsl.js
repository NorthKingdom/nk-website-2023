const vertexShader = /* glsl */ `

uniform float uTime;
varying vec2 vUv;
  
void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.x += sin(modelPosition.x * 4.0 + uTime * 2.0) * 0.15;
  
  modelPosition.z += sin(modelPosition.z * 6.0 + uTime * 2.0) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`

export default vertexShader
