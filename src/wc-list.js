import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js'

export class WcList extends LitElement {

    static get properties() {
        return {
            words: { type: Array }
        }
    }

    constructor() {
        super()
        this.words = [
            "Banana",
            "Kiwi",
            "Milk"
        ]
    }

    render() {
        return html`
            ${style}
            ${this.words.map(word =>
                 html`<h2 class="subtitle">${word}</h2>`)}
             
        `
    }
}

customElements.define("wc-list", WcList)