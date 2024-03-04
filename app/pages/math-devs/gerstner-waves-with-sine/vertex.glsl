uniform float uTime;
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // custom position
  modelPosition.x -= .5 * sin(2.5 * position.x + uTime);
  modelPosition.y += .5 *cos(2.5 * position.x + uTime);

  modelPosition.x -= .2 * sin(2. * position.x + uTime * .5);
  modelPosition.y += .2 *cos(2. * position.x + uTime * .5);

  modelPosition.x -= .1 * sin(2. * position.x + uTime * .5);
  modelPosition.y += .1 *cos(2. * position.x + uTime * .5);

  modelPosition.x -= .05 * sin(4. * position.x + uTime * .3);
  modelPosition.y += .05 *cos(4. * position.x + uTime * .3);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
}