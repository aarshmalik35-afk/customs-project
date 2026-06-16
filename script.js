import * as THREE from 'https://threejs.org/build/three.module.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

console.log("THREE VERSION:", THREE.REVISION);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1f3a);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container").appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 5));

const loader = new GLTFLoader();

loader.load(
    "./ship.glb",
    (gltf) => {
        console.log("SHIP LOADED");

        const ship = gltf.scene;

        scene.add(ship);

        const box = new THREE.Box3().setFromObject(ship);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        ship.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);

        if (maxDim > 0) {
            const scale = 10 / maxDim;
            ship.scale.setScalar(scale);
        }

        console.log("SIZE:", size);
    },
    undefined,
    (err) => {
        console.error("LOAD ERROR", err);
    }
);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
