
import planetData from "../../data.js"
const tabletNavigation = document.querySelector('#tablet-navigation');
const mobileNavigation = document.querySelector('#mobile-navigation');
const planetImage = document.querySelector('#planet-image > img');
const planetContent= document.querySelectorAll('#planet-content > p, #planet-content > h1');
const planetFacts = document.querySelectorAll('#planet-facts > section > span');
const btnHamburger = document.querySelector('#btnHamburger');
const mobileTabs = document.querySelectorAll('#content-tabs-mobile > button');
const tabletTabs = document.querySelectorAll('#content-tabs-tablet-up > button');

const sideDrawer = document.querySelector('.side-drawer');
const header = document.querySelector('.header');

const [planetTitle, planetContentData, planetContentSource] = planetContent;
const [rotation, revolution, radius, temperature] = planetFacts;
const planets = ['mercury','venus','earth','mars','jupiter','saturn','uranus','neptune']

const throttle = function throttle(func, duration) {
  let shouldWait = false
  return function (...args) {
    if (!shouldWait) {
      func.apply(this, args)
      shouldWait = true
      setTimeout(function () {
        shouldWait = false
      }, duration)
    }
  }
}
let currentPlanet = planetData[0];
let activePlanet = 'mercury'
// Side nav 
btnHamburger.addEventListener('click', () => {
  if(sideDrawer.classList.contains('side-drawer__is-opened')) {
    sideDrawer.classList.remove('side-drawer__is-opened');
    header.classList.remove('open');
  } else {
    sideDrawer.classList.add('side-drawer__is-opened');
    header.classList.add('open');
  }
})


const onTabsClick = (allTabs, currentTab) => {
  currentTab.addEventListener('click',function listener() {
    const geologyPicture = document.querySelector('#geology-picture');
    if(geologyPicture) geologyPicture.parentNode.removeChild(geologyPicture)
    allTabs.forEach(otherLink => {
      otherLink.className = '';
    })
    currentTab.classList.add(`content__tabs-active-${activePlanet}`)
    if(currentTab.classList.contains('active')) {
      currentTab.classList.remove('active')
    } else {
      let key;
      let planetImgSrc = ''
      if(currentTab.innerHTML.toLowerCase() === 'overview') {
        key = 'overview'
        planetImgSrc = `./assets/planet-${activePlanet}.svg`;
      }
      if(currentTab.innerHTML.toLowerCase().includes('structure')) {
        key = 'structure'
        planetImgSrc = `./assets/planet-${activePlanet}-internal.svg`;
      }
      if(currentTab.innerHTML.toLowerCase().includes( 'surface')) {
        key = 'geology'
        planetImgSrc = `./assets/planet-${activePlanet}.svg`;
        const elem = document.createElement("img");
        elem.setAttribute("src", `./assets/geology-${activePlanet}.png`);
        if(currentTab.innerHTML.toLowerCase() === 'surface geology') {
          elem.setAttribute("height", "199");
          elem.setAttribute("width", "163");
          elem.style.bottom = '0px';
        } else {
          elem.setAttribute("height", "199");
          elem.setAttribute("width", "163");
          elem.style.bottom = '-5px';
          elem.style.transform = 'scale(0.4)';
        }
        elem.id=  "geology-picture";
        elem.style.position = 'absolute';
        elem.setAttribute("alt", `${activePlanet}-geology`);
        document.querySelector('#planet-image').appendChild(elem);
        planetImage.classList.add(`content__image-wrapper-${activePlanet}-geology`);
      }
      planetImage.setAttribute('src', planetImgSrc);
      currentTab.classList.add('active')
      currentTab.classList.add('background-fade');
      planetContentData.innerHTML = currentPlanet[key].content;
      planetContentSource.href = currentPlanet[key].source;
    }
  });
}

mobileTabs.forEach(tab => {  onTabsClick(mobileTabs, tab) })

tabletTabs.forEach(tab => { onTabsClick(tabletTabs, tab)});

