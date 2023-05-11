const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform sampler2D uVideo; 
uniform sampler2D uMask;

void main() {
  vec2 uv = vUv;
  vec3 video = texture2D(uVideo, vUv).rgb;
  float maskAlpha = texture2D(uMask, vUv).r;

  gl_FragColor = vec4(video, maskAlpha);

}
`
export default fragmentShader
