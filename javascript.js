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
const pivotBottomDoor = new THREE.Group();
scene.add(pivotBottomDoor);

loader.load(
    'models/greenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.99, 0.95, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(0.33, -0.1, -1.3);


        pivotBottomDoor.position.set(
            2.17,
            -1.2,
            1.31
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotBottomDoor.add(pivotHelper);

        pivotBottomDoor.add(model);
    }
);

const pivotTopDoor = new THREE.Group();
scene.add(pivotTopDoor);

loader.load(
    'models/greenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 2.12, 1);
        model.rotation.y = Math.PI / 2;
        model.position.set(-0.28, -0.22, 2);


        pivotTopDoor.position.set(
            2.17,
            0.25,
            1.3
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotTopDoor.add(pivotHelper);

        pivotTopDoor.add(model);
    }
);
//Cuppboard doors
const pivotTop4 = new THREE.Group();
scene.add(pivotTop4);
loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.6, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(1.65, -1.45, -0.165);


        pivotTop4.position.set(
            2.4,
            0.15,
            0.9
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotTop4.add(pivotHelper);


        pivotTop4.add(model);
    }
);

const pivotTop2 = new THREE.Group();
scene.add(pivotTop2);

loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;

        model.scale.set(1, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(1.65, -1.45, -0.165);


        pivotTop2.position.set(
            2.4,
            0.15,
            -0.53
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotTop2.add(pivotHelper);


        pivotTop2.add(model);
    }
);

const pivotTop3 = new THREE.Group();
scene.add(pivotTop3);

loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;

        model.scale.set(0.95, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(1.65, -1.45, -0.165);


        pivotTop3.position.set(
            2.4,
            0.15,
            0.19
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotTop3.add(pivotHelper);


        pivotTop3.add(model);
    }
);

const pivotTop = new THREE.Group();
scene.add(pivotTop);

