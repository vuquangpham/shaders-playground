import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class {
  constructor({ element }) {
    this.element = element;

    // init
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.container = document.querySelector("[data-container]");
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.clock = new THREE.Clock();

    this.setupCamera();
    this.setupScene();
    this.addObjects();
    this.render();
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000,
    );
    this.camera.position.set(0, 1, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  setupScene() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
  }

  addObjects() {
    // grid helper
    const gridHelper = new THREE.GridHelper(10, 40);
    this.scene.add(gridHelper);

    // create simple mesh
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2, 32, 32),
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
        },

        vertexShader: `
        varying vec3 uPosition;
        varying vec2 vUv;
        void main() {
          gl_Position = vec4(position, 1.) * projectionMatrix * viewMatrix * modelMatrix;
          uPosition = position;
          vUv = uv;
        }
        `,
        fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 uPosition;

        float rect(vec2 position, vec2 size, vec2 center, float radius) {
          vec2 p = position;
          p.x += cos(uTime) * radius;
          p.y += sin(uTime) * radius;
          vec2 halfSize = size * .5;

          float horizontal = step(center.x - halfSize.x, p.x) - step(center.x + halfSize.x, p.x);
          float vertical = step(center.y - halfSize.y, p.y) - step(center.y + halfSize.y, p.y);

          return horizontal * vertical;
        }
        
        void main() {
          // draw with position
          // float color = rect(uPosition.xy, vec2(1.), vec2(0.), .5);

          // draw with UV coordinates
          float color = rect(vUv, vec2(0.2), vec2(0.5), .4);
          gl_FragColor = vec4(vec3(color), 1.0);
        }
        `,
      }),
    );
    this.scene.add(this.mesh);
  }

  render() {
    const elapsedTime = this.clock.getElapsedTime();
    this.mesh.material.uniforms.uTime.value = elapsedTime;

    // update render
    this.renderer.render(this.scene, this.camera);

    // update camera
    this.controls.update();

    // raf
    this.rafId = requestAnimationFrame(this.render.bind(this));
  }

  // for destroy this script when navigating between each page
  destroy() {
    // stop the animation
    cancelAnimationFrame(this.rafId);

    //remove listener to render
    this.renderer.domElement.addEventListener("dblclick", null, false);
    this.scene = null;
    this.camera = null;
    this.controls = null;

    // log
    console.log("destroyed", this);
  }
}
