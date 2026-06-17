import * as THREE from 'https://threejs.org/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1f3a);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
10000
);

camera.position.set(0, 500, 8000);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

scene.add(
new THREE.AmbientLight(
0xffffff,
5
)
);

let ship;

// ===== LOAD YOUR GLB =====

const loaderScript = document.createElement("script");

loaderScript.type = "module";

loaderScript.textContent = `

import { GLTFLoader }
from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(

'./ship.glb',

(gltf)=>{

window.shipModel =
gltf.scene;

window.dispatchEvent(
new Event('shipLoaded')
);

},

undefined,

(err)=>{

console.error(
'GLB ERROR',
err
);

}

);

`;

document.body.appendChild(
loaderScript
);

window.addEventListener(

'shipLoaded',

()=>{

ship = window.shipModel;

scene.add(ship);

const box =
new THREE.Box3()
.setFromObject(ship);

const center =
box.getCenter(
new THREE.Vector3()
);

ship.position.sub(center);

ship.scale.set(
1,
1,
1
);

console.log(
'SHIP ADDED'
);

}

);

// ===== TELEMETRY =====

setInterval(()=>{

const temperature =
Math.floor(
20 + Math.random()*15
);

const humidity =
Math.floor(
50 + Math.random()*30
);

const risk =
Math.floor(
Math.random()*100
);

document.getElementById(
'temp'
).textContent =
temperature;

document.getElementById(
'humidity'
).textContent =
humidity;

document.getElementById(
'risk'
).textContent =
risk;

if(risk < 40){

document.getElementById(
'status'
).textContent =
'Approved';

if(ship){

ship.traverse((child)=>{

if(child.isMesh){

child.material.color.set(
0x2E7D32
);

}

});

}

}

else if(risk < 70){

document.getElementById(
'status'
).textContent =
'Manual Review';

if(ship){

ship.traverse((child)=>{

if(child.isMesh){

child.material.color.set(
0xF57C00
);

}

});

}

}

else{

document.getElementById(
'status'
).textContent =
'High Risk';

if(ship){

ship.traverse((child)=>{

if(child.isMesh){

child.material.color.set(
0xC62828
);

}

});

}

}

},3000);

// ===== ANIMATION =====

function animate(){

requestAnimationFrame(
animate
);

if(ship){

ship.rotation.y += 0.002;

}

renderer.render(
scene,
camera
);

}

animate();

// ===== RESIZE =====

window.addEventListener(
'resize',
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);
