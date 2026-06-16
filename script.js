import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js?module";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

const cube = new THREE.Mesh(
new THREE.BoxGeometry(),
new THREE.MeshNormalMaterial()
);

scene.add(cube);

function animate(){

requestAnimationFrame(animate);

cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

renderer.render(scene,camera);

}

animate();
