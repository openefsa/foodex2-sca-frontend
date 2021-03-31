/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\home-page.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 2nd April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
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

import termType from "../asset/picklist/termType.js";
import termDetailLevel from "../asset/picklist/termDetailLevel.js";

import '@polymer/paper-icon-button/paper-icon-button.js';

class Term {
  /**
   * Constructor of term class to show in term information panel
   * 
   * @param {*} obj 
   */
  constructor(obj) {
    this.name = obj.name;
    this.code = obj.code;
    this.termType = obj.termType;
    this.detailLevel = obj.detailLevel;
    var sc = obj.scopeNote.split("£");
    this.scopeNote = sc[0];
    this.links = sc.slice(1);
  }

}

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
      termToShow: {
        type: Object
      },
      desc: {
        type: String
      },
      secondPanel: {
        type: String
      },
      iconName: {
        type: String
      },
      loggedIn: {
        type: Boolean
      }
    }
  }

  static get styles() {
    return css`
    .flexbox {
      display: flex;
      flex-direction: row;
      height: 100%;
    }

    .main-panel {
      display: flex;
      flex-direction: column;
      flex: 2;
      min-width: 200px;
      padding: 5px;
    }

    .info-panel {
      display: flex;
      flex-direction: column;
      flex: 1;
      border-left: 3px solid lightgray;
      background-color: #f2f2f2;
      padding: 5px;
    }

    .component {
      margin: 2px;
    }

    #outer {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .fill {
      flex-grow: 1;
      max-height: 100%;
    }

    .btn {
      float: right;
    }

    paper-icon-button {
      padding: 1px;
      width: 25px;
      height: 25px;
      color: gray;
    }

    fieldset {
      border: 1px solid lightgray;
      border-radius: 4px;
      max-height: 30px;
      height: 35px;
    }

    legend {
      font-size: 13px;
    }

    label {
      white-space: nowrap;
      font-weight: bold;
      font-size: 14px;
    }

    textarea {
      box-sizing: border-box; /* fit parent width */
      height: 100%;
      width: 100%;
      resize: none;
    }

    /* On screens that are 600px wide or less, make the columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
      .flexbox {
        flex-direction: column;
      }

      .info-panel {
        border-top: 3px solid lightgray;
        border-left: none;
        flex-direction: column;
        min-height: 60%;
        padding-bottom: 35px;
      }
    }

    `;
  }

  constructor() {
    super();
    this.baseterms = null;
    this.facetData = null;
    this.termToShow = new Object();
    this.selectedBt = null;
    this.selectedFcs = new Array();
    this.desc = "";
    this.secondPanel = "secondPanel";
    this.iconName = "chevron-left";
  }

  render() {
    return html`
      <div class="flexbox">
        <div class="main-panel">
          
          <!-- div with button which shows term information panel -->
          <div>
            <paper-icon-button class="btn" icon="${this.iconName}" @click="${this.toggleTermInfoPanel}"></paper-icon-button>
          </div>

          <!-- component for inserting food description and fetching server -->
          <input-component class="component" @data="${(e) => (this.updateData(e))}"></input-component>

          <!-- component for showing baseterm -->
          <baseterms-component class="component" .baseterms="${this.baseterms}" @bt="${(e) => (this.updateBaseterm(e))}"></baseterms-component>
        
          <!-- component for showing facets -->
          <facets-component class="component" .bt="${this.selectedBt}" .data="${this.facetData}" @fcs="${(e) => (this.updateFacets(e))}"></facets-component>
        
          <!-- component for showing overview of user interaction -->
          <overview-component class="component fill" .bt="${this.selectedBt}" .fcs="${this.selectedFcs}" @showInfo="${(e) => (this.showInfo(e))}"></overview-component>

          <!-- component for showing the foodex2 code -->
          <code-component class="component" .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></code-component>
        
          ${this.loggedIn
          ? html`
              <!-- component for activating feedback section -->
              <feedback-component class="component" .dftDesc="${this.desc}"></feedback-component>
            `
          : ``}
        </div>
        <div id="${this.secondPanel}" class="info-panel" style="display: none;">
          <div id="outer">
            <h3>Term information</h3>
            <fieldset>
              <legend>Name</legend>
              <label>${this.termToShow.name}</label>
            </fieldset>
            <fieldset>
              <legend>Code</legend>
              <label>${this.termToShow.code}</label>
            </fieldset>
            <fieldset>
              <legend>Type</legend>
              <label>${termType[this.termToShow.termType]}</label>
            </fieldset>
            <fieldset>
              <legend>Level of detail</legend>
              <label>${termDetailLevel[this.termToShow.detailLevel]}</label>
            </fieldset>
            <fieldset class="fill">
              <legend>Scope notes</legend>
              <textarea readonly>${this.termToShow.scopeNote}</textarea>
            </fieldset>
            <fieldset>
              <legend>Links</legend>
              ${(this.termToShow.links && this.termToShow.links.length>0)
                ? Object.values(this.termToShow.links).map(e => html`<label><a href="${e}" target="_blank">${(new URL(e)).hostname}</a></label>  `)
                : html`<label>None</label>`
              }
            </fieldset>
          </div>
        </div>
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
      const index = (this.selectedBt)?this.selectedFcs.findIndex(f => f.code === this.selectedBt.code):-1;
      if (index > -1) {
        alert("It is not possible to have the selected baseterm as facet! Please unselect the facet or change baseterm.")
        this.selectedFcs.splice(index, 1);
        this.selectedBt = null;
      }
    }

    return newSelBt || newSelFcs;
  }

  /**
   * Update the properties based on the new response
   * @param {*} event 
   */
  updateData(event) {
    var res = event.detail;
    this.baseterms = res.bt;
    this.facetData = res.cat;
    this.desc = res.desc.orig;
    this.selectedBt = null;
    this.selectedFcs = [];
    this.termToShow = new Object();
  }

  /**
   * Update the selected baseterm
   * @param {*} event 
   */
  updateBaseterm(event) {
    this.selectedBt = event.detail;
  }

  /**
   * Update the list of selected facets
   * @param {*} event 
   */
  updateFacets(event) {
    this.selectedFcs = event.detail.slice(0);
  }

  /**
   * show hide the term informational panel
   * 
   */
  toggleTermInfoPanel () {
    var x = this.shadowRoot.getElementById(this.secondPanel);
    if (x.style.display === "none") {
        x.style.display = "block";
        this.iconName = "chevron-right";
    } else {
        x.style.display = "none";
        this.iconName = "chevron-left";
    }
  }

  /**
   * show info related to the selected term
   * @param {*} term 
   */
  showInfo(t) {
    var x = this.shadowRoot.getElementById(this.secondPanel);
    // show the term information panel if hidden
    if (x.style.display === "none") {
      this.toggleTermInfoPanel();
    }
    this.termToShow = new Term(t.detail);
  }
}

customElements.define("home-page", HomePage)