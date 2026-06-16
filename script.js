import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

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

camera.position.set(0, 5, 30);

// Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document
    .getElementById('container')
    .appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    5
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    5
);

directionalLight.position.set(
    10,
    20,
    10
);

scene.add(directionalLight);

// Controls
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;

// TEST CUBE
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshNormalMaterial()
);

cube.position.set(-10, 0, 0);

scene.add(cube);

// GLB Loader
const loader = new GLTFLoader();

loader.load(

    'ship.glb',

    function (gltf) {

        const ship = gltf.scene;

        scene.add(ship);

        ship.position.set(
            0,
            0,
            0
        );

        ship.scale.set(
            10,
            10,
            10
        );

        console.log('SHIP LOADED');

    },

    function (xhr) {

        console.log(
            (xhr.loaded / xhr.total * 100) +
            '% loaded'
        );

    },

    function (error) {

        console.error(
            'MODEL ERROR:',
            error
        );

    }

);

// Animation
function animate() {

    requestAnimationFrame(
        animate
    );

    cube.rotation.y += 0.01;

    controls.update();

    renderer.render(
        scene,
        camera
    );

}

animate();

// Resize
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
