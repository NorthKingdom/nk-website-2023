const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform vec3 uColor; // { value: "#8c94ff" }
uniform sampler2D uMask; 


vec3 flare_top_color = vec3(0.231,0.471,0.608);
vec3 flare_bottom_color = vec3(0.231,0.471,0.608);

float flare_top_color_opacity = 0.1;
float flare_bottom_color_opacity = 0.14;

float flare_bottom_scale = 1.0 / 0.5;
float flare_top_scale = 1.0 / 0.5;

mat2 scaleAndRotate(vec2 scale, float rotation) {
  float cosTheta = cos(rotation);
  float sinTheta = sin(rotation);


  mat2 combinedMatrix = mat2(
    scale.x * cosTheta, -scale.y * sinTheta,
    scale.x * sinTheta, scale.y * cosTheta
  );

  return combinedMatrix;
}

void main() {

  vec2 uv1 = vUv;
  vec2 uv2 = vUv;
  

  // FLARE TOP
  uv1 -= vec2(0.5);
  uv1.y += -0.15;
  uv1 *= scaleAndRotate(vec2(flare_top_scale * 1.3, flare_top_scale), 0.0);
  uv1 += vec2(0.5);
  
  vec3 flare_top = texture2D(uMask, uv1).rgb;
  float flare_top_alpha = texture2D(uMask, uv1).r;
  flare_top *= flare_top_color;
  flare_top *= flare_top_color_opacity;

  // FLARE BOTTOM
  uv2 -= vec2(0.5);
  uv2.y += 0.2;
  uv2 *= scaleAndRotate(vec2(flare_bottom_scale), 3.14);  
  uv2 += vec2(0.5);

  vec3 flare_bottom = texture2D(uMask, uv2).rgb;
  float flare_bottom_alpha = flare_bottom.r;
  flare_bottom *= flare_bottom_color;
  flare_bottom *= flare_bottom_color_opacity;

  vec3 color = flare_top + flare_bottom;
  float alpha = flare_top_alpha + flare_bottom_alpha;

  vec3 red  = vec3(1.0, 0.0, 0.0);

  gl_FragColor = vec4(color, alpha);
}
`

export default fragmentShader
