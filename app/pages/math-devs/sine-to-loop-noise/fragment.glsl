varying vec2 vUv;

void main() {
  vec3 color = vec3(.5);


  // output
  gl_FragColor = vec4(vUv, 1.0, 1.0);
}