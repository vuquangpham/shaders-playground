import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
      new THREE.PlaneGeometry(2, 2, 128, 128),
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
        },
        fragmentShader,
        vertexShader,
      }),
    );
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.scene.add(this.mesh);
  }

  render() {
    const elapsedTime = this.clock.getElapsedTime();

    // attributes
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
