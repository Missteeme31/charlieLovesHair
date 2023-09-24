//GLOBAL VARIABLES
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".btn--right");
const prevBtn = document.querySelector(".btn--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//REUSABLE FUNCTIONS
//arrange slides next to each other
function setSlidePosition(slide, index) {
  slide.style.left = `${slideWidth * index}px`;
}
slides.forEach(setSlidePosition);

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}
function hideNavBtns (slides, prevBtn, nextBtn, targetIndex) {
    if (targetIndex === 0) {
        prevBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
      } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
      } else {
        prevBtn.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
      }
}

//BUTTON FUNCTIONALITY
prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === previousSlide)
  moveToSlide(track, currentSlide, previousSlide);
  updateDots(currentDot, prevDot);
  hideNavBtns(slides, prevBtn, nextBtn, prevIndex)
});

//add next btn functionality
nextBtn.addEventListener("click", (e) => {
  //detect current slide
  const currentSlide = track.querySelector(".current-slide");
  //identify next slide
  const nextSlide = currentSlide.nextElementSibling;
  //identify current dot
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide)
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideNavBtns(slides, prevBtn, nextBtn, nextIndex)
});

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);

  hideNavBtns(slides, prevBtn, nextBtn, targetIndex)
});
