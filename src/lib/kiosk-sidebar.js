let content = `
  <style>
    :host {
      display: block;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 240px;
      height: 100%;
      margin: 0;
      background-image: url(sprites/brushed-sidebar.png);
      background-position: center center;
      background-size: 100%;
      background-repeat: repeat-y;
      box-shadow: inset 20px 0 30px -20px rgba(0,0,0,1);
      font-family: "proxima nova bold";
    }
    
    :host([hidden]) {
      display: none;
    }
    
    nav {
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      align-content: center;
      justify-content: flex-start;
    }
    
    nav a {
      width: 100%;
      padding: 40px 0;
      text-align: center;
      color: #6d6d6d;
      text-shadow: 1px 1px white, -1px -1px #444;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
      transition-property: background;
      transition-timing-function: ease;
      transition-duration: 0.4s;
    }
    
    nav a.active {
      background: rgba(255,255,255,0.5);
      border-top: 2px solid #444;
      border-bottom: 2px solid white;
    }
    
    nav a img {
      filter:
        drop-shadow(0px 2px 0px white)
        drop-shadow(0px -2px 0px #444);
    }
    
    #sidebar-back {
      margin-top: auto;
      transition-property: background, opacity;
      opacity: 1;
    }
    
    #sidebar-back.hidden {
      opacity: 0;
      pointer-events: none;
    }
  </style>
  <nav>
    <a id="sidebar-home"> <img src="sprites/icon-home.png" alt=""> <br> HOME </a>
    <a id="sidebar-roadmap"> <img src="sprites/icon-roadmap.png" alt=""> <br> ROADMAP </a>
    <a id="sidebar-merch"> <img src="sprites/icon-merch.png" alt=""> <br> MERCH </a>
    <a id="sidebar-tech"> <img src="sprites/icon-technical.png" alt=""> <br> TECHNICAL </a>
    <a id="sidebar-back" class="hidden"> <img src="sprites/icon-back.png" alt=""> <br> BACK </a>
  </nav>
`;

class KioskSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    let sidebar = this;
  
    let pause;
  
    let buttons = {
      home : this.shadowRoot.getElementById('sidebar-home'),
      roadmap : this.shadowRoot.getElementById('sidebar-roadmap'),
      merch :this.shadowRoot.getElementById('sidebar-merch'),
      tech : this.shadowRoot.getElementById('sidebar-tech'),
      back : this.shadowRoot.getElementById('sidebar-back')
    };
    
    sidebar.buttons = buttons;
    
    let pages = {
      splash : document.getElementById('splash'),
      roadmap : document.getElementById('roadmap'),
      merch :document.getElementById('merch'),
      tech : document.getElementById('tech')
    };
    
    let bubbles = pages.roadmap.querySelector('kiosk-roadmap');
    
    let wait = parseFloat(getComputedStyle(pages.splash).getPropertyValue('transition-duration')) * 1000;
    
    function removeHighlight() {
      for (let b in buttons) {
        buttons[b].classList.remove('active');
      }
    }
    
    function resetZoom() {
      let zoomable = document.querySelectorAll('img[slot=zoomable]');
      zoomable.forEach(z => {
        if (z.zoomController) {
          z.zoomController.reset(true);
        }
      });
    }
    
    let onHome = true;
    
    function hideAll() {
      onHome = false;
      clearTimeout(pause);
      removeHighlight();
      for (let p in pages) {
        pages[p].classList.add('hidden');
      }
      hideRoadmap();
      resetMerch();
      resetTech();
      resetZoom();
      sidebar.hideBack();
    }
    
    buttons.home.classList.add('active');
    
    function showHome() {
      if (onHome == true) { return; }
      pages.splash.querySelector('kiosk-splash').resetState();
      hideAll();
      buttons.home.classList.add('active');
      onHome = true;
      
      pause = setTimeout(()=>{
        pages.splash.classList.remove('hidden');
      }, wait);
    }
    
    function showRoadmap() {
      requestAnimationFrame(function() {
        pages.splash.querySelector('kiosk-splash').stop();
        hideAll();
        buttons.roadmap.classList.add('active');
          pages.roadmap.classList.remove('hidden');
          pages.roadmap.querySelector('kiosk-roadmap').showIntro();
      });
    }
    
    this.hideAll = hideAll;
    this.showRoadmap = showRoadmap;
    
    function showMerch() {
      pages.splash.querySelector('kiosk-splash').stop();
      hideAll();
      buttons.merch.classList.add('active');
      
      pause = setTimeout(()=>{
        pages.merch.classList.remove('hidden');
      }, wait);
    }
    
    function showTech() {
      pages.splash.querySelector('kiosk-splash').stop();
      hideAll();
      buttons.tech.classList.add('active');

      pause = setTimeout(()=>{
        pages.tech.classList.remove('hidden');
        setTimeout(function(){
          pages.tech.querySelector('roadmap-split-left').show();
          pages.tech.querySelector('roadmap-split-right').show();
        }, wait);
      }, wait);
    }    
    
    function hideRoadmap() {
      let r = pages.roadmap.querySelector('kiosk-roadmap');
      r.hideViews();
      r.hideTabs();
      r.hideNavs();
    }
    
    function hideRoadmapDetails() {
      let allGames = document.querySelectorAll('kiosk-game');
      Array.from(allGames).forEach(g => {
        g.classList.remove('active');
      });
    }
    
    function resetMerch() {
      let delay = parseFloat(getComputedStyle(document.getElementById('merch')).getPropertyValue('transition-duration')) * 1000;
      
      setTimeout(function(){
        let allMerch = document.querySelectorAll('#merch kiosk-slider');
        Array.from(allMerch).forEach(m => {
          m.show(0);
        });
        
        let merchTabs = document.querySelector('#merch kiosk-tabs');
        merchTabs.show(0);
      }, delay);
    }
    
    function hideTechOverview() {
      pages.tech.querySelector('roadmap-split-left').hide();
      pages.tech.querySelector('roadmap-split-right').hide();
    }
    
    function resetTech() {
      hideTechOverview();
      document.getElementById('tech-49').classList.add('hidden');
      document.getElementById('tech-27').classList.add('hidden');
      let delay = parseFloat(getComputedStyle(document.getElementById('tech')).getPropertyValue('transition-duration')) * 1000;
      setTimeout(function(){
        let techTabs = document.querySelectorAll('#tech-49 kiosk-tabs, #tech-27 kiosk-tabs');
        techTabs.forEach(t => { t.show(0); });
      }, delay);
    }
    
    function goBack() {
      sidebar.hideBack();
      showTech();
    }
    
    buttons.home.addEventListener('click', showHome);
    buttons.roadmap.addEventListener('click', showRoadmap);
    buttons.merch.addEventListener('click', showMerch);
    buttons.tech.addEventListener('click', showTech);
    buttons.back.addEventListener('click', goBack);
    
    let timeout = 1000 * 60 * 5;
    let autoReset = setInterval(showHome, timeout);
    
    document.body.addEventListener('click', event => {
      clearInterval(autoReset);
      autoReset = setInterval(showHome, timeout);
    });
    
    let cta = document.querySelector('kiosk-cta');
    cta.addEventListener('click', showRoadmap);
  }
  
  showBack() {
    this.shadowRoot.querySelector('#sidebar-back').classList.remove('hidden');
  }
  
  hideBack() {
    this.shadowRoot.querySelector('#sidebar-back').classList.add('hidden');
  }
}

customElements.define('kiosk-sidebar', KioskSidebar);
