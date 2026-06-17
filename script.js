import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js?module';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js?module';

console.log("CUSTOMS DIGITAL TWIN STARTING");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1f3a);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.set(0, 500, 4000);

// Renderer
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

// Lights
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    5
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(
    3000,
    3000,
    3000
);

scene.add(directionalLight);

// Ship variable
let ship = null;

// Load GLB
const loader = new GLTFLoader();

loader.load(

    "./ship.glb",

    (gltf) => {

        ship = gltf.scene;

        // Replace broken materials
        ship.traverse((child) => {

            if (child.isMesh) {

                child.material =
                new THREE.MeshStandardMaterial({
                    color: 0xffffff
                });

            }

        });

        scene.add(ship);

        // Center model
        const box =
        new THREE.Box3().setFromObject(ship);

        const center =
        box.getCenter(
            new THREE.Vector3()
        );

        ship.position.sub(center);

        // Auto scale
        const size =
        box.getSize(
            new THREE.Vector3()
        );

        const maxDim =
        Math.max(
            size.x,
            size.y,
            size.z
        );

        const scale =
        2000 / maxDim;

        ship.scale.set(
            scale,
            scale,
            scale
        );

        console.log("SHIP LOADED");

    },

    undefined,

    (error) => {

        console.error(
            "GLB ERROR:",
            error
        );

    }

);

// Telemetry
function updateTelemetry() {

    const temperature =
    Math.floor(
        20 + Math.random() * 15
    );

    const humidity =
    Math.floor(
        50 + Math.random() * 30
    );

    const risk =
    Math.floor(
        Math.random() * 100
    );

    document.getElementById("temp").textContent =
    temperature;

    document.getElementById("humidity").textContent =
    humidity;

    document.getElementById("risk").textContent =
    risk;

    let status = "Approved";

    if (risk < 40) {

        status = "Approved";

    }

    else if (risk < 70) {

        status = "Manual Review";

    }

    else {

        status = "High Risk";

    }

    document.getElementById("status").textContent =
    status;

    // Color ship
    if (ship) {

        ship.traverse((child) => {

            if (child.isMesh) {

                if (risk < 40) {

                    child.material.color.set(
                        0x2E7D32
                    );

                }

                else if (risk < 70) {

                    child.material.color.set(
                        0xF57C00
                    );

                }

                else {

                    child.material.color.set(
                        0xC62828
                    );

                }

            }

        });

    }

}

updateTelemetry();

setInterval(
    updateTelemetry,
    3000
);

// Animation
function animate() {

    requestAnimationFrame(
        animate
    );

    if (ship) {

        ship.rotation.y += 0.002;

    }

    renderer.render(
        scene,
        camera
    );

}

animate();

// Resize
window.addEventListener(
    "resize",
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
