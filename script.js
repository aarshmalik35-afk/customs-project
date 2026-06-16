import * as THREE from 'https://threejs.org/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
10000
);

camera.position.set(0, 500, 8000);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement
);

scene.add(
new THREE.AmbientLight(
0xffffff,
5
)
);

const geometry = new THREE.BoxGeometry(
2500,
3000,
7000
);

const material =
new THREE.MeshNormalMaterial({
wireframe: true
});

const shipPlaceholder =
new THREE.Mesh(
geometry,
material
);

scene.add(
shipPlaceholder
);

function animate(){

requestAnimationFrame(
animate
);

shipPlaceholder.rotation.y += 0.002;

renderer.render(
scene,
camera
);

}

animate();
