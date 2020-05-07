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
import '@polymer/iron-form/iron-form.js';


class User {
    constructor(user) {
        this.usr = user;
    }

    getUsername() {
        return this.usr;
    }

    isLoggedIn() {
        return (this.usr != null);
    }
}

export class LoginPage extends LitElement {

    static get properties() {
        return {
            url: {
                type: URL
            },
            user: {
                type: User
            },
            activatePb: {
                type: Boolean
            }
        }
    }

    static get styles() {
        return css`
        .flex-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .flex-container > * {
            margin: 20px;
            padding: 5px;
        }

        paper-input {
            width: 400px;
            max-width:700px;
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
        this.user = new User();
        this.activatePb = false;
        // url to which post user info
        this.url = new URL('http://51.124.148.195:5000/login');
    }

    render() {
        return html`
        <div class="flex-container">
            ${this.user.isLoggedIn()
                ? html`
                    <label>Username: ${this.user.getUsername()}</label>
                    <paper-button raised @click="${this.logout}">Logout</paper-button>
                `
                : html`
                    <iron-form id="iron-form">
                        <form>
                            <paper-input type="text" name="usrname" label="Username" required auto-validate error-message="Username missing"></paper-input>
                            <paper-input type="password" name="pswd" label="Password" required auto-validate error-message="Please provide a password"></paper-input>
                        </form>
                    </iron-form>
                    <paper-button raised @click="${this.login}">Login</paper-button>
                `
            }

            <label>You ${this.user.isLoggedIn() ? html`are` : html`are not`} logged in<label>
        </div>
        <wc-progress-bar .activate="${this.activatePb}"></wc-progress-bar>
        `
    }

    /* save new status on local storage */
    updateUser() {
        // hide progress bar dialog
        this.activatePb = false;
        // save new user on local storage
        localStorage.setItem("user", JSON.stringify(this.user));
        // fire event to parent
        let event = new CustomEvent('userStatus', {
            detail: {
                loggedIn: this.user.isLoggedIn()
            }
        });
        this.dispatchEvent(event);
    }

    /* method used for performing login (limited users) */
    login() {

        // get form item
        const form = this.shadowRoot.getElementById("iron-form");

        // if the form contains not valid values
        if (!form.validate()) {
            alert("The fields cannot be empty.");
            return;
        }

        // show progress bar dialog
        this.activatePb = true;

        // jsonify the object
        var data = form.serializeForm();

        // post data
        fetch(this.url, {
            method: 'POST', // or 'PUT'
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(data.usrname + ":" + data.pswd)
            }
        }).then(res => res.json()
        ).then(res => {
            // allert user
            alert('Login successful.');
            // update user
            this.user = new User(res.usrname);
            // fire event to parent
            this.updateUser();
        }).catch((err) => {
            alert('Error or no user found.', err);
            this.logout();
        });

    }

    /* method used for performing logout */
    logout() {
        // update user
        this.user = new User();
        // fire event to parent
        this.updateUser();
    }
}

customElements.define('login-page', LoginPage)