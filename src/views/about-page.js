/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\about-page.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 2nd April 2020
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

import config from "../../config.js";

class AboutPage extends LitElement {

    static get properties() {
        return {}
    }

    static get styles() {
        return css`
        .content {
            height: 100%;
            margin: 5px;
            padding: 5px;
        }
        `;
    }

    constructor() {
        super();
    }

    render() {

        return html`
        <div class="content">
            <h2>FoodEx2 Smart Coding Application - version ${config.VERSION}</h2>

            <ul>
                <li><a href="https://github.com/openefsa/foodex2-sca-frontend/wiki" target="_blank">Github front end</a></li>
                <li><a href="https://github.com/openefsa/foodex2-sca-backend/wiki" target="_blank">Github back end</a></li>
                <li><a href="http://www.efsa.europa.eu/en/data/data-standardisation" target="_blank">EFSA Data Standardisation</a></li>
                <li><a href="http://www.efsa.europa.eu/en/" target="_blank">EFSA website</a></li>
            </ul>
        </div>
        `
    }

}

customElements.define('about-page', AboutPage)