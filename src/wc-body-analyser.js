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
        return html`
            ${style}
            <main>
                <div class="grid-container-2col">
                    <div>
                        <input class="textinput" type="text" id="${this.textAreaId}" placeholder="Insert food description here" @keypress=${this.handleKeyPress}"/>
                    </div>
                    <div>
                        <button class="submit-style" @click="${this.getBaseterms}">Get Code</button>
                    </div>
                </div>
                <wc-progress-bar .activate="${this.activatePb}"></wc-progress-bar>
            </main>
        `
    }

    // propagate event to parent component
    fireEvent(text, baseterms) {
        console.log(baseterms);
        // hide dialog
        this.activatePb = false;
        // fire event to parent
        let event = new CustomEvent('analysed', {
            detail: {
                baseterms: baseterms,
                text: text
            }
        });
        this.dispatchEvent(event);
    }

    showError(err) {
        // hide dialog
        this.activatePb = false;
        // show error to user
        alert(`I could not retrieve the data, sorry for that.\nError: ${err}`);
    }

    // call the flask interface for receiving the FoodEx2 code
    getBaseterms() {

        // get the text inserted
        var userText = this.shadowRoot.getElementById(this.textAreaId).value;

        // print error if nothing written
        if (!userText) {
            alert("Please describe your term first.");
            return;
        }

        // create the header of the request
        const header = new Headers();
        header.append('Content-Type', 'application/json');

        // create the url to which make request
        // const url = 'http://127.0.0.1:5000/predictBaseterm';
        const url = new URL('http://ebd6f601-7113-4fd5-b6b5-0687190a2566.westeurope.azurecontainer.io/score');
        // add parameters to url
        var params = { 'input': userText }
        url.search = new URLSearchParams(params).toString();

        // create request obj
        const req = new Request(url.href, {
            method: 'GET', //POST
            headers: header,
            mode: 'no-cors',
            cache: 'default'
            /*body: JSON.stringify({
                userText: userText
            }),*/
        });

        // show dialog
        this.activatePb = true;

        /* send POST request
        fetch(url, options)
            .then(res => res.text()) // use res.json() if returned a json from request
            .then(res => this.fireEvent(userText, JSON.parse(res)))
            .catch(err => this.showError(err));
            */
        
        // send GET request
        fetch(req)
            .then(res => res.json()) // res.text(), use res.json() if returned a json from request
            .then(res => this.fireEvent(userText, res))//JSON.parse(res)))
            .catch(err => this.showError(err));

    }

    // check if the key pressed is "enter"
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.getBaseterms();
            }
        }
    }
}

customElements.define("wc-body-analyser", WcBodyAnalyse)