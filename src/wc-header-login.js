import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

import '@material/mwc-dialog'
import '@material/mwc-textfield'
import '@material/mwc-button'

export class WcHeaderLogin extends LitElement {

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
                    <div>Login section</div>
                    <div>
                        <mwc-textfield label="Email"></mwc-textfield>
                    </div>
                    <div>
                        <mwc-textfield label="Password"></mwc-textfield>
                    </div>
                    <mwc-button raised label="login" icon="input" dialogAction="ok" slot="primaryAction"></mwc-button>
                    <mwc-button outlined label="Cancel" icon="cancel" dialogAction="cancel" slot="secondaryAction">
                </mwc-dialog>
            </main>
        `
    }

    show(){
        // get the dialog
        var dialog = this.shadowRoot.getElementById(this.dialogId);
        // show the dialog
        dialog.open = true;
    }

}

customElements.define('wc-header-login', WcHeaderLogin)