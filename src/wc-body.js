import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js'

export class WcBody extends LitElement {

    static get properties() {
        return {
            tokens: { type: Array }
        }
    }

    constructor() {
        super()
        this.tokens = [];
    }

    /* method used for updating the global variable containing the words result */
    updateTokens(newTokens){
        this.tokens = newTokens;
    }

    render() {
        return html`
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyse .updateTokens="${e=> this.updateTokens(e)}"></wc-body-analyse>
                <!-- component for tagging the words for baseterm -->
                <wc-body-classify .tokens="${this.tokens}"></wc-body-classify>
                <!-- component for getting the foodex2 code -->
                <wc-body-getcode></wc-body-getcode>
            </div>
        `
    }
}

customElements.define("wc-body", WcBody)