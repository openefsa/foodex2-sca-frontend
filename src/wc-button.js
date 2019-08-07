import { LitElement, html } from 'lit-element';

import {style} from './main-styles.js'

export class WcButton extends LitElement {

    static get properties() {
        return {
            counter: { type: Number }
        }
    }

    constructor() {
        super()
        this.counter = 0
    }

    render() {
        return html`
            ${style}
            <div>
                <button @click="${this.clickHandler}" class="button"> Get the code ${this.counter}</button>
            </div>
        `
    }

    clickHandler() {
        if(this.counter<10)
            this.counter += 1
        else
            this.counter = 0
    }
}

customElements.define("wc-button", WcButton)