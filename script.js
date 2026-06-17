import * as THREE from 'https://threejs.org/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

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
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.getElementById("container")
    .appendChild(renderer.domElement);

// Lighting
const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    5
);

scene.add(ambientLight);

const directionalLight =
new THREE.DirectionalLight(
    0xffffff,
    3
);

directionalLight.position.set(
    5000,
    5000,
    5000
);

scene.add(directionalLight);

// Ship Variable
let ship = null;

// Load Ship
const loader = new GLTFLoader();

loader.load(

    './ship.glb',

    function(gltf){

        ship = gltf.scene;

        scene.add(ship);

        console.log("SHIP LOADED");

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

    },

    undefined,

    function(error){

        console.error(
            "LOAD ERROR",
            error
        );

    }

);

// Telemetry Simulation
setInterval(() => {

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

    document.getElementById("temp").innerText =
    temperature;

    document.getElementById("humidity").innerText =
    humidity;

    document.getElementById("risk").innerText =
    risk;

    let status = "Approved";

    if(risk < 40){

        status = "Approved";

    }

    else if(risk < 70){

        status = "Manual Review";

    }

    else{

        status = "High Risk";

    }

    document.getElementById("status").innerText =
    status;

    // Change ship color
    if(ship){

        ship.traverse((child)=>{

            if(child.isMesh){

                if(risk < 40){

                    child.material.color.set(
                        0x2E7D32
                    );

                }

                else if(risk < 70){

                    child.material.color.set(
                        0xF57C00
                    );

                }

                else{

                    child.material.color.set(
                        0xC62828
                    );

                }

            }

        });

    }

},3000);

// Animation
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
    }
);
