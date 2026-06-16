import * as THREE from
'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

import { OrbitControls }
from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader }
from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x0b1f3a);

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer(
{
    antialias:true
}
);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document
.getElementById("container")
.appendChild(renderer.domElement);

const light =
new THREE.DirectionalLight(
0xffffff,
3
);

light.position.set(
10,
10,
10
);

scene.add(light);

const ambient =
new THREE.AmbientLight(
0xffffff,
2
);

scene.add(ambient);

const loader =
new GLTFLoader();

loader.load(

    './model/ship.glb',

    function(gltf){

        const model =
        gltf.scene;

        scene.add(model);

        model.scale.set(
            1,
            1,
            1
        );

    },

    undefined,

    function(error){

        console.error(error);

    }

);

camera.position.z = 15;

const controls =
new OrbitControls(
camera,
renderer.domElement
);

function animate(){

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
