import {
  LitElement,
  html,
  css
} from 'lit-element';

export class HomePage extends LitElement {

  static get properties() {
    return {
      selectedBt: {
        type: Object
      },
      selectedFcs: {
        type: Object
      },
      baseterms: {
        type: Object
      },
      facets: {
        type: Object
      },
      text: {
        type: String
      }
    }
  }

  static get styles() {
    return css`
    .flex-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      justify-content: stretch; 
      height: 100%;
    }

    .flex-container > * {
      margin: 5px;
      padding: 5px;
    }
    
    .flex-container > .flex-item {
      flex: 1;
    }
    
    .flex-container > .raw-item {
      height: auto;
    }

    `;
  }

  constructor() {
    super();
    this.baseterms = null;
    this.facets = null;
    this.selectedBt = null;
    this.selectedFcs = new Array();
    this.text = "";
  }

  render() {
    return html`
      <div class="flex-container">
        
        <!-- component for inserting food description and fetching server -->
        <wc-input-field class="raw-item" @data="${(e) => (this.updateData(e))}"></wc-input-field>
  
        <!-- component for showing baseterm -->
        <wc-baseterms-viewer class="raw-item" .baseterms="${this.baseterms}" @bt="${(e) => (this.updateBaseterm(e))}"></wc-baseterms-viewer>
      
        <!-- component for showing facets -->
        <wc-facets-viewer class="raw-item" .categories="${this.facets}" @fcs="${(e) => (this.updateFacets(e))}"></wc-facets-viewer>
      
        <!-- component for showing overview of user interaction -->
        <wc-overview class="flex-item" .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></wc-overview>
      

        <!-- component for showing the foodex2 code -->
        <wc-code-viewer class="raw-item" .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></wc-code-viewer>
      
        <!-- component for manual classification (if requested) -->
        <wc-feedback-dialog class="raw-item" .text="${this.text}"></wc-feedback-dialog>
      
      </div>
      `
  }

  // updated the returned results
  updateData(event) {
    var res = event.detail.res;
    this.baseterms = res[0].baseterm;
    this.facets = res[1].facets;
    this.text = event.detail.text;
  }

  // updated the selected baseterm
  updateBaseterm(event) {
    this.selectedBt = event.detail.selectedBt;
  }

  // updated the selected facets
  updateFacets(event) {
    // re-initilise the array in order to catch the event change
    this.selectedFcs = event.detail.selectedFcs.slice(0);
  }
}

customElements.define("home-page", HomePage)