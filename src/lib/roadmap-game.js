let content = `
  <style>
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }
    
    :host([hidden]) {
      display: none;
    }

    #logos {
      position: absolute;
      top: -450px;
      left: 100px;
      transition: top 0.4s ease;
      will-change: top;
    }

    :host(.active) #logos {
      top: 100px;
    }

    #logos {
      height: 450px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
    }

    #logos ::slotted(img) {
      max-height: 450px;
      margin-right: 100px;
    }
    
    ::slotted(img[slot=logo1]) {}
    ::slotted(img[slot=logo2]) {}
    
    ::slotted(img[slot=cabinet]) {
      height: 1800px;
    }
    
    @keyframes spring-in {
      0% {
        transform: scale(0);
      }
      70% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes spring-out {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }

    #preview-container {
      position: absolute;
      top: 80px;
      right: 170px;
      transform: scale(0);
      transform-origin: center;
      will-change: transform;
    }

    #preview-container.hiding {
      animation: spring-out 0.8s 1;
      animation-fill-mode: forwards;
    }
  
    #preview-container.active {
      animation: spring-in 0.8s 1;
      animation-fill-mode: forwards;
    }
    
    #content {
      position: absolute;
      top: 625px;
      left: -2700px;
      width: 2700px;
      font-family: "proxima nova semibold";
      transition: left 0.4s ease;
      will-change: left;
    }
    
    :host(.active) #content {
      left: 100px;
    }
    
    ::slotted(p[slot=description]) {
      margin-top: 0;
      margin-bottom: 40px;
      font-size: 72px;
      text-transform: uppercase;
    }
    
    ::slotted(ul[slot=bullets]) {
      margin: 0;
      font-size: 60px;
      columns: 2;
      max-height: 900px;
    }
    
    .hidden {
      opacity: 0;
      transition: opacity 0.4s ease;
      will-change: opacity;
    }
    
    .visible {
      opacity: 1!important;
    }
  </style>
  <main>
    <div id="logos">
      <slot name="logo1"></slot>
      <slot name="logo2"></slot>
    </div>
    <div id="preview-container">
      <slot name="cabinet"></slot>
    </div>
    <div id="content">
      <slot name="description"></slot>
      <slot name="bullets"></slot>
    </div>
  </main>
`;

class RoadmapGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  static get observedAttributes() { return ['class']; }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'class') {
      if (this.animation) { clearTimeout(this.animation); }
      let p = this.shadowRoot.querySelector('#preview-container');
      if (this.classList.contains('active')) {
        this.showBullets();
        this.animation = setTimeout(function(){
          p.classList.add('active');
        }, 100);
      } else {
        p.classList.remove('active');
        p.classList.add('hiding');
        this.hideBullets();
        this.animation = setTimeout(function(){
          p.classList.remove('hiding');
        }, 800);
      }
    }
  }
  
  connectedCallback() {
    this.logo1 = this.querySelector('img[slot=logo1]');
    this.logo2 = this.querySelector('img[slot=logo2]');
  
    this.bullets = this.querySelectorAll('ul[slot=bullets] li');
    
    let doBreak = (this.bullets.length > 1) ? true : false;
    if (!doBreak) {
      let list = this.querySelector('ul[slot=bullets]');
      if (list) { list.style.columns = '1'; }
    }
    
    this.bullets.forEach(b => {
      b.style.opacity = 0;
      b.style.transition = 'opacity 0.4s ease';
    });
    
    this.timer = null;
  }
  
  showBullets() {
    let i = 0;
    function nextBullet() {
      if (
        this.stop === true ||
        !this.bullets[i]
      ) {
        return;
      }
      
      this.bullets[i].style.opacity = '1';
      i++;
      if (i < this.bullets.length) {
        this.timer = setTimeout(nextBullet.bind(this), 300);
      }
    }
    this.timer = setTimeout(nextBullet.bind(this), 300);
  }
  
  hideBullets() {
    clearTimeout(this.timer);
    this.stop = true;
    setTimeout(function(){
      Array.from(this.bullets).forEach(b => {
        b.style.opacity = 0;
      });
      this.stop = false;
    }.bind(this), 300)
  }
  
  show(callback) {
    this.classList.add('active');
    if (callback && callback.call) {
      callback();
    }
  }
  
  hide(callback) {
    this.classList.remove('active');
    if (callback && callback.call) {
      callback();
    }
  }
}

customElements.define('roadmap-game', RoadmapGame);
