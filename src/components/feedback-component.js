/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\feedback-component.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 7th April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Modified By: Alban Shahaj (shahaal)
 * | -----------------------------------------------------------------  
 * | Copyright (c) 2021 European Food Safety Authority (EFSA)
 * |                                                                    
 * *********************************************************************
 */



import {
    LitElement,
    html,
    css
} from 'lit-element';

import config from "../../config.js";

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-form/iron-form.js';

export class FeedbackComponent extends LitElement {

    static get properties() {
        return {
            feedback: {
                type: String
            },
            dialog: {
                type: String
            },
            dftDesc: {

                type: String
            },
            postUrl: {
                type: URL
            },
            getUrl: {
                type: URL
            },
            token: {
                type: String
            },
            enableFastFeedback: {
                type: Boolean
            },
            records: {
                type: Object
            },
            record: {
                type: Object
            },
            form1: {
                type: String
            },
            form2: {
                type: String
            }
        }
    }

    static get styles() {
        return css`

        .container {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
        }

        .container > .flex-item {
            flex: 1;
        }

        .container > .col-item {
            width: auto;
        }

        .buttons > paper-button {
            background-color: lightgray;
            color: black;
        }

        .buttons > paper-button:hover {
            background-color: var(--primary-color); 
            color: white;
        }

        paper-fab {    
            --paper-fab-background: #2196F3;
        }

        paper-dialog {
            min-height: 50%;
            width: 90%;
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
        }

        fieldset {
            border: 1px solid lightgray;
            border-radius: 4px;
        }
      
        legend {
            font-size: 13px;
        }
      
        label {
            white-space: nowrap;
            font-weight: bold;
            font-size: 14px;
        }

        `;
    }

    constructor() {
        super();
        this.feedback = "feedback";
        this.dialog = "dialog";
        this.dftDesc = "";
        this.enableFastFeedback = false;
        this.records = [];
        this.record = [];
        this.form1 = "ironform1";
        this.form2 = "ironform2";
        // regex pattern used for validating foodex2 code
        this.pattern = "\\w{5}|\\w{5}((?=\#?)(\#\\w{3}\.\\w{5})|(\#\\w{3}\.\\w{5}((?=\\$?)(\\$\\w{3}\\.\\w{5})+)))";
        // get token from local storage
        this.token = JSON.parse(localStorage.getItem('user')).token;
        // k8s_hostname:port/api_name
        this.postUrl = new URL(config.BASE_URL + 'post_feedback');
        this.getUrl = new URL(config.BASE_URL + 'get_codes');
    }

    render() {

        return html`
            <div id="${this.feedback}" class="container">
                <div class="flex-item">Help us to improve &rarr; </div>
                <paper-fab mini class="col-item" icon="feedback" title="Send feedback" @click="${this.open}"></paper-fab>
            </div>
            
            <paper-dialog id="${this.dialog}" no-cancel-on-outside-click>
                <h3>Feedback section</h3>
                <paper-dialog-scrollable>
                    <div>
                        ${this.enableFastFeedback
                        ? html`
                        <!-- enable fast feedback engine (only internal users) -->
                        <fieldset>
                            <legend>Improve exsisting codes</legend>
                            <iron-form id="${this.form1}">
                                <form>
                                    <paper-input type="text" label="Food interpretation for: ${(this.record) ? this.record[0] : ''}" value="${(this.record) ? this.record[1] : ''}" readonly></paper-input>
                                    <paper-input type="text" name="code" value="${(this.record) ? this.record[0] : ''}" readonly hidden></paper-input>
                                    <paper-input type="text" name="desc" label="Type an English description for the above term" required auto-validate error-message="Please type a description"></paper-input>          
                                </form>
                                <paper-icon-button title="Refresh code" icon="refresh" @click="${this.populateForm}"></paper-icon-button>
                                <paper-icon-button title="Send feedback" icon="send" @click="${() => this.sendFeedback(this.form1)}"></paper-icon-button>
                            </iron-form>    
                        </fieldset>
                        ` : ``}
                        
                        <fieldset>
                            <legend>Submit new codes</legend>
                            <label>
                                <iron-form id="${this.form2}">
                                    <form>
                                        <paper-input type="text" name="desc" label="Food Description" value="${this.dftDesc}" required auto-validate error-message="FoodEx2 description not valid"></paper-input>
                                        <paper-input type="text" name="code" label="FoodEx2 Code" pattern="^${this.pattern}" required auto-validate error-message="FoodEx2 code not valid"></paper-input>          
                                    </form>
                                </iron-form>
                                <paper-icon-button title="Clean form" icon="clear" @click="${() => this.resetForm(this.form2)}"></paper-icon-button>
                                <paper-icon-button title="Send feedback" icon="send" @click="${() => this.sendFeedback(this.form2)}"></paper-icon-button>
                            </label>
                        </fieldset>
                    </div>
                </paper-dialog-scrollable>
                <div class="buttons">
                    <paper-button dialog-dismiss>Close</paper-button>
                </div>           
            </paper-dialog>
        `
    }

