let content = `
  <style>
    :host {
      --icons-count: 1;
      display: block;
      transform: transale3d(0,0,0);
    }
    
    :host([hidden]) {
      display: none;
    }
    
    main {
      transform-origin: center;
      transform: scale(0);
      transition: transform 0.5s ease;
      display: grid;
      grid-template-areas: "a b";
      align-items: center;
      align-content: center;
      justify-items: center;
      height: 250px;
      width: 250px;
      will-change: transform;
    }
    
    main > img:nth-of-type(1) {
      grid-area: a;
    }
    
    main > img:nth-of-type(2) {
      grid-area: b;
    }
    
    main > img:nth-of-type(3) {
      grid-area: c;
    }
    
    main > img:nth-of-type(4) {
      grid-area: d;
    }
    
    main > img:nth-of-type(5) {
      grid-area: e;
    }
    
    main > img:nth-of-type(6) {
      grid-area: f;
    }
    
    main > img:nth-of-type(7) {
      grid-area: g;
    }
    
    main > img:nth-of-type(8) {
      grid-area: h;
    }
    
    
    main > img:nth-of-type(odd) {
      justify-self: flex-end;
    }
    
    main img:nth-of-type(even) {
      justify-self: flex-start;
    }
    
    /* 1 ICON */

    :host([data-count="1"]) main {
      grid-template-areas: "a";
    }
    
    :host([data-count="1"]) main > img:nth-of-type(1) {
      justify-self: center;
    }
    
    /* 2 ICONS */
    
    :host([data-count="2"]) main {
      grid-template-areas: "a b"; 
    }
    
    /* 3 ICONS */
    
    :host([data-count="3"]) main {
      padding-top: 15px;
      grid-template-areas: "a b" "c c"; 
    }
    
    :host([data-count="3"]) main > img:nth-of-type(3) {
      margin-top: 25px;
      justify-self: center;
    }
    
    /* 4 ICONS */
    
    :host([data-count="4"]) main {
      grid-template-areas: "a b" "c d";
    }
    
    :host([data-count="4"].special) main {
      grid-template-areas:
        "a a b b"
        ". c c ."
        ". d d .";
    }
    
    :host([data-count="4"].special) main > img {
      padding-top: 25px;
    }
    
    :host([data-count="4"].special) main > img:nth-of-type(1),
    :host([data-count="4"].special) main > img:nth-of-type(2) {
      padding-top: 60px;
    }
    
    :host([data-count="4"].special) main > img:nth-of-type(3),
    :host([data-count="4"].special) main > img:nth-of-type(4) {
      justify-self: center;
    }
    
    /* 5 ICONS */

    :host([data-count="5"]) main {
      grid-template-areas:
        "a a a b b b"
        "c c c d d d"
        ". e e e e .";
    }
    
    :host([data-count="5"]) main > img:nth-of-type(5) {
      justify-self: center;
    }
    
    /* 6 ICONS */
    
    :host([data-count="6"]) main {
      grid-template-areas:
        "a a a b b b"
        "c c c d d d"
        "e e e f f f";
    }
    
    /* 7 ICONS */
    
    :host([data-count="7"]) main {
      grid-template-areas:
        "a a a b b b"
        "c c c d d d"
        "e e e f f f"
        ". g g g g .";
    }
    
    :host([data-count="5"]) main > img:nth-of-type(7) {
      justify-self: center;
    }

    /* 8 ICONS */

    :host([data-count="8"]) main {
      padding-top: 15px;
      grid-template-areas:
        "a a c c b b"
        "d d d e e e"
        "f f f g g g"
        ". h h h h .";
    }
    
    :host([data-count="8"]) main > img:nth-of-type(1),
    :host([data-count="8"]) main > img:nth-of-type(4),
    :host([data-count="8"]) main > img:nth-of-type(6) {
      justify-self: flex-end;
    }
    
    :host([data-count="8"]) main > img:nth-of-type(3),
    :host([data-count="8"]) main > img:nth-of-type(8) {
      justify-self: center;
    }
    
    :host([data-count="8"]) main > img:nth-of-type(2),
    :host([data-count="8"]) main > img:nth-of-type(5),
    :host([data-count="8"]) main > img:nth-of-type(7) {
      justify-self: flex-start;
    }
    
    div.circle {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    
    div.circle img {
      width: 100%;
      filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
    }
    
    :host(.visible) main {
      animation: spring-in-main 1s 1;
      animation-fill-mode: forwards;
    }
    
    :host(.hiding) main {
      animation: spring-out-main 1s 1;
      animation-fill-mode: forwards;
    }
    
    main h1 {
      position: absolute;
      margin: 0;
      top: 25px;
      width: 100%;
      text-align: center;
      font-family: "primal";
      font-size: 40px;
      font-weight: normal;
      color: #555;
      filter:
        drop-shadow(0px 2px 0px white)
        drop-shadow(0px -2px 0px #444);
    }
    
    main ::slotted(*) {
      display: none;
    }
    
    main > img  {
      display: block;
      max-width: 100px;
      padding: 5px;
      will-change: transform;
      transform-origin: center;
      transform: scale(0);
      justify-self: center;
    }
    
    :host([data-count="8"]) main > img {
      padding: 2px;
      max-width: 62px;
    }

    :host([data-count="8"]) main > img:nth-of-type(1),
    :host([data-count="8"]) main > img:nth-of-type(2),
    :host([data-count="8"]) main > img:nth-of-type(3) {
      padding-top: 20px;
    }
    
    :host([data-count="8"]) main > img:nth-of-type(4),
    :host([data-count="8"]) main > img:nth-of-type(5),
    :host([data-count="8"]) main > img:nth-of-type(6),
    :host([data-count="8"]) main > img:nth-of-type(7) {
      max-width: 85px;
    }
    
    :host([data-count="8"]) main > img:nth-of-type(8) {
      max-width: 100px;
    }
    
    main > img.visible {
      animation: spring-in-logo 1s 1;
      animation-fill-mode: forwards;
    }
    
    main > img.hiding {
      animation: spring-out-logo 1s 1;
      animation-fill-mode: forwards;
    }
    
    @keyframes spring-in-main {
      0% {
        transform: scale(0);
      }
      70% {
        transform: scale(3.2);
      }
      100% {
        transform: scale(3);
      }
    }
    
    @keyframes spring-out-main {
      0% {
        transform: scale(3);
      }
      100% {
        transform: scale(0);
      }
    }
    
    @keyframes spring-in-logo {
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

    @keyframes spring-out-logo {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(0);
      }
    }
  </style>
  <main>
    <div class="circle">
      <img src="sprites/roadmap-circle.png">
    </div>
    <h1></h1>
    <!--slot></slot-->
    
  </main>
`;

