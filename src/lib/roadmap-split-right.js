let content = `
  <style>
    :host {
      transform: translate3d(0,0,0);
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
    }
    
    :host([hidden]) {
      display: none;
    }
     
    div.circle {
      position: relative;
      width: 1000px;
      height: 1000px;
    }
    
    img.bg {
      margin-top: 50px;
      width: 100%;
      filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
    }
    
    img.cabinet {
      height: 1600px;
      margin-left: 25px;
      margin-right: 100px;
    }
    
    img.logo {
      width: 80%;
    }
    
    div.content {
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      align-content: center;
      justify-items: center;
    }

    div.content :first-child {
      align-self: flex-end;
    }
    
   div.content :last-child {
      align-self: flex-start;
    }
    
    ::slotted(*) {
      margin: 0;
      margin-top: 1em;
      align-self: flex-start;
      text-align: center;
      font-family: proxima nova regular;
      font-size: 80px;
    }
    
    
    .visible {
      animation: spring-in-main 1s 1;
      animation-fill-mode: forwards;
    }
    
    .hiding {
      animation: spring-out-main 1s 1;
      animation-fill-mode: forwards;
    }

    div.circle,
    img.cabinet {
      transform-origin: center;
      transform: scale(0);
      transition: transform 0.5s ease;
    }
    
    @keyframes spring-in-main {
      0% {
        transform: scale(0);
      }
      70% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes spring-out-main {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
  </style>
  <img class="cabinet" src="sprites/split-27.png" alt="">
  <div class="circle">
    <img class="bg" src="sprites/roadmap-circle.png" alt="">
    <div class="content">
      <img class="logo" src="sprites/logo-main-27.png" alt="">
      <slot></slot>
    </div>
  </div>
`;

class RoadmapSplitRight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
    this.visible = false;
  }
  
  connectedCallback() {
  }
  
  get ui() {
    return {
      circle : this.shadowRoot.querySelector('div.circle'),
      cabinet : this.shadowRoot.querySelector('img.cabinet')
    }
  }
  
  show() {
    this.ui.circle.classList.add('visible');
    this.ui.cabinet.classList.add('visible');
    this.visible = true;
  }
  
  hide() {
    this.ui.circle.classList.remove('visible');
    this.ui.cabinet.classList.remove('visible');

    this.ui.circle.classList.add('hiding');
    this.ui.cabinet.classList.add('hiding');
    
    setTimeout(()=>{
      this.ui.circle.classList.remove('hiding');
      this.ui.cabinet.classList.remove('hiding');
    }, 500);
    
    this.visible = false;
  }
  
  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }
}

customElements.define('roadmap-split-right', RoadmapSplitRight);
