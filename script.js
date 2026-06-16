import * as THREE from 'https://threejs.org/build/three.module.js';

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

document.body.appendChild(
    renderer.domElement
);

// Lighting
const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    4
);

scene.add(ambientLight);

const directionalLight =
new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(
    5000,
    5000,
    5000
);

scene.add(directionalLight);

// Ship Body
const shipGeometry =
new THREE.BoxGeometry(
    2500,
    3000,
    7000
);

const shipMaterial =
new THREE.MeshStandardMaterial({

    color: 0x2E7D32, // GREEN

    metalness: 0.3,

    roughness: 0.7

});

const ship =
new THREE.Mesh(
    shipGeometry,
    shipMaterial
);

scene.add(ship);

// Simulated Telemetry
let temperature = 22;
let humidity = 60;
let riskScore = 25;

// Update telemetry every 3 sec
setInterval(() => {

    temperature =
    Math.floor(
        20 + Math.random() * 15
    );

    humidity =
    Math.floor(
        50 + Math.random() * 30
    );

    riskScore =
    Math.floor(
        Math.random() * 100
    );

    console.log(
        "Temperature:",
        temperature,
        "Humidity:",
        humidity,
        "Risk:",
        riskScore
    );

    if(riskScore < 40){

        ship.material.color.set(
            0x2E7D32
        );

    }

    else if(riskScore < 70){

        ship.material.color.set(
            0xF57C00
        );

    }

    else{

        ship.material.color.set(
            0xC62828
        );

    }

},3000);

// Animation
function animate(){

    requestAnimationFrame(
        animate
    );

    ship.rotation.y += 0.002;

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
