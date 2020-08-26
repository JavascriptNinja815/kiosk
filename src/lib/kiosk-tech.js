let content = `
  <style>
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    :host([hidden]) { display: none; }

    main {
      position: absolute;
      top: 500px;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
    }
    
    ::slotted(h1[slot=title]) {
      position: relative;
      margin-top: 100px;
    }
    
    ::slotted([slot=schematic]) {
      max-height: 1090px;
    }
    
    table {
      font-size: 48px;
      width: 900px;
      margin-right: 100px;
      font-family: "proxima nova semibold";
      border: 0;
      border-collapse: collapse;
    }
    
    th {
      text-align: center;
      font-family: "primal";
      font-weight: normal;
      padding-bottom: 0.5em;
    }
    
    td:first-child {
      text-align: left;
    }
    
    td:last-child {
      text-align: right;
    }
    
    td {
      padding-top: 25px;
      border-bottom: 4px dotted black;
    }
    
    tr.mid th {
      padding-top: 64px;
    }
  </style>
  <slot name="title"></slot>
  <main>
    <table>
      <tr> <th colspan="2"> UNIT DIMeNSIONS </th> </tr>
      
      <tr class="htop">
        <td> Height with topper </td>
        <td> <output name="height-topper"></output> </td>
      </tr>
      
      <tr>
        <td> Height </td>
        <td> <output name="height"></output> </td>
      </tr>
      
      <tr>
        <td> Width </td>
        <td> <output name="width"></output> </td>
      </tr>
      
      <tr>
        <td> Base height</td>
        <td> <output name="height-base"></output> </td>
      </tr>
      
      <tr>
        <td> Betting deck height </td>
        <td> <output name="height-deck"></output> </td>
      </tr>
      
      <tr>
        <td> Betting deck depth </td>
        <td> <output name="depth-deck"></output> </td>
      </tr>
      
      <tr>
        <td> Base depth </td>
        <td> <output name="depth-base"></output> </td>
      </tr>

      <tr class="mid"> <th colspan="2"> POWeR ReQUIReMeNTS </th> </tr>
      
      <tr>
        <td> Cabinet </td>
        <td> <output name="pwr-cabinet">X</output> </td>
      </tr>
      
      <tr>
        <td> Display Top </td>
        <td> <output name="pwr-top">Y</output> </td>
      </tr>
      
      <tr>
        <td> End Caps </td>
        <td> <output name="pwr-caps">Z</output> </td>
      </tr>
      
      <tr>
        <td> Filler </td>
        <td> <output name="pwr-filler">Z</output> </td>
      </tr>
    </table>
    <slot name="schematic"></slot>
  </main>
`;

class KioskTech extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    let specs;
    
    try { specs = JSON.parse(this.dataset.specs); }
    catch (e) { }
    
    if (specs) {
      let table = this.shadowRoot.querySelector('table');
      if (!specs.hasOwnProperty('height-topper')) {
        let ht = table.querySelector('tr.htop');
        ht.parentNode.removeChild(ht);
      }
      table.querySelectorAll('output').forEach(o => {
        if (specs[o.name]) {
          o.value = specs[o.name];
        }
      });
    }
  }
}

customElements.define('kiosk-tech', KioskTech);
