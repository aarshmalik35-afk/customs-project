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

camera.position.set(0, 500, 4500);

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

let riskHistory = [];

let healthScore = 100;

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

        ship.traverse((child)=>{

    if(child.isMesh){

        child.material =
        new THREE.MeshStandardMaterial({
            color: 0xff0000
        });

    }

});  
        
        // Center model
        const box =
        new THREE.Box3().setFromObject(ship);

        const center =
        box.getCenter(
            new THREE.Vector3()
        );

ship.position.set(
    -center.x,
    -center.y,
    -center.z
);

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

function updateTelemetry(){
console.log("Telemetry Update Fired");

// Environmental readings
temperature += Math.floor(Math.random()*3) - 1;
humidity += Math.floor(Math.random()*3) - 1;

temperature = Math.max(20, Math.min(40, temperature));
humidity = Math.max(40, Math.min(90, humidity));

// Shock events accumulate slowly
if(Math.random() < 0.03){
    shockEvents++;
}

// Tilt changes gradually
tilt += Math.floor(Math.random()*3) - 1;
tilt = Math.max(0, Math.min(12, tilt));

// Vibration changes occasionally
if(Math.random() < 0.10){

    const direction =
    Math.random() < 0.5 ? -1 : 1;

    vibrationIndex += direction;

    vibrationIndex =
    Math.max(
        0,
        Math.min(2, vibrationIndex)
    );

    vibration =
    vibrationLevels[vibrationIndex];
}

// Door logic
if(
    doorStatus === "Closed" &&
    Math.random() < 0.01
){
    doorStatus = "Open";
}
else if(
    doorStatus === "Open" &&
    Math.random() < 0.30
){
    doorStatus = "Closed";
}

// Seal breach logic
if(
    sealStatus === "Intact" &&
    Math.random() < 0.005
){
    sealStatus = "Broken";
}

// Route movement
if(Math.random() < 0.03){

    routeIndex =
    Math.min(
        routeIndex + 1,
        route.length - 1
    );

    currentLocation =
    route[routeIndex];
}

const location = currentLocation;

// Voyage Progress
let progress = 0;

if(routeIndex === 0) progress = 0;
if(routeIndex === 1) progress = 25;
if(routeIndex === 2) progress = 50;
if(routeIndex === 3) progress = 75;
if(routeIndex === 4) progress = 100;

// ETA
let eta = "7 Days";

if(location === "Singapore Port")
    eta = "5 Days";

if(location === "Mumbai Port")
    eta = "3 Days";

if(location === "Dubai Port")
    eta = "2 Days";

if(location === "Rotterdam Port")
    eta = "Delivered";

// Risk Engine
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

healthScore = 100 - risk;

if(shockEvents > 10)
    healthScore -= 5;

if(sealStatus === "Broken")
    healthScore -= 10;

healthScore = Math.max(
    0,
    Math.min(
        100,
        healthScore
    )
);

riskHistory.push(risk);

if(riskHistory.length > 10){

    riskHistory.shift();

}

// Customs Status
let status = "Approved";

if(risk >= 40)
    status = "Manual Review";

if(risk >= 70)
    status = "High Risk";

// Seal Alert
const sealAlert =
sealStatus === "Broken"
? "YES"
: "NO";

// =========================
// AI ALERT ENGINE
// =========================

let alertMessage =
"✓ AI Status: Shipment operating normally";

// Temperature Alert
if(temperature > 35){

    alertMessage =
    "⚠ AI Alert: Cargo temperature outside safe range";

}

// Humidity Alert
if(humidity > 80){

    alertMessage =
    "⚠ AI Alert: Excess humidity detected";

}

// High Vibration
if(vibration === "High"){

    alertMessage =
    "⚠ AI Alert: Excessive vibration detected";

}

// Excessive Tilt
if(tilt > 8){

    alertMessage =
    "⚠ AI Prediction: Cargo stability risk";

}

// Shock Alert
if(shockEvents > 8){

    alertMessage =
    "⚠ AI Prediction: Shipment delay risk increasing";

}

// Route Anomaly
if(
    location === "Dubai Port" &&
    shockEvents > 5
){

    alertMessage =
    "⚠ AI Alert: Route anomaly requires review";

}

// Customs Inspection Prediction
if(risk >= 50){

    alertMessage =
    "⚠ AI Prediction: Customs inspection likely at next port";

}

// Container Health Alert
if(healthScore < 50){

    alertMessage =
    "🚨 AI Alert: Container health critically low";

}

// Door Open Alert
if(doorStatus === "Open"){

    alertMessage =
    "🚨 AI Alert: Container door unexpectedly open";

}

// Seal Breach Alert
if(sealStatus === "Broken"){

    alertMessage =
    "🚨 AI Alert: Potential seal tampering detected";

}

// Critical Combined Event
if(
    sealStatus === "Broken" &&
    doorStatus === "Open"
){

    alertMessage =
    "🚨 CRITICAL: Possible container breach detected";

}

// Update UI
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

// HEALTH BAR

document.getElementById(
    "healthFill"
).style.width =
healthScore + "%";

const healthFill =
document.getElementById(
    "healthFill"
);

if(healthScore >= 80){

    healthFill.style.background =
    "#4CAF50";

}
else if(healthScore >= 50){

    healthFill.style.background =
    "#FF9800";

}
else{

    healthFill.style.background =
    "#F44336";

}

// RISK TREND GRAPH

for(let i = 0; i < 10; i++){

    const bar =
    document.getElementById(
        "risk" + i
    );

    if(!bar) continue;

    const value =
    riskHistory[i] || 0;

    bar.style.height =
    value + "px";

}

const badge =
document.getElementById(
    "statusBadge"
);

if(status === "Approved"){

    badge.innerHTML =
    "🟢 APPROVED";

    badge.style.background =
    "#1b5e20";

}
else if(
    status ===
    "Manual Review"
){

    badge.innerHTML =
    "🟠 MANUAL REVIEW";

    badge.style.background =
    "#e65100";

}
else{

    badge.innerHTML =
    "🔴 HIGH RISK";

    badge.style.background =
    "#b71c1c";

}

document.getElementById("lastUpdated").textContent =
new Date().toLocaleTimeString();

document.getElementById("sealAlert").textContent =
sealAlert;

document.getElementById(
    "alertMessage"
).textContent =
alertMessage;

document.getElementById(
    "healthScore"
).textContent =
healthScore;

// Progress Bar
document.getElementById(
    "progressFill"
).style.width =
progress + "%";

document.getElementById(
    "progressText"
).textContent =
progress + "% Complete";

// Route Tracker
for(let i=0;i<route.length;i++){

    const routeItem =
    document.getElementById(
        "route" + i
    );

    if(!routeItem) continue;

    if(i < routeIndex){

        routeItem.innerHTML =
        "✓ " + route[i];

    }
    else if(i === routeIndex){

        routeItem.innerHTML =
        "➜ " + route[i];

    }
    else{

        routeItem.innerHTML =
        "○ " + route[i];

    }
}

// Seal Alert Color
const alertElement =
document.getElementById(
    "sealAlert"
);

if(sealAlert === "YES"){

    alertElement.style.color =
    "#ff4d4d";

}else{

    alertElement.style.color =
    "#4CAF50";
}

const healthElement =
document.getElementById(
    "healthScore"
);

if(healthScore >= 80){

    healthElement.style.color =
    "#4CAF50";

}
else if(healthScore >= 50){

    healthElement.style.color =
    "#FF9800";

}
else{

    healthElement.style.color =
    "#F44336";

}
    
// Ship Color
if(ship){

    console.log("Risk:", risk);

    ship.traverse((child)=>{

        if(child.isMesh){

            console.log(child.material);

            if(risk < 40){

                child.material.color.set(
                    0x4CAF50
                );

            }
            else if(risk < 70){

                child.material.color.set(
                    0xFF9800
                );

            }
            else{

                child.material.color.set(
                    0xF44336
                );

            }

        }

    });

}

} // END updateTelemetry

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
