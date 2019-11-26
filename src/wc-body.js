import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

export class WcBody extends LitElement {

    static get properties() {
        return {
            ppText: {
                type: Map
            },
            baseterm: {
                type: Array()
            },
            facets: {
                type: Array()
            },
            basetermSugg: {
                type: String
            },
            facetsSugg: {
                type: String
            }
        }
    }

    constructor() {
        super()
        this.ppText = new Map();
        this.baseterm = new Array();
        this.facets = new Array();
    }

    // call the flask interface for receiving suggestions
    getSuggestions(){

        // print error if no baseterm
        if (this.baseterm.length <= 0 || !this.baseterm) {
            console.log("Please classify at least the baseterm.");
            return;
        }

        // function below will run createConnection.php 
        $.ajax({
            url: "http://127.0.0.1:5000/getSuggestions",
            type: "POST",
            data: JSON.stringify({ baseterm: this.baseterm, facets: this.facets }), // input variable to php
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // print the returned code
                console.log(data);
                this.basetermSugg = data;
            },
            error: function (xhr, status, error) {
                // executed if something went wrong during call
                // status 0 - when load is interrupted
                if (xhr.status > 0) alert('got error: ' + status, error);
            }
        });
    }

    render() {
        return html`
            ${style}
            <div id="body">
                <!-- component for analysing the food description inserted -->
                <wc-body-analyser @analysed="${(e) => (this.ppText = e.detail.ppText)}"></wc-body-analyser>
                <!-- component for tagging the words for baseterm -->
                <wc-body-classifier .ppText="${this.ppText}" @classified="${(e) => (this.baseterm = e.detail.baseterm, this.facets = e.detail.facets)}" @sugg="${(e) => this.getSuggestions()}"></wc-body-classifier>
                <!-- component for selecting best suggested terms -->
                <wc-body-advisor></wc-body-advisor>
                <!-- component for getting the foodex2 code -->
                <wc-body-getcode .ppText="${this.ppText}" .baseterm="${this.baseterm}" .facets="${this.facets}"></wc-body-getcode>
            </div>
        `
    }

}

customElements.define("wc-body", WcBody)