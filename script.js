import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1f3a);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 5, 15);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

document
    .getElementById('container')
    .appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

// Load Ship
const loader = new GLTFLoader();

loader.load(

    'ship.glb',

    function (gltf) {

        const ship = gltf.scene;

        scene.add(ship);

        // Auto-center model
        const box = new THREE.Box3().setFromObject(ship);
        const center = box.getCenter(new THREE.Vector3());

        ship.position.sub(center);

        // Auto-scale model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        const scale = 10 / maxDim;

        ship.scale.setScalar(scale);

        console.log('Ship Loaded Successfully');

    },

    function (xhr) {

        console.log(
            (xhr.loaded / xhr.total * 100) +
            '% loaded'
        );

    },

    function (error) {

        console.error(
            'Error loading model:',
            error
        );

    }

);

// Animation Loop
function animate() {

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

// Resize Handler
window.addEventListener(
    'resize',
    () => {

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
