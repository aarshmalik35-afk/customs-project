import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js?module";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js?module";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1f3a);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 20, 50);

const renderer = new THREE.WebGLRenderer({
antialias: true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(
0xffffff,
5
);

scene.add(ambient);

const loader = new GLTFLoader();

loader.load(

'ship.glb',

function(gltf){

const ship = gltf.scene;

scene.add(ship);

console.log("SHIP LOADED");

console.log(ship);

ship.position.set(
0,
0,
0
);

// MASSIVE SCALE
ship.scale.set(
100,
100,
100
);

},

undefined,

function(error){

console.error(error);

}

);

function animate(){

requestAnimationFrame(animate);

renderer.render(
scene,
camera
);

}

animate();
