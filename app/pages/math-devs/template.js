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
    this.camera.position.set(0, 2, 5);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
  }

  render() {
    // const elapsedTime = this.clock.getElapsedTime();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  // for destroy this script when navigating between each page
  destroy() {
    console.log("destroyed", this);
  }
}