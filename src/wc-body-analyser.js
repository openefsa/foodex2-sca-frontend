import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js'

import "@material/mwc-button"

export class WcBodyAnalyser extends LitElement {

    static get properties() {
        return {
            fieldId: {
                type: String
            },
            activatePb: {
                type: Boolean
            },
            freeText: {
                type: String
            },
            url: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.fieldId = 'description';
        this.activatePb = false;
        this.freeText = '';
        // create the url to which make request
<<<<<<< HEAD
        // this.url = new URL('http://127.0.0.1:5000/predictAll');
        // only debugging purpose
=======
>>>>>>> 9689fa4c89939bad67cacf88c0e584f605f54636
        this.url = new URL('http://51.124.148.195:5000/predictAll');
    }

    render() {
        return html `
            ${style}
            <main>
                <div class="grid-container-2col">
                    <div>
                        <input class="textinput" type="text" id="${this.fieldId}" placeholder="Insert food description here" @keypress=${this.handleKeyPress}"/>
                    </div>
                    <div>
                        <button class="submit-style" @click="${this.getCode}">Get Code</button>
                    </div>
                </div>
                <wc-progress-bar .activate="${this.activatePb}"></wc-progress-bar>
            </main>
        `
    }

    // propagate event to parent component
    fireEvent(results) {
        // hide dialog
        this.activatePb = false;
        
        // fire event to parent
        let event = new CustomEvent('data', {
            detail: {
                res: results,
                text: this.freeText
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

    // method used for calling the APIs required
    getCode() {

        // get the text inserted
        var textArea = this.shadowRoot.getElementById(this.fieldId);

        // print error if nothing written
        if (!textArea || textArea.value=="") {
            alert("Please describe your term first.");
            return;
        }

        this.freeText = textArea.value;

        /* more generalised way 
        // call apis for getting user text related information
        var p1 = Promise.resolve(this.predictBt('baseterm'));
        var p2 = Promise.resolve(this.predictBt('ifFacet'));

        Promise.all([p1, p2]).then(values => {
            console.log(values);
        });
        */
        this.predictCode();

    }

    // predict the foodex2 codes for the given free text
    predictCode() {
        // url params 
        const params = {
            'text': this.freeText
        };

        // set params in url
        this.url.search = new URLSearchParams(params).toString();
        
        // show progress bar dialog
        this.activatePb = true;

        // send GET request
        fetch(this.url).then(res => res.json())
            .then(res => this.fireEvent(res)) 
            .catch(err => this.showError(err));
    }

    // call the flask interface for receiving baseterm suggestions
    predictBt(model) {

        // url params 
        const params = {
            'text': this.freeText,
            'model': model
        };

        // set params in url
        this.url.search = new URLSearchParams(params).toString();

        // send GET request
        fetch(this.url).then(res => res.json())
            .then(res => {
                console.log(res);
                return res;
            }) //this.fireEvent(userText, res))
            .catch(err => this.showError(err));
    }

    // call the flask interface for receiving facets suggestions
    predictFcs(model) {

        // url params 
        const params = {
            'text': this.freeText,
            'model': model
        };

        // set params in url
        this.url.search = new URLSearchParams(params).toString();

        // send GET request
        fetch(this.url).then(res => {
                // pass the returned data to next then block
                return res.json();
            }).then(data => {
                console.log(data);
                // loop through active facet categories
                data['ifFacet'].forEach(item => {
                    // item[0]=facet category name
                    // item[1]=facet category accuracy
                    // url params 
                    const params = {
                        'text': this.freeText,
                        'model': item[0]
                    };

                    // set params in url
                    url.search = new URLSearchParams(params).toString();
                    console.log
                    return fetch(url);
                });
            }) //this.fireEvent(userText, res))
            .then(res => console.log(res.json()))
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
}

customElements.define("wc-body-analyser", WcBodyAnalyser)
