// DOM element selectors
const header = document.querySelector('.header-content');
const toTopBtn = document.querySelector('#goTop');
const mainMenu = document.querySelector('#menu-main-menu');


// Hide header & to top on scroll
window.onscroll = () => {
  hideMenu();
  hideToTopBtn();
};


/* Toggle element from top or bottom
 * @param   {DOM element}   element     Target DOM element to toggle
 * @param   {string}        position    'top' or 'bottom'
 * @param   {string}        offset      Offset in e.g. pixels, rem, em, etc.
*/
const elementToggle = (element, position, offset) => position === 'top' ? element.style.top = offset : element.style.bottom = offset;


/* Change display attribute of element
 * @param   {DOM element}   element     Target DOM element
 * @param   {string}        value       Display attribute value, e.g. 'none', 'block', etc.
*/
const elementDisplay = (element, value) => element.style.display = value;


// Hide Header
let prevScrollpos = window.pageYOffset;

const hideMenu = () => {
  let currentScrollPos = window.pageYOffset;

  // if (screen.width < 813 && window.pageYOffset > 100) {
    if (prevScrollpos > currentScrollPos) {
      elementToggle(header, 'top', '0');
      elementDisplay(mainMenu, 'none');
    } else {
      elementToggle(header, 'top', '-80px');
      elementDisplay(mainMenu, 'none');
    }
  // }

  // Give header tint if scroll down screen height
  window.pageYOffset > window.screen.height - 300 ? header.style.background = 'rgba(0, 0, 0, 0.5)' : header.style.background = 'transparent';

  prevScrollpos = currentScrollPos;
}



// Hide "to top button"
const hideToTopBtn = () => {
  window.pageYOffset > window.screen.height ?
    elementToggle(toTopBtn, 'bottom', '20px')
    :
    elementToggle(toTopBtn, 'bottom', '-50px')
}



// Toggle mobile menu
$('#main-menu-toggle').click(function () {
  $('.main-menu ul').slideToggle(300, function () {
  });
});



//Smooth scrolling
$('#menu-main-menu a, .btn, .arrow-link').on('click', function (e) {
  if (this.hash !== '') {
    e.preventDefault();

    const hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top,
    },
      800
    );
  }
});
