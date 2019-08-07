import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js'

export class MainApplication extends LitElement {

    constructor() {
        super()
    }

    render() {
        return html`
            ${style}
            <section class="container">
                <div>
                    <h1 class="title"><img src="src/icons/foodex.ico"/>FoodEX2 WC<h1>
                    <hr>
                    <form>
                        <label class="subtitle">Insert the food description below:</label><br>
                        <input class="input" type="text" id="text" placeholder="Add some text" /><br>
                        <wc-button></wc-button>
                    </form>
                    <wc-list></wc-list>
                </div>
            </section>
        `
    }
}

customElements.define('main-application', MainApplication);