class RoadmapBubble extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    this.main = this.shadowRoot.querySelector('main');
    this.main.querySelector('h1').innerHTML = (this.dataset.title) ? this.dataset.title : '';
    
    let widget = this;
    this.increment = 100;
    this.running = false;
    
    let observer = new MutationObserver((mutationList, observer) => {
      for (let mutation of mutationList) {
        if (mutation.type == 'childList') { widget.render(); }
      }
    });
    
    observer.observe(widget, {
      attributes : false,
      childList : true,
      subtree : false
    });
    
    widget.render();
  }
  
  get logos() {
    return this.shadowRoot.querySelectorAll('main > img');
  }
  
  render() {
    let logos = this.querySelectorAll('img');
    let f = document.createDocumentFragment();
    logos.forEach(l => {
      f.append(l);
    });
    this.main.append(f);
    this.hide();
    this.dataset.count = this.logos.length;
    this.style.setProperty('--icons-count', this.logos.length);
  }
  
  show() {
    this.classList.add('visible');
    
    let delay = 0;
    let inc = this.increment;
    let i = 0;
    
    let nextLogo = function() {
      let l = this.logos[i];
      if (!l) { return; }
      l.classList.add('visible');
      delay = inc;
      this.running = setTimeout(nextLogo, delay);
      i++;
    }.bind(this);
    
    nextLogo();
  }
  
  quick() {
    this.classList.add('visible');
    this.logos.forEach(l => {
      l.classList.add('visible');
    });
  }
  
  hide() {
    clearTimeout(this.running);
    
    if (!this.classList.contains('visible')) { return; }
    
    this.classList.remove('visible');
    this.classList.add('hiding');
    
    setTimeout(()=>{
      this.classList.remove('hiding');
      this.logos.forEach(l => {
        l.classList.remove('visible');
      });
    }, 350);
  }
  
  toggle() {
    if (this.classList.contains('visible')) {
      this.hide();
    } else {
      this.show();
    }
  }
}

customElements.define('roadmap-bubble', RoadmapBubble);
