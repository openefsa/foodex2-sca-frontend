import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

import '@material/mwc-dialog'
import '@material/mwc-slider'
import '@material/mwc-button'
import '@material/mwc-select'
import '@material/mwc-formfield'
import '@material/mwc-switch'

export class WcHeaderSettings extends LitElement {

    static get properties() {
        return {
            dialogId: {
                type: String
            },
            language: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.dialogId = "dialog";
        this.language = "En";
    }

    render() {

        return html `
            ${style}
            <main>
                <!-- The Modal dialog -->
                <mwc-dialog id="${this.dialogId}">

                    <div>Language</div>
                    <div>
                        <mwc-select>
                            <mwc-list-item selected value="EN">English</mwc-list-item>
                            <mwc-list-item value="IT">Italian</mwc-list-item>
                        </mwc-select>
                    </div>
                    <div>Threshold results</div>
                    <div>
                        <mwc-slider id="resFilter" pin markers max="10" step="1" @change="${(e)=>this.updateTreashold(e)}"></mwc-slider>
                    </div>
                    <div>Auto selection mode</div>
                    <div>
                        <mwc-switch checked></mwc-switch>
                    </div>
                    <mwc-button raised label="Save" icon="save" dialogAction="ok" slot="primaryAction"></mwc-button>
                    <mwc-button outlined label="Cancel" icon="cancel" dialogAction="cancel" slot="secondaryAction">
                </mwc-dialog>
            </main>
        `
    }

    updateTreashold(e) {
        // get the dialog
        var slider = this.shadowRoot.getElementById("resFilter");
        
        slider.value;
    }

    show() {
        // get the dialog
        var dialog = this.shadowRoot.getElementById(this.dialogId);
        // show the dialog
        dialog.open = true;
    }

}

customElements.define('wc-header-settings', WcHeaderSettings)