import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js';

export class WcBodyClassify extends LitElement {

    static get properties() {
        return {
            tagId: {
                type: String
            },
            baseterm: {
                type: Array
            },
            facets: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.tagId = 'sugg';
        this.baseterm = new Array();
        this.facets = new Array();
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <label>Terms found</label>
                </div>
                <div>
                    <div id="${this.tabId}></div>
                </div>
            </main>
        `
    }

    // method used for populating the tags area
    populateTags() {

    }

    // call the flask interface for receiving suggestions
    getSuggestions(){

        var suggDiv = this.shadowRoot.getElementById(this.tagId);

        // if element undefined
        if (!suggDiv)
            return;

        // function below will run createConnection.php 
        $.ajax({
            url: "http://127.0.0.1:5000/getSuggestions",
            type: "POST",
            data: JSON.stringify({ baseterm: this.baseterm, facets: this.facets }), // input variable to php
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // print the returned code
                suggDiv.innerHTML = data;
            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                // status 0 - when load is interrupted
                if (xhr.status > 0) alert('got error: ' + status, error);
            }
        });
    }
}

customElements.define("wc-body-classify", WcBodyClassify)