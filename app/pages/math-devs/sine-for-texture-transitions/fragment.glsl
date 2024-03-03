uniform sampler2D uImageA;
uniform sampler2D uImageB;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec3 color = vec3(.5);

  // calculate the progress
  float progress = fract(uTime);
  progress = (sin(uTime) + 1.) / 2.;

  // handle the texture
  vec4 textureA = texture2D(uImageA, vUv);
  vec4 textureB = texture2D(uImageB, vUv);
  vec4 texture = mix(textureA, textureB, progress);

  // ouput
  gl_FragColor = vec4(vec3(progress), 1.0);
  gl_FragColor = texture;
}