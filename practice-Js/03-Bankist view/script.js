'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnleft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

// =============================================================>>
// Modal Window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// =============================================================>>
// Scroll To Section
btnScrollTo.addEventListener('click', function () {
  const s1coords = section1.getBoundingClientRect();

  // window.scrollTo(s1coords.left, s1coords.top);

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // section1.scrollIntoView({ behavior: 'smooth' }); // modern
});

// =============================================================>>
// Page Navigation
// 1.selution
/*
document.querySelectorAll('.nav__link').forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault();

    // const section = document.querySelector(element.getAttribute('href'));
    // const infoSection = section.getBoundingClientRect();
    // window.scrollTo({
    //   left: infoSection.left + window.pageXOffset,
    //   top: infoSection.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });

    const id = element.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

// 2.selution
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// =============================================================>>
// Tabbed Component
tabsContainer.addEventListener('click', function (e) {
  // console.log(e.target.parentElement);
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// =============================================================>>
// Menu Fade Animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(element => {
      if (element !== link) element.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// =============================================================>>
// Sticky Navigation
/*
const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (this.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

// =============================================================>>
// stichy Navigation: Intersection Observer API

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// =============================================================>>
// Reveal Sections

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// =============================================================>>
// Lazy loading images

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));

// =============================================================>>
// Slider
const slider = function () {
  // Data
  let currentSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (element, i) =>
        (element.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) currentSlide = 0;
    else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) currentSlide = maxSlide - 1;
    else currentSlide--;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    activateDot(0);
    goToSlide(0);
  };
  init();

  // Event Handlets
  btnRight.addEventListener('click', nextSlide);
  btnleft.addEventListener('click', previousSlide);
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && previousSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// =============================================================>>
//

// =============================================================>>
// =============================================================>>
// =============================================================>>
/*
// ----------------------------------------------------------> 005
const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookied for improved functionality and analytics. <button>Got it!</button>';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);

// const message2 = message.cloneNode(true);
// header.append(message2);
// header.append(message.cloneNode(true));

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.parentElement.removeChild(message);
    message.remove(); // modern
  });

// ----------------------------------------------------------> 006
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.height);
// console.log(message.style.backgroundColor);

// console.log(getComputedStyle(message).height);
// console.log(Number.parseFloat(getComputedStyle(message).height));
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 15 + 'px';

document.documentElement.style.setProperty('--color-primary', '#4ec100');

const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.getAttribute('src'));

console.log(logo.dataset.versionNumber);

// logo.className = 'classTesty'; // Don't use
logo.classList.add('classTesty');

// ----------------------------------------------------------> 008
const h1 = document.querySelector('h1');

const h1Alert = function () {
  alert('Hello World');

  h1.removeEventListener('mouseenter', h1Alert);
};
h1.addEventListener('mouseenter', h1Alert);

// ----------------------------------------------------------> 010
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

const link = document.querySelector('.nav__link');
const pLink = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

link.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link: ', e.currentTarget, e.target);

  // e.stopPropagation();
});

pLink.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container: ', e.currentTarget, e.target);

  // e.stopPropagation();
});

nav.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav: ', e.currentTarget, e.target);
});

// ----------------------------------------------------------> 012
const h1 = document.querySelector('h1');

// Going downwards: Childs
console.log(h1.querySelector('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// Going upwards: Parents
console.log(h1.parentNode);
console.log(h1.parentElement);

console.log(h1.closest('.header__title'));

// Going sideways: Sibling
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

[...h1.parentElement.children].forEach(function (element) {
  element.style.transform = 'scale(0.5)';
});

// ----------------------------------------------------------> 016
const observerCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};

const observerOptions = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);

// ----------------------------------------------------------> 017
section1.classList.add('section--hidden');

const revealSection = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
sectionObserver.observe(section1);

// ----------------------------------------------------------> 021
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('DOM Content Loaded Event: ', e);
});

window.addEventListener('load', function (e) {
  console.log('Load Event: ', e);
});

window.addEventListener('beforeunload', function () {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
*/
