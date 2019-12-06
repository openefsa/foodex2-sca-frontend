import { LitElement, html } from 'lit-element';
import { style } from './main-styles.js';

export class WcBodyGetcode extends LitElement {

    static get properties() {
        return {
            btnId: { type: String },
            codeId: { type: String },
            btSelected: { type: Object },
            fcSelected: { type: Object },
            baseterm: { type: Array },
            facets: { type: Array }
        }
    }

    constructor() {
        super();
        this.btnId = "btnId";
        this.codeId = "codeId";
        this.facets = [];
        this.btSugg = [];
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <button id="${this.btnId}" class="submit-style" @click="${this.getBaseterm}">Get Code</button>
                </div>
                <div>
                    <div>
                        <label>FoodEx2 Code</label>
                    </div>
                    <div class="textarea">
                        <div id="${this.codeId}"/>
                    </div>
                </div>
                <!-- The Modal dialog -->
                <div id="dialog" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <div class="grid-container">
                            <label>Choose one of the baseterm found:<label>
                            <select id="btSel"></select>
                        </div>
                        <div class="grid-container">
                            <label>Choose one of the facets found:<label>
                            <select id="btSel"></select>
                        </div>
                        <button id="save" @click="${this.save}">Ok</button>
                    </div>
                </div>
            </main>
        `
    }

    // call the flask interface for receiving baseterm
    getBaseterm() {

        // print error if no baseterm
        if (this.baseterm.length <= 0 || !this.baseterm) {
            alert("Please classify at least the baseterm.");
            return;
        }

        const url = 'http://127.0.0.1:5000/getBaseterm';

        const headers = {
            "Content-Type": "application/json"
            //"Access-Control-Origin": "*"
        }

        // request options
        const options = {
            method: 'POST',
            body: JSON.stringify({
                baseterm: this.baseterm
            }),
            headers: headers
        }

        // send POST request
        fetch(url, options)
            .then(res => res.text()) // use res.json() if returned a json from request
            .then(res => this.checkSuggestions(JSON.parse(res)))
            .catch(err => console.log(`Error with message: ${err}`));

    }

    // call the flask interface for receiving facets
    getFacets(selIndex) {
        console.log(selIndex);
        // print error if no option selected
        if (!selIndex) {
            alert("Please select an option before.");
            return;
        }

        const url = 'http://127.0.0.1:5000/getFacets';

        const headers = {
            "Content-Type": "application/json"
            //"Access-Control-Origin": "*"
        }

        // request options
        const options = {
            method: 'POST',
            body: JSON.stringify({
                btIndex: selIndex
            }),
            headers: headers
        }

        // send POST request
        fetch(url, options)
            .then(res => res.text()) // use res.json() if returned a json from request
            .then(res => console.log(JSON.parse(res)))
            .catch(err => console.log(`Error with message: ${err}`));

    }

    // check the suggestions
    checkSuggestions(data) {
        // console.log("data => ", data);
        // if more than a term returned
        if (data.length > 1) {

            var selectList = this.shadowRoot.getElementById("btSel");
            selectList.innerHTML = "";
            data.forEach((i) => {
                var option = document.createElement("option");
                option.text = i.name;
                option.value = i.index + "," + i.code;
                selectList.appendChild(option);
            });

            // Get the modal
            var modal = this.shadowRoot.getElementById("dialog");
            // Get the element that saves the data filled
            var save = this.shadowRoot.getElementById("save");

            // change modal style in order to show it
            modal.style.display = "block";

            // When the user clicks on <save>, close the modal
            save.onclick = () => {
                // hide modal if ok pressed
                modal.style.display = "none";
                var value = selectList.options[selectList.selectedIndex].value.split(",");
                // get the code of the selected option
                this.shadowRoot.getElementById(this.codeId).innerHTML = value[1];

                // DEBUG:
                this.getFacets(value[0]);
            }
        }
    }

}

customElements.define("wc-body-getcode", WcBodyGetcode)