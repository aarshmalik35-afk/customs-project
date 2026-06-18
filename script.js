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

camera.position.set(0, 700, 5500);

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

// Realistic telemetry state
let temperature = 28;
let humidity = 65;
let shockEvents = 0;

// NEW
let tilt = 2;

let doorStatus = "Closed";
let sealStatus = "Intact";

const vibrationLevels = [
    "Low",
    "Medium",
    "High"
];

let vibrationIndex = 0;
let vibration = vibrationLevels[0];

const route = [
    "Shanghai Port",
    "Singapore Port",
    "Mumbai Port",
    "Dubai Port",
    "Rotterdam Port"
];

let routeIndex = 1;
let currentLocation = route[routeIndex];

const containerId =
"CONT-" +
Math.floor(100000 + Math.random() * 900000);

document.getElementById(
"containerId"
).textContent = containerId;

const shipmentId =
"SHP-" +
Math.floor(
1000 + Math.random()*9000
);

document.getElementById(
"shipmentId"
).textContent =
shipmentId;

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
        ship.position.x = -500;
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

temperature +=
Math.floor(Math.random()*3) - 1;

humidity +=
Math.floor(Math.random()*3) - 1;

temperature =
Math.max(
20,
Math.min(40, temperature)
);

humidity =
Math.max(
40,
Math.min(90, humidity)
);

// Shock events accumulate slowly
if(Math.random() < 0.03){

    shockEvents++;

}

// Tilt changes slowly
tilt +=
Math.floor(Math.random()*3) - 1;

tilt =
Math.max(
0,
Math.min(12, tilt)
);

// Vibration changes rarely
if(Math.random() < 0.10){

    const direction =
    Math.random() < 0.5
    ? -1
    : 1;

    vibrationIndex += direction;

    vibrationIndex =
    Math.max(
        0,
        Math.min(
            2,
            vibrationIndex
        )
    );

    vibration =
    vibrationLevels[
        vibrationIndex
    ];

}

// Door opens very rarely
if(
    doorStatus === "Closed" &&
    Math.random() < 0.01
){

    doorStatus = "Open";

}

// Door closes again occasionally
else if(
    doorStatus === "Open" &&
    Math.random() < 0.30
){

    doorStatus = "Closed";

}

// Seal breaches are extremely rare
if(
    sealStatus === "Intact" &&
    Math.random() < 0.005
){

    sealStatus = "Broken";

}

   if(Math.random() < 0.03){

    routeIndex =
    (routeIndex + 1) %
    route.length;

    currentLocation =
    route[routeIndex];

}

const location =
currentLocation;

let progress = 0;

if(location === "Shanghai Port")
    progress = 0;

if(location === "Singapore Port")
    progress = 25;

if(location === "Mumbai Port")
    progress = 50;

if(location === "Dubai Port")
    progress = 75;

if(location === "Rotterdam Port")
    progress = 100;
    
let eta = "7 Days";

if(location === "Shanghai Port")
    eta = "7 Days";

if(location === "Singapore Port")
    eta = "5 Days";

if(location === "Mumbai Port")
    eta = "3 Days";

if(location === "Dubai Port")
    eta = "2 Days";

if(location === "Rotterdam Port")
    eta = "Delivered";

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

    let alertMessage =
"✓ Container operating normally";

if(risk >= 40){

    alertMessage =
    "⚠ Manual customs inspection recommended";

}

if(vibration === "High"){

    alertMessage =
    "⚠ High vibration detected";

}

if(tilt > 8){

    alertMessage =
    "⚠ Excessive container tilt";

}

if(doorStatus === "Open"){

    alertMessage =
    "⚠ Container door unexpectedly open";

}

if(sealStatus === "Broken"){

    alertMessage =
    "⚠ Seal breach detected";

}

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

    document.getElementById(
    "alertMessage"
).textContent =
alertMessage;

    document.getElementById(
    "progressFill"
).style.width =
progress + "%";

document.getElementById(
    "progressText"
).textContent =
progress + "%";

    for(let i = 0; i < route.length; i++){

    if(i < routeIndex){

        document.getElementById(
            "route" + i
        ).innerHTML =
        "✓ " + route[i];

    }

    else if(i === routeIndex){

        document.getElementById(
            "route" + i
        ).innerHTML =
        "➜ " + route[i];

    }

    else{

        document.getElementById(
            "route" + i
        ).innerHTML =
        "○ " + route[i];

    }

}

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
    15000
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
