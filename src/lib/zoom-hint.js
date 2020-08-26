let content = `
  <style>
    :host {
      position: absolute;
      bottom: 540px;
      left: 2500px;
      z-index: 1000;
      pointer-events: none;
      transform: scale(0);
      transform-origin: center;
      //transition: opacity 0.4s ease;
      transition: transform 0.4s ease;
      filter: drop-shadow(6px 6px 10px rgba(0,0,0,0.8));
    }
    
    :host(.visible) {
      //opacity: 1;
      transform: scale(1);
    }
    
    #hint {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
      background: #d5000d;
//      box-shadow: 10px 10px 10px -5px rgba(0,0,0,0.5);
      color: white;
      padding: 50px;
      font-weight: bold;
      border: 0;
      border-radius: 5px;
      z-index: 1;
      font-size: 64px;
    }
    
    #hint img {
      margin-right: 50px;
    }
    
    #hint:before {
	    right: 100%;
	    top: 50%;
	    border: solid transparent;
	    content: " ";
	    height: 0;
	    width: 0;
	    position: absolute;
	    pointer-events: none;
	    border-color: rgba(136, 183, 213, 0);
	    border-right-color: #d5000d;
	    border-width: 50px;
	    margin-top: -50px;
	    z-index: -1;
    }
  </style>
  <div id="hint">
    <img src="sprites/icon-stretch.png">
    <span> STRETCH <br> TO ZOOM </span>
  </div>  
`;

class ZoomHint extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
  }
  
  show() {
    this.classList.add('visible');
    setTimeout(()=>{ this.classList.remove('visible'); }, 400 + 5000);
  }
}

customElements.define('zoom-hint', ZoomHint);


