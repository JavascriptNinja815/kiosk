let content = `
  <style>
    :host {
      font-size: 150px;
      user-select: none;
      color: dimgrey;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    :host(.active) span {
      color: red;
      animation: shadow-pulse 3s infinite;
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
  </style>
  <span>&#x25cf;</span>
`;

class RoadmapPip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
  }
}

customElements.define('roadmap-pip', RoadmapPip);
