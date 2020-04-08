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
            language: {
                type: String
            },
            minAccuracy: {
                type: Number
            }
        }
    }

    static get styles() {
        return css`

        .container {
            display: grid;
            height: 100%;
            grid-template-columns: 200px 300px;
            grid-auto-rows: minmax(100px, auto);
            column-gap: 10px;
            row-gap: 1em;
            justify-items: stretch;
            align-items: center;
            margin: 10px;
        }
        `;
    }

    constructor() {
        super();
        this.language = "En";
        this.minAccuracy = 0;
    }

    render() {

        return html `
            <div class="container">
                
                <div>Main language</div>
                <paper-dropdown-menu-light noink no-animations>
                    <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                        <paper-item>English</paper-item>
                    </paper-listbox>
                </paper-dropdown-menu-light>

                <div>Threshold results</div>
                <paper-slider id="resFilter" pin min="0" max="1" step="0.1" @change="${(e)=>this.updateTreashold(e)}"></paper-slider>

                <div>Auto selection mode</div>
                <paper-toggle-button noink invalid checked></paper-toggle-button>

            </div>

        `
    }

    updateTreashold(e) {
        // get the dialog
        var slider = this.shadowRoot.getElementById("resFilter");
        // update the minimum accuracy
        this.minAccuracy = slider.value;
    }

    // return the minimum accuracy set by the user
    getMinAccuracy(){
        return this.minAccuracy;
    }

}

customElements.define('settings-page', SettingsPage)