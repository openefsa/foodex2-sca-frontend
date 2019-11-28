import { LitElement, html } from 'lit-element';
import { style } from './main-styles.js';

export class WcBodyGetcode extends LitElement {

    static get properties() {
        return {
            btnId: { type: String },
            txtId: { type: String },
            baseterm: { type: Array },
            facets: { type: Array },
            btSugg: { type: Array }
        }
    }

    constructor() {
        super();
        this.btnId = "btnId";
        this.txtId = "txtId";
        this.baseterm = [];
        this.facets = [];
        this.btSugg = [];
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <button id="${this.btnId}" class="submit-style" @click=${this.getSuggestions}>Get Code</button>
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
            <!-- The Modal dialog -->
            <div id="dialog" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span id="close" class="close">&times;</span>
                    <div>
                        <label>Choose one of the baseterm found:<label>
                        <select id="btSel"></select>
                    </div>
                </div>
            </div>
        `
    }

    // call the flask interface for receiving suggestions
    getSuggestions() {
        
        // print error if no baseterm
        if (this.baseterm.length <= 0 || !this.baseterm) {
            console.log("Please classify at least the baseterm.");
            return;
        }

        const url = 'http://127.0.0.1:5000/getSuggestions';

        const headers = {
            "Content-Type": "application/json"
            //"Access-Control-Origin": "*"
        }

        // request options
        const options = {
            method: 'POST',
            body: JSON.stringify({
                baseterm: this.baseterm,
                facets: this.facets
            }),
            headers: headers
        }
        // send POST request
        fetch(url, options)
            .then(res => res.text()) // use res.json() if returned a json from request
            .then(res => this.checkSuggestions(res.split(',')))
            .catch(err => console.log(`Error with message: ${err}`));

    }

    // check the suggestions
    checkSuggestions(data) {
        console.log("data => ", data);
        // if more than a term returned
        if (data.length > 1) {
            
            var selectList = this.shadowRoot.getElementById("btSel");
            selectList.innerHTML = "";
            data.forEach((i) => {
                var option = document.createElement("option");
                option.text = i;
                selectList.appendChild(option);
            });

            // Get the modal
            var modal = this.shadowRoot.getElementById("dialog");

            // Get the <span> element that closes the modal
            var span = this.shadowRoot.getElementById("close");

            modal.style.display = "block";

            // When the user clicks on <span> (x), close the modal
            span.onclick = function () {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }

    // method to be used for retrieving the FoodEx2 code
    getCode() {
    }
}

customElements.define("wc-body-getcode", WcBodyGetcode)