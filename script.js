import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

import { OrbitControls }
from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader }
from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x0b1f3a);

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(
0,
5,
20
);

const renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

const ambient =
new THREE.AmbientLight(
0xffffff,
4
);

scene.add(ambient);

const directional =
new THREE.DirectionalLight(
0xffffff,
4
);

directional.position.set(
10,
10,
10
);

scene.add(directional);

const controls =
new OrbitControls(
camera,
renderer.domElement
);

const loader =
new GLTFLoader();

loader.load(

'ship.glb',

function(gltf){

const model =
gltf.scene;

scene.add(model);

model.scale.set(
5,
5,
5
);

console.log(
"SHIP LOADED"
);

},

undefined,

function(error){

console.error(
"MODEL ERROR",
error
);

}

);

function animate(){

requestAnimationFrame(
animate
);

controls.update();

renderer.render(
scene,
camera
);

}

animate();
