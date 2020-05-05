/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\login-page.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: Thursday, April 2nd 2020, 4:42:38 pm
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Last Modified: 2nd April 2020
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

import '@polymer/paper-input/paper-input.js';

class LoginPage extends LitElement {

    static get properties() {
        return {
            logedin: {
                type: Boolean
            }
        }
    }

    static get styles() {
        return css`
        .flex-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            justify-content: stretch; 
            height: 100%;
            margin: 10px;
            padding: 10px;
        }

        paper-input {
            width:100%;
            max-width: 600px;
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
        this.logedin = false;
    }

    render() {
        return html`
        <form id="form" is="iron-form" class="flex-container">
            <paper-input type="text" label="Username" required auto-validate error-message="Username missing"></paper-input>
            <paper-input type="email" label="Email" pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+" required auto-validate error-message="Email not valid"></paper-input>
            <paper-input type="password" label="Password" required auto-validate error-message="Please provide a password"></paper-input>
            <paper-button raised @click="${this.login}">Login</paper-button>
        </form>
        
        `
    }

    /* method used for performing login (limited users) */
    login() {

    }

    /* method used for performing logout */
    logout() {

    }
}

customElements.define('login-page', LoginPage)