import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js'

export class WcProgressBar extends LitElement {

    static get properties() {
        return {
            activate: {
                type: Boolean
            }
        }
    }

    constructor() {
        super();
        this.activate = false;
    }

    render() {
        return html `
            ${style}
            <main>
                <div id="${this.pbId}" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <label>Please wait...</label>
                        <progress></progress>
                    </div>
                </div>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {
        // check if activate properties has been changed
        var activate = changedProperties.has('activate');
        // get the progress bar dialog component
        var comp = this.shadowRoot.getElementById(this.pbId);
        // change the dialog style if not null and activate has been changed
        if (activate && comp) {
            // activate the brogress bar
            comp.style.display = this.activate ? "block" : "none";
        }

        return activate;
    }
}

customElements.define("wc-progress-bar", WcProgressBar)