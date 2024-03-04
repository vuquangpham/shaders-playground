uniform sampler2D uImageA;
uniform sampler2D uImageB;
uniform float uTime;

varying vec2 vUv;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main() {
  vec3 color = vec3(.5);

  // calculate the progress
  float progress = fract(uTime);
  progress = (sin(uTime) + 1.) / 2.;

  float intensity = sin(3.14159 * progress);

  // distortion
  vec2 newUv = vUv;
  float noiseValue = noise(newUv * 100.) * intensity;

  vec2 distortion = fract(
    vec2(intensity * .5, 0.) +
    vec2(newUv.x + noiseValue, newUv.y)
    );

  // handle the texture
  vec4 textureA = texture2D(uImageA, distortion);
  vec4 textureB = texture2D(uImageB, distortion);
  vec4 texture = mix(textureA, textureB, progress);

  // ouput
  gl_FragColor = vec4(vec3(progress), 1.0);
  gl_FragColor = texture;
  // gl_FragColor = textureA;
}