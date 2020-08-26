let content = `
  <style>
    :host {
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
      transition-property: opacity;
      transition-duration: 0.4s;
      transition-timing-function: ease;
      opacity: 0;
      pointer-events: none;
    }
    
    :host(.visible) {
      opacity: 1;
      pointer-events: auto;
    }
    
    main {
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
    }
  </style>
  <main>
    <slot></slot>
  </main>
`;

class RoadmapView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    this.delay = parseFloat(getComputedStyle(this).getPropertyValue('transition-duration')) * 1000;
  }
  
  show() {
    this.classList.add('visible');
    if (
      this.firstChild &&
      typeof this.firstChild.show == 'function'
    ) {
      this.firstChild.show();
    }
  }
  
  hide() {
    this.classList.add('hiding');
    setTimeout(function(){
      this.classList.remove('visible');
      this.classList.remove('hiding');
    }.bind(this), this.delay);
  }
}

customElements.define('roadmap-view', RoadmapView);
