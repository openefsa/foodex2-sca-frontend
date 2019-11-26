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
            btnId: {
                type: String
            },
            txtId: {
                type: String
            },
            baseterm: {
                type: Array
            },
            facets: {
                type: Array
            },
            ppText: {
                type: Map
            }
        }
    }

    constructor() {
        super();
        this.btnId = "btnId";
        this.txtId = "txtId";
        this.baseterm = new Array();
        this.facets = new Array();
        this.ppText = new Map();
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <button id="${this.btnId}" class="submit-style" @click=${this.getCode}>Get Code</button>
                </div>
                <div>
                    <div>
                        <label>FoodEx2 Code</label>
                    </div>
                    <div class="textarea">
                        <div id="${this.txtId}"/>
                    </div>
                </div>
            </main>
        `
    }

    /* method to be used for retrieving data from db */
    getCode() {

        // get the text element
        var text = this.shadowRoot.getElementById(this.txtId);

        // if element undefined
        if (!text)
            return;

        // clean the text
        text.innerHTML = '';

        // print error if no text
        if (this.ppText.size <= 0 || !this.ppText) {
            text.innerHTML = "Nothing to show! Please insert a food description and try again.";
            return;
        }

        // print error if no baseterm
        if (this.baseterm.length <= 0 || !this.baseterm) {
            text.innerHTML = "Please classify at least the baseterm.";
            return;
        }

        // function below will run createConnection.php 
        $.ajax({
            url: "http://127.0.0.1:5000",
            type: "POST",
            data: JSON.stringify({ baseterm: this.baseterm, facets: this.facets }), // input variable to php
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // print the returned code
                this.showBaseterm(data);
                text.innerHTML = data;
            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                // status 0 - when load is interrupted
                if (xhr.status > 0) alert('got error: ' + status, error);
            }
        });
    }

    showBaseterm(data) {
        terms = data.split(',');
        console.log(terms);
    }
}

customElements.define("wc-body-getcode", WcBodyGetcode)