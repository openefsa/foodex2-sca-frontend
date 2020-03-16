import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js'

import "@material/mwc-dialog"
import "@material/mwc-linear-progress"

export class WcProgressBar extends LitElement {

    static get properties() {
        return {
            activate: {
                type: Boolean
            },
            pbId: {
                type: String
            },
            dialogId: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.activate = false;
        this.pbId = "progressBar";
        this.dialogId = "dialog";
    }

    render() {
        return html `
            ${style}
            <main>
                <mwc-dialog id="${this.dialogId}">
                    <div>Fetching data</div>
                    <mwc-linear-progress id="${this.pbId}" indeterminate></mwc-linear-progress>
                </mwc-dialog>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {
        // check if activate properties has been changed
        var activate = changedProperties.has('activate');
        
        // get the dialog component
        var dialog = this.shadowRoot.getElementById(this.dialogId);
        // get the progress bar 
        var pb = this.shadowRoot.getElementById(this.pbId);

        // change the dialog style if not null and activate has been changed
        if (activate && dialog && pb) {
            // open dialog and active progress bar
            dialog.open = this.activate;
            pb.open = !this.activate;
        }

        return activate;
    }
}

customElements.define("wc-progress-bar", WcProgressBar)