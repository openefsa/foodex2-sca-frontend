import {LitElement, html} from 'lit-element';

import {style} from './main-styles.js'

export class MainApplication extends LitElement{
    
    constructor(){
        super()
    }

    render(){
        return html`
            ${style}
            <section class="container">
                <div>
                    <wc-title></wc-title>
                    <wc-sub-title my-text="Insert the food description below:"></wc-sub-title>
                    <wc-button></wc-button>
                    <hr>
                    <wc-textfield></wc-textfield>
                    <wc-list></wc-list>
                </div>
            </section>
        `
    }
}

customElements.define('main-application', MainApplication);