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
            baseterms: {
                type: String
            },
            facets: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.baseterms = new Array();
    }

    render() {
        return html`
            ${style}
            <main>
                <div class="grid-container">
                    <div>
                        <label>Suggested baseterm: </label>
                    </div>
                    <div class="dropdown">
                        <select>
                            ${this.baseterms.map(i => html`<option>${i}</option>`)}
                        </select>
                    </div>
                </div>
                <div class="grid-container">
                    <div>
                        <label>Facets found: </label>
                    </div>
                    <div class="dropdown">
                        <select>
                            ${this.facets.map(i => html`<option>${i}</option>`)}
                        </select>
                    </div>
                </div>
            </main>
        `
    }
}

customElements.define("wc-body-advisor", WcBodyAdvisor)