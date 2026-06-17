import * as THREE from 'https://threejs.org/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1f3a);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
10000
);

camera.position.set(
0,
500,
8000
);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(
renderer.domElement
);

scene.add(
new THREE.AmbientLight(
0xffffff,
5
)
);

const geometry =
new THREE.BoxGeometry(
2500,
3000,
7000
);

const material =
new THREE.MeshStandardMaterial({

color:0x2E7D32

});

const ship =
new THREE.Mesh(
geometry,
material
);

scene.add(ship);

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
"temp"
).textContent = temperature;

document.getElementById(
"humidity"
).textContent = humidity;

document.getElementById(
"risk"
).textContent = risk;

if(risk < 40){

document.getElementById(
"status"
).textContent =
"Approved";

ship.material.color.set(
0x2E7D32
);

}

else if(risk < 70){

document.getElementById(
"status"
).textContent =
"Manual Review";

ship.material.color.set(
0xF57C00
);

}

else{

document.getElementById(
"status"
).textContent =
"High Risk";

ship.material.color.set(
0xC62828
);

}

},3000);

function animate(){

requestAnimationFrame(
animate
);

ship.rotation.y += 0.002;

renderer.render(
scene,
camera
);

}

animate();
