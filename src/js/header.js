const btnMenu = document.querySelector('.header__btn-menu');
const nav = document.querySelector('.header__nav');

btnMenu.addEventListener('click', (e) => {
  e.stopPropagation();
  btnMenu.classList.toggle('header__btn-menu--open');
  nav.classList.toggle('header__nav--open');
})

document.addEventListener('click', () => {
  btnMenu.classList.remove('header__btn-menu--open');
  nav.classList.remove('header__nav--open');
});




