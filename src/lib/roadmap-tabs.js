let content = `
  <style>
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      background: transparent;
      overflow: hidden;
      --overlay-color: rgba(0,0,0,0.5);
      --overlay-hover-color: black;
      --active-tab-color: #d5000d;
      font-family: sans-serif;
      --tabs-count: 4;
//      font-size: 2em;
    }
    
    :host([hidden]) {
      display: none;
    }
    
    nav {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(var(--tabs-count), 1fr);
      font-family: "primal"
    }
  </style>
  <nav>
    <slot></slot>
  </nav>
`;

class RoadmapTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    let widget = this;
    
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
  
  get tabs() {
    return Array.from(this.children);
  }
  
  render() {
    let tabs = this.tabs;
    this.style.setProperty('--tabs-count', tabs.length);

    function showTab(t) {
      tabs.forEach(tab => { tab.classList.remove('active'); });
      t.classList.add('active');
    }
    
    tabs.forEach(tab => {
      tab.addEventListener('click', event => {
        showTab(tab);
      });
    });
  }
}

customElements.define('roadmap-tabs', RoadmapTabs);
