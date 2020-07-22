/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\settings-page.js
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

import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-slider/paper-slider.js';
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
            fcAutoSel: {
                type: String
            },
            settingsProp: {
                type: Array
            }
        }
    }

    static get styles() {
        return css`
        div[role="listbox"] {
            border: 1px solid #e5e5e5;
        }
        `;
    }

    constructor() {
        super();
        // settings properties
        this.settingsProp = ["lang", "acc", "btAutoSel", "fcAutoSel"];
        
        if (localStorage.getItem("lang") === null)
            localStorage.setItem("lang", "en");
        this.lang = localStorage.getItem('lang');
        if (localStorage.getItem("acc") === null)
            localStorage.setItem("acc", 5);
        this.acc = localStorage.getItem('acc');
        if (localStorage.getItem("btAutoSel") === null)
            localStorage.setItem("btAutoSel", "true");
        this.btAutoSel = localStorage.getItem('btAutoSel');
        if (localStorage.getItem("fcAutoSel") === null)
            localStorage.setItem("fcAutoSel", "false");
        this.fcAutoSel = localStorage.getItem('fcAutoSel');
    }

    render() {
        return html`
        <div role="listbox">
            <paper-item>
                <paper-item-body two-line>
                    <div>Language</div>
                    <div secondary>Select the language in which you want to get your FoodEx2 suggestions.</div>
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
                    <div secondary>Select the threshold percentage for the suggestions shown (only those with a higher percentage will be displayed).</div>
                </paper-item-body>
                <paper-slider pin min="1" max="99" step="1" value="${this.acc}" @change="${(e) => this.updateValue(1, e.target.value)}" editable></paper-slider>
            </paper-item>
            <paper-item>
                <paper-item-body two-line>
                    <div>Auto select base term</div>
                    <div secondary>Enable the auto selection for the base term with the highest percentage of accuracy (the first one shown in the list).</div>
                </paper-item-body>
                <paper-toggle-button id="toggle" role="toggle" @click="${(e) => this.updateValue(2, e.target.getAttribute("aria-pressed").toString())}" noink invalid ?checked=${(this.btAutoSel === "true") ? true : false}>
                    ${(this.btAutoSel === "true") ? "Enabled" : "Disabled"}
                </paper-toggle-button>
            </paper-item>
            <paper-item>
                <paper-item-body two-line>
                    <div>Auto select facets [BETA]</div>
                    <div secondary>Enable the auto selection for the facets having a high percentage of accuracy (only in categories having an accuracy > 50%).</div>
                </paper-item-body>
                <paper-toggle-button id="toggle" role="toggle" @click="${(e) => this.updateValue(3, e.target.getAttribute("aria-pressed").toString())}" noink invalid ?checked=${(this.fcAutoSel === "true") ? true : false}>
                    ${(this.fcAutoSel === "true") ? "Enabled" : "Disabled"}
                </paper-toggle-button>
            </paper-item>
        </div>

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