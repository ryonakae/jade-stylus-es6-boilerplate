'use strict';

window.jQuery = window.$ = require('jquery');

export default class ResizeManager {
  constructor() {
    this.$window = null;
    this.windowWidth = 0;
    this.windowHeight = 0;
    this.functions = [];
    this.length = 0;
    this.timer = null;
    this.fps = 60;
  }

  init() {
    this.$window = $(window);
    this.update();

    this.$window.on('resize orientationchange', () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          this.update();
        });
      } else {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          this.update();
        }, 1000/this.fps);
      }
    });
  }

  add(func) {
    this.functions.push(func);
    this.length = this.functions.length;
  }

  remove(func) {
    this.functions.splice(func, 1);
    this.length = this.functions.length;
  }

  update() {
    this.windowWidth = this.$window.width();
    this.windowHeight = this.$window.height();

    for (let i = 0; i < this.length; i++) {
      let func = this.functions[i];
      func();
    }
  }
};