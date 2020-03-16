import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

import '@material/mwc-icon-button'
import '@material/mwc-icon'
import '@material/mwc-menu'
import '@material/mwc-list/mwc-list-item'

export class WcHeader extends LitElement {

    static get properties() {
        return {
            btnId:{
                type: String
            },
            menuId:{
                type: String
            },
            settingsId:{
                type: String
            },
            loginId:{
                type: String
            }
        }
    }

    constructor() {
        super();
        this.btnId = "btn";
        this.menuId = "menu";
        this.settingsId = "settings";
        this.loginId = "login";
    }

    render() {

        return html `
            ${style}
            <div id="header" class="grid-container">
                <div>
                    <img src="src/icons/FE2.jpg" class="expand"></img>
                </div>
                <div>
                    <span id="title">FoodEx2 Smart Coding App</span>
                </div>
                <div>
                    <mwc-icon-button id="${this.btnId}" icon="more_vert" slot="actionItems" @click="${this.openMenu}"></mwc-icon-button>
                    <mwc-menu id="${this.menuId}" fixed x=-180 y=0 corner="BOTTOM_START">
                        <mwc-list-item twoline graphic="avatar" noninteractive>
                            <span>User Name</span>
                            <span slot="secondary">user@domain.com</span>
                            <mwc-icon slot="graphic">person</mwc-icon>
                        </mwc-list-item>
                        <li divider role="separator"></li>
                        <mwc-list-item graphic="icon" @click="${this.openSettings}">
                            <mwc-icon slot="graphic">settings</mwc-icon>
                            <span>Settings</span>
                        </mwc-list-item>
                        <mwc-list-item graphic="icon" @click="">
                            <slot>FAQ</slot>
                            <mwc-icon slot="graphic">help_outline</mwc-icon>
                        </mwc-list-item>
                        <mwc-list-item graphic="icon" @click="${this.openLogin}">
                            <slot>Sign in</slot>
                            <mwc-icon slot="graphic">exit_to_app</mwc-icon>
                        </mwc-list-item>
                    </mwc-menu>
                </div>
            </div>

            <!-- The Settings Modal dialog -->
            <wc-header-settings id="${this.settingsId}"></wc-header-settings>
            <!-- The Login Modal dialog -->
            <wc-header-login id="${this.loginId}"></wc-header-login>
        `
    }

    // show the web component man menu
    openMenu() {

        // get the menu and the button
        var menu = this.shadowRoot.getElementById(this.menuId);
        var button = this.shadowRoot.getElementById(this.btnId);

        // anchor a parent with menu
        menu.anchor = button;

        // show the menu
        menu.show();

    }

    // show the settings modal
    openSettings(){
        // get the settings modal
        var settings = this.shadowRoot.getElementById(this.settingsId);
        settings.show();
    }
    
    // show the settings modal
    openLogin(){
        // get the settings modal
        var login = this.shadowRoot.getElementById(this.loginId);
        login.show();
    }
}

customElements.define('wc-header', WcHeader)