loader.load(
    'models/cuppboardDoor.glb',
    (gltf) => {
        const model = gltf.scene;

        model.scale.set(1.1, 0.89, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(1.65, -1.45, -0.19);

        pivotTop.position.set(
            2.4,
            0.15,
            -1.3
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotTop.add(pivotHelper);


        pivotTop.add(model);
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

const drawers = [];

function loadDrawer({
    position,
    scale,
    openOffsetX = -0.25
}) {
    const drawer = {
        mesh: null,
        open: false,
        closedX: 0,
        openX: 0,
        targetX: 0
    };

    loader.load('models/darak.glb', (gltf) => {
        drawer.mesh = gltf.scene;
        scene.add(drawer.mesh);

        drawer.mesh.scale.set(...scale);
        drawer.mesh.rotation.y = Math.PI;
        drawer.mesh.position.set(...position);

        drawer.closedX = drawer.mesh.position.x;
        drawer.openX = drawer.closedX + openOffsetX;
        drawer.targetX = drawer.closedX;
    });

    drawers.push(drawer);
    return drawer;
}


const drawerA = loadDrawer({
    position: [2.5, -1.07, -0.375],
    scale: [0.2, 0.4, 0.47]
});


const drawerB = loadDrawer({
    position: [2.5, -0.817, -0.375],
    scale: [0.2, 0.4, 0.47]
});

const drawerC = loadDrawer({
    position: [2.5, -0.6, -0.375],
    scale: [0.2, 0.28, 0.47]
});


const drawerD = loadDrawer({
    position: [2.5, -0.6, 0.48],
    scale: [0.2, 0.28, 0.47]
});

const drawerE = loadDrawer({
    position: [2.5, -0.817, 0.48],
    scale: [0.2, 0.4, 0.47]
});

const drawerF = loadDrawer({
    position: [2.5, -1.07, 0.48],
    scale: [0.2, 0.4, 0.47]
});
const drawerG = loadDrawer({
    position: [2.5, -0.6, 1.1],
    scale: [0.2, 0.28, 0.22]
});
const drawerH = loadDrawer({
    position: [2.5, -0.817, 1.1],
    scale: [0.2, 0.4, 0.22]
});
const drawerI = loadDrawer({
    position: [2.5, -1.07, 1.1],
    scale: [0.2, 0.4, 0.22]
});



//Bottom cuppboard door
const pivotUnderSink = new THREE.Group();
scene.add(pivotUnderSink);

loader.load(
    'models/greenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        // scene.add(model);
        model.scale.set(0.7, 1.4, 1);
        model.rotation.y = - Math.PI / 2;
        model.position.set(0.27, -0.15, -0.92);

        pivotUnderSink.position.set(
            2.25,
            -1.2,
            -1.29
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotUnderSink.add(pivotHelper);


        pivotUnderSink.add(model);
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
const pivotForBottomOven = new THREE.Group();
scene.add(pivotForBottomOven);

loader.load(
    'models/ovenDoor.glb',
    (gltf) => {
        const model = gltf.scene;

        model.scale.set(1, 1, 1.05);
        model.rotation.y = - Math.PI / 2;
        model.position.set(0.31, -0.62, -1.3);

        pivotForBottomOven.position.set(
            2.15,
            -0.7,
            1.3
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotForBottomOven.add(pivotHelper);

        pivotForBottomOven.add(model);
    }
);

const pivotForTopOven = new THREE.Group();
scene.add(pivotForTopOven);

loader.load(
    'models/ovenDoor.glb',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        model.scale.set(1, 1, 1.05);
        model.rotation.y = - Math.PI / 2;
        model.position.set(0.31, -0.62, -1.3);

        pivotForTopOven.position.set(
            2.15,
            -0.23,
            1.3
        );
        const pivotHelper = new THREE.AxesHelper(1);
        pivotForTopOven.add(pivotHelper);

        pivotForTopOven.add(model);
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
        // visible: false
        color: 0xff0000,
        wireframe: true
    });

    const button = new THREE.Mesh(geometry, material);
    button.position.set(...position);

    button.userData.id = id;
    button.userData.onClick = onClick;

    scene.add(button);

    buttons.push(button);
    buttonRegistry[id] = button;
}

function createDoorController(pivot) {
    return {
        pivot,
        open: false,
        targetRotation: 0
    };
}

function bindDrawerButton(id, pos, size, drawer) {
    createButton(id, pos, size, () => {
        if (!drawer.mesh) return;

        drawer.open = !drawer.open;
        drawer.targetX = drawer.open ? drawer.openX : drawer.closedX;
    });
}


const doorA = createDoorController(pivot);
const doorTop = createDoorController(pivotTop);
const doorTop2 = createDoorController(pivotTop2);
const doorTop3 = createDoorController(pivotTop3);
const doorTop4 = createDoorController(pivotTop4);
const doorBottom = createDoorController(pivotBottomDoor);
const doorMediumTop = createDoorController(pivotTopDoor);
const ovenBottom = createDoorController(pivotForBottomOven);
const ovenTop = createDoorController(pivotForTopOven);
const doorUnderSink = createDoorController(pivotUnderSink);

bindDrawerButton("ButtonJ", [2.3, -1.05, -0.37], [0.25, 0.2, 0.7], drawerA);
bindDrawerButton("ButtonK", [2.3, -0.83, -0.37], [0.25, 0.2, 0.7], drawerB);
bindDrawerButton("ButtonL", [2.3, -0.61, -0.37], [0.25, 0.1, 0.7], drawerC);
bindDrawerButton("ButtonM", [2.3, -0.61, 0.5], [0.25, 0.1, 0.7], drawerD);
bindDrawerButton("ButtonN", [2.3, -0.83, 0.5], [0.25, 0.2, 0.7], drawerE);
bindDrawerButton("ButtonO", [2.3, -1.05, 0.5], [0.25, 0.2, 0.7], drawerF);
bindDrawerButton("ButtonP", [2.24, -0.61, 1.1], [0.1, 0.1, 0.3], drawerG);
bindDrawerButton("ButtonQ", [2.24, -0.85, 1.1], [0.1, 0.2, 0.3], drawerH);
bindDrawerButton("ButtonR", [2.24, -1.1, 1.1], [0.1, 0.2, 0.3], drawerI);


createButton(
    "ButtonA",
    [2.3, 0.7, -0.9],
    [0.3, 1.1, 0.8],
    () => {
        if (!doorTop.pivot) return;

        doorTop.open = !doorTop.open;
        doorTop.targetRotation = doorTop.open ? -Math.PI / 2 : 0;
    }
);

createButton(
    "ButtonB",
    [2.3, 0.7, -0.15],
    [0.3, 1.1, 0.6],
    () => {
        if (!doorTop2.pivot) return;

        doorTop2.open = !doorTop2.open;
        doorTop2.targetRotation = doorTop2.open ? -Math.PI / 2 : 0;
    }
);

createButton(
    "ButtonC",
    [2.3, 0.7, 0.53],
    [0.3, 1.1, 0.6],
    () => {
        if (!doorTop3.pivot) return;

        doorTop3.open = !doorTop3.open;
        doorTop3.targetRotation = doorTop3.open ? -Math.PI / 2 : 0;
    }
);

createButton(
    "ButtonD",
    [2.3, 0.7, 1.08],
    [0.3, 1.1, 0.4],
    () => {
        if (!doorTop4.pivot) return;

        doorTop4.open = !doorTop4.open;
        doorTop4.targetRotation = doorTop4.open ? -Math.PI / 2 : 0;
    }
);
createButton(
    "ButtonE",
    [2.3, 0.8, 1.65],
    [0.3, 1.1, 0.7],
    () => {
        if (!doorMediumTop.pivot) return;

        doorMediumTop.open = !doorMediumTop.open;
        doorMediumTop.targetRotation = doorMediumTop.open ? -Math.PI / 2 : 0;
    }
);
createButton(
    "ButtonF",
    [2.3, 0.05, 1.65],
    [0.3, 0.4, 0.7],
    () => {
        if (!ovenTop.pivot) return;

        ovenTop.open = !ovenTop.open;
        ovenTop.targetRotation = ovenTop.open ? -Math.PI / 2 : 0;
    }
);
createButton(
    "ButtonG",
    [2.3, -0.4, 1.65],
    [0.3, 0.4, 0.7],
    () => {
        if (!ovenBottom.pivot) return;

        ovenBottom.open = !ovenBottom.open;
        ovenBottom.targetRotation = ovenBottom.open ? -Math.PI / 2 : 0;
    }
);

createButton(
    "ButtonH",
    [2.3, -0.95, 1.65],
    [0.3, 0.5, 0.7],
    () => {
        if (!doorBottom.pivot) return;

        doorBottom.open = !doorBottom.open;
        doorBottom.targetRotation = doorBottom.open ? -Math.PI / 2 : 0;
    }
);
createButton(
    "ButtonI",
    [2.3, 0, -1.67],
    [0.25, 2.5, 0.7],
    () => {
        if (!doorA.pivot) return;

        doorA.open = !doorA.open;
        doorA.targetRotation = doorA.open ? -Math.PI / 2 : 0;
    }
);
createButton(
    "ButtonS",
    [2.24, -0.85, -1.05],
    [0.2, 0.6, 0.35],
    () => {
        if (!doorUnderSink.pivot) return;

        doorUnderSink.open = !doorUnderSink.open;
        doorUnderSink.targetRotation = doorUnderSink.open ? -Math.PI / 2 : 0;
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

const EPSILON = 0.001;

function animate() {
    requestAnimationFrame(animate);

    [doorA, doorTop, doorTop2, doorTop3, doorTop4, doorBottom, doorMediumTop, doorUnderSink].forEach(door => {
        const diff = door.targetRotation - door.pivot.rotation.y;
        door.pivot.rotation.y += diff * 0.1;

        if (Math.abs(diff) < 0.001) {
            door.pivot.rotation.y = door.targetRotation;
        }
    });
    [ovenBottom, ovenTop].forEach(door => {
        const diff = door.targetRotation + door.pivot.rotation.z;
        door.pivot.rotation.z -= diff * 0.1;

        if (Math.abs(diff) < 0.001) {
            door.pivot.rotation.z = - door.targetRotation;
        }
    });
    [ovenBottom, ovenTop].forEach(door => {
        const diff = door.targetRotation + door.pivot.rotation.z;
        door.pivot.rotation.z -= diff * 0.1;

        if (Math.abs(diff) < 0.001) {
            door.pivot.rotation.z = - door.targetRotation;
        }
    });
    for (const drawer of drawers) {
        if (!drawer.mesh) continue;

        const diff = drawer.targetX - drawer.mesh.position.x;

        if (Math.abs(diff) > EPSILON) {
            drawer.mesh.position.x += diff * 0.15;
        } else {
            drawer.mesh.position.x = drawer.targetX;
        }
    }



    renderer.render(scene, camera);
}
animate();

