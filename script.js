'use strict';

const body = document.querySelector('body'),
  startBtn = document.getElementById('start-pause'),
  resetBtn = document.getElementById('reset'),
  background = document.getElementById('background');

class Animation {
  constructor() {
    this.requestId = null;
    this.start = null;
    this.progress = 0;
    this.toggle = false;
  }

  startAnimation() {
    if (!this.toggle) {
      this.toggle = true;
      this.animation();
    } else {
      this.toggle = false;
      this.stopAnimation();
    }
  }

  stopAnimation() {
    cancelAnimationFrame(this.requestId);
  }

  animation() {
    background.style.top = `-${this.progress}%`;

    this.progress++;

    this.requestId = requestAnimationFrame(this.animation.bind(this));
  }

  resetAnimation() {
    this.toggle = false;
    this.stopAnimation();
    this.progress = 0;
    background.style.top = `-${this.progress}%`;
  }
}

const anima = new Animation();

body.addEventListener('click', event => {
  const target = event.target;

  if (target.id === 'start-pause') {
    anima.startAnimation();
  } else if (target.id === 'reset') {
    anima.resetAnimation();
  } 
});

