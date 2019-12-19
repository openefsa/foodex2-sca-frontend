import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

export class WcBody extends LitElement {

    static get properties() {
        return {
            codes: {
                type: Array
            },
            text: {
                type: String
            },
            smc: {
                type: String
            }
        }
    }

    constructor() {
        super()
        this.codes = [];
        this.smc = "semi-manual-classifier";
    }

    render() {
        return html `
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyser @analysed="${(e) => (this.updateCode(e))}"></wc-body-analyser>
                <!-- component for getting the foodex2 code -->
                <wc-body-showcode .codes="${this.codes}"></wc-body-showcode>
                <!-- component for manual classification (if requested) -->
                <wc-body-classifier id="${this.smc}"></wc-body-classifier>
            </div>
        `
    }

    // updated the returned results
    updateCode(event) {
        this.codes = event.detail.codes;
        this.text = event.detail.text;
    }

    // requested semi-manual classification
    semiManualClassification(){
        // Get the modal
        var comp = this.shadowRoot.getElementById(this.smc);
        // activate modal component
        comp.showDialog();
    }

    /*
    <!-- component for tagging the words for baseterm -->
    <wc-body-classifier-deprecated .ppText="${this.ppText}" @classified="${(e) => (this.baseterm = e.detail.baseterm, this.facets = e.detail.facets)}"></wc-body-classifier-deprecated>
    */

}

customElements.define("wc-body", WcBody)