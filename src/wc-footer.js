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
                <p padding="0px 3px">European Food Safety Authority</p>
            </div>
        `
    }
}

customElements.define('wc-footer', WcFooter)