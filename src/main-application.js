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

class MainApplication extends LitElement {

    static get properties() {
        return {
            selectedPage: { type: String }
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
        this.selectedPage="home";
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
                        <paper-listbox id="menu" selected="${this.selectedPage}" attr-for-selected="name" @click="${this.toggleDrawer}">
                            <paper-item name="home">
                                <iron-icon icon="home"></iron-icon>
                                <a href="#/home" name="name">Home</a>
                            </paper-item>
                            <paper-item name="settings">
                                <iron-icon icon="settings"></iron-icon>
                                <a href="#/settings" name="name">Settings</a>
                            </paper-item>
                            <paper-item name="about">
                                <iron-icon icon="info"></iron-icon>
                                <a href="#/about" name="name">About</a>
                            </paper-item>
                            <paper-item name="login">
                                <iron-icon icon="input"></iron-icon>
                                <a href="#/login" name="name">Login</a>
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
                            <paper-icon-button icon="menu" @click="${this.toggleDrawer}"></paper-icon-button>
                                <div main-title>FoodEx2 Smart Coding App</div>
                            <paper-icon-button icon="home" @click="${this.changePage}"></paper-icon-button>
                        </app-toolbar>

                        <!-- bottom toolbar -->
                    </app-header>

                    <!-- body -->
                    <!-- list/detail pages -->
                    <iron-pages selected="${this.selectedPage}" attr-for-selected="name">
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

    toggleDrawer() {
        var drawer = this.shadowRoot.getElementById('drawer');
        var menu = this.shadowRoot.getElementById('menu');
        if(menu.selected)
            this.selectedPage=menu.selected;
        drawer.toggle();
    }

    changePage() {
      this.selectedPage="home";
    }
}

customElements.define('main-application', MainApplication)