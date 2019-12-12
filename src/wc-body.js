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
            suggBt: {
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
        this.suggBt = [];
        this.baseterm = [];
        this.facets = [];
    }

    // set the property
    setSuggBt(suggBt) {
        // set the property
        this.suggBt = suggBt;
        // initialise the baseterm and facets suggestions
        this.baseterm = this.facets = [];
    }

    render() {
        return html`
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyser @analysed="${(e) => (this.setSuggBt(e.detail.suggBt))}"></wc-body-analyser>
                <!-- component for suggesting terms -->
                <wc-body-advisor .suggBt="${this.suggBt}"></wc-body-advisor>
                <!-- component for tagging the words for baseterm -->
                <wc-body-classifier .ppText="${this.ppText}" @classified="${(e) => (this.baseterm = e.detail.baseterm, this.facets = e.detail.facets)}"></wc-body-classifier>
                <!-- component for getting the foodex2 code -->
                <wc-body-getcode .baseterm="${this.baseterm}" .facets="${this.facets}"></wc-body-getcode>
            </div>
        `
    }

}

customElements.define("wc-body", WcBody)