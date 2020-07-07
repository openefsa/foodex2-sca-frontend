/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\wc-feedback-dialog.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 7th April 2020
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

import config from "../../config.js"

import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';

export class WcFeedbackDialog extends LitElement {

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
            url: {
                type: URL
            },
            feedback_shared_key: {
                type: String
            }
        }
    }

    static get styles() {
        return css`

        .flex-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
        }

        .flex-container > .flex-item {
            flex: 1;
        }

        .flex-container > .col-item {
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
            max-height: 400px;
            min-width: 500px;
            margin: 10px;
            padding: 10px;
            border-radius: 5px;
        }

        table {
            border: 1px solid black;
            width: 100%;
            height: 100%;
        }

        th,
        td {
            border: solid 1px;
            text-align: center;
        }

        td > input {
            width: 100%;
            border:none;
        }

        `;
    }

    constructor() {
        super();
        this.feedback = "feedback";
        this.dialog = "dialog";
        this.dftDesc = "";
        // url to which post feedbacks
        this.url = new URL('http://127.0.0.1:5000/postFeedback');
        // regex pattern used for validating foodex2 code
        this.pattern = "\\w{5}|\\w{5}((?=\#?)(\#\\w{3}\.\\w{5})|(\#\\w{3}\.\\w{5}((?=\\$?)(\\$\\w{3}\\.\\w{5})+)))";
        // key used to submit feedbacks
        this.feedback_shared_key = config["SECRET_KEY"];
    }

    render() {

        return html`

            <div id="${this.feedback}" class="flex-container">
                <div class="flex-item">Help us to improve &rarr; </div>
                <paper-fab mini class="col-item" icon="feedback" title="Send feedback" @click="${this.open}"></paper-fab>
            </div>
            
            <paper-dialog id="${this.dialog}" no-cancel-on-outside-click>
                
                    <h2>Feedback section</h2>
                    
                    <iron-form id="iron-form">
                        <form>
                            <paper-input type="text" name="desc" label="Food Description" value="${this.dftDesc}" required auto-validate error-message="Username missing"></paper-input>
                            <paper-input type="text" name="code" label="FoodEx2 Code" pattern="^${this.pattern}" required auto-validate error-message="FoodEx2 code not valid"></paper-input>          
                        </form>
                    </iron-form>
                    
                    <div class="buttons">
                        <paper-button @click="${this.resetForm}">Reset</paper-button>
                        <paper-button dialog-dismiss>Cancel</paper-button>
                        <paper-button raised dialog-confirm @click="${this.sendFeedback}">Accept</paper-button>
                    </div>
                    
            </paper-dialog>
            
        `
    }

    /* allow specific users to send feedbacks */
    open() {
        // get the dialog
        let dialog = this.shadowRoot.getElementById(this.dialog);
        // show the dialog
        dialog.open();
    }

    /* Reset form containing paper-input elements */
    resetForm() {
        this.shadowRoot.getElementById("iron-form").reset();
    }

    /* enable feedback modal dialog only if the user is enabled to */
    enableFeedback(flag) {
        let displayStyle = flag ? "block" : "none";
        this.shadowRoot.getElementById(this.feedback).style.display = displayStyle;
    }

    /* send feedback to backend */
    sendFeedback() {
        // get form item
        const form = this.shadowRoot.getElementById("iron-form");

        // if the form contains not valid values
        if (!form.validate()) {
            alert("The fields cannot be empty.");
            return;
        }

        // add form and username to data to post
        var data = JSON.stringify(form.serializeForm());

        // ask reconfirmation to user
        var choice = confirm("Please confirm the data before submitting: \n" + data);

        // if accept than post data
        if (choice) {
            fetch(this.url, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': this.feedback_shared_key
                },
                body: data,
            }).then(res => res.json()
            ).then(res => alert(res.message)
            ).catch((err) => alert('Error:', err));
        }
    }

}

customElements.define("wc-feedback-dialog", WcFeedbackDialog)