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

const containerId =
"CONT-" +
Math.floor(100000 + Math.random() * 900000);

document.getElementById(
"containerId"
).textContent = containerId;

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
        ship.position.x = -1200;
        ship.position.y = -200;

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
        5000 / maxDim;

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
function updateTelemetry(){

    const temperature =
    Math.floor(20 + Math.random()*20);

    const humidity =
    Math.floor(40 + Math.random()*50);

    const shockEvents =
    Math.floor(Math.random()*10);

    const tilt =
    Math.floor(Math.random()*12);

    const vibrationLevels = [
        "Low",
        "Medium",
        "High"
    ];

    const vibration =
    vibrationLevels[
        Math.floor(Math.random()*3)
    ];

    const doorStatus =
    Math.random() > 0.85
    ? "Open"
    : "Closed";

    const sealStatus =
    Math.random() > 0.9
    ? "Broken"
    : "Intact";

    const locations = [
        "Singapore Port",
        "Mumbai Port",
        "Dubai Port",
        "Rotterdam",
        "Shanghai"
    ];

    const location =
    locations[
        Math.floor(
            Math.random()*locations.length
        )
    ];

    const etaOptions = [
        "1 Day",
        "2 Days",
        "3 Days",
        "5 Days",
        "7 Days"
    ];

    const eta =
    etaOptions[
        Math.floor(
            Math.random()*etaOptions.length
        )
    ];

    let risk = 0;

    if(temperature > 35) risk += 15;
    if(humidity > 80) risk += 10;
    if(shockEvents > 5) risk += 25;
    if(vibration === "Medium") risk += 10;
    if(vibration === "High") risk += 20;
    if(doorStatus === "Open") risk += 30;
    if(sealStatus === "Broken") risk += 40;
    if(tilt > 8) risk += 15;

    risk = Math.min(risk,100);

    let status = "Approved";

    if(risk >= 40)
        status = "Manual Review";

    if(risk >= 70)
        status = "High Risk";

    const sealAlert =
    sealStatus === "Broken"
    ? "YES"
    : "NO";

    document.getElementById("temp").textContent =
    temperature;

    document.getElementById("humidity").textContent =
    humidity;

    document.getElementById("shock").textContent =
    shockEvents;

    document.getElementById("vibration").textContent =
    vibration;

    document.getElementById("door").textContent =
    doorStatus;

    document.getElementById("seal").textContent =
    sealStatus;

    document.getElementById("tilt").textContent =
    tilt;

    document.getElementById("location").textContent =
    location;

    document.getElementById("eta").textContent =
    eta;

    document.getElementById("risk").textContent =
    risk;

    document.getElementById("status").textContent =
    status;

    document.getElementById("lastUpdated").textContent =
    new Date().toLocaleTimeString();

    document.getElementById("sealAlert").textContent =
    sealAlert;

    const alertElement =
    document.getElementById(
        "sealAlert"
    );

    if(sealAlert === "YES"){

        alertElement.style.color =
        "#ff4d4d";

    }
    else{

        alertElement.style.color =
        "#4CAF50";

    }

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
