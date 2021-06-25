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
 * | Copyright (c) 2021 European Food Safety Authority (EFSA)
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
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';
import '@polymer/paper-input/paper-input.js';

class SettingsPage extends LitElement {

    static get properties() {
        return {
            lang: {
                type: String
            },
            thld: {
                type: Number
            },
            smartAcc: {
                type: String
            },
            autoSelBt: {
                type: String
            },
            autoSelFcs: {
                type: String
            }
        }
    }

    static get styles() {
        return css`
            .thd-input {
                width: auto;
                text-align: right;
            }

            .toggle-left-label {
                position: absolute;
                width: 70px;
                text-align: center;
                right: 4em; /* Based on a relatively safe render width of the toggle button */
            }
        `;
    }

    constructor() {
        super();

        if (localStorage.getItem("lang") === null)
            localStorage.setItem("lang", "en");
        this.lang = localStorage.getItem('lang');
        if (localStorage.getItem("thld") === null)
            localStorage.setItem("thld", 5);
        this.thld = localStorage.getItem('thld');
        if (localStorage.getItem("smartAcc") === null)
            localStorage.setItem("smartAcc", "true");
        this.smartAcc = localStorage.getItem('smartAcc');
        if (localStorage.getItem("autoSelBt") === null)
            localStorage.setItem("autoSelBt", "true");
        this.autoSelBt = localStorage.getItem('autoSelBt');
        if (localStorage.getItem("autoSelFcs") === null)
            localStorage.setItem("autoSelFcs", "true");
        this.autoSelFcs = localStorage.getItem('autoSelFcs');
    }

    render() {
        const languages = {
            "hr": "Croatian", "cs": "Czech", "da": "Danish", "nl": "Dutch",
            "en": "English", "fi": "Finnish", "fr": "French", "de": "German",
            "el": "Greek", "hu": "Hungarian", "it": "Italian", "nb": "Norwegian",
            "pt": "Portuguese", "es": "Spanish", "sv": "Swedish"
        };

        return html`
        <paper-listbox>

            <paper-item>
                <paper-item-body two-line>
                    <div>Language</div>
                    <div secondary>System language</div>
                </paper-item-body>
                <paper-dropdown-menu-light noink no-animations>
                    <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="${this.lang}" @click="${(e) => this.updateValue(e.target.id, e.target.getAttribute("value"))}">
                        ${Object.entries(languages).map(([val, label]) => {
            return html`<paper-item id="lang" value="${val}">${label}</paper-item>`
        })}
                    </paper-listbox>
                </paper-dropdown-menu-light>
            </paper-item>

            <paper-item>
                <paper-item-body two-line>
                    <div>Threshold results (in %)</div>
                    <div secondary>Shows only terms with an accuracy greater than the threshold.</div>
                </paper-item-body>
                <paper-input 
                    id="thld"
                    class="thd-input" 
                    type="number" 
                    label="0.01% to 99.99%" 
                    value="${this.thld}" 
                    min="0.01" 
                    max="99.99" 
                    step="0.01" 
                    @change="${(e) => (e.target.invalid) ? "" : this.updateValue(e.target.id, e.target.value)}"
                    always-float-label
                    auto-validate 
                    validator="${this.handleChange}"
                    error-message="Incorrect value">
                    <div slot="suffix">%</div>
                </paper-input>
            </paper-item>

            <paper-item>
                <paper-item-body two-line>
                    <div>Smart accuracy</div>
                    <div secondary>Adapt the accuracy of each term with text similarity (not applied to categories).</div>
                </paper-item-body>
                <div>
                    <span class="toggle-left-label">${(this.smartAcc === "true") ? "Enabled" : "Disabled"}</span>
                    <paper-toggle-button id="smartAcc" role="toggle" @click="${(e) => this.updateValue(e.target.id, e.target.checked)}" noink invalid ?checked=${(this.smartAcc === "true")}></paper-toggle-button>
                </div>
            </paper-item>

            <paper-item>
                <paper-item-body two-line>
                    <div>Auto select base term</div>
                    <div secondary>Auto select the base term with higher percentage of accuracy</div>
                </paper-item-body>
                <div>
                    <span class="toggle-left-label">${(this.autoSelBt === "true") ? "Enabled" : "Disabled"}</span>
                    <paper-toggle-button id="autoSelBt" role="toggle" @click="${(e) => this.updateValue(e.target.id, e.target.checked)}" noink invalid ?checked=${(this.autoSelBt === "true")}></paper-toggle-button>
                </div>
            </paper-item>

            <paper-item>
                <paper-item-body two-line>
                    <div>Auto select facets</div>
                    <div secondary>Auto select facets having at least 50% of accuracy (applied to both categories and facets)</div>
                </paper-item-body>
                <div>
                    <span class="toggle-left-label">${(this.autoSelFcs === "true") ? "Enabled" : "Disabled"}</span>
                    <paper-toggle-button 
                        id="autoSelFcs"
                        ?disabled="${(this.autoSelBt === "true")}" 
                        role="toggle" @click="${(e) => this.updateValue(e.target.id, e.target.checked)}" 
                        noink 
                        invalid 
                        ?checked=${(this.autoSelFcs === "true")}>
                    </paper-toggle-button>
                </div>
            </paper-item>
            
        </paper-listbox>

        `
    }

    /**
     * Check if input value is within the valid range
     * 
     * @param {*} v 
     */
    handleChange(v) {
        return (v >= 0.01 && v <= 99.99)
    }

    /**
     * update attributes from localStorage
     */
    firstUpdated() {
        Object.entries(localStorage).map(([key, val]) => {
            this.setAttribute(key, val);
        });
    }

    /* Save the new selected setting */
    updateValue(key, val) {
        console.log(key, val);
        // Check browser support
        if (typeof (Storage) !== "undefined") {
            // update property
            this.setAttribute(key, val);
            // Store on browser
            localStorage.setItem(key, val);
        } else {
            alert("Sorry, your browser does not support Web Storage...");
        }
    }
}

customElements.define('settings-page', SettingsPage)