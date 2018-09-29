'use strict'
var scene = new THREE.Scene();
var geometry = new THREE.PlaneBufferGeometry(0.9, 0.9);
var material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
var lineMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
});
var testMaterial = new THREE.MeshStandardMaterial({
  color: 0xffaa00,
});
var manList = []
var camera = new THREE.PerspectiveCamera(60, getSize()[0] / getSize()[1], 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(getSize()[0], getSize()[1]);
renderer.shadowMap.enabled = true;
var light = new THREE.PointLight(0xffffff, 2, 150, 2);
light.position.set(0, 0, 20);
light.castShadow = true; // default false
scene.add(light);

document.getElementById('game-canvas').appendChild(renderer.domElement);
camera.position.z = 7;
camera.position.y = -7;
camera.rotateX(Math.PI / 4)
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();
var key = {
  up: false,
  down: false,
  left: false,
  right: false,
  jump: false
}
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('restore', resizeCanvas, false);
window.addEventListener('minimize', resizeCanvas, false);
window.addEventListener('unmaximize', resizeCanvas, false);
window.addEventListener('maximize', resizeCanvas, false);
window.addEventListener('enter-full-screen', resizeCanvas, false);
window.addEventListener('leave-full-screen', resizeCanvas, false);
window.addEventListener('enter-html-full-screen', resizeCanvas, false);
window.addEventListener('leave-html-full-screen', resizeCanvas, false);

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);


var loader = new THREE.JSONLoader();
// var loader =  new THREE.BufferGeometryLoader();
// load a resource
loader.load(
  // resource URL
  'res/2.json',

  // onLoad callback
  function(geometry, materials) {
    // var geometry = new THREE.Geometry().fromBufferGeometry(geometry);
    var object = new THREE.Mesh(geometry, testMaterial);
    object.rotateX(Math.PI / 2)
    object.castShadow = true
    scene.add(object);
    console.log(object);
  },

  // onProgress callback
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  // onError callback
  function(err) {
    console.log('An error happened');
  }
);

function onKeyDown(e) {
  if (e.key == 'w') {
    key.up = true
  } else if (e.key == 's') {
    key.down = true
  } else if (e.key == 'a') {
    key.left = true
  } else if (e.key == 'd') {
    key.right = true
  } else if (e.key == ' ') {
    key.jump = true
  }
}

function onKeyUp(e) {
  if (e.key == 'w') {
    key.up = false
  } else if (e.key == 's') {
    key.down = false
  } else if (e.key == 'a') {
    key.left = false
  } else if (e.key == 'd') {
    key.right = false
  } else if (e.key == ' ') {
    key.jump = false
  }
}

material.color.setHex(0xffff00)
var map = new THREE.Group();
for (var i = -20; i <= 20; i++) {
  for (var j = -20; j <= 20; j++) {
    if (i == 0 && j == 0) {
      var plane = new THREE.Mesh(geometry, material);
    } else if (i == 0 || j == 0) {
      var plane = new THREE.Mesh(geometry, lineMaterial);
    } else {
      var material=new THREE.MeshStandardMaterial({
        color: 0xff0000,
        // side: THREE.DoubleSide
      });
      var plane = new THREE.Mesh(geometry, material);
    }
    plane.position.x = i
    plane.position.y = j
    plane.receiveShadow = true;
    map.add(plane);
  }
}
scene.add(map);
map.width = 100
map.height = 100

function addNewMan() {
  var man = new THREE.Group();
  var bodyGeo = new THREE.BoxBufferGeometry(1, 1, 1);
  var body = new THREE.Mesh(bodyGeo, testMaterial);
  body.castShadow = true
  body.position.z = 0.5
  man.add(body);
  man.vz = 0
  man.isStanding = true
  return man
}
var man = addNewMan()
map.add(man);
manList.push(man)

function animate() {
  requestAnimationFrame(animate);
  man.vz -= 0.02
  if (key.up) {
    man.position.y += 0.1
  } else if (key.down) {
    man.position.y -= 0.1
  }
  if (key.left) {
    man.position.x -= 0.1
  } else if (key.right) {
    man.position.x += 0.1
  }
  if (key.jump && man.isStanding) {
    man.isStanding = false
    man.vz = 0.3
  }
  if (man.position.z < 0) {
    man.isStanding = true
    man.position.z = 0
    man.vz = 0
  }
  // material.color.set(0xff00ff)
  man.position.z += man.vz
  camera.position.x = man.position.x
  camera.position.y = man.position.y - 7
  // camera.position.z = man.position.z + 7
  renderer.render(scene, camera);
}

function getSize(isNav = false) {
  var width = document.getElementById('nav').clientWidth
  if (isNav) {
    var height = document.getElementById('nav').clientHeight
  } else {
    var height = window.innerHeight - document.getElementById('nav').clientHeight
  }
  return [width, height]
}

function resizeCanvas() {
  camera.aspect = getSize()[0] / getSize()[1];
  camera.updateProjectionMatrix();
  renderer.setSize(getSize()[0], getSize()[1]);
}

animate();
