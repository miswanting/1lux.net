var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  overdraw: 0.5
});

var ambientLight = new THREE.AmbientLight( 0x606060 );
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.x = Math.random() - 0.5;
directionalLight.position.y = Math.random() - 0.5;
directionalLight.position.z = Math.random() - 0.5;
directionalLight.position.normalize();
scene.add( directionalLight );
var directionalLight = new THREE.DirectionalLight( 0x808080 );
directionalLight.position.x = Math.random() - 0.5;
directionalLight.position.y = Math.random() - 0.5;
directionalLight.position.z = Math.random() - 0.5;
directionalLight.position.normalize();
scene.add( directionalLight );
// light.position.y = 5
var cube = new THREE.Mesh(geometry, material);
// scene.add(camera);
scene.add(cube);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.rotateY(Math.PI / 4)
camera.rotateX(-Math.PI / 4)

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 3.14 / 180;
  renderer.render(scene, camera);
}
animate();
