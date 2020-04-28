import {
    LitElement,
    html,
    css
} from 'lit-element';

import '@polymer/polymer/lib/legacy/legacy-element-mixin.js';

import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';

import Navigo from 'navigo/lib/navigo.es.js';

class MainApp extends LitElement {

    static get properties() {
        return {
            router: { type: Object },
            route: { type: Object }
        }
    }

    static get styles() {
        return css`

            :host {
                --primary-color: #18A592; //green
                --background-color: red;
                --text-color: #fff; //white

                --app-drawer-width: 200px;
            }

            app-toolbar {
                background-color: var(--primary-color);
                color: var(--text-color);
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
                /* calculate page height, remove footer height */
                height: calc(100% - 30px);
            }

            footer {
                position:fixed;
                bottom:0;
                width: 100%;
                line-height: 30px;
                height: 30px;
                clear: both;
                background-color: var(--primary-color);
                color: var(--text-color);
                text-align: center;
            }
          
        `;
    }

    constructor() {
        super();

        this.router = new Navigo("/", true, "#")

        this.router.on("home", () => {
            this.route = 'home'
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
                            <paper-item name="settings">
                                <iron-icon icon="settings"></iron-icon>
                                <a href="#/settings" drawer-toggle>Settings</a>
                            </paper-item>
                            <paper-item name="about">
                                <iron-icon icon="info"></iron-icon>
                                <a href="#/about" drawer-toggle>About</a>
                            </paper-item>
                            <paper-item name="login">
                                <iron-icon icon="input"></iron-icon>
                                <a href="#/login" drawer-toggle>Login</a>
                            </paper-item>
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
                            <paper-icon-button icon="home" @click="${() => this.router.navigate("/home")}"></paper-icon-button>
                        </app-toolbar>

                        <!-- bottom toolbar -->
                    </app-header>

                    <!-- body -->
                    <!-- list/detail pages -->
                    <iron-pages selected="${this.route}" attr-for-selected="name">
                        <home-page name="home"></home-page>
                        <settings-page name="settings"></settings-page>
                        <about-page name="about"></about-page>
                        <login-page name="login"></login-page>
                    </iron-pages>

                    <!-- footer -->
                    <footer>
                        European Food Safety Authority
                    </footer>

                </app-header-layout>
            </app-drawer-layout>
        `
    }
}

customElements.define('main-app', MainApp)