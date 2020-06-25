/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\login-page.js
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

import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-form/iron-form.js';


class User {
    constructor(email, token) {
        this.email = email;
        this.token = token;
    }

    getEmail() {
        return this.email;
    }

    isLoggedIn() {
        return (this.email != null && this.token != null);
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
            },
            remember: {
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
        this.remember = JSON.parse(localStorage.getItem('remember'));
        // url to which post user info
        //this.url = new URL('http://51.124.148.195:5000/login');
        this.url = new URL('http://127.0.0.1:5000/getToken');
    }

    render() {
        return html`
        <div class="flex-container">
            ${this.user.isLoggedIn()
                ? html`
                    <label>Email: ${this.user.getEmail()}</label>
                    <paper-button raised @click="${this.logout}">Logout</paper-button>
                `
                : html`
                    <iron-form id="iron-form">
                        <form>
                            <paper-input type="email" name="email" label="Email" required auto-validate error-message="Username missing"></paper-input>
                            <paper-input type="password" name="pswd" label="Password" required auto-validate error-message="Please provide a password"></paper-input>
                        </form>
                    </iron-form>
                    <div>
                        <input type="checkbox" value="lsRememberMe" .checked="${this.remember}" @click="${this.toggleCheck}"> <label for="rememberMe">Remember me</label>
                    </div>
                    <paper-button raised @click="${this.login}">Login</paper-button>
                `
            }

            <label>You ${this.user.isLoggedIn() ? html`are` : html`are not`} logged in<label>
        </div>
        <wc-progress-bar .activate="${this.activatePb}"></wc-progress-bar>
        `
    }

    /* Called after the element’s DOM has been updated the first time, immediately before updated is called. */
    firstUpdated() {
        // get the item from default object
        let u = JSON.parse(localStorage.getItem('user'));
        // if a custom value exsists update default one
        if (u != null) {
            // update user
            this.user = new User(u.email, u.token);
            // fire event to parent
            this.updateUser();
        }
    }

    /* toggle the remember me flag */
    toggleCheck() {
        this.remember = !this.remember;
        localStorage.setItem('remember', this.remember);
        
    }

    /* save new status on local storage */
    updateUser() {
        // hide progress bar dialog
        this.activatePb = false;
        // save new user on local storage
        if (this.remember) {
            localStorage.setItem('user', JSON.stringify(this.user));
        } else {
            localStorage.removeItem('user');
        }
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(data.email + ':' + data.pswd)
            }
        }).then(res => res.json()
        ).then(res => {
            // allert user
            alert('Login successful.');
            // update user
            this.user = new User(data.email, res.token);
            // fire event to parent
            this.updateUser();
        }).catch((err) => {
            alert('Error during login. Please contact administartor.', err);
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