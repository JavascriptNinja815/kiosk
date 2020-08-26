let markup = `
  <style>
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
      z-index: 9999;
    }
  
    ::slotted(:not(:last-of-type)) {
      margin-right: 15px;
    }
    
    button {
      position: absolute;
      bottom: 0;
      font-size: 150px;
      padding: 15px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
      background: none;
      border: 0;
      outline: none;
      color: dimgrey;
      padding: 0 25px;
    }
    
    :host(.visible) .visible {
      opacity: 1;
      pointer-events: auto;
    }
    
    #left {
      left: 0;
    }
    
    #right {
      right: 0;
    }
  </style>
  <button id="left"> &lsaquo; </button>
  <slot></slot>
  <button id="right"> &rsaquo; </button>
`;

class RoadmapPips extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = markup;
  }

  connectedCallback() {
    let nav = this;
    
    let observer = new MutationObserver((mutationList, observer) => {
      for (let mutation of mutationList) {
        if (mutation.type == 'childList') {
          for (let node of mutation.addedNodes) {
            attachActivator(node);
          }
        }
      }
    });
    
    observer.observe(nav, {
      attributes : false,
      childList : true,
      subtree : false
    });
    
    function attachActivator(node) {
      let i = nav.pips.indexOf(node);
      node.addEventListener('click', event => {
        nav.activate(i);
      });
    }
    
    nav.buttons = {
      left : this.shadowRoot.querySelector('button#left'),
      right : this.shadowRoot.querySelector('button#right')
    };
    
    nav.buttons.left.addEventListener('click', event => {
      this.dispatchEvent(new CustomEvent('prev'));
    });
    
    nav.buttons.right.addEventListener('click', event => {
      this.dispatchEvent(new CustomEvent('next'));
    });
  }
  
  get pips() {
    return Array.from(this.children);
  }
  
  get active() {
    return this.querySelector('.active');
  }
  
  get index() {
    if (this.active) {
      return this.pips.indexOf(this.active);
    } else {
      return 0;
    }
  }
  
  get lastIndex() {
    return this.pips.length - 1;
  }
  
  dim() {
    this.pips.forEach(p => {
      p.classList.remove('active');
    });
  }
  
  activate(i) {
    this.dim();
    setTimeout(function(){
      if (!this.pips[i]) { console.warn('not found', this.pips[i]); return; }
      this.pips[i].classList.add('active');
      this.update();
    }.bind(this), 40);
  }
  
  update() {
    if (this.index > 0) {
      this.buttons.left.classList.add('visible');
    } else {
      this.buttons.left.classList.remove('visible');
    }
    
    if (this.index < this.pips.length-1) {
      this.buttons.right.classList.add('visible');
    } else {
      this.buttons.right.classList.remove('visible');
    }
  }
  
  prev() {
    let i = this.index-1;
    if (i >= 0) {
      this.activate(i);
    }
  }
  
  next() {
    if (this.running) return;
    let i = this.index+1;
    if (i <= this.lastIndex) {
      this.activate(i);
    }
  }
}

customElements.define('roadmap-pips', RoadmapPips);
