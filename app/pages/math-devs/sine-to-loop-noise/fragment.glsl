varying vec2 vUv;

void main() {
  vec3 color = vec3(.5);

  vec2 newUV = vUv;
  newUV *= 8.;

  vec2 fractUV = fract(newUV);
  float vColorX = 0.;

  if (step(0.5, mod(floor(newUV.y * 1.), 2.)) == 0.) {
    vColorX = step(0.5, mod(floor(newUV.x * 1.), 2.));
  } else {
    vColorX = 1.0 - step(0.5, mod(floor(newUV.x * 1.), 2.));
  }


  float vColorY = 1. - step(0.5, mod(floor(newUV.y * 1.), 2.));

  // output
  gl_FragColor = vec4(newUV, 1.0, 1.0);
  gl_FragColor = vec4(vec3(vColorX), 1.0);
}