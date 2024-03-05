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
    this.renderer.setClearColor("white");
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
        varying vec2 vUv;
        varying vec3 uPosition;

        float circle(vec3 position, vec2 center, float radius) {
          return 1.0 - step(radius, distance(position.xy, center));
        }
        
        void main() {
          // draw with position
          float color = circle(uPosition, vec2(0.), 0.5);

          // draw with UV coordinates
          // float color = circle(vec3(vUv, 0.0), vec2(0.3), 0.2);
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
