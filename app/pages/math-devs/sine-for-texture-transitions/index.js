import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import imageA from "./616-300x300.jpg";
import imageB from "./699-300x300.jpg";

import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

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
    this.camera.position.set(0, 0.2, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
  }

  setupScene() {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);
  }

  addObjects() {
    // loaders
    const textureLoader = new THREE.TextureLoader();

    // grid helper
    const gridHelper = new THREE.GridHelper(10, 40);
    this.scene.add(gridHelper);

    // create simple mesh
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uImageA: { value: textureLoader.load(imageA) },
          uImageB: { value: textureLoader.load(imageB) },
        },

        vertexShader,
        fragmentShader,
      }),
    );
    this.scene.add(this.mesh);
  }

  render() {
    const elapsedTime = this.clock.getElapsedTime();

    // update attributes
    this.mesh.material.uniforms.uTime.value = elapsedTime;

    // update render
    this.renderer.render(this.scene, this.camera);

    // update camera
    this.controls.update();

    // raf
    requestAnimationFrame(this.render.bind(this));
  }

  // for destroy this script when navigating between each page
  destroy() {
    console.log("destroyed", this);
  }
}
