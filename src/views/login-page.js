import {
    LitElement,
    html,
    css
} from 'lit-element';

import '@polymer/paper-input/paper-input.js';

class LoginPage extends LitElement {

    static get properties() {
        return {}
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
        }

        .flex-container > * {
            margin: 5px;
            padding: 5px;
        }

        paper-input {
            width: 500px;
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
    }

    render() {

        return html`
        <div class="flex-container">
            <paper-input label="Email"></paper-input>
            <paper-input label="OpenAPI Token" type="password"></paper-input>
            <a href="https://openapi-portal.efsa.europa.eu/" target="_blank">Sign Up</a>
            <paper-button raised>Login</paper-button>
        </div>
        `
    }

}

customElements.define('login-page', LoginPage)