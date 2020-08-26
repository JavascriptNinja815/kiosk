let content = `
  <style>
    :host {
      display: block;
      position: fixed;
      left: 0;
      right: 240px;
      bottom: 0;
      height: 240px;
      margin: 0;
      background: #d5000d;
      z-index: 9999;
      box-shadow: inset 0 20px 30px -20px rgba(0,0,0,0.4);
    }
    
    :host([hidden]) {
      display: none;
    }
    
    #start {
      display: block;
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      border: 0;
      border-radius: 50%;
      height: 500px;
      width: 500px;
      background: url(sprites/brushed-circle.png);
      background-size: contain;
      transition: all 0.3s ease;
      text-shadow: 0 0 10px white;
      animation: shadow-pulse 3s infinite;
    }
    
    #start button {
      background: red;
      color: gainsboro;
      border: 0;
      border-radius: 50%;
      width: 400px;
      height: 400px;
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      box-shadow: inset 0 0 30px  rgba(0,0,0,0.7);
      outline: none;
    }
    
    @keyframes shadow-pulse {
      0% {
        box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.5);
      }
      50% {
        box-shadow: 0 0 100px 50px rgba(255, 255, 255, 1);
      }
      100% {
        box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.5);
      }
    }
    
    @keyframes filter-pulse {
      0% {
        filter: drop-shadow(0 0 0 white);
      }
      50% {
        filter: drop-shadow(0 0 30px white);
      }
      100% {
        filter: drop-shadow(0 0 0 white);
      }
    }
    
    #start button img {
      animation: filter-pulse 3s infinite;
      transform: translateY(-30px);
    }
    
    #start button:hover {
      text-shadow:
        -3px -3px 5px rgba(255,255,255,0.9),
        -3px 3px 5px rgba(255,255,255,0.9),
        3px -3px 5px rgba(255,255,255,0.9),
        3px 3px 5px rgba(255,255,255,0.9);
    }
    
    h2 {
      position: absolute;
      margin: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 100px;
      letter-spacing: 10px;
    }

    h2:first-of-type {
      left: 400px;
    }
    
    h2:last-of-type {
      right: 400px;
    }
  </style>
  <h2> TAP TO EXPLORE! </h2>
  <div id="start">
    <button>
      <img src="sprites/icon-touch-white.png">
    </button>
  </div>
  <h2> TAP TO EXPLORE! </h2>
`;

class KioskBegin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    let timer;
    let cta = document.querySelector('kiosk-cta');
    
    this.addEventListener('click', event => {
      clearTimeout(timer);
      cta.classList.add('visible');
      timer = setTimeout(() => {
        cta.classList.remove('visible');
      }, 5000);
    });
  }
}

customElements.define('kiosk-begin', KioskBegin);
