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
        return {
            dialog: {
                type: String
            }
        }
    }

    static get styles() {
        return css`
        .flex-container {
            display: flex;
            margin: 15px;
        }

        .push {
            margin-left: auto;
            text-align: center;
        }

        a {
            color: rgb(234, 113, 37);
        }

        .box {
            display: flex;
            flex-direction: column;
        }

        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 80px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        .modal-content {               
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #999;
            border: 1px solid rgba(0,0,0,.2);
            border-radius: 6px;
            -webkit-box-shadow: 0 3px 9px rgb(0 0 0 / 50%);
            box-shadow: 0 3px 9px rgb(0 0 0 / 50%);
            margin: auto;
            padding: 5px;
            border: 1px solid #888;
            width: 60%;
            min-height: 300px;
            height: 580px;
            max-height: 600px;
        }

        .user-manual-viewer {
            height: 92%;
            width: 100%;
            border: none;
        }

        .modal-footer {
            padding-top: 5px;
            text-align: right;
            border-top: 1px solid #e5e5e5;
        }

        /* R4EU style */
        .btn {
            display: inline-block;
            margin-bottom: 0;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            border-radius: 4px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* R4EU style */
        .btn-default {
            color: #333;
            background-color: #fff;
            border-color: #ccc;
        }

        `;
    }

    constructor() {
        super();
        this.dialog = "dialog";
    }

    render() {

        return html`
        <div class="content">

            <div class="flex-container">
                <img src="src/asset/icons/EFSALogo.svg" height="60px" style="padding-right: 50px;">
                <h2>FoodEx2 Smart Coding App</h2>
                
                <div class="push">
                    <div>
                        <p>
                            v ${config.VERSION}
                            • 
                            <a id="header-about" href="javascript:void(0);" @click="${this.showPDFDialog}">Manual</a>
                            • 
                            <a href="mailto:r4eu-issues@openanalytics.eu?subject=%5BR4EU%5D%20Support%20Question&body=First%20Name%3A%0D%0ALast%20Name%3A%0D%0AOrganization%3A%0D%0ACountry%3A%0D%0AR4EU%20Application%3A%0D%0AFeedback%20or%20Issue%3A" target="_blank">Report new issue</a>
                        </p>
                    </div>
                    <div>
                        <a href="https://doi.org/10.5281/zenodo.4473208" target="_blank">
                            <img src="src/asset/icons/zenodo.4473208.svg" alt="DOI: 10.5281/zenodo.4473208">
                        </a>
                    </div>
                </div>
            </div>
            <div class="box">
                <ul>
                    <li><a href="https://github.com/openefsa/foodex2-sca-frontend/wiki" target="_blank">Github front-end</a></li>
                    <li><a href="https://github.com/openefsa/foodex2-sca-backend/wiki" target="_blank">Github back-end</a></li>
                    <li><a href="http://www.efsa.europa.eu/en/data/data-standardisation" target="_blank">EFSA Data Standardisation</a></li>
                    <li><a href="http://www.efsa.europa.eu/en/" target="_blank">EFSA website</a></li>
                </ul>
            </div>
            <!-- The Modal -->
            <div id="${this.dialog}" class="modal">

                <!-- Modal content -->
                <div class="modal-content">
                    <iframe class="user-manual-viewer" src="src/asset/manual/manual-cat.pdf" title="webviewer" frameborder="0" width="100%" height="100%"></iframe>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="${this.closePDFDialog}">Dismiss</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    showPDFDialog() {
        // get the dialog
        let dialog = this.shadowRoot.getElementById(this.dialog);
        dialog.style.display = "block";
    }

    closePDFDialog() {
        // get the dialog
        let dialog = this.shadowRoot.getElementById(this.dialog);
        dialog.style.display = "none";
    }

}

customElements.define('about-page', AboutPage)
