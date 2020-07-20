/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\home-page.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 2nd April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Last Modified: Thursday, 24th June 2020
 * | Modified By: Alban Shahaj (shahaal)
 * | -----------------------------------------------------------------  
 * | Copyright (c) 2020 European Food Safety Authority (EFSA)
 * |                                                                    
 * *********************************************************************
 */



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
      facetData: {
        type: Object
      },
      text: {
        type: String
      },
      loggedIn: {
        type: Boolean
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
    this.facetData = null;
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
        <wc-facets-viewer class="raw-item" .data="${this.facetData}" @fcs="${(e) => (this.updateFacets(e))}"></wc-facets-viewer>
      
        <!-- component for showing overview of user interaction -->
        <wc-overview class="flex-item" .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></wc-overview>
      

        <!-- component for showing the foodex2 code -->
        <wc-code-viewer class="raw-item" .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></wc-code-viewer>
      
        ${this.loggedIn
        ? html`
            <!-- component for activating feedback section -->
            <wc-feedback-dialog class="raw-item" .dftDesc="${this.text}"></wc-feedback-dialog>
          `
        : ``}
      </div>
      `
  }

  /**
     * Listen for property changes
     * @param {*} changedProperties 
     */
  updated(changedProperties) {

    var newSelBt = changedProperties.has('selectedBt');
    var newSelFcs = changedProperties.has('selectedFcs');

    // if new data update categories and selected facets
    if (newSelBt || newSelFcs) {
      const index = this.selectedFcs.findIndex(f => f.code === this.selectedBt.code);
      if (index > -1) {
        alert("It is not possible to have the selected baseterm as facet! Please unselect the facet or change baseterm.")
        this.selectedFcs.splice(index, 1);
      }
    }

    return newSelBt || newSelFcs;
  }

  /**
   * Update the properties based on the new response
   * @param {*} event 
   */
  updateData(event) {
    var res = event.detail.res;
    this.baseterms = res[0].baseterm;
    this.facetData = res[1].facets;
    this.text = event.detail.text;
    this.selectedBt = null;
    this.selectedFcs = [];
  }

  /**
   * Update the selected baseterm
   * @param {*} event 
   */
  updateBaseterm(event) {
    this.selectedBt = event.detail.selectedBt;
  }

  /**
   * Update the list of selected facets
   * @param {*} event 
   */
  updateFacets(event) {
    this.selectedFcs = event.detail.selectedFcs.slice(0);
  }
}

customElements.define("home-page", HomePage)