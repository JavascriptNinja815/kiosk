let content = `
  <style>
    :host {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-items: flex-end;
      position: fixed;
      top: 270px;
      right: -120%;
      height: 240px;
      width: auto;
      margin: 0;
      background: #d5000d;
      box-shadow: 0 0 30px 0 rgba(0,0,0,0.8);
      border: 0;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      color: white;
      padding: 0 50px;
      opacity: 1;
      pointer-events: none;
      transition: right 0.4s ease;
      animation: shadow-pulse 3s infinite;
    }
    
    :host(.visible) {
      right: 240px;
      opacity: 1;
      pointer-events: all;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    span {
      font-family: "proxima nova bold";
      margin-right: 50px;
      font-size: 50px;
      text-align: center;
    }
    
    img {}
    
    @keyframes shadow-pulse {
      0% {
        box-shadow: 0 0 30px 0 rgba(0,0,0,0.8);
      }
      50% {
        box-shadow: 0 0 100px 50px rgba(255, 255, 255, 1);
      }
      100% {
        box-shadow: 0 0 30px 0 rgba(0,0,0,0.8);
      }
    }
  </style>
  <span> START <br> HERE! </span>
  <img src="sprites/icon-arrows.png">
`;

class KioskCTA extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
  }
}

customElements.define('kiosk-cta', KioskCTA);
