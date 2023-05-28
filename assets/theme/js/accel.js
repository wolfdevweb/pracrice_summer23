const popup = document.querySelector('.popup');
const body = document.querySelector('.page');

function stop(evt) {
  evt.stopPropagation();
}
function viewPopup() {
  popup.classList.toggle('popup--hidden');
  body.classList.toggle('page--scroll-off');
};

const sliderElements = document.querySelectorAll('.slider__item');
let countActive = 0;
let countNext = 1;
let countPrev = sliderElements.length-1;

const addActiveClass = (flag) => {
  const prevCount = countActive;

  if (flag) {
    countActive < sliderElements.length-1 ? countActive++ : countActive = 0;
    sliderElements[countActive].classList.add('slider__item--active');
    sliderElements[prevCount].classList.remove('slider__item--active');

  } else {

    countActive > 0 ? countActive-- : countActive = sliderElements.length-1;
    sliderElements[countActive].classList.add('slider__item--active');
    sliderElements[prevCount].classList.remove('slider__item--active');
  };
};
const addNextClass = (flag) => {
  const prevCount = countNext;
  
  if (flag) {
    countNext < sliderElements.length-1 ? countNext++ : countNext = 0;
    sliderElements[countNext].classList.add('slider__item--next');
    sliderElements[prevCount].classList.remove('slider__item--next');

  } else {
    sliderElements[prevCount].classList.add('slider__item--hidden');
    setTimeout(()=>{
      sliderElements[prevCount].classList.remove('slider__item--hidden');
    },100)
  
    countNext > 0 ? countNext-- : countNext = sliderElements.length-1;
    sliderElements[countNext].classList.add('slider__item--next');
    sliderElements[prevCount].classList.remove('slider__item--next');
  };
};
const addPrevClass = (flag) => {
  const prevCount = countPrev;

  if (flag) {

    sliderElements[prevCount].classList.add('slider__item--hidden');
    setTimeout(()=>{
      sliderElements[prevCount].classList.remove('slider__item--hidden');
    },100)
  
    countPrev < sliderElements.length-1 ? countPrev++ : countPrev = 0;
    sliderElements[countPrev].classList.add('slider__item--prev');
    sliderElements[prevCount].classList.remove('slider__item--prev');

  } else {
    
    countPrev > 0 ? countPrev-- : countPrev = sliderElements.length-1;
    sliderElements[countPrev].classList.add('slider__item--prev');
    sliderElements[prevCount].classList.remove('slider__item--prev');
  };
};

function activateSlider() {
  if (sliderElements.length === 1) {
    document.querySelectorAll('.reviews__button').forEach((elem) => {
      elem.disabled = true;
      elem.classList.add('reviews__button--disabled')
    });
    sliderElements[countActive].classList.add('slider__item--active');
  };
  if (sliderElements.length === 2) {
    sliderElements[countActive].classList.add('slider__item--active');
    sliderElements[countNext].classList.add('slider__item--next');
  };
  if (sliderElements.length >= 3) {
    sliderElements[countActive].classList.add('slider__item--active');
    sliderElements[countNext].classList.add('slider__item--next');
    sliderElements[countPrev].classList.add('slider__item--prev');
  };
};

function nextSlide(flag) {
  addActiveClass(flag);
  addNextClass(flag);
  addPrevClass(flag);
}