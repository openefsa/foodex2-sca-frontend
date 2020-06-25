/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\wc-progress-bar.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 31st March 2020
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

import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-progress/paper-progress.js';

export class WcProgressBar extends LitElement {

    static get properties() {
        return {
            activate: {
                type: Boolean
            },
            pbId: {
                type: String
            },
            dialogId: {
                type: String
            }
        }
    }

    static get styles() {
        return css`
        `;
    }

    constructor() {
        super();
        this.activate = false;
        this.pbId = "progressBar";
        this.dialogId = "dialog";
    }

    render() {
        return html `
            <paper-dialog id="${this.dialogId}" modal no-cancel-on-outside-click>
                <h2>Fetching data</h2>
                <paper-progress id="${this.pbId}" indeterminate></paper-progress>
            </paper-dialog>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {
        // check if activate properties has been changed
        var activate = changedProperties.has('activate');
        
        // get the dialog component
        var dialog = this.shadowRoot.getElementById(this.dialogId);
        // get the progress bar 
        var pb = this.shadowRoot.getElementById(this.pbId);

        // change the dialog style if not null and activate has been changed
        if (activate && dialog && pb) {
            // open dialog and active progress bar
            dialog.toggle();
            pb.open = !this.activate;
        }

        return activate;
    }
}

customElements.define("wc-progress-bar", WcProgressBar)