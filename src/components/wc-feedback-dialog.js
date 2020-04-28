import {
    LitElement,
    html,
    css
} from 'lit-element';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

export class WcFeedbackDialog extends LitElement {

    static get properties() {
        return {
            feedback: {
                type: String
            },
            dialog: {
                type: String
            },
            text: {
                type: String
            },
            phText: {
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
            text-align: right;
        }

        .flex-container > .col-item {
            width: auto;
        }

        .container {
            margin: 10px;
            padding: 10px;
            border: 2px gray;
            border-radius: 5px;
        }

        paper-input {
            min-width: 500px;
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

        `;
    }

    constructor() {
        super();
        this.feedback = "feedback";
        this.dialog = "dialog";
        this.text = "";
        this.phText = "Enter a description appropriate to the foodex2 code to suggest";
    }

    render() {
        return html`

            <div id="${this.feedback}" class="flex-container">
                <div class="flex-item">If you have not find the correct FoodEx2 Code than please codify it manually and help us to improve &rarr; </div>
                <paper-fab mini class="col-item" icon="feedback" title="Send feedback" @click="${this.open}"></paper-fab>
            </div>
            
            <paper-dialog id="${this.dialog}" class="container" no-cancel-on-outside-click>
                <h2>Feedback section</h2>
                <paper-dialog-scrollable>
                    <paper-input label="Food Description 1" always-float-label placeholder="${this.phText}" value="${this.text}"></paper-input>
                    <paper-input label="Food Description 2 (optional)" always-float-label placeholder="${this.phText}"></paper-input>
                    <paper-input label="FoodEx2 Code"></paper-input>
                </paper-dialog-scrollable>
                <div class="buttons">
                    <paper-button dialog-dismiss>Cancel</paper-button>
                    <paper-button raised dialog-confirm>Accept</paper-button>
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

    /* enable feedback modal dialog only if the user is enabled to */
    enableFeedback(flag) {
        let displayStyle = flag ? "block" : "none";
        this.shadowRoot.getElementById(this.feedback).style.display = displayStyle;
    }
}

customElements.define("wc-feedback-dialog", WcFeedbackDialog)