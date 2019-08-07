import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js';

export class WcTextfield extends LitElement {

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <input class="input" type="text" id="text" placeholder="Add some text" />
        `
    }
}

customElements.define("wc-textfield", WcTextfield)