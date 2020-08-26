import { GestureController } from './GestureController.js';

let content = `
  <style>
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: transparent;
      overflow: hidden;
      --overlay-color: rgba(0,0,0,0.5);
      --overlay-hover-color: red;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    main {
      display: grid;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition-property: left;
      transition-duration: 0.4s;
      transition-timing-function: ease;
    }
    
    ::slotted(:not(section)) {
      display: none;
    }
    
    ::slotted(section) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    button {
      position: absolute;
      bottom: 25px;
      z-index: 10;
      transition-property: opacity;
      transition-duration: 0.4s;
      transition-timing-function: ease;
      background: transparent;
      border: 0;
      color: var(--overlay-color);
      font-size: 150px;
      user-select: none;
    }
    
    button:focus {
      color: var(--overlay-hover-color);
    }
    
    button[disabled] {
      opacity: 0;
      pointer-events: none;
    }
    
    #prev {
      left: 25px;
    }
    
    #next {
      right: 25px;
    }
    
    nav {
      position: absolute;
      width: auto;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) rotateZ(360deg);
      z-index: 10;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
      padding: 25px;
      font-size: 150px;
      user-select: none;
    }
    
    nav[hidden] {
      display: none;
    }
    
    nav a {
      text-decoration: none;
      color: var(--overlay-color);
      user-select: none;
    }
    
    
    @keyframes shadow-pulse {
      0% {
        text-shadow: none;
      }
      50% {
        text-shadow: 0 0 30px rgba(255, 0, 0, 1);
      }
      100% {
        text-shadow: none;
      }
    }
    
    nav a.active {
      color: var(--overlay-hover-color);
      animation: shadow-pulse 3s infinite;
    }
    
    button:focus,
    button:active,
    nav a:focus,
    nav a:active, {
      outline: none;
    }
    
    nav a:not(:last-child) {
      margin-right: 0.5em; 
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; font-size: 0; }
      100% { opacity: 1; font-size: 1em; }
    }
    
    @keyframes fadeOut {
      0% { opacity: 1; font-size: 1em; }
      100% { opacity: 0; font-size: 0; }
    }
  </style>
  <main>
    <slot></slot>
  </main>
  <button id="prev" tabindex="1" disabled> &lsaquo; </button>
  <button id="next" tabindex="1" disabled> &rsaquo; </button>
  <nav>
    <template>
      <a tabindex="2"></a>
    </template>
  </nav>
`;

class KioskSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
    this.index = 0;
    this.count = 0;
  }
  
  static get observedAttributes() {
    return [
      'controls'
    ];
  }
  
  attributeChangedCallback(a, o, v) {
    if (a == 'controls') {
      if (v == 'false') {
        this.buttons.next.hidden = true;
        this.buttons.prev.hidden = true;
        this.nav.hidden = true;
      } else {
        this.buttons.next.hidden = false;
        this.buttons.prev.hidden = false;
        this.nav.hidden = false;
      }
    }
  }
  
  get controls() {
    return (this.getAttribute('controls') == 'true') ? true : false;
  }
  
  set controls(v) {
    if (
      v !== true &&
      v !== 'true' &&
      v !== false &&
      v !== 'false'
    ) {
      console.error('you must provide a boolean value when setting the controls property');
      return;
    }
    
    this.setAttribute('controls', v);
  }

  get nav() {
    return this.shadowRoot.querySelector('nav');
  }

  get buttons() {  
    return {
      prev : this.shadowRoot.querySelector('#prev'),
      next : this.shadowRoot.querySelector('#next')
    }
  }
  
  get sections() {
    return Array.from(this.children).filter(c => c.nodeName == 'SECTION');
  }
  
  get lastIndex() {
    return this.count-1;
  }
  
  resetZoom() {
    let zoomable = this.active.querySelector('kiosk-merch img[slot=zoomable]');
    if (
      zoomable &&
      zoomable.zoomController &&
      zoomable.style.transform != "" &&
      zoomable.style.transform != "matrix(1, 0, 0, 1, 0, 0)"
    ) {
      zoomable.zoomController.reset(true);
    }
  }
  
  show(i) {
    this.resetZoom();
  
    if (
      !(i >= 0) &&
      !(i <= this.sections.length)
    ) {
      console.warn('invalid slide index');
      return;
    }
    
    this.index = i;
    this.active = this.sections[this.index];
    this.main.style.left = `-${100 * this.index}%`;;
    
    if (this.index+1 == this.sections.length) {
      this.buttons.next.disabled = true;
    } else {
      this.buttons.next.disabled = false;
    }
    
    if (this.index-1 < 0) {
      this.buttons.prev.disabled = true;
    } else {
      this.buttons.prev.disabled = false;
    }
    
    this.nav.querySelectorAll('a').forEach(a => {
      a.classList.remove('active');
      a.blur();
    });
    
    this.nav.querySelectorAll('a')[this.index].classList.add('active');
    
    this.querySelectorAll('kiosk-merch').forEach(m => { m.classList.remove('active'); });
    this.active.querySelector('kiosk-merch').classList.add('active');
    
    this.dispatchEvent(new CustomEvent('traverse'));
  }
  
  connectedCallback() {
    let slider = this;
    slider.count = slider.sections.length;
    
    slider.main = this.shadowRoot.querySelector('main');
    
    slider.next = function() {
      setTimeout(()=>{ slider.buttons.next.blur(); }, 200);
      slider.show(slider.index+1);
    }
    
    slider.prev = function() {
      setTimeout(()=>{ slider.buttons.prev.blur(); }, 200);
      slider.show(slider.index-1);
    }
    
    slider.buttons.prev.addEventListener('click', slider.prev);
    slider.buttons.next.addEventListener('click', slider.next);
    
    if (slider.sections.length) {
      slider.buttons.next.disabled = false;
    }
    
    function NavItem(index) {
      let navTemplate = slider.nav.querySelector('template');
      let t = document.importNode(navTemplate.content, true);
      let a = t.querySelector('a');
      a.innerHTML = '&#x25cf;';
      a.addEventListener('click', event => {
        let index = Array.from(slider.nav.querySelectorAll('a')).indexOf(a);
        slider.show(index);
      });
      return t;
    }
  
    function reflow() {
      slider.main.style.width = `calc(100% * ${slider.count})`;
      slider.main.style.gridTemplateColumns = `repeat(${slider.count}, 1fr)`;
    }
  
    reflow();
    
    function mutationHandler(mutations, observer) {
      for (let m of mutations) {
        let c = 0;
        m.addedNodes.forEach(n => {
          if (n.nodeName == 'SECTION') {
            c++;
            slider.nav.append(new NavItem());
          }
        });
        m.removedNodes.forEach(n => {
          if (n.nodeName == 'SECTION') {
            c--;
            let pip = slider.nav.lastElementChild;
            let delay = parseFloat(getComputedStyle(pip).getPropertyValue('animation-duration')) * 1000;
            pip.style.animationName = 'fadeOut';
            setTimeout(function(){
              slider.nav.removeChild(pip);
            }, delay);
          }
          if (n == slider.active) {
            slider.prev();
          }
        });
        slider.count += c;
      }
      reflow();
      let a = slider.sections.indexOf(slider.active);
      if (a) {
        slider.show(a);
      }
    }
    
    new MutationObserver(
      mutationHandler
    ).observe(slider, {
      attributes: false,
      childList: true,
      subtree: false
    });

    function buildNav() {
      let f = document.createDocumentFragment();
      slider.sections.forEach((s,i) => {
        f.append(new NavItem());
      });
      slider.nav.append(f);
      slider.nav.querySelector('a').classList.add('active');
    }

    buildNav();

    slider.active = slider.sections[0];
    
    let g = new GestureController({ element : slider });
    
    g.on('left', s => {
      if ( s.event.target.classList.contains('zoomed') ) { return; }
      
      if (
        slider.index < slider.sections.length-1
      ) {
        slider.next.call(slider, slider.index);
      }
    });
    
    g.on('right', s => {
      if ( s.event.target.classList.contains('zoomed') ) { return; }
    
      if (
        slider.index > 0
      ) {
        slider.prev.call(slider, slider.index);
      }
    });
  }
}

customElements.define('kiosk-slider', KioskSlider);
