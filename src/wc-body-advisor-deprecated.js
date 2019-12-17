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
                        <div>
                            <label>Select one of the found baseterms: <label>
                        </div>
                        <div>
                            <select id="btSel">
                                ${this.suggBt.map(i => html`<option>${i.name}</option>`)}
                            </select>
                        </div>
                        <div>
                            <button class="submit-style" @click="">Done</button>
                        </div>
                    </div>
                </div>
            </main>
        `
    }

}

customElements.define("wc-body-advisor", WcBodyAdvisor)