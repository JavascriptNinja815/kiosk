let content = `
  <style>
    :host {
      display: grid;
      grid-template-rows: 8fr 1fr;
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: transparent;
      overflow: hidden;
      --overlay-color: rgba(0,0,0,0.5);
      --overlay-hover-color: black;
      --active-tab-color: #d5000d;
      font-family: sans-serif;
      --tabs-count: 4;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    main {
      position: relative;
      border-bottom: 1px solid black;
    }
    
    main ::slotted(*) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      pointer-events: none;
      transition-property: opacity;
      transition-duration: 0.5s;
      transition-timing-function: ease;
    }
    
    main ::slotted(.active) {
      opacity: 1;
      pointer-events: all;
    }
    
    nav {
      display: grid;
      grid-template-columns: repeat(var(--tabs-count), 1fr);
      font-family: "primal"
    }
    
    nav a {
      position: relative;
      display: grid;
      grid-template-rows  : 1fr;
      align-items: center;
      align-content: center;
      justify-content: center;
      width: 100%;
      font-size: 75px;
      text-decoration: none;
      font-weight: normal;
      text-shadow: 0 0 10px rgba(0,0,0,0.5);
      cursor: pointer;
      transition: background 0.7s ease;
      box-shadow: inset 0 20px 30px -20px rgba(0,0,0,0.4);
    }
    
    nav a img {
      height: 225px;
      filter: none;
    }
    
    nav a:not(.active) img {
      filter: grayscale(1);
    }
    
    nav a.active {
      background: var(--active-tab-color);
      z-index: 9999;
      color: white;
      cursor: default;
    }
    
    nav a:not(:last-of-type) {
      border-right: 1px solid black;
    }
    
    nav a:not(.active) {
      background: white;
    }
    
    nav a:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: transparent;
      box-shadow: none;
      transition: background 0.7s ease;
    }
    
    nav a:not(.active):after {
      background: rgba(0,0,0,0.4);
      box-shadow: 0 1rem 2rem -1rem inset rgba(0,0,0,0.5);
      z-index: 10;
    }
  </style>
  <main>
    <slot></slot>
  </main>
  <nav>
    <template>
      <a tabindex="2"></a>
    </template>
  </nav>
`;

class KioskTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    let widget = this;
    
    this.pages = Array.from(widget.children);
    
    this.main = widget.shadowRoot.querySelector('main');
    let nav = widget.shadowRoot.querySelector('nav');
    let template = nav.querySelector('template');
    
    this.pages[0].classList.add('active');
    
    widget.style.setProperty('--tabs-count', this.pages.length);
    
    this.pages.forEach((p, i) => {
      let title = p.dataset.title;
      let t = template.content.cloneNode(true);
      let test = title.slice(-4);
      if (test == '.png' || test == '.svg') {
        let img = new Image();
        img.src = title;
        t.querySelector('a').append(img);
      } else {
        if (!title) { title = i; }
        t.querySelector('a').innerText = title;
      }
      nav.append(t);
    });
    
    this.tabs = nav.querySelectorAll('a');
    this.tabs[0].classList.add('active');
    
    this.tabs.forEach((tab, i) => {
      tab.addEventListener('click', event => {
        this.show(i);
      });
    });
  }
  
  show(i) {
    let delay = getComputedStyle(this.firstElementChild).getPropertyValue('transition-duration');
    delay = parseFloat(delay) * 1000;
  
    this.tabs.forEach(t => {
      t.classList.remove('active');
    });
    
    this.pages.forEach((p, index) => {
      p.classList.remove('active');
      
      let s = p.querySelector('kiosk-slider');
      if (s && s.resetZoom ) { s.classList.remove('active'); s.resetZoom(); }
      
      let z = p.querySelector('kiosk-pages');
      if (!z) { z = p.querySelector('kiosk-slider'); }
      if (z && z.classList) {
        z.classList.remove('active');
        if (index !== i) {
          setTimeout(function(){
            z.show(0);
          }, delay * 2);
        }
      }
    });
    
    this.tabs[i].classList.add('active');

    this.pages[i].classList.add('active');      
    let kp = this.pages[i].querySelector('kiosk-pages');
    if (kp && kp.classList) {      
        kp.classList.add('active');
        kp.show(kp.index);
    }
  }
}

customElements.define('kiosk-tabs', KioskTabs);
