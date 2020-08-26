import './zoom.js';

let content = `
  <style>
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    :host([hidden]) { display: none; }

    main {
      margin-top: 400px;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    ::slotted(h1[slot=title]) {
      position: absolute;
      top: 0px;
      left: 50%;
      margin: 0;
      transform: translateX(-50%);
      font-size: 120px;
      font-family: primal;
    }

    #frame {
      overflow: visible;
      width: 1500px;
      z-index: 50;
      text-align: center;
    }
    
    #frame.zoomed {
      background: white;
      overflow: hidden;
      border: 20px solid white;
      cursor: move;
      box-shadow:
        0 0 20px 0 rgba(0,0,0,0.5),
        inset 0 0 20px 0 rgba(0,0,0,0.5);
    }
    
    ::slotted(img[slot=zoomable]) {
      max-height: 1250px;
      z-index: 100;
      filter: drop-shadow(0 0 50px rgba(0,0,0,0.4));
    }

    ::slotted(ul) {
      position: absolute;
      top: 700px;
      padding: 0;
      width: 1000px;
      font-family: "proxima nova semibold";
      font-size: 60px;
    }
    
    ::slotted(ul) li {
      padding: 1rem;
    }
    
    ::slotted(ul[slot=bullets-left]) {
      left: 300px;
    }
    
    ::slotted(ul[slot=bullets-right]) {
      right: 100px;
    }
  </style>
  <main>
    <slot name="title"></slot>
    <div id="frame">
      <slot name="zoomable"></slot>
    </div>
    <slot name="bullets-left"></slot>
    <slot name="bullets-right"></slot>
  </main>
`;

class KioskMerch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  static get observedAttributes() { return ['class']; }
  
  attributeChangedCallback(name, oldValue, newValue) {
    let hint = document.querySelector('zoom-hint');
    if (name == 'class') {
      if (this.classList.contains('active')) {
        hint.show();
      }
    }
  }
  
  connectedCallback() {
    let hint = document.querySelector('zoom-hint');
    let hinting = false;
    
    let img = this.querySelector('img[slot=zoomable]');
    
    let z = new Zoom(img, {
      pan: true,
      rotate: false,
      minScale: 1,
      maxScale: 10,
      boundaries: false
    });
    
    img.zoomController = z;
    
    let frame = this.shadowRoot.querySelector('#frame');
    
    img.addEventListener('zoom', event => {
      if (event.detail == 'matrix(1,0,0,1,0,0)') {
        frame.classList.remove('zoomed');
        img.classList.remove('zoomed');
      } else {
        frame.classList.add('zoomed');
        img.classList.add('zoomed');
      }
    });
  }
}

customElements.define('kiosk-merch', KioskMerch);
