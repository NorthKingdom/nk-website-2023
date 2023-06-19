const fragmentShader = /* glsl */ `
varying vec2 vUv;
uniform float uOpacity;
uniform vec3 uColor; // { value: "#8c94ff" }
uniform sampler2D uMask; 
uniform float uTime;

// COLORS
// https://airtightinteractive.com/util/hex-to-glsl/
// vec3 layer_1_color = vec3(0.231,0.471,0.608);
// vec3 layer_2_color = vec3(0.231,0.471,0.608);
// vec3 layer_3_color = vec3(0.686,0.776,0.827);


// OPACITIES 
float layer_1_color_opacity = 0.2;
float layer_2_color_opacity = 0.3;
float layer_3_color_opacity = 0.1;

// SIZES
float layer_1_scale = 1.0 / 0.65;
float layer_2_scale = 1.0 / 0.65;
float layer_3_scale = 1.0;

// ROTATIONS
float layer_1_rotation = radians(16.0);
float layer_2_rotation = radians(5.0);
float layer_3_rotation = radians(0.0);

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat3 rotation3dX(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(
    1.0, 0.0, 0.0,
    0.0, c, s,
    0.0, -s, c
  );
}

vec3 rotateX(vec3 v, float angle) {
  return rotation3dX(angle) * v;
}

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

  vec2 uv = vUv;
  vec2 uv1 = vUv;
  vec2 uv2 = vUv;
  vec2 uv3 = vUv;

  vec3 layer_1_color = uColor;
  vec3 layer_2_color = uColor;
  vec3 layer_3_color = uColor;

  // scale UV
  // uv -= vec2(0.5);
  // uv *= vec2(1.33, 1);
  // // uv *= scale(vec2(1.5));
  // uv *= scaleAndRotate(vec2(1.5), sin(uTime) * PI *0.1);
  // uv += vec2(-0.5, -0.5);
  // uv += vec2(0.5);

  // LAYER 1
  uv1 -= vec2(0.5);
  uv1 *= scaleAndRotate(vec2(layer_1_scale), layer_1_rotation);
  uv1 += vec2(0.5);

  // LAYER 2
  uv2 -= vec2(0.5);
  uv2 *= scaleAndRotate(vec2(layer_2_scale), layer_2_rotation);
  uv2 += vec2(0.5);

  // LAYER 3
  uv3 -= vec2(0.5);
  uv3 *= scaleAndRotate(vec2(layer_3_scale), layer_3_rotation);
  uv3 += vec2(0.5);

  // LAYER 1
  vec3 layer_1 = texture2D(uMask, uv1).rgb;
  float layer_1_alpha = texture2D(uMask, uv1).r;
  layer_1 *= layer_1_color;
  layer_1 *= layer_1_color_opacity;

  // LAYER 2
  vec3 layer_2 = texture2D(uMask, uv2).rgb;
  float layer_2_alpha = texture2D(uMask, uv2).r;
  layer_2 *= layer_2_color;
  layer_2 *= layer_2_color_opacity;

  // LAYER 3

  vec3 layer_3 = texture2D(uMask, uv3).rgb;
  float layer_3_alpha = texture2D(uMask, uv3).r;
  layer_3 *= layer_3_color;
  layer_3 *= layer_3_color_opacity;

  vec3 color = layer_1 + layer_2 + layer_3;

  gl_FragColor = vec4(color, 1.0);
}
`

export default fragmentShader
