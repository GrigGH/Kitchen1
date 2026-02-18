import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

//Config 

const CONFIG = {
  debug: {
    showButtons: false,
    showAxes: false
  },

  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    z: 5
  },

  renderer: {
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  },

  env: {
    background: 0xdddddd,
    hdrPath: null
  },

  lights: {
    ambient: { color: 0xffffff, intensity: 0.9 },
    dir: { color: 0xffffff, intensity: 1.2, pos: [5, 0, 7] },
  },

  anim: {
    doorLerp: 0.12,
    drawerLerp: 0.15,
    eps: 0.001
  },
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.env.background);

const camera = new THREE.PerspectiveCamera(
  CONFIG.camera.fov,
  window.innerWidth / window.innerHeight,
  CONFIG.camera.near,
  CONFIG.camera.far
);
camera.position.z = CONFIG.camera.z;

const renderer = new THREE.WebGLRenderer({ antialias: CONFIG.renderer.antialias });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(CONFIG.renderer.pixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(CONFIG.lights.ambient.color, CONFIG.lights.ambient.intensity));

// const dirLight = new THREE.DirectionalLight(CONFIG.lights.dir.color, CONFIG.lights.dir.intensity);
// dirLight.position.set(...CONFIG.lights.dir.pos);
// scene.add(dirLight);

//Loading UI
const loadingEl = document.getElementById("loading");
const loadingFill = document.getElementById("loadingFill");
const loadingText = document.getElementById("loadingText");

renderer.domElement.style.visibility = "hidden";

const manager = new THREE.LoadingManager();




manager.onLoad = () => {
  renderer.domElement.style.visibility = "visible";

  if (loadingEl) {
    loadingEl.classList.add("hide");
    setTimeout(() => loadingEl.remove(), 550);
  }
};

manager.onError = (url) => {
  console.warn("Failed to load:", url);
};

const gltfLoader = new GLTFLoader(manager);
const exrLoader = new EXRLoader(manager);

//Funcitons

function applyTransform(obj, t) {
  if (!t) return;
  if (t.scale) obj.scale.set(t.scale[0], t.scale[1], t.scale[2]);
  if (t.position) obj.position.set(t.position[0], t.position[1], t.position[2]);
  if (t.rotationY != null) obj.rotation.y = t.rotationY;
  if (t.rotationZ != null) obj.rotation.z = t.rotationZ;
}

function loadModel(path, parent, transform, onReady) {
  gltfLoader.load(
    path,
    (gltf) => {
      const model = gltf.scene;
      (parent || scene).add(model);
      applyTransform(model, transform);
      if (onReady) onReady(model, gltf);
    },
  );
}

//Helper to see pivot points and rotate around them

function makePivot(pos) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  if (CONFIG.debug.showAxes) g.add(new THREE.AxesHelper(1));
  scene.add(g);
  return g;
}


//Exr loader (Not active)
function loadEnvironment() {
  if (!CONFIG.env.hdrPath) return;
  exrLoader.load(
    CONFIG.env.hdrPath,
    (tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = tex;
    },
  );
}

//Invisible Buttons for help with interaction 
const buttons = [];

function createButton(id, position, size, onClick) {
  const geo = new THREE.BoxGeometry(size[0], size[1], size[2]);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
    visible: CONFIG.debug.showButtons,
  });

  const box = new THREE.Mesh(geo, mat);
  box.position.set(position[0], position[1], position[2]);
  box.userData.onClick = onClick;

  scene.add(box);
  buttons.push(box);
}

//Controllers (Models)
const controllers = [];

function makeDoor(pivot, axis, openAngle) {
  const cntrl = {
    type: "door",
    pivot,
    axis,
    open: false,
    target: 0,
    openAngle,
    toggle() {
      this.open = !this.open;
      this.target = this.open ? this.openAngle : 0;
    },
    tick() {
      if (!this.pivot) return;
      const cur = this.pivot.rotation[this.axis];
      const diff = this.target - cur;
      this.pivot.rotation[this.axis] = cur + diff * CONFIG.anim.doorLerp;
      if (Math.abs(diff) < CONFIG.anim.eps) this.pivot.rotation[this.axis] = this.target;
    },
  };
  controllers.push(cntrl);
  return cntrl;
}

