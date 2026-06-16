import * as THREE from 'three';

import { GLTFLoader }
from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,10,30);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

scene.add(
new THREE.AmbientLight(
0xffffff,
5
)
);

const loader =
new GLTFLoader();

loader.load(

'./ship.glb',

(gltf)=>{

    console.log("SHIP LOADED");

    const ship =
    gltf.scene;

    scene.add(ship);

    const box =
    new THREE.Box3()
    .setFromObject(ship);

    const size =
    box.getSize(
        new THREE.Vector3()
    );

    const center =
    box.getCenter(
        new THREE.Vector3()
    );

    ship.position.sub(center);

    const maxDim =
    Math.max(
        size.x,
        size.y,
        size.z
    );

    ship.scale.setScalar(
        10/maxDim
    );

},

undefined,

(err)=>{

    console.error(
        err
    );

}

);

function animate(){

requestAnimationFrame(
animate
);

renderer.render(
scene,
camera
);

}

animate();
