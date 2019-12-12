import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js';

export class WcBodyAdvisor extends LitElement {

    static get properties() {
        return {
            suggBt: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.suggBt = [];
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <div class="grid-container">
                        <label>Select one of the found baseterms: <label>
                        <select id="btSel">
                            ${this.suggBt.map(i => html`<option>${i}</option>`)}
                        </select>
                    </div>
                </div>
            </main>
        `
    }

}

customElements.define("wc-body-advisor", WcBodyAdvisor)