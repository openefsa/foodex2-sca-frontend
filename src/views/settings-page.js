import {
    LitElement,
    html,
    css
} from 'lit-element';

import '@polymer/paper-dropdown-menu/paper-dropdown-menu-light.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button-light';
import '@polymer/iron-icon/iron-icon.js';

class SettingsPage extends LitElement {

    static get properties() {
        return {
            lang: {
                type: String
            },
            acc: {
                type: Number
            },
            autoSel: {
                type: String
            },
            settingsProp: {
                type: Array
            }
        }
    }

    static get styles() {
        return css`

        .container {
            display: grid;
            height: 100%;
            grid-template-columns: 50% 50%;
            column-gap: 10px;
            row-gap: 1em;
            justify-items: center;
            align-items: center;
            margin: 10px;
        }

        .buttons {
            grid-column: 2 / 2;   
        }

        .buttons > paper-button {
            background-color: lightgray;
            color: black;
        }

        .buttons > paper-button:hover {
            background-color: var(--primary-color); 
            color: white;
        }

        `;
    }

    constructor() {
        super();
        // settings properties
        this.settingsProp = ["lang", "acc", "autoSel"];
        // language
        this.lang = "en";
        // min accuracy
        this.acc = 0.0;
        // auto selection
        this.autoSel = "false";
    }

    render() {
        return html`
            <div class="container">
                
                <div>Main language</div>
                <paper-dropdown-menu-light noink no-animations>
                    <paper-listbox slot="dropdown-content" class="dropdown-content" attr-for-selected="value" selected="${this.lang}">
                        <paper-item value="en" @click="${(e) => this.updateValue(0, e.target.getAttribute("value"))}">English</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu-light>

                <div>Threshold results</div>
                <paper-slider pin min="0" max="1" step="0.1" value="${this.acc}" @change="${(e) => this.updateValue(1, e.target.value)}"></paper-slider>

                <div>Auto selection mode</div>
                <paper-toggle-button id="toggle" role="toggle" @click="${(e) => this.updateValue(2, e.target.getAttribute("aria-pressed").toString())}" noink invalid ?checked=${(this.autoSel === "true") ? true : false}>
                    ${(this.autoSel === "true") ? "Enabled" : "Disabled"}
                </paper-toggle-button>
                
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

    // return the minimum accuracy set by the user
    getMinAccuracy() {
        return this.minAccuracy;
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
            console.log("Sorry, your browser does not support Web Storage...");
        }
    }
}

customElements.define('settings-page', SettingsPage)