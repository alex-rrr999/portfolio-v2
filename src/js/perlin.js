// Three JS

window.addEventListener('load', init, false);

function init() {
  createWorld();
  createPrimitive();

  animation();
}

var scene, camera, renderer, container;
var start = Date.now();
var _width, _height;
function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, _width/_height, 1, 1000);
  camera.position.z = 18;
  renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setSize(_width, _height);
  container = document.getElementById("containerish");
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
  console.log('- resize -');
}

//--------------------------------------------------------------------

var mat;
var primitiveElement = function() {
  this.mesh = new THREE.Object3D();
  mat = new THREE.ShaderMaterial( {
    wireframe: false,
    //fog: true,
    uniforms: {
      time: {
        type: "f",
        value: 0.0
      },
      pointscale: {
        type: "f",
        value: 0.0
      },
      decay: {
        type: "f",
        value: 0.0
      },
      complex: {
        type: "f",
        value: 0.0
      },
      waves: {
        type: "f",
        value: 0.0
      },
      eqcolor: {
        type: "f",
        value: 0.0
      },
      fragment: {
        type: "i",
        value: true
      },
      redhell: {
        type: "i",
        value: true
      }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  });
  var geo = new THREE.IcosahedronBufferGeometry(3, 7);
  var mesh = new THREE.Points(geo, mat);
  
  //---
  this.mesh.add(mesh);
}

var _primitive;
function createPrimitive() {
  _primitive = new primitiveElement();
  scene.add(_primitive.mesh);
}

//--------------------------------------------------------------------

var options = {
  perlin: {
    vel: 0.002,
    speed: 0.0002,
    perlins: 1.0,
    decay: 0.10,
    complex: 0.30,
    waves: 20.0,
    eqcolor: 11.0,
    fragment: true,
    redhell: true
  },
  spin: {
    sinVel: 0.0,
    ampVel: 80.0,
  }
}

function createGUI() {
  var gui = new dat.GUI();
  var camGUI = gui.addFolder('Camera');
  //cam.add(, 'speed', 0.0, 30.00).listen().setValue();
  camGUI.add(camera.position, 'z', 3, 20).name('Zoom').listen().setValue(18);
  camGUI.add(options.perlin, 'vel', 0.000, 0.02).name('Velocity').listen().setValue(0.002);
  //camGUI.open();
  
  var mathGUI = gui.addFolder('Math Options');
  mathGUI.add(options.spin, 'sinVel', 0.0, 0.50).name('Sine').listen().setValue(0);
  mathGUI.add(options.spin, 'ampVel', 0.0, 90.00).name('Amplitude').listen().setValue(80);
  //mathGUI.open();
  
  var perlinGUI = gui.addFolder('Setup Perlin Noise');
  perlinGUI.add(options.perlin, 'perlins', 1.0, 5.0).name('Size').step(1);
  perlinGUI.add(options.perlin, 'speed', 0.00000, 0.00050).name('Speed').listen().setValue(0.0005);
  perlinGUI.add(options.perlin, 'decay', 0.0, 1.00).name('Decay').listen().setValue(0.1);
  perlinGUI.add(options.perlin, 'waves', 0.0, 20.00).name('Waves').listen().setValue(20);
  perlinGUI.add(options.perlin, 'fragment', true).name('Fragment');
  perlinGUI.add(options.perlin, 'complex', 0.1, 1.00).name('Complex').listen().setValue(0.3);
  perlinGUI.add(options.perlin, 'redhell', true).name('Electroflow');
  perlinGUI.add(options.perlin, 'eqcolor', 0.0, 15.0).name('Hue').listen().setValue(11);
  perlinGUI.open();
}

//--------------------------------------------------------------------

function animation() {
  requestAnimationFrame(animation);
  var performance = Date.now() * 0.003;
  
  _primitive.mesh.rotation.y += options.perlin.vel;
  _primitive.mesh.rotation.x = (Math.sin(performance * options.spin.sinVel) * options.spin.ampVel )* Math.PI / 180;
  //---
  mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
  mat.uniforms['pointscale'].value = options.perlin.perlins;
  mat.uniforms['decay'].value = options.perlin.decay;
  mat.uniforms['complex'].value = options.perlin.complex;
  mat.uniforms['waves'].value = options.perlin.waves;
  mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
  mat.uniforms['fragment'].value = options.perlin.fragment;
  mat.uniforms['redhell'].value = options.perlin.redhell;
  //---
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

// function moveObjects(newCameraPosition, newMeshPosition) {
//     camera.position.set(newCameraPosition.x, newCameraPosition.y, newCameraPosition.z);
//     _primitive.mesh.position.set(newMeshPosition.x, newMeshPosition.y, newMeshPosition.z);
// }

// var camera, _primitive;

// window.addEventListener('load', init, false);

// function init() {
//     createWorld();
//     createPrimitive();
//     animation();
// }

// var scene, camera, renderer, container;
// var start = Date.now();
// var _width, _height;

// function createWorld() {
//     _width = window.innerWidth;
//     _height= window.innerHeight;
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(55, _width/_height, 1, 1000);

//     camera.position.set(1, 1, 15);
    
//     renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
//     renderer.setSize(_width, _height);
//     container = document.getElementById("containerish");
//     container.appendChild(renderer.domElement);
//     window.addEventListener('resize', onWindowResize, false);

//     _primitive = new primitiveElement(camera);
//     scene.add(_primitive.mesh);

// }

// function onWindowResize() {
//     _width = window.innerWidth;
//     _height = window.innerHeight;
//     renderer.setSize(_width, _height);
//     camera.aspect = _width / _height;
//     camera.updateProjectionMatrix();
// }

// var mat;
// class primitiveElement {
//     constructor() {
//         this.mesh = new THREE.Object3D();
//         mat = new THREE.ShaderMaterial({
//             // wireframe: true,
//             //fog: true,
//             uniforms: {

//                 time: {
//                     type: "f",
//                     value: 0.0
//                 },
//                 pointscale: {
//                     type: "f",
//                     value: 0.0
//                 },
//                 decay: {
//                     type: "f",
//                     value: 0.0
//                 },
//                 complex: {
//                     type: "f",
//                     value: 8.0
//                 },
//                 waves: {
//                     type: "f",
//                     value: 0.0
//                 },
//                 eqcolor: {
//                     type: "f",
//                     value: 0.0
//                 },
//                 fragment: {
//                     type: "i",
//                     value: true
//                 },
//                 redhell: {
//                     type: "i",
//                     value: true
//                 }
//             },
//             vertexShader: document.getElementById('vertexShader').textContent,
//             fragmentShader: document.getElementById('fragmentShader').textContent
//         });
//         var geo = new THREE.IcosahedronBufferGeometry(3, 7);
//         var mesh = new THREE.Points(geo, mat);

//         this.mesh.position.set(0, 0, 0);
//         this.mesh.add(mesh);

//     }
// }

// var _primitive;

// function createPrimitive() {
//     _primitive = new primitiveElement(camera);
//     scene.add(_primitive.mesh);
// }

// var options = {
//     perlin: {
//         vel: 0.002,
//         speed: 0.0002,
//         perlins: 1,
//         decay: 0.10,
//         complex: 0.30,
//         waves: 20.0,
//         eqcolor: 11.0,
//         fragment: true,
//         redhell: true,
//     },
//     spin: {
//         sinVel: 0.0,
//         ampVel: 80.0,
//     }
// }

// function animation() {
//     requestAnimationFrame(animation);
//     var performance = Date.now() * 0.003;
    
//     _primitive.mesh.rotation.y += options.perlin.vel;
//     _primitive.mesh.rotation.x = (Math.sin(performance * options.spin.sinVel) * options.spin.ampVel )* Math.PI / 180;

//     mat.uniforms['time'].value = options.perlin.speed * (Date.now() - start);
//     mat.uniforms['pointscale'].value = options.perlin.perlins;
//     mat.uniforms['decay'].value = options.perlin.decay;
//     mat.uniforms['complex'].value = options.perlin.complex;
//     mat.uniforms['waves'].value = options.perlin.waves;
//     mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
//     mat.uniforms['fragment'].value = options.perlin.fragment;
//     mat.uniforms['redhell'].value = options.perlin.redhell;

//     camera.lookAt(scene.position);
//     renderer.render(scene, camera);
// }
    


//  function createGUI() {
//             var gui = new dat.GUI();
//             var camGUI = gui.addFolder('Camera');

//             camGUI.add(camera.position, 'z', 3, 20).name('Zoom').listen().setValue(18);
//             camGUI.add(options.perlin, 'vel', 0.000, 0.02).name('Velocity').listen().setValue(0.002);
            
//             var mathGUI = gui.addFolder('Math Options');
//             mathGUI.add(options.spin, 'sinVel', 0.0, 0.50).name('Sine').listen().setValue(0);
//             mathGUI.add(options.spin, 'ampVel', 0.0, 90.00).name('Amplitude').listen().setValue(80);
            
//             var perlinGUI = gui.addFolder('Setup Perlin Noise');
//             perlinGUI.add(options.perlin, 'perlins', 1.0, 5.0).name('Size').step(1);
//             perlinGUI.add(options.perlin, 'speed', 0.00000, 0.00050).name('Speed').listen().setValue(0.0005);
//             perlinGUI.add(options.perlin, 'decay', 0.0, 1.00).name('Decay').listen().setValue(0.1);
//             perlinGUI.add(options.perlin, 'waves', 0.0, 20.00).name('Waves').listen().setValue(20);
//             perlinGUI.add(options.perlin, 'fragment', true).name('Fragment');
//             perlinGUI.add(options.perlin, 'complex', 0.1, 1.00).name('Complex').listen().setValue(0.3);
//             perlinGUI.add(options.perlin, 'redhell', true).name('Electroflow');
//             perlinGUI.add(options.perlin, 'eqcolor', 0.0, 15.0).name('Hue').listen().setValue(11);
//             perlinGUI.open();
//         }