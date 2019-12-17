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
            },
            activatePb: {
                type: Boolean
            }
        }
    }

    constructor() {
        super()
        this.textAreaId = 'description';
        this.activatePb = false;
    }

    render() {
        return html `
            ${style}
            <main>
                <div class="grid-container-2col">
                    <div>
                        <input class="textinput" type="text" id="${this.textAreaId}" placeholder="Insert food description here" @keypress=${this.handleKeyPress}"/>
                    </div>
                    <div>
                        <button class="submit-style" @click="${this.getCode}">Get Code</button>
                    </div>
                </div>
                <wc-progress-bar .activate="${this.activatePb}"></wc-progress-bar>
            </main>
        `
    }

    // call the flask interface for receiving the FoodEx2 code
    getCode() {

        // get the text inserted
        var userText = this.shadowRoot.getElementById(this.textAreaId).value;

        // print error if nothing written
        if (!userText) {
            alert("Please describe your term first.");
            return;
        }

        const url = 'http://127.0.0.1:5000/getCode';

        const headers = {
            "Content-Type": "application/json"
            //"Access-Control-Origin": "*"
        }

        // request options
        const options = {
            method: 'POST',
            body: JSON.stringify({
                user_text: userText
            }),
            headers: headers
        }

        // show dialog
        this.activatePb=true;

        // send POST request
        fetch(url, options)
            .then(res => res.text()) // use res.json() if returned a json from request
            .then(res => this.fireEvent(JSON.parse(res)))
            .catch(err => this.showError(err));

    }

    // check if the key pressed is "enter"
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.getCode();
            }
        }
    }

    // propagate event to parent component
    fireEvent(codes) {
        // hide dialog
        this.activatePb=false;
        // fire event to parent
        let event = new CustomEvent('analysed', {
            detail: {
                codes: codes
            }
        });
        this.dispatchEvent(event);
    }

    showError(err) {
        // hide dialog
        this.activatePb=false;
        // show error to user
        alert(`I could not retrieve the data, sorry for that :( ${err}`);
    }
}

customElements.define("wc-body-analyser", WcBodyAnalyse)