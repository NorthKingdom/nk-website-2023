const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform float uOpacity;
uniform vec3 uColor; // { value: "#8c94ff" }
uniform sampler2D uMask; // { image: "./shield-feather-mask-01.png" }

void main() {

  vec2 uv = vUv;

  vec3 mask = texture2D(uMask, vUv).rgb;
  float maskAlpha = mask.r;
  vec3 color = uColor;


  gl_FragColor = vec4(color, maskAlpha * uOpacity);


}
`

export default fragmentShader
