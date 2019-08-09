import { LitElement, html } from 'lit-element';
import { stopwords } from '../lib/stopwords_en.js'
import { style } from './main-styles.js'

export class WcBody extends LitElement {

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-textanalysis></wc-body-textanalysis>
            </div>
        `
    }
}

customElements.define("wc-body", WcBody)