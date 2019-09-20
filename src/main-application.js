import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

export class MainApplication extends LitElement {

    constructor() {
        super()
    }

    render() {

        return html `

            ${style}
            <div id="container">
                <!-- header of the component -->
                <wc-header></wc-header>
                <!-- body of the component -->
                <wc-body></wc-body>
                <!-- footer of the component -->
                <wc-footer></wc-footer>
            </div>
        `
    }
}

customElements.define('main-application', MainApplication);