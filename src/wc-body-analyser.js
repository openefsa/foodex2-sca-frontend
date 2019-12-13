import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js'

export class WcBodyAnalyse extends LitElement {

    static get properties() {
        return {
            textAreaId: {
                type: String
            }
        }
    }

    constructor() {
        super()
        this.textAreaId = 'description';
    }

    render() {
        return html`
            ${style}
            <main>
                <div class='input-button-grid'>
                    <div>
                        <input class="textinput" type="text" id="${this.textAreaId}" placeholder="Insert food description here" @keypress=${this.handleKeyPress}"/>
                    </div>
                    <div>
                        <button class="submit-style" @click=${this.getBaseterm}> &#8594; </button>
                    </div>
                </div>
                <!-- The Modal dialog -->
                <div id="dialog" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <label>Please wait...</label>
                        <progress></progress>
                    </div>
                </div>
            </main>
        `
    }

    // call the flask interface for receiving baseterm
    getBaseterm() {

        // Get the modal
        var modal = this.shadowRoot.getElementById("dialog");
        // change modal style in order to show it
        modal.style.display = "block";

        // get the text inserted
        var userText = this.shadowRoot.getElementById(this.textAreaId).value;

        // print error if nothing written
        if (!userText) {
            alert("Please describe your term first.");
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
                baseterm: userText
            }),
            headers: headers
        }

        // send POST request
        fetch(url, options)
            .then(res => res.text()) // use res.json() if returned a json from request
            .then(res => this.fireEvent(modal, JSON.parse(res)))
            .catch(err => console.log(`Error with message: ${err}`));

    }

    // check if the key pressed is "enter"
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.getBaseterm();
            }
        }
    }

    // propagate event to parent component
    fireEvent(modal, suggBt) {
        // hide modal if ok pressed
        modal.style.display = "none";
        // fire event to parent
        let event = new CustomEvent('analysed', {
            detail: {
                suggBt: suggBt
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define("wc-body-analyser", WcBodyAnalyse)