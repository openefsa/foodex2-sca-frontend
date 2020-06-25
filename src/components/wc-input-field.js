/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\wc-input-field.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 2nd April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Last Modified: Thursday, 24th June 2020
 * | Modified By: Alban Shahaj (shahaal)
 * | -----------------------------------------------------------------  
 * | Copyright (c) 2020 European Food Safety Authority (EFSA)
 * |                                                                    
 * *********************************************************************
 */



import {
    LitElement,
    html,
    css
} from 'lit-element';

class WcInputField extends LitElement {

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
                type: URL
            }
        }
    }

    static get styles() {
        return css`

            .flex-container {
                display: flex;
                flex-direction: row;
                justify-content: stretch; 
                width: 100%;
            }

            .flex-container > .flex-item {
                flex: 1;
            }

            .flex-container > .col-item {
                width: auto;
            }

            input {
                font-family: Arial;
                font-size: 15px;
                box-sizing: border-box;
                border-radius: 4px;
                padding: 5px;
            }
            
            paper-button {
                background-color: lightgray;
                color: black;
                margin: 0 0 0 3px;
            }
    
            paper-button:hover {
                background-color: var(--primary-color); 
                color: white;
            }
        `;
    }

    constructor() {
        super();
        this.fieldId = 'description';
        this.activatePb = false;
        this.freeText = '';
        // create the url to which make request
        //this.url = new URL('http://51.124.148.195:5000/predictAll');
        this.url = new URL(' http://127.0.0.1:5000/predictAll');
    }

    render() {
        return html`
            <label>
                Food Description
                <div class="flex-container">
                    <input class="flex-item" type="text" id="${this.fieldId}" placeholder="Insert food description here" @keypress=${this.handleKeyPress}"></input>
                    <paper-button class="col-item" @click="${this.getSuggestions}">Get Code</paper-button>
                </div>
            </label>
            <wc-progress-bar .activate="${this.activatePb}"></wc-progress-bar>
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
    getSuggestions() {

        // get the text inserted
        var textArea = this.shadowRoot.getElementById(this.fieldId);

        // print error if nothing written
        if (!textArea || textArea.value == "") {
            alert("Please describe your term first.");
            return;
        }

        this.freeText = textArea.value;

        // url params 
        const params = {
            'text': this.freeText,
            'threshold': localStorage.getItem('acc') / 100
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

    // check if the key pressed is "enter"
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.getSuggestions();
            }
        }
    }
}

customElements.define("wc-input-field", WcInputField)
