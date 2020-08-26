let content = `
  <style>
    :host {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
      align-items: center;
      align-content: center;
      justify-items: center;
    }
    
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
  <slot></slot>
`;

class RoadmapSplit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }

  connectedCallback() {
  }
}

customElements.define('roadmap-split', RoadmapSplit);
