let content = `
  <style>
    :host {
      display: block;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      align-content: center;
      justify-items: center;
    }
    
    :host([hidden]) {
      display: none;
    }
  </style>
  <slot></slot>
`;

class RoadmapBubbles extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }

  connectedCallback() {
    let widget = this;
    
    this.increment = 200;
    
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
  
  render() {
    let self = this;
    
    this.bubbleRun = null;
    this.bubbles = this.querySelectorAll('roadmap-bubble');
    
    this.bubbles.forEach(b => {
      let title = b.dataset.title;
      let logos = b.querySelectorAll('img');
      logos.forEach(l => {
        l.addEventListener('click', event => {
          clearTimeout(this.bubbleRun);
        });
      });
    });
  }
  
  hideBubbles() {
    clearTimeout(this.bubbleRun);
    this.bubbles.forEach(b => {
      b.hide();
    });
  }
  
  showBubbles() {
    clearTimeout(this.bubbleRun);
    let i = 0;
    let delay = 0;
    let nextBubble = function() {
      if (this.bubbles && this.bubbles[i]) {
        let b = this.bubbles[i];
        b.show();
        i++;
        let l = parseInt(b.dataset.count);
        delay = (b.logos.length * b.increment) + 1000;
        if (i == this.bubbles.length) { return; }
        else { this.bubbleRun = setTimeout(nextBubble, delay); }
      }
    }.bind(this);
    nextBubble();
  }
  
  quickShow() {
    this.bubbles.forEach(b => { b.quick(); });
  }
}

customElements.define('roadmap-bubbles', RoadmapBubbles);
