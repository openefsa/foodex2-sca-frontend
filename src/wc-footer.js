import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js'

export class WcFooter extends LitElement {

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <div id="footer">
                <p>European Food Safety Authority</p>
            </div>
        `
    }
}

customElements.define('wc-footer', WcFooter)