    /**
     * Reflects property values to attributes and calls render to render DOM via lit-html.
     * 
     * @param {*} changedProperties 
     */
    updated(changedProperties) {
        // check if property has been updated
        var newRecords = changedProperties.has('records');
        // if new records update current code to propose
        if (newRecords) {
            this.record = this.records.pop();
        }

        return newRecords;
    }

    /**
     * Called after the element’s DOM has been updated the first time, immediately before updated is called.
     */
    firstUpdated() {
        // get the item from default object
        let u = JSON.parse(localStorage.getItem('user'));
        // if a custom value exsists update default one
        if (u != null) {
            // update user
            this.enableFastFeedback = u.username.includes("@efsa.europa.eu");
            // update list of codes
            this.populateForm();
        }
    }

    /**
     *  Open feedback paper-dialog.
     */
    open() {
        // get codes to be improved
        this.populateForm();
        // get the dialog
        let dialog = this.shadowRoot.getElementById(this.dialog);
        // show the dialog
        dialog.open();
    }

    /**
     * Post feedback to backend API.
     */
    sendFeedback(formName) {
        // get form item
        const form = this.shadowRoot.getElementById(formName);
        // if the form contains not valid values
        if (!form.validate()) {
            alert("The fields cannot be empty.");
            return;
        }

        // add form and username to data to post
        var data = form.serializeForm();
        // add the from language to the json obj
        data.lang = localStorage.getItem('lang');
        // stringify the obj
        data = JSON.stringify(data);

        // ask reconfirmation to user
        var choice = confirm("Please confirm the data before submitting: \n" + data);

        // if accept than post data
        if (choice) {
            this.postRequest(this.postUrl, this.token, data);
            if (formName == this.form1) {
                form.children[0].children[2].value = "";
                this.populateForm();
            }
        }
    }

    /**
     * Post request to back-end API
     * 
     * @param {*} url // url to fetch
     * @param {*} token // x-access-token
     * @param {*} data // body data
     */
    postRequest(url, token, data) {
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: data,
        }).then(res => res.json()
        ).then(res => (url.pathname.includes("get_codes")) ? this.handleResponse(res) : alert(res.message)
        ).catch((err) => alert('Error:', err));
    }

    /**
     * Parse the returned json response to array
     * 
     * @param {Object} res 
     */
    handleResponse(res) {
        this.records = Object.values(res).map(v => [v.fullCode, v.fullDesc]);
    }

    /**
     * populate the fast feedback engine with the returned unsure records
     */
    populateForm() {
        // if no more items than get new codes
        if (this.enableFastFeedback && this.records.length <= 0) {
            var body = JSON.stringify({ "n": 5 });
            this.postRequest(this.getUrl, this.token, body);
        } else {
            // update the new record to show
            this.record = this.records.pop();
        }
    }

    /** 
     * Reset form
     */
    resetForm(formName) {
        this.shadowRoot.getElementById(formName).reset();
    }

}

customElements.define("feedback-component", FeedbackComponent)