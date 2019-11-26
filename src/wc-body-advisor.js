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

        }
    }

    constructor() {
        super();
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <label>Baseterm found: </label>
                    <label>example1</label>
                </div>
                <div>
                    <label>Facets found: </label>
                    <label>example1</label>
                </div>
            </main>
        `
    }

    // method used for populating the tags area
    populateTags() {

    }

    // call the flask interface for receiving suggestions
    getSuggestions() {

    }
}

customElements.define("wc-body-advisor", WcBodyAdvisor)