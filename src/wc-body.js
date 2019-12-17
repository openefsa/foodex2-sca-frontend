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
            }
        }
    }

    constructor() {
        super()
        this.codes = [];
    }

    // updated the returned results
    updateCode(codes) {
        this.codes = codes;
    }

    render() {
        return html `
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyser @analysed="${(e) => (this.updateCode(e.detail.codes))}"></wc-body-analyser>
                <!-- component for getting the foodex2 code -->
                <wc-body-showcode .codes="${this.codes}" .text="${this.text}"></wc-body-showcode>
            </div>
        `
    }

    /*
    <!-- component for tagging the words for baseterm -->
    <wc-body-classifier-deprecated .ppText="${this.ppText}" @classified="${(e) => (this.baseterm = e.detail.baseterm, this.facets = e.detail.facets)}"></wc-body-classifier-deprecated>
    */

}

customElements.define("wc-body", WcBody)