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
                        <div>
                            <select id="btDrop">
                                <option>Select baseterm:</option>
                                <option>A</option>
                                <option>B</option>
                            </select>
                            <button>+</button>
                            <button>-</button>
                        </div>
                        
                        <div>
                            Facets
                            <div>
                                <select>
                                    <option>Select group:</option>
                                    <option>F01</option>
                                    <option>F02</option>
                                </select>
                                <select>
                                    <option>Select facet:</option>
                                    <option>facet1</option>
                                    <option>facet2</option>
                                </select>
                            </div>
                        </div>
                        <menu>
                            <button @click="${this.hideDialog}">Cancel</button>
                            <button @click="${this.hideDialog}">Confirm</button>
                        </menu>
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
        // getch the baseterms
    }

    // return selection to parent
    save(){
        // get the selected values
        // fire event to parent
        // hide the dialog
        this.hideDialog();
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