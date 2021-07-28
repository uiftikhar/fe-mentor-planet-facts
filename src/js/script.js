const btnHamburger = document.querySelector('#btnHamburger');
const sideDrawer = document.querySelector('.side-drawer');

btnHamburger.addEventListener('click', () => {
  console.log()
  if(sideDrawer.classList.contains('side-drawer__is-opened')) {
    sideDrawer.classList.remove('side-drawer__is-opened');
  } else {
    sideDrawer.classList.add('side-drawer__is-opened');
  }
})