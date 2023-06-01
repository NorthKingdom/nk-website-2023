import { Vector2 } from 'three'
import { grain } from './shaders/grain.glsl'

export const distortionEffect = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2(window.innerWidth, window.innerHeight) },
    uMouse: { value: new Vector2(-10, -10) },
    uVelocity: { value: 0 },
    uIntensity: { value: 0 },
  },
  vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
  fragmentShader: /* glsl */ `

    uniform float time;
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;
    uniform vec2 uMouse;
    uniform float uIntensity;

    ${grain}

    float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
      uv -= disc_center;
      uv *= vec2(1.0, resolution.y / resolution.x);
      float dist = sqrt(dot(uv, uv));
      return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
    }

    void main()  {
        vec2 newUV = vUv;
        float c = circle(vUv, uMouse, 0.0, 0.2);
        float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * uIntensity * .5)).x;
        float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * uIntensity * .525)).y;
        float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * uIntensity * .55)).z;

        float grainSize = 1.0;
        float film_grain = grain(vUv, resolution / grainSize);

        vec3 color = vec3(r,g,b) + film_grain * 0.1; 

        gl_FragColor = vec4(color, 1.0);
    }`,
}
