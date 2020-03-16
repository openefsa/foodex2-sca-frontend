import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js';

import "@material/mwc-dialog"
import "@material/mwc-textfield"
import "@material/mwc-button"
import "@material/mwc-icon-button"

export class WcBodyFeedback extends LitElement {

    static get properties() {
        return {
            activate: {
                type: Boolean
            },
            dialogName: {
                type: String
            },
            text: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.activate = false;
        this.dialogId = "dialog";
        this.text = "";
    }

    render() {
        return html `
            ${style}
            <main>
                <div class="grid-container-2col-auto">
                    <div>The FoodEx2 code is not correct? Click <a href="#" @click="${this.classify}">here</a>.</div>
                    <div>
                        <mwc-icon-button icon="help" @click="${() => {window.open('https://www.efsa.europa.eu/en/data/data-standardisation', '_blank')}}"></mwc-icon-button>                    
                    </div>
                </div>
                <!-- The Modal dialog -->
                <mwc-dialog id="${this.dialogId}">
                    <div>Feedback section</div>
                    <div>
                        <mwc-textfield value="${this.text}" label="Term description" helper="Please provide a concise and precise description of the food/feed."></mwc-textfield>
                    </div>
                    <div>
                        <mwc-textfield label="FoodEx2 Code" helper="Please provide the exact FoodEx2 code for the given description."></mwc-textfield>
                    </div>
                    <mwc-button raised label="Send" icon="done" dialogAction="ok" slot="primaryAction"></mwc-button>
                    <mwc-button outlined label="Cancel" icon="cancel" dialogAction="cancel" slot="secondaryAction">
                </mwc-dialog>
            </main>
        `
    }

    // updated the information area
    classify() {

        if (this.code === null || this.code === "") {
            alert("Codify a term before!");
            return;
        }

        // get the dialog
        var dialog = this.shadowRoot.getElementById(this.dialogId);
        // show the dialog
        dialog.open = true;

    }

}

customElements.define("wc-body-feedback", WcBodyFeedback)