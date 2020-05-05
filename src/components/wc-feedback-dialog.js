/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\wc-feedback-dialog.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: Tuesday, April 7th 2020, 9:49:30 am
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Last Modified: 7th April 2020
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

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
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
        // create the url to which post feedbacks
        this.url = new URL('http://51.124.148.195:5000/sendFeedback');
        // regex pattern used for validating foodex2 code
        this.pattern = "\\w{5}|\\w{5}((?=\#?)(\#\\w{3}\.\\w{5})|(\#\\w{3}\.\\w{5}((?=\\$?)(\\$\\w{3}\\.\\w{5})+)))";
    }

    render() {

        return html`

            <div id="${this.feedback}" class="flex-container">
                <div class="flex-item">If you have not find the correct FoodEx2 Code than please codify it manually and help us to improve &rarr; </div>
                <paper-fab mini class="col-item" icon="feedback" title="Send feedback" @click="${this.open}"></paper-fab>
            </div>
            
            <paper-dialog id="${this.dialog}" no-cancel-on-outside-click>
                
                    <h2>Feedback section</h2>
                    
                    
                    <iron-form id="form">
                        <form>
                            <paper-input type="text" label="Food Description" value="${this.dftDesc}" required auto-validate error-message="Username missing"></paper-input>
                            <paper-input type="text" label="FoodEx2 Code" pattern="^${this.pattern}" required auto-validate error-message="FoodEx2 code not valid"></paper-input>        
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
        console.log("ciao");
        this.shadowRoot.getElementById("form").reset();
    }

    /* enable feedback modal dialog only if the user is enabled to */
    enableFeedback(flag) {
        let displayStyle = flag ? "block" : "none";
        this.shadowRoot.getElementById(this.feedback).style.display = displayStyle;
    }

    /* send feedback to backend */
    sendFeedback() {
        // get values from cells in feedback table
        var val = this.getCellValues();
        // if no object returned alert user
        if (!val || !val.length) {
            alert("The fields cannot be empty.");
            return;
        }
        // stringify the data
        var data = JSON.stringify(val);
        // ask reconfirmation to user
        var choice = confirm(data);
        // if accept than post data
        if (choice) {
            fetch(this.url, {
                method: 'POST', // or 'PUT'
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }).then(res => res.json()
            ).then(data => {
                alert('Success:', data);
            }).catch((err) => {
                alert('Error:', err);
            });
        }
    }

}

customElements.define("wc-feedback-dialog", WcFeedbackDialog)