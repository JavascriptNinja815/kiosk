import { GestureController } from './GestureController.js';

let content = `
  <style>
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    #bg {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    
    main {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
    }
    
    main ::slotted(*) {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
      opacity: 0;
      transition: opacity 1s ease;
      pointer-events: none;
    }
    
    main ::slotted(.visible) {
      opacity: 1;
      pointer-events: all;
    }
    
    button {
      position: absolute;
      bottom: 0;
      font-size: 120px;
      background: transparent;
      border: 0;
      outline: none;
    }
    
    #prev {
      left: 15px;
    }
    
    #next {
      right: 15px;
    }
  </style>
  <video id="bg" autoplay loop muted>
    <source src="bg/loop.webm" type="video/webm">
  </video>
  <main>
    <slot></slot>
  </main>
  <button id="prev"> &lsaquo; </button>
  <button id="next"> &rsaquo; </button>
`;

class KioskSplash extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    this.sections = Array.from(this.children);
    this.vid = this.shadowRoot.querySelector('video');
    
    this.delay = parseFloat(getComputedStyle(this.sections[0]).getPropertyValue('transition-duration')) * 1000;
    this.wait = 15000;

    this.i = 0;
    this.sections[this.i].classList.add('visible');

    this.timer = setTimeout(this.nextSection.bind(this), this.wait);
    
    this.shadowRoot.querySelector('#prev').addEventListener('click', this.prevSection.bind(this));
    this.shadowRoot.querySelector('#next').addEventListener('click', this.nextSection.bind(this));
    
    let g = new GestureController({ element : this });
    
    g.on('left', event => {
      this.nextSection();
    });
    
    g.on('right', event => {
      this.prevSection();
    });
  }
  
  prevSection() {
    clearTimeout(this.timer);
    this.sections[this.i].classList.remove('visible');
    this.i--;
    if (this.i < 0) { this.i = this.sections.length - 1; }
    setTimeout(() => {
      this.sections[this.i].classList.add('visible');
      this.timer = setTimeout(this.nextSection.bind(this), this.wait);
    }, this.delay);
  }
  
  nextSection() {
    clearTimeout(this.timer);
    this.sections[this.i].classList.remove('visible');
    this.i++;
    if (this.i == this.sections.length) { this.i = 0; }
    setTimeout(() => {
      this.sections[this.i].classList.add('visible');
      this.timer = setTimeout(this.nextSection.bind(this), this.wait);
    }, this.delay);
  }
  
  resetState() {
    clearTimeout(this.timer);
    this.vid.play();
    let sections = Array.from(this.children);
    this.sections.forEach(s => {
      s.classList.remove('visible');
    });
    this.sections[0].classList.add('visible');
    this.i = 0;
    this.timer = setTimeout(this.nextSection.bind(this), this.wait);
  }
  
  stop() {
    this.sections.forEach(s => {
      s.classList.remove('visible');
    });
    clearTimeout(this.timer);
    this.vid.pause();
  }
}

customElements.define('kiosk-splash', KioskSplash);
