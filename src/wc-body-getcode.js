import { LitElement, html } from 'lit-element';
import { style } from './main-styles.js';

export class WcBodyGetcode extends LitElement {

    static get properties() {
        return {
        }
    }

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <button class="submit-style">Get Code</button>
                </div>
                <label>FoodEx2 Code</label>
                <div style="padding: 10px; text-align: center;" class="textarea">FoodEx2 code printed here</div>
            </main>
        `
    }
}

customElements.define("wc-body-getcode", WcBodyGetcode)