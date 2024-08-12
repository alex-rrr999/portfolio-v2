import { gsap } from 'gsap';
// import * as perlin from './perlin.js';








// perlin.js::

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




































function resetScrollPosition() {
  window.scrollTo(0, 0);
}





function triggerResize() {
  window.dispatchEvent(new Event('resize'));
}





const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  let isClicked = false;
  tab.addEventListener('click', () => {
    if (!isClicked) {
        isClicked = true;
        setTimeout(() => {
          isClicked = false;
        const target = tab.dataset.target;

        tabs.forEach((t) => {
          t.classList.remove('active');
        });

        tabContents.forEach((tabContent) => {
          if (tabContent.id === target) {
            tabContent.classList.add('visible');
          } else {
            tabContent.classList.remove('visible');
          }
        });

        tab.classList.add('active');
        
        var newPosition = new THREE.Vector3();
        var meshPosition = new THREE.Vector3();

        // let newPosition;
        // let meshPosition;

        switch (target) {
          
          case 'tab1': 
          resetScrollPosition();


            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";


            newPosition.set(0, -10, 17);
            meshPosition.set(0, 0, 0);
            // newPosition = { x: 15, y: 15, z: 10 };
            // meshPosition = { x: 2, y: 2, z: 2 };
            tabContents.forEach((tabContent) => {
              if (tabContent.id === target) {
                gsap.fromTo(
                  tabContent, 
                  {opacity: 0}, 
                  { duration: 1.2, opacity: 1, pointerEvents: 'auto', ease: 'power3.in', delay: 0.1 });
              } else {
                gsap.to(
                  tabContent, 
                  {duration: 0.5, opacity: 0, pointerEvents: 'none'});
              }
            });


            triggerResize();
            break;

          case 'tab2':

          document.documentElement.style.overflow = 'hidden';
          document.body.scroll = "yes";


            newPosition.set(0, 10, 11);
            meshPosition.set(-5, -5, 0);
            // newPosition = { x: -0.8, y: -12, z: 10 };
            // meshPosition = { x: -1.9, y: -1.3, z: 3 };
            tabContents.forEach((tabContent) => {
              if (tabContent.id === target) {
                gsap.fromTo(
                  tabContent, 
                  { opacity: 0,}, 
                  { duration: 1.2, opacity: 1, pointerEvents: 'auto', ease: 'power3.in', delay: 0.1 });
              } else {
                gsap.to(
                  tabContent, 
                  { duration: 0.5, opacity: 0, pointerEvents: 'none'});
              }
            });


            break;

          case 'tab3':

          document.documentElement.style.overflowY = 'auto';
          document.body.scroll = "yes";


            // newPosition.set(15, 15, 14);
            newPosition.set(15, 15, 14);

            meshPosition.set(8, 4, 0);

            tabContents.forEach((tabContent) => {
              if (tabContent.id === target) {
                gsap.fromTo(
                  tabContent, 
                  { opacity: 0,}, 
                  { duration: 1.2, opacity: 1, pointerEvents: 'auto', ease: 'power3.in', delay: 0.1 });
              } else {
                gsap.to(
                  tabContent, 
                  { duration: 0.5, opacity: 0, pointerEvents: 'none'});
              }
            });
            break;

            default:
            newPosition = { x: 0, y: 0, z: 10};
            meshPosition = { x: 0, y: 0, z: 0 };
        }

        gsap.to(camera.position, { x: newPosition.x, y: newPosition.y, z: newPosition.z, duration: 1 });
        gsap.to(_primitive.mesh.position, { x: meshPosition.x, y: meshPosition.y, z: meshPosition.z, duration: 1 });
      }, 400);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const defaultTab = document.querySelector('.tab[data-default]');
  if (defaultTab) {
    defaultTab.click();
  }
});

 // gsap.to(scene.mesh.position, {
        //     duration: 1.7,
        //     x: meshPosition.x,
        //     y: meshPosition.y,
        //     z: meshPosition.z,
        //     ease: 'power3.out',
        // });

        // gsap.to(scene.camera.position, {
        //     duration: 1.7,
        //     x: newPosition.x,
        //     y: newPosition.y,
        //     z: newPosition.z,
        //     ease: 'power3.out',
        // });

