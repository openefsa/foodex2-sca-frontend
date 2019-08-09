import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js'

export class WcHeader extends LitElement {

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <div id="header">
                <div class="column">
                    <img src="src/icons/foodex.ico" />
                </div>
                <div class="column left">
                    <h1 class="title">FoodEX2 WC<h1>
                </div>
            </div>
        `
    }
}

customElements.define('wc-header', WcHeader)