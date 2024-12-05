import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader }  from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import GUI from 'lil-gui'

console.log(DRACOLoader)
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fondo
const planeGeometry = new THREE.PlaneGeometry(100, 100);

const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#fff', 
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -Math.PI / 2; 

/**
 * Models
 */
const dracoLoader= new DRACOLoader
dracoLoader.setDecoderPath('/draco/')

const gltfLoaders = new GLTFLoader()
gltfLoaders.setDRACOLoader(dracoLoader)

let mixer = null
let Mokke =[];
let Tobey =[];
let Fredy =[];

gltfLoaders.load(
    '/models/Mokke/glTF/mokke.gltf',
    (gltf) => {
        scene.add(gltf.scene);
        Mokke.push(gltf.scene);
        Mokke = gltf.scene;
        Mokke.position.y = -2;
        Mokke.position.z=-1;
        Mokke.position.x=4;
        Mokke.visible= true;
        
         
    }
)
gltfLoaders.load(
    '/models/Tobey/glTF/Tobey.gltf',
    (gltf) => {
        scene.add(gltf.scene);
        Tobey.push(gltf.scene);
        Tobey = gltf.scene;
        Tobey.rotation.y = Math.PI / -2;
        Tobey.position.z= -1;
        Tobey.position.x=3;
        Tobey.visible = false;
    }
)

gltfLoaders.load(
    '/models/Freddy/glTF/Freddy.gltf',
    (gltf) => {
        scene.add(gltf.scene);
        Fredy.push(gltf.scene);
        Fredy = gltf.scene;
        Fredy.rotation.y = Math.PI / -2;
        Fredy.scale.set(1.3,1.3,1.3);
        Fredy.position.z=-1;
        Fredy.position.x=5;
        Fredy.visible= false;
    }
)




/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 7,  13)
scene.add(camera)

console.log(camera.position)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

// Movement variables
const movement = {
    left: false,
    right: false,
    up: false,
    down: false,
  };
  
  // Event listeners to track key presses
  function handleKeyDown(event) {
    switch (event.code) {
      case 'ArrowLeft':
        movement.left = true;
        break;
      case 'ArrowRight':
        movement.right = true;
        break;
      case 'ArrowUp':
        movement.up = true;
        break;
      case 'ArrowDown':
        movement.down = true;
        break;
    }
  }
  
  function handleKeyUp(event) {
    switch (event.code) {
      case 'ArrowLeft':
        movement.left = false;
        break;
      case 'ArrowRight':
        movement.right = false;
        break;
      case 'ArrowUp':
        movement.up = false;
        break;
      case 'ArrowDown':
        movement.down = false;
        break;
    }
  }
  
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




//seleccion
var botonMokke = document.getElementById('bMokke');
var botonTobey = document.getElementById('bTobey');
var botonFredy = document.getElementById('bFredy');

function elegirAMokke(){
    Mokke.visible =true;

    Fredy.visible=false;
    Tobey.visible=false;

    function animate() {
        requestAnimationFrame(animate);
      
        // Update object position based on movement
        if (movement.left) Mokke.position.x -= 0.1;
        if (movement.right) Mokke.position.x += 0.1;
        if (movement.up) Mokke.position.y += 0.1;
        if (movement.down) Mokke.position.y -= 0.1;
      
        renderer.render(scene, camera);
      }
      
      animate();
}

function elegirATobey(){
    Tobey.visible= true;

    Mokke.visible= false;
    Fredy.visible= false;

    function animate() {
        requestAnimationFrame(animate);
      
        // Update object position based on movement
        if (movement.left) Tobey.position.x -= 0.1;
        if (movement.right) Tobey.position.x += 0.1;
        if (movement.up) Tobey.position.y += 0.1;
        if (movement.down) Tobey.position.y -= 0.1;
      
        renderer.render(scene, camera);
      }
      
      animate();
}

function elegirAFredy(){
    Fredy.visible= true;

    Mokke.visible= false;
    Tobey.visible= false;

    function animate() {
        requestAnimationFrame(animate);
      
        // Update object position based on movement
        if (movement.left) Fredy.position.x -= 0.1;
        if (movement.right) Fredy.position.x += 0.1;
        if (movement.up) Fredy.position.y += 0.1;
        if (movement.down) Fredy.position.y -= 0.1;
      
        renderer.render(scene, camera);
      }
      
      animate();
}

botonMokke.addEventListener('click', elegirAMokke);
botonTobey.addEventListener('click', elegirATobey);
botonFredy.addEventListener('click', elegirAFredy)