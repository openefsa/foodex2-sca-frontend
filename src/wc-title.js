import { LitElement, html } from 'lit-element';

import {style} from './main-styles.js'

export class WcTitle extends LitElement {

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <h1 class="title">FoodEX2 WC 🍔<h1>
        `
    }
}

customElements.define('wc-title', WcTitle);