// Main handler for everything
tabletNavigation.addEventListener('click', throttle((event) => {
  updatePage(false,tabletNavigation,event.target);
  const geologyPicture = document.querySelector('#geology-picture');
  if(geologyPicture) geologyPicture.parentNode.removeChild(geologyPicture)
  tabletTabs.forEach((tab, index) => {
    tab.className = '';
    if(index === 0) {
      tab.classList.add('background-fade');
      tab.classList.add(`content__tabs-active-${activePlanet}`);
    }
  })
}, 1000));

mobileNavigation.addEventListener('click', throttle((event) => {
  const geologyPicture = document.querySelector('#geology-picture');
  if(geologyPicture) geologyPicture.parentNode.removeChild(geologyPicture)
  updatePage(true,mobileNavigation,event.target);
}, 1000));

const updatePage = (shouldRemoveSideDrawer, parentQuerySelector, activeLink) => {
  const allLinks = parentQuerySelector.querySelectorAll('a');
  allLinks.forEach(link => link.className = '');
  activePlanet = activeLink.innerHTML.toLowerCase();
  if(planets.includes(activePlanet)) {
    currentPlanet = planetData.find(({name}) => name.toLowerCase() === activePlanet)
    activeLink.classList.add(`planets-nav-active-${activePlanet}`);
    updatePlanetImage(activePlanet);
    updatePlanetContent();
    updatePlanetFacts();
    if(shouldRemoveSideDrawer) {
      sideDrawer.classList.remove('side-drawer__is-opened');
      header.classList.remove('open');
    }
  }
}


const updatePlanetImage = (key) => {
  const classToAdd = `content__image-wrapper-${key}`;
  const src = currentPlanet.images.planet;
  planetImage.classList.add('slide-out-blurred-right');
  const slideOutAnimated = document.querySelector('.slide-out-blurred-right');
  let slideInAnimated;
  let slideInListener = () => {
    planetImage.classList.remove('slide-in-blurred-left');
  };
  const slideOutListener = () => {
    planetImage.className = '';
    planetImage.classList.add('slide-in-blurred-left',classToAdd);
    planetImage.setAttribute("src", src);
    planetImage.setAttribute("alt", key);
    slideInAnimated = document.querySelector('.slide-in-blurred-left')
    slideInAnimated.addEventListener('animationend', slideInListener, false);
  }
  slideOutAnimated.addEventListener('animationend', slideOutListener, false);
  
  const timeout = setTimeout(() => {
    planetImage.className = '';
    planetImage.classList.add(classToAdd);
    slideInAnimated.removeEventListener('animationend', slideInListener, false);
    slideOutAnimated.removeEventListener('animationend', slideOutListener, false);
    clearTimeout(timeout);
  }, 1000)
}


const updatePlanetContent = () => {
  planetTitle.classList.add('blur-out-expand');
  const expandAnimation = document.querySelector('.blur-out-expand');
  let contractInAnimation;
  const contractInAnimationListener = () => {
    planetTitle.classList.remove('focus-in-contract');
  }
  const expandAnimationListener = () => {
    planetTitle.className = '';
    planetTitle.innerHTML = currentPlanet.name;
    planetTitle.classList.add('focus-in-contract');
    contractInAnimation = document.querySelector('.focus-in-contract');
    contractInAnimation.addEventListener('animationend', contractInAnimationListener, false)
  };
  expandAnimation.addEventListener('animationend', expandAnimationListener, false);
  const timeOut = setTimeout(() => {
    planetTitle.className = '';
    if(contractInAnimation) contractInAnimation.removeEventListener('animationend', contractInAnimationListener, false);
    expandAnimation.removeEventListener('animationend', expandAnimationListener, false);
    clearTimeout(timeOut);
  }, 1000)
  planetContentData.innerHTML = currentPlanet.overview.content;
  const source = planetContentSource.querySelector('a')
  source.href = currentPlanet.overview.source;
}

const updatePlanetFacts = () => {
  rotation.innerHTML = currentPlanet.rotation;
  revolution.innerHTML = currentPlanet.revolution;
  radius.innerHTML = currentPlanet.radius;
  temperature.innerHTML = currentPlanet.temperature;
}
