import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'


export class WcHeader extends LitElement {

    static get properties(){
        return {
            language: String
        }
    }

    constructor() {
        super();
        this.language="En";
    }

    render() {
        return html `
            ${style}
            <div id="header" class="grid-container">
                <div>
                    <img src="src/icons/FE2.jpg" />
                </div>
                <div class="middle">
                    <span id="title">FoodEX2 WC</span>
                </div>
                <div class="grid-container">
                    <div>
                        <span id="sub-title">Language:</span>
                    </div>
                    <div class="dropdown">
                        <button class="dropbtn">${this.language}</button>
                        <div id="dd-content" class="dropdown-content">
                            <a href="#">English</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
    changeLanguage() {
        console.log("To implement method that changes global language");
    }

}

customElements.define('wc-header', WcHeader)