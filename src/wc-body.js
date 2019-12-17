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
            fe2_codes: {
                type: Array
            },
            baseterm: {
                type: Array
            },
            facets: {
                type: Array
            }
        }
    }

    constructor() {
        super()
        this.fe2_codes = [];
        this.baseterm = [];
        this.facets = [];
    }

    // set the property
    setFE2Codes(fe2_codes) {
        // set the property
        this.fe2_codes = fe2_codes;
        console.log(this.fe2_codes);
        // initialise the baseterm and facets suggestions
        this.baseterm = this.facets = [];
    }

    render() {
        return html`
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyser @analysed="${(e) => (this.setFE2Codes(e.detail.fe2_codes))}"></wc-body-analyser>
                <!-- component for getting the foodex2 code -->
                <wc-body-showcode .codes="${this.fe2_codes}"></wc-body-showcode>
            </div>
        `
    }

    /*
    <!-- component for tagging the words for baseterm -->
    <wc-body-classifier .ppText="${this.ppText}" @classified="${(e) => (this.baseterm = e.detail.baseterm, this.facets = e.detail.facets)}"></wc-body-classifier>
    */

}

customElements.define("wc-body", WcBody)