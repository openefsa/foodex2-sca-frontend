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
            ppText: {
                type: Map
            },
            baseterm: {
                type: Array()
            },
            facets: {
                type: Array()
            }
        }
    }

    constructor() {
        super()
        this.ppText = new Map();
        this.baseterm = new Array();
        this.facets = new Array();
    }

    render() {
        return html `
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyse @analysed="${(e)=>(this.ppText=e.detail.ppText)}"></wc-body-analyse>
                <!-- component for tagging the words for baseterm -->
                <wc-body-classify .ppText="${this.ppText}" @classified="${(e)=>(this.baseterm=e.detail.baseterm, this.facets=e.detail.facets)}"></wc-body-classify>
                <!-- component for getting the foodex2 code -->
                <wc-body-getcode .ppText="${this.ppText}" .baseterm="${this.baseterm}" .facets="${this.facets}"></wc-body-getcode>
            </div>
        `
    }
}

customElements.define("wc-body", WcBody)