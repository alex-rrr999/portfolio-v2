import { gsap } from 'gsap';
// import * as perlin from './perlin.js';

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
            break;

          case 'tab2':
            newPosition.set(0, 10, 11);
            meshPosition.set(-13, -11, 0);
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
            newPosition.set(15, 15, 14);
            meshPosition.set(13, 11, 0);
            // newPosition = { x: 10, y: 10, z: 11 };
            // meshPosition = { x: 2, y: 0, z: 1 };
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

