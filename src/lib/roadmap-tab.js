let content = `
  <style>
    :host {
      position: relative;
      display: grid;
      grid-template-rows  : 1fr;
      align-items: center;
      align-content: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      //font-size: 75px;
      font-size: 120px;
      text-decoration: none;
      //text-transform: uppercase;
      font-weight: normal;
      text-shadow: 0 0 10px rgba(0,0,0,0.5);
      cursor: pointer;
      transition: all 0.7s ease;
      transition-property: background, color;
      box-shadow: inset 0 20px 30px -20px rgba(0,0,0,0.4);
    }
    
    ::slotted(img) {
      height: 225px;
      filter: none;
    }
    
    ::slotted(img):not(.active) {
      filter: grayscale(1);
    }
    
    :host(.active) {
      background: var(--active-tab-color);
      z-index: 9999;
      color: white;
      cursor: default;
    }
    
    :host(:not(.active):hover) {
//      color: red;
    }
    
    :host(:not(:last-of-type)) {
      border-right: 1px solid black;
    }
    
    :host(:not(.active)) {
      //border-top: 1px solid black;
      background: #999999;
    }
    
    :host(:after) {
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
    
    :host(:not(.active):after) {
      background: rgba(0,0,0,0.4);
      box-shadow: 0 1rem 2rem -1rem inset rgba(0,0,0,0.5);
      z-index: 10;
    }
  </style>
  <slot></slot>
`;

class RoadmapTab extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
  }
}

customElements.define('roadmap-tab', RoadmapTab);
