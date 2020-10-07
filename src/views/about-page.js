/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\views\about-page.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 2nd April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Last Modified: Thursday, 7 October 2020
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
            <h2>FoodEx2 Smart Coding Application - Test v.1.0</h2>
            The FoodEx2 Smart Coding Application is a new platform, developed in EFSA through a cross collaboration between DATA and AMU units and aims to help data providers to faster codify according to the FoodEx2 classification and description the food items they need to submit to EFSA. It adopts different techniques of artificial intelligence, more specifically machine learning and text mining. This allows to get FoodEx2 codes suggestions starting from a free text which describes a particular food that the data provider inputs.
            </br><b>Please note that the tool is in the testing phase.</b>
            </br></br>Useful links:</br>

            <ul>
                <li><a href="https://github.com/openefsa/foodex2-sca-frontend/wiki" target="_blank">Github front-end</a></li>
                <li><a href="https://github.com/openefsa/foodex2-sca-backend/wiki" target="_blank">Github back-end</a></li>
                <li><a href="url" target="_blank">Frequently Asked Questions</a>.</li>
                <li><a href="http://www.efsa.europa.eu/en/data/data-standardisation" target="_blank">EFSA Data Standardisation</a></li>
                <li><a href="http://www.efsa.europa.eu/en/" target="_blank">EFSA web site</a></li>
            </ul>
        </div>
        `
    }

}

customElements.define('about-page', AboutPage)