function makeDrawer(openOffsetX) {
  const cntrl = {
    type: "drawer",
    mesh: null,
    open: false,
    closedX: 0,
    openX: 0,
    targetX: 0,
    openOffsetX: openOffsetX ?? -0.25,
    setMesh(mesh) {
      this.mesh = mesh;
      this.closedX = mesh.position.x;
      this.openX = this.closedX + this.openOffsetX;
      this.targetX = this.closedX;
    },
    toggle() {
      if (!this.mesh) return;
      this.open = !this.open;
      this.targetX = this.open ? this.openX : this.closedX;
    },
    tick() {
      if (!this.mesh) return;
      const diff = this.targetX - this.mesh.position.x;
      if (Math.abs(diff) < CONFIG.anim.eps) {
        this.mesh.position.x = this.targetX;
        return;
      }
      this.mesh.position.x += diff * CONFIG.anim.drawerLerp;
    },
  };
  controllers.push(cntrl);
  return cntrl;
}

//Kithcen 

function buildKitchen() {
  loadModel("models/kitchenFurniture.glb", scene, {
    scale: [1, 0.9, 1],
    rotationY: -Math.PI / 2,
    position: [2.47, -1.3, 0],
  });

  loadModel("models/kitchen.glb", scene, {
    scale: [0.35, 0.3, 0.31],
    position: [0, 0.05, 0],
    rotationY: Math.PI / 2,
  });
  loadModel("models/tableStool.glb", scene, {
    scale: [0.8, 0.8, 0.8],
    position: [-1.8, -1.3, 0],
    rotationY: -Math.PI / 2,
  });
  loadModel("models/fridge.glb", scene, {
    scale: [1.2, 1.2, 0.8],
    position: [2.4, -1.3, 2.45],
    rotationY: -Math.PI / 2,
  });
  loadModel("models/chendalier.glb", scene, {
    scale: [0.1, 0.1, 0.1],
    position: [0, 0.3, 0],
    rotationY: -Math.PI / 2,
  }, (chandelier) => {

    const chandelierDir = new THREE.DirectionalLight(0xffffff, 1.2);

    chandelierDir.position.set(0, 0.4, 0);

    const target = new THREE.Object3D();
    target.position.set(0, -2, 0); 
    chandelier.add(target);

    chandelierDir.target = target;

    chandelier.add(chandelierDir);
  });
    loadModel("models/trashBasket.glb", scene, {
    scale: [2, 2, 2],
    position: [2.4, -1.3, -2.45],
    rotationY: -Math.PI / 2,
  });

  // Doors
  const doorDefs = [
    {
      pivotPos: [2.17, 0, -2.03],
      path: "models/glassDoor.glb",
      transform: { scale: [1.02, 2.02, 1], position: [1.65, -4.52, -0.15], rotationY: -Math.PI / 2 },
      buttonPos: [2.3, 0, -1.67],
      buttonSize: [0.25, 2.5, 0.7],
      axis: "y",
      openAngle: -Math.PI / 2,
    },

    {
      pivotPos: [2.4, 0.15, -1.3], path: "models/cuppboardDoor.glb",
      transform: { scale: [1.1, 0.89, 1], position: [1.65, -1.45, -0.19], rotationY: -Math.PI / 2 },
      buttonPos: [2.3, 0.7, -0.9], buttonSize: [0.3, 1.1, 0.8], axis: "y", openAngle: -Math.PI / 2
    },

    {
      pivotPos: [2.4, 0.15, -0.53], path: "models/cuppboardDoor.glb",
      transform: { scale: [1, 0.89, 1], position: [1.65, -1.45, -0.165], rotationY: -Math.PI / 2 },
      buttonPos: [2.3, 0.7, -0.15], buttonSize: [0.3, 1.1, 0.6], axis: "y", openAngle: -Math.PI / 2
    },

    {
      pivotPos: [2.4, 0.15, 0.19], path: "models/cuppboardDoor.glb",
      transform: { scale: [0.95, 0.89, 1], position: [1.65, -1.45, -0.165], rotationY: -Math.PI / 2 },
      buttonPos: [2.3, 0.7, 0.53], buttonSize: [0.3, 1.1, 0.6], axis: "y", openAngle: -Math.PI / 2
    },

    {
      pivotPos: [2.4, 0.15, 0.9], path: "models/cuppboardDoor.glb",
      transform: { scale: [0.6, 0.89, 1], position: [1.65, -1.45, -0.165], rotationY: -Math.PI / 2 },
      buttonPos: [2.3, 0.7, 1.08], buttonSize: [0.3, 1.1, 0.4], axis: "y", openAngle: -Math.PI / 2
    },

    {
      pivotPos: [2.17, -1.2, 1.31], path: "models/greenDoor.glb",
      transform: { scale: [0.99, 0.95, 1], position: [0.33, -0.1, -1.3], rotationY: -Math.PI / 2 },
      buttonPos: [2.3, -0.95, 1.65], buttonSize: [0.3, 0.5, 0.7], axis: "y", openAngle: -Math.PI / 2
    },

    {
      pivotPos: [2.17, 0.25, 1.3], path: "models/greenDoor.glb",
      transform: { scale: [1, 2.12, 1], position: [-0.28, -0.22, 2], rotationY: Math.PI / 2 },
      buttonPos: [2.3, 0.8, 1.65], buttonSize: [0.3, 1.1, 0.7], axis: "y", openAngle: -Math.PI / 2
    },

    {
      pivotPos: [2.25, -1.2, -1.29], path: "models/greenDoor.glb",
      transform: { scale: [0.7, 1.4, 1], position: [0.27, -0.15, -0.92], rotationY: -Math.PI / 2 },
      buttonPos: [2.24, -0.85, -1.05], buttonSize: [0.2, 0.6, 0.35], axis: "y", openAngle: -Math.PI / 2
    },
  ];

  doorDefs.forEach((d) => {
    const pivot = makePivot(d.pivotPos);
    loadModel(d.path, pivot, d.transform);
    const ctrl = makeDoor(pivot, d.axis, d.openAngle);
    createButton("btn", d.buttonPos, d.buttonSize, () => ctrl.toggle());
  });

  // Oven doors
  const ovenDefs = [
    { pivotPos: [2.15, -0.23, 1.3], buttonPos: [2.3, 0.05, 1.65], buttonSize: [0.3, 0.4, 0.7], openAngle: Math.PI / 2 },
    { pivotPos: [2.15, -0.7, 1.3], buttonPos: [2.3, -0.4, 1.65], buttonSize: [0.3, 0.4, 0.7], openAngle: Math.PI / 2 },
  ];

  ovenDefs.forEach((o) => {
    const pivot = makePivot(o.pivotPos);
    loadModel("models/ovenDoor.glb", pivot, {
      scale: [1, 1, 1.05],
      position: [0.31, -0.62, -1.3],
      rotationY: -Math.PI / 2,
    });
    const ctrl = makeDoor(pivot, "z", o.openAngle);
    createButton("ovenBtn", o.buttonPos, o.buttonSize, () => ctrl.toggle());
  });

  // Drawers
  const drawerDefs = [
    { pos: [2.5, -1.07, -0.375], scale: [0.2, 0.4, 0.47], btnPos: [2.3, -1.05, -0.37], btnSize: [0.25, 0.2, 0.7] },
    { pos: [2.5, -0.817, -0.375], scale: [0.2, 0.4, 0.47], btnPos: [2.3, -0.83, -0.37], btnSize: [0.25, 0.2, 0.7] },
    { pos: [2.5, -0.6, -0.375], scale: [0.2, 0.28, 0.47], btnPos: [2.3, -0.61, -0.37], btnSize: [0.25, 0.1, 0.7] },

    { pos: [2.5, -0.6, 0.48], scale: [0.2, 0.28, 0.47], btnPos: [2.3, -0.61, 0.5], btnSize: [0.25, 0.1, 0.7] },
    { pos: [2.5, -0.817, 0.48], scale: [0.2, 0.4, 0.47], btnPos: [2.3, -0.83, 0.5], btnSize: [0.25, 0.2, 0.7] },
    { pos: [2.5, -1.07, 0.48], scale: [0.2, 0.4, 0.47], btnPos: [2.3, -1.05, 0.5], btnSize: [0.25, 0.2, 0.7] },

    { pos: [2.5, -0.6, 1.1], scale: [0.2, 0.28, 0.22], btnPos: [2.24, -0.61, 1.1], btnSize: [0.1, 0.1, 0.3] },
    { pos: [2.5, -0.817, 1.1], scale: [0.2, 0.4, 0.22], btnPos: [2.24, -0.85, 1.1], btnSize: [0.1, 0.2, 0.3] },
    { pos: [2.5, -1.07, 1.1], scale: [0.2, 0.4, 0.22], btnPos: [2.24, -1.1, 1.1], btnSize: [0.1, 0.2, 0.3] },
  ];

  drawerDefs.forEach((d) => {
    const ctrl = makeDrawer(-0.25);

    loadModel("models/darak.glb", scene, null, (mesh) => {
      mesh.scale.set(d.scale[0], d.scale[1], d.scale[2]);
      mesh.rotation.y = Math.PI;
      mesh.position.set(d.pos[0], d.pos[1], d.pos[2]);
      ctrl.setMesh(mesh);
    });

    createButton("drawerBtn", d.btnPos, d.btnSize, () => ctrl.toggle());
  });

  // Cutters
  const cutterDefs = [
    { scale: [1, 1.76, 0.54], rotationY: -Math.PI / 2, position: [2.6, 0.73, 0.85] },
    { scale: [1, 1.76, 0.54], rotationY: -Math.PI / 2, position: [2.6, 0.73, 0.17] },
    { scale: [1, 1.76, 0.54], rotationY: -Math.PI / 2, position: [2.6, 0.73, -0.52] },

    { scale: [1, 1.2, 1], rotationY: -Math.PI / 2, position: [2.5, -0.9, -0.8] },
    { scale: [1, 1.2, 1], rotationY: -Math.PI / 2, position: [2.5, -0.9, 0.05] },
    { scale: [1, 1.2, 1], rotationY: -Math.PI / 2, position: [2.5, -0.9, 0.9] },

    { scale: [1, 0.9, 1.25], rotationZ: -Math.PI / 2, position: [2.5, -1.2, -1.65] },
    { scale: [1, 0.9, 1.25], rotationZ: -Math.PI / 2, position: [2.5, -0.5, -1.65] },
    { scale: [1, 0.9, 1.21], rotationZ: -Math.PI / 2, position: [2.5, 0.15, -1.65] },
  ];

  cutterDefs.forEach((c) => {
    loadModel("models/forShelf.glb", scene, c);
  });
}

//Clicking function
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(buttons, true);
  if (!hits.length) return;

  const obj = hits[0].object;
  const fn = obj.userData?.onClick || obj.parent?.userData?.onClick;
  if (fn) fn();
});

//Resizing 

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(CONFIG.renderer.pixelRatio);
});

//Animate

function animate() {
  requestAnimationFrame(animate);

  for (const c of controllers) c.tick();
  controls.update();
  renderer.render(scene, camera);
}

loadEnvironment();
buildKitchen();
animate();
