'use strict';

const slider = () => {
  const slide = document.querySelectorAll(".portfolio-item"),
    btn = document.querySelectorAll(".portfolio-btn"),
    slider = document.querySelector(".portfolio-content"),
    dotsBox = document.querySelector(".portfolio-dots");

  let currentSlide = 0,
    interval,
    dot = [];

  const createDots = sliderItems => {
    for (let i = 0; i < sliderItems.length; i++) {
      const li = document.createElement("li");

      if (i === 0) {
        li.className = "dot dot-active";
      } else {
        li.className = "dot";
      }

      dot.push(li);
      dotsBox.append(dot[i]);
    }
  };

  createDots(slide);

  const prevSlide = (elem, index, strClass) => {
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass) => {
    elem[index].classList.add(strClass);
  };

  const autoPlaySlider = () => {
    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");
    currentSlide++;

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlider, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  slider.addEventListener("click", (event) => {
    event.preventDefault();

    let target = event.target;

    if (!target.matches(".portfolio-btn, .dot")) {
      return;
    }

    prevSlide(slide, currentSlide, "portfolio-item-active");
    prevSlide(dot, currentSlide, "dot-active");

    if (target.matches("#arrow-right")) {
      currentSlide++;
    } else if (target.matches("#arrow-left")) {
      currentSlide--;
    } else if (target.matches(".dot")) {
      dot.forEach((elems, index) => {
        if (elems === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }

    nextSlide(slide, currentSlide, "portfolio-item-active");
    nextSlide(dot, currentSlide, "dot-active");
  });

  slider.addEventListener("mouseover", event => {
    if (event.target.matches(".portfolio-btn, .dot")) {
      stopSlide();
    }
  });

  slider.addEventListener("mouseout", event => {
    if (event.target.matches(".portfolio-btn, .dot")) {
      startSlide(1500);
    }
  });

  startSlide(1500);
};

export default slider;