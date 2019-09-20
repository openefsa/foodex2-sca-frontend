import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js';

export class WcBodyGetcode extends LitElement {

    static get properties() {
        return {
            tokens: {
                type: Array
            },
            btnId: {
                type: String
            },
            txtId: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.tokens = new Array();
        this.btnId = "btnId";
        this.txtId = "txtId";
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    <button id="${this.btnId}" class="submit-style" @click="${this.retrieve}">Get Code</button>
                </div>
                <label>FoodEx2 Code</label>
                <div id="${this.txtId}" style="padding: 10px; text-align: center;" class="textarea"></div>
            </main>
        `
    }

    /* method to be used for retrieving data from db */
    retrieve() {

        // get the text element
        var text = this.shadowRoot.getElementById(this.txtId);

        // if element undefined
        if (!text)
            return;

        // print error if no tokens
        if (this.tokens.length <= 0 || !this.tokens) {
            text.innerHTML = "Nothing to find here, try again.";
            return;
        }

        // function below will run createConnection.php
        $.ajax({
            url: "src/database/retrieveCode.php",
            type: "GET",
            data: {
                terms: this.tokens
            }, // input variable to php
            cache: false,
            success: function (data) {

                // here is the code that will run on client side after running createConnection.php on server
                console.log(data);

            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
            }
        });
    }
}

customElements.define("wc-body-getcode", WcBodyGetcode)