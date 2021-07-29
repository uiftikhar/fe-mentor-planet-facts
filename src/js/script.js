import planetData from "../../data.js"

const header = document.querySelector('.header');
const sideDrawer = document.querySelector('.side-drawer');
const btnHamburger = document.querySelector('#btnHamburger');

const contentLinks = document.querySelectorAll('#content-links > li > a');
const planetContent= document.querySelectorAll('#planet-content > p, #planet-content > h1');
const planetFacts= document.querySelectorAll('#planet-facts > section > span');
const planetImage = document.querySelector('#planet-image > img');

const [planetTitle, planetContentData, planetContentSource] = planetContent;
const [rotation, revolution, radius, temperature] = planetFacts;

const planets = ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']

let planetKey = 'mercury'
let currentPlanet = planetData[0];

window.addEventListener('hashchange', () => {
  planetKey =  location.hash.split('#')[1];
  if(planets.includes(planetKey.toLowerCase())) {
    currentPlanet = planetData.find(({name}) => name.toLowerCase() === planetKey)
    updatePlanetImage(planetKey);
    updatePlanetContent();
    updatePlanetFacts();
    sideDrawer.classList.remove('side-drawer__is-opened');
    header.classList.remove('open');
    contentLinks.forEach((link, index) => {
      link.classList = '';
      if(index === 0) {
        link.classList.add(`content__links-active-${planetKey}`)
        link.classList.add('active')
      }
    })    
  }
});

const updatePlanetContent = () => {
  planetTitle.innerHTML = currentPlanet.name;
  planetContentData.innerHTML = currentPlanet.overview.content;
  planetContentSource.innerHTML = currentPlanet.overview.source;
}

const updatePlanetFacts = () => {
  rotation.innerHTML = currentPlanet.rotation;
  revolution.innerHTML = currentPlanet.revolution;
  radius.innerHTML = currentPlanet.radius;
  temperature.innerHTML = currentPlanet.temperature;
}

const updatePlanetImage = (key, planet) => {
  const classToAdd = `content__image-wrapper-${key}`;
  const classToRemove = planetImage.className;
  const src = currentPlanet.images.planet;
  planetImage.classList.remove(classToRemove);
  planetImage.classList.add(classToAdd);
  planetImage.setAttribute("src", src);
  planetImage.setAttribute("alt", key);
}

contentLinks.forEach(link => {
  link.addEventListener('click', () => {
    contentLinks.forEach(otherLink => {
      otherLink.className = '';
    })
    link.classList.add(`content__links-active-${planetKey}`)
    if(link.classList.contains('active')) {
      link.classList.remove('active')
    } else {
      const key = link.innerHTML.toLowerCase() === 'surface' ? 'geology' : link.innerHTML.toLowerCase();
      link.classList.add('active')
      planetContentData.innerHTML = currentPlanet[key].content;
      planetContentSource.href = currentPlanet[key].source;
    }
  })
})

btnHamburger.addEventListener('click', () => {
  if(sideDrawer.classList.contains('side-drawer__is-opened')) {
    sideDrawer.classList.remove('side-drawer__is-opened');
    header.classList.remove('open');
  } else {
    sideDrawer.classList.add('side-drawer__is-opened');
    header.classList.add('open');
  }
})