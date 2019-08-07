import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js'

export class WcSubTitle extends LitElement {

    static get properties() {
        return {
            myText: { attribute: 'my-text' }
        }
    }

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <h2 class="subtitle">
                ${this.myText}
            </h2>
        `
    }
}

customElements.define('wc-sub-title', WcSubTitle)