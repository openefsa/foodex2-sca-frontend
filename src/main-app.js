/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\main-app.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 3rd April 2020
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

// import used dependencies
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import Navigo from 'navigo/lib/navigo.es.js';

// import web components
import './views/home-page.js';
import './views/mul-encoding-page.js';
import './views/settings-page.js';
import './views/about-page.js';
import './views/login-page.js';
import './components/input-component.js';
import './components/baseterm-component.js';
import './components/facets-component.js'
import './components/overview-component.js';
import './components/code-component.js';
import './components/feedback-component.js';
import './components/progress-bar-component.js';
import './components/terms-of-use.js';

class MainApp extends LitElement {

    static get properties() {
        return {
            router: { type: Object },
            route: { type: Object },
            loggedIn: { type: Boolean },
            enableFeedback: { type: Boolean },
            tou: { type: String }
        }
    }

    static get styles() {
        return css`
            :host {
                --primary-color: #18A592; //green
                --background-color: white;
                --text-color: white; //white

                --app-drawer-width: 200px;
            }

            app-toolbar {
                background-color: var(--primary-color);
                color: var(--text-color);
                height: 50px;
            }
    
            app-drawer-layout:not([narrow]) [drawer-toggle] {
                display: none;
            }
            
            paper-item {
                height: 54px;
            }
    
            paper-item > a {
                width: 100%;
                height: 100%;
                line-height: 54px;
                text-align: center;
                text-decoration: none;
                color: black;
            }
            
            iron-pages{
                width: 100%;
                height: 100%;
                padding-bottom: 30px;
                clear: both;
            }

            footer {
                display: flex;
                position: fixed;
                bottom:0;
                width: 100%;
                line-height: 30px;
                height: 30px;
                clear: both;
                background-color: var(--primary-color);
                color: var(--text-color);
                font-size: 12px;
                align-items: center;
            }

            .left-content {
                flex: 1;
            }
            
            .right-content {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }

            .flex-item {
                height: 30px;
                margin: 0 5px;
            }

            .separator {
                border: 0.1px solid white;
                background-color: white;
                height: 20px;
            }

            #ToU:hover {
                cursor:pointer;
                background-color: lightblue;
            }

            /* On screens that are 600px wide or less, make the columns stack on top of each other instead of next to each other */
            @media screen and (max-width: 600px) {
            .right-content {
                display: none !important;
            }
    }
        `;
    }

    constructor() {
        super();
        this.tou = "termsOfUse";
        this.router = new Navigo("/", true, "#")
        this.enableFeedback = !(window.location.hostname.includes('https://r4eu.efsa.europa.eu/'));

        this.router.on("home", () => {
            this.route = 'home'
        }).on("mul-encoding", () => {
            this.route = 'mul-encoding'
        }).on("settings", () => {
            this.route = 'settings'
        }).on("about", () => {
            this.route = 'about'
        }).on("login", () => {
            this.route = 'login'
        }).on('*', () => {
            this.router.navigate('/home');
        }).resolve();
    }

    /**
     * show the login button in the hamburger menu only if not in production
     * @returns 
     */
    showLoginButton() {
        return (this.enableFeedback)
            ? html`
                <paper-item name="login">
                    <iron-icon icon="input"></iron-icon>
                    <a href="#/login" drawer-toggle>Login</a>
                </paper-item>
                `
            : '';
    }

    /**
     * allow the accessibility to the login component
     * @returns 
     */
    showLoginPage() {
        return (this.enableFeedback)
            ? html`
                    <login-page name="login" @userStatus="${(e) => this.loggedIn = e.detail}"></login-page>
                `
            : '';
    }

    render() {

        return html`
        
            <app-drawer-layout fullbleed force-narrow>
            
                <!-- nav panel -->
                <app-drawer id="drawer" no-focus-trap="false" slot="drawer">
                
                    <app-header-layout has-scrolling-region>
                    
                        <app-header fixed slot="header">
                        
                            <!-- drawer header -->
                            <app-toolbar>Menu</app-toolbar>

                            <!-- bottom toolbar -->
                        </app-header>

                        <!-- nav menu -->                        
                        <paper-listbox id="menu" selected="${this.route}" attr-for-selected="name">
                            <paper-item name="home">
                                <iron-icon icon="home"></iron-icon>
                                <a href="#/home" drawer-toggle>Home</a>
                            </paper-item>
                            <paper-item name="mul-encoding">
                                <iron-icon icon="view-module"></iron-icon>
                                <a href="#/mul-encoding" drawer-toggle>Multi Encoding</a>
                            </paper-item>
                            <paper-item name="settings">
                                <iron-icon icon="settings"></iron-icon>
                                <a href="#/settings" drawer-toggle>Settings</a>
                            </paper-item>
                            <paper-item name="about">
                                <iron-icon icon="info"></iron-icon>
                                <a href="#/about" drawer-toggle>About</a>
                            </paper-item>
                            ${this.showLoginButton()}
                        </paper-listbox>

                    </app-header-layout>
                </app-drawer>

                <!-- main panel -->
                <app-header-layout fullbleed class="inner">
        
                    <!-- header -->
                    <app-header slot="header" fixed reveals condenses shadow>
                        <!-- top toolbar -->
                        <app-toolbar>
                            <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
                            <div main-title>FoodEx2 Smart Coding App</div>
                            <paper-icon-button icon="settings" @click="${() => this.router.navigate("#/settings")}"></paper-icon-button>
                            <paper-icon-button icon="home" @click="${() => this.router.navigate("#/home")}"></paper-icon-button>
                        </app-toolbar>

                        <!-- bottom toolbar -->
                    </app-header>

                    <!-- body -->
                    <!-- list/detail pages -->
                    <iron-pages selected="${this.route}" attr-for-selected="name">
                        <home-page name="home" .loggedIn="${this.loggedIn}"></home-page>
                        <mul-encoding-page name="mul-encoding"></mul-encoding-page>
                        <settings-page name="settings"></settings-page>
                        <about-page name="about"></about-page>
                        ${this.showLoginPage()}
                    </iron-pages>

                </app-header-layout>

                <!-- footer -->
                <footer>
                    <div class="left-content">
                        <div class="flex-item">European Food Safety Authority - <a id="ToU" @click="${this.open}">Terms of use</a></div>
                    </div>
                    <div class="right-content">
                        <div class="flex-item" title="Logged in">Logged: ${(localStorage["user"] != "{}") ? "🟢" : "🔴"}</div>
                        <div class="separator"></div>
                        <div class="flex-item" title="Language">Lang: ${localStorage["lang"]}</div>
                        <div class="separator"></div>
                        <div class="flex-item" title="Threshold">Thld: ${localStorage["thld"]}%</div>
                        <div class="separator"></div>
                        <div class="flex-item" title="Smart Accuracy">SmartAcc: ${(localStorage["smartAcc"] === "true") ? "🟢" : "🔴"}</div>
                        <div class="separator"></div>
                        <div class="flex-item" title="Auto base term/facets selection">Autosel[bt:${(localStorage["autoSelBt"] === "true") ? "🟢" : "🔴"},fcs:${(localStorage["autoSelFcs"] === "true") ? "🟢" : "🔴"}]</div>
                    </div>
                </footer>

            </app-drawer-layout>

            <terms-of-use id="${this.tou}"></terms-of-use>
        `
    }

    /**
     *  Open terms of use dialog.
     */
    open() {
        // get the component
        let c = this.shadowRoot.getElementById(this.tou);

        // show the dialog
        if (c) {
            c.open();
        }
    }
}

customElements.define('main-app', MainApp)