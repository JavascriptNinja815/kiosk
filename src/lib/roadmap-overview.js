let content = `
  <style>
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      font-family: "proxima nova semibold";
    }
    
    :host([hidden]) {
      display: none;
    }
    
    h1 {
      position: absolute;
      width: 100%;
      top: -400px;
      text-align: center;
      font-family: "primal";
      font-weight: normal;
      font-size: 120px;
      margin: 0;
      transition: top 0.4s ease;
      will-change: top;
    }
    
    :host(.visible) h1 {
      top: 165px;
    }
    
    h1 ::slotted(img) {
      width: 1300px;
      margin-left: 40px;
    }


    ::slotted(roadmap-bubbles) {
      position: absolute;
      top: 900px;
    }

    .tip {
      position: absolute;
      top: 1600px;
      width: 100%;
      text-align: center;
      font-size: 100px;
      color: #666;
      opacity: 0;
      transition: opacity 0.4s ease-in-out;
    }
    
    :host(.visible) .tip {
      opacity: 1;
    }
  </style>
  <h1>
    <slot name="title"></slot>
    <br>
    <span> GAme ROAdmAp </span>
  </h1>
  <slot name="bubbles"></slot>
  <span class="tip"> TAP ANY GAME </span>
`;

class RoadmapOverview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }

  connectedCallback() {
  }
  
  get bubbles() {
    let b = this.querySelector('[slot=bubbles]');
    return b;
  }
  
  show() {
    this.classList.add('visible');
    this.bubbles && this.bubbles.showBubbles();
  }
  
  quickShow() {
    this.classList.add('visible');
    this.bubbles && this.bubbles.quickShow();
  }
  
  hide() {
    this.classList.remove('visible');
    this.bubbles && this.bubbles.hideBubbles();
  }
}

customElements.define('roadmap-overview', RoadmapOverview);
