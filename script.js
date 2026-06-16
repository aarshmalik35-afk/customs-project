import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js?module";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js?module";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
10000
);

camera.position.set(0, 0, 200);

const renderer = new THREE.WebGLRenderer({
antialias: true
});

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
10
)
);

const loader = new GLTFLoader();

loader.load(

"ship.glb",

(gltf) => {

    const model = gltf.scene;

    scene.add(model);

    console.log("SHIP LOADED");

    model.scale.set(
        100,
        100,
        100
    );

    model.position.set(
        0,
        0,
        0
    );

},

undefined,

(error) => {

    console.error(
        "LOAD ERROR",
        error
    );

}

);

function animate() {

    requestAnimationFrame(
        animate
    );

    renderer.render(
        scene,
        camera
    );

}

animate();
