import planetData from "../../data.js"



const btnHamburger = document.querySelector('#btnHamburger');
const sideDrawer = document.querySelector('.side-drawer');
const header = document.querySelector('.header');
console.log(12, planetData);
btnHamburger.addEventListener('click', () => {
  console.log(77)
  if(sideDrawer.classList.contains('side-drawer__is-opened')) {
    sideDrawer.classList.remove('side-drawer__is-opened');
    header.classList.remove('open');
  } else {
    sideDrawer.classList.add('side-drawer__is-opened');
    header.classList.add('open');
  }
})