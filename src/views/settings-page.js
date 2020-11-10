/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\settings-page.js
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

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';

class SettingsPage extends LitElement {

    static get properties() {
        return {
            lang: {
                type: String
            },
            acc: {
                type: Number
            },
            btAutoSel: {
                type: String
            },
            fcsAutoSel: {
                type: String
            },
            settingsProp: {
                type: Array
            }
        }
    }

    static get styles() {
        return css`
            .slider-div {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                justify-content: flex-end;
            }
            
            .slider {
                min-width: 200px;
            }

            .custom {
                border: 0;
                outline:0;
                text-align: right;
                font-size: 12px;
                width: 80px;
            }
        `;
    }

    constructor() {
        super();
        // settings properties
        this.settingsProp = ["lang", "acc", "btAutoSel", "fcsAutoSel"];
        
        if (localStorage.getItem("lang") === null)
            localStorage.setItem("lang", "en");
        this.lang = localStorage.getItem('lang');
        if (localStorage.getItem("acc") === null)
            localStorage.setItem("acc", 5);
        this.acc = localStorage.getItem('acc');
        if (localStorage.getItem("btAutoSel") === null)
            localStorage.setItem("btAutoSel", "false");
        this.btAutoSel = localStorage.getItem('btAutoSel');
        if (localStorage.getItem("fcsAutoSel") === null)
            localStorage.setItem("fcsAutoSel", "false");
        this.fcsAutoSel = localStorage.getItem('fcsAutoSel');
    }

    render() {
        return html`
        <paper-listbox>
            <paper-item>
                <paper-item-body two-line>
                    <div>Language</div>
                    <div secondary>System language</div>
                </paper-item-body>
                <paper-dropdown-menu-light noink no-animations>
                    <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="value" selected="${this.lang}">
                        <paper-item value="en" @click="${(e) => this.updateValue(0, e.target.getAttribute("value"))}">English</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu-light>
            </paper-item>
            <paper-item>
                <paper-item-body two-line>
                    <div>Threshold results (in %)</div>
                    <div secondary>Shows only terms with an accuracy percentage higher than the set threshold</div>
                </paper-item-body>
                <div class="slider-div">
                    <div>
                        <input class="custom" type="number" value="${this.acc}" readonly>%</input>
                    </div>
                    <div>
                        <input type="range" class="slider" name="volume" min="0.001" max="99.999" step="0.001" list="tickmarks" value="${this.acc}" @change="${(e) => this.updateValue(1, e.target.value)}">
                            <datalist id="tickmarks">
                                <option value="0.001" label="0.001%"></option>
                                <option value="25" label="25%"></option>
                                <option value="50" label="50%"></option>
                                <option value="75" label="75%"></option>
                                <option value="99.999" label="99.999%"></option>
                            </datalist>
                        </input>
                    </div>
                </div>
            </paper-item>
            <paper-item>
                <paper-item-body two-line>
                    <div>Auto select base term</div>
                    <div secondary>Auto select the base term with higher percentage of accuracy</div>
                </paper-item-body>
                <paper-toggle-button id="toggle" role="toggle" @click="${(e) => this.updateValue(2, e.target.getAttribute("aria-pressed").toString())}" noink invalid ?checked=${(this.btAutoSel === "true")}>
                    ${(this.btAutoSel === "true") ? "Enabled" : "Disabled"}
                </paper-toggle-button>
            </paper-item>
            <paper-item>
                <paper-item-body two-line>
                    <div>Auto select facets</div>
                    <div secondary>Auto select facets having at least 50% of accuracy (applied to both categories and facets)</div>
                </paper-item-body>
                <paper-toggle-button id="toggle" role="toggle" @click="${(e) => this.updateValue(3, e.target.getAttribute("aria-pressed").toString())}" noink invalid ?checked=${(this.fcsAutoSel === "true")}>
                    ${(this.fcsAutoSel === "true") ? "Enabled" : "Disabled"}
                </paper-toggle-button>
            </paper-item>
        </paper-listbox>

        `
    }

    /* Called after the element’s DOM has been updated the first time, immediately before updated is called. */
    firstUpdated() {
        // iterate keys of default array properties
        for (const key of this.settingsProp) {
            // get the item from default object
            let val = localStorage.getItem(key);
            // if a custom value exsists update default one
            if (val != null) {
                this.setAttribute(key, val);
            }
        }
    }

    /* Save the new selected setting */
    updateValue(i, val) {
        // get property by index
        let property = this.settingsProp[i];

        // Check browser support
        if (typeof (Storage) !== "undefined") {
            // update property
            this.setAttribute(property, val);
            // Store on browser
            localStorage.setItem(property, val);
        } else {
            alert("Sorry, your browser does not support Web Storage...");
        }
    }
}

customElements.define('settings-page', SettingsPage)