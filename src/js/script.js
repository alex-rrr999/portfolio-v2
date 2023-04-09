import { Gradient } from './gradient.js'

const gradient = new Gradient()

gradient.initGradient('#gradient-canvas')
        

const sectionAbout = document.querySelector('#section-about');
const sectionProjects = document.querySelector('#section-projects');
const sectionContact = document.querySelector('#contact');



const homeParagraph = document.querySelector('.home-paragraph');
const distance = homeParagraph.offsetHeight * 4;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const opacity = 1 - (scrollPosition / distance);

    homeParagraph.style.opacity = opacity;

    if (scrollPosition > distance) {
        sectionAbout.style.opacity = (scrollPosition - distance) / (distance * 0.4);
        sectionProjects.style.opacity = ((scrollPosition - distance*1.5) / (distance*0.8));
        sectionContact.style.opacity = ((scrollPosition - distance*2.8) / (distance*0.8));


    } else {

        sectionAbout.style.opacity = 0;
        sectionProjects.style.opacity = 0;
        sectionContact.style.opacity = 0;


    }
});


const navLinks = document.querySelectorAll('nav a');
const offset = 10; // adjust this value to your desired offset

for (const link of navLinks) {
  link.addEventListener('click', clickHandler);
}

function clickHandler(e) {
  e.preventDefault();

  const href = this.getAttribute('href');
  const targetElement = document.querySelector(href);
  const offsetTop = targetElement.offsetTop - offset * parseFloat(getComputedStyle(document.documentElement).fontSize);

  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}
