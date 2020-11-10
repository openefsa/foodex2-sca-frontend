/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\input-component.js
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

import config from "../../config.js";

class InputComponent extends LitElement {

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
                width: 100%;
            }

            .flex-item {
                flex: 1;
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
        // k8s_hostname:port/api_name
        this.url = new URL(config.BASE_URL + 'predict_all');
    }

    render() {
        return html`
            <div>Food Description</div>
            <div class="flex-container">
                <input class="flex-item" type="text" id="${this.fieldId}" placeholder="Insert food description here" @keypress="${this.handleKeyPress}"></input>
                <paper-button @click="${this.getSuggestions}">GO</paper-button>
            </div>
            
            <progress-bar .activate="${this.activatePb}"></progress-bar>
        `
    }

    /**
     * Raise event to parent when data are returned from backend API.
     * 
     * @param  {Object} results
     */
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
            .catch(err => {
                // hide dialog
                this.activatePb = false;
                // show error to user
                alert(`I could not retrieve the data, sorry for that.\nError: ${err}`);
            });

    }

    /**
     * Handle if "enter" key is pressed in input field.
     * @param  {Object} event
     */
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.getSuggestions();
            }
        }
    }
}

customElements.define("input-component", InputComponent)
