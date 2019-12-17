import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js';

export class WcBodyClassify extends LitElement {

    static get properties() {
        return {
            activate: {
                type: Boolean
            },
            dialogName: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.activate = false;
        this.dialogName = "dialog";
    }

    render() {
        return html `
            ${style}
            <main>
                <!-- The Modal dialog -->
                <div id="${this.dialogName}" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <p>Select the baseterm</p>
                        <select>
                            <option>A</option>
                            <option>B</option>
                        </select>
                        <button @click="${this.hideDialog}">Ok</button>
                    </div>
                </div>
            </main>
        `
    }

    // method used for activating the dialog
    showDialog() {
        // Get the modal
        var modal = this.shadowRoot.getElementById("dialog");
        // change modal style in order to show it
        modal.style.display = "block";
    }

    // method used for deactivating the dialog
    hideDialog() {
        // Get the modal
        var modal = this.shadowRoot.getElementById("dialog");
        // hide modal if ok pressed
        modal.style.display = "none";
    }

}

customElements.define("wc-body-classifier", WcBodyClassify)