import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight1);
const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 0, 7);
scene.add(directionalLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;


// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//Load EXR texture

const exrLoader = new EXRLoader();

// exrLoader.load('assets/exrimg/stuttgart_suburbs_4k.exr', (texture) => {
//     texture.mapping = THREE.EquirectangularReflectionMapping;

//     const sphereGeo = new THREE.SphereGeometry(300, 64, 64);

//     const sphereMat = new THREE.MeshBasicMaterial({
//         map: texture,
//         side: THREE.BackSide
//     });

//     const skySphere = new THREE.Mesh(sphereGeo, sphereMat);
//     skySphere.position.y = 0
//     skySphere.rotation.y = -Math.PI / 2;
//     scene.add(skySphere);
// });

// Load GLTF model
const loader = new GLTFLoader();
loader.load(
    'models/kitchenFurniture.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 0.9, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.47, -1.3, 0);
    }
);
//Green shelf door
loader.load(
    'models/greenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.47, -1.3, -0.01);
    }
);
loader.load(
    'models/greenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 2.12, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.47, 0.03, -0);
    }
);
//Cuppboard doors
loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.6, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(4.05, -1.3, 0.76);
    }
);
loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(4.05, -1.3, -0.69);
    }
);
loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.95, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(4.05, -1.3, 0.028);
    }
);
loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1.1, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(4.05, -1.3, -1.48);
    }
);
//Shelf cutter
loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1.76, 0.54);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.6, 0.73, 0.85);
    }
);
loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1.76, 0.54);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.6, 0.73, 0.17);
    }
);
loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1.76, 0.54);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.6, 0.73, -0.52);
    }
);
//Cuppboard bottom

loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.28, 0.22);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -0.6, 1.1);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.4, 0.22);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -0.817, 1.1);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.4, 0.22);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -1.07, 1.1);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.28, 0.47);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -0.6, 0.48);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.4, 0.47);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -0.817, 0.48);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.4, 0.47);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -1.07, 0.48);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.28, 0.47);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -0.6, -0.375);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.4, 0.47);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -0.817, -0.375);
    }
);
loader.load(
    'models/darak.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.2, 0.4, 0.47);
        model.rotation.y = Math.PI;
        model.position.set(2.5, -1.07, -0.375);
    }
);

//Bottom cuppboard door
loader.load(
    'models/greenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.7, 1.4, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.5, -1.34, -2.2);
    }
);
//Shelf cutter bottom

loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1.2, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.5, -0.9, -0.8);
    }
);
loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1.2, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.5, -0.9, 0.05);
    }
);
loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1.2, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.5, -0.9, 0.9);
    }
);

//Big Shelf
const pivot = new THREE.Group();
scene.add(pivot);

let bigShelf = null;
loader.load('models/glassDoor.glb', (gltf) => {
    bigShelf = gltf.scene;

    bigShelf.scale.set(1.02, 2.02, 1);

    const box = new THREE.Box3().setFromObject(bigShelf);
    const size = new THREE.Vector3();
    box.getSize(size);

    pivot.position.set(
        2.17,
        0,
        -2.03
    );
    const pivotHelper = new THREE.AxesHelper(1); 
    pivot.add(pivotHelper);


    bigShelf.position.set(1.65, -4.52, -0.15);
    bigShelf.rotation.y = - Math.PI / 2;
    pivot.add(bigShelf);
});

//Big shelf's cutters
loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 0.9, 1.25);
        model.rotation.z = - Math.PI / 2;
        model.position.set(2.5, -1.2, -1.65);
    }
);

loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 0.9, 1.25);
        model.rotation.z = - Math.PI / 2;
        model.position.set(2.5, -0.5, -1.65);
    }
);

loader.load(
    'models/forShelf.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 0.9, 1.21);
        model.rotation.z = - Math.PI / 2;
        model.position.set(2.5, 0.15, -1.65);
    }
);
//Oven Doors
loader.load(
    'models/ovenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1, 1.05);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.47, -1.3, 0);
    }
);
loader.load(
    'models/ovenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1, 1.05);
        model.rotation.y = - Math.PI / 2;
        model.position.set(2.47, -0.85, 0);
    }
);
//Kitchen Room
loader.load(
    'models/kitchen.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(0.3, 0.3, 0.31);
        model.position.set(0, 0.05, 0);
        model.rotation.y = Math.PI / 2;
    }
);


const buttonRegistry = {};
const buttons = [];

function createButton(id, position, size, onClick) {
    const geometry = new THREE.BoxGeometry(...size);
    const material = new THREE.MeshBasicMaterial({
        visible: false
    });

    const button = new THREE.Mesh(geometry, material);
    button.position.set(...position);

    button.userData.id = id;
    button.userData.onClick = onClick;

    scene.add(button);

    buttons.push(button);
    buttonRegistry[id] = button;
}

let doorOpen = false;
let targetRotation = 0;

createButton(
    "ButtonA",
    [2.3, 0.7, -0.9],
    [0.3, 1.1, 0.8],
    () => alert("Button A clicked")
);

createButton(
    "ButtonB",
    [2.3, 0.7, -0.15],
    [0.3, 1.1, 0.6],
    () => alert("Button B clicked")
);

createButton(
    "ButtonC",
    [2.3, 0.7, 0.53],
    [0.3, 1.1, 0.6],
    () => alert("Button C clicked")
);

createButton(
    "ButtonD",
    [2.3, 0.7, 1.08],
    [0.3, 1.1, 0.4],
    () => alert("Button D clicked")
);
createButton(
    "ButtonE",
    [2.3, 0.8, 1.65],
    [0.3, 1.1, 0.7],
    () => alert("Button E clicked")
);
createButton(
    "ButtonF",
    [2.3, 0.05, 1.65],
    [0.3, 0.4, 0.7],
    () => alert("Button F clicked")
);
createButton(
    "ButtonG",
    [2.3, -0.4, 1.65],
    [0.3, 0.4, 0.7],
    () => alert("Button G clicked")
);
createButton(
    "ButtonG",
    [2.3, -0.4, 1.65],
    [0.3, 0.4, 0.7],
    () => alert("Button G clicked")
);
createButton(
    "ButtonH",
    [2.3, -0.95, 1.65],
    [0.3, 0.5, 0.7],
    () => alert("Button H clicked")
);
createButton(
    "ButtonI",
    [2.3, 0, -1.67],
    [0.25, 2.5, 0.7],
    () => {
        if (!pivot) return;
        if (!doorOpen) {
            targetRotation = -Math.PI / 2;
        } else {
            targetRotation = 0;
        }
        doorOpen = !doorOpen;
    }
);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(buttons);

    if (intersects.length > 0) {
        const btn = intersects[0].object;

        console.log("Clicked:", btn.userData.id);
        btn.userData.onClick();
    }
});





// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (pivot) {

        const diff = targetRotation - pivot.rotation.y;
        pivot.rotation.y += diff * 0.1;

    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
