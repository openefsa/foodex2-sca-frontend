/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\code-component.js
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
} from 'lit-element'

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-icon-button/paper-icon-button-light.js';

class CodeComponent extends LitElement {

    static get properties() {
        return {
            bt: {
                type: Object
            },
            fcs: {
                type: Object
            },
            code: {
                type: String
            },
            codeViewer: {
                type: String
            },
            codeTooltip: {
                type: String
            }
        }
    }

    static get styles() {
        return css`

            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;    
                border:1px solid lightgray;
                border-radius: 4px;
            }

            input {
                border: 0px;
                border-radius: 4px;
            }

            #codeViewer {
                flex: 1;
                color: red; 
                font-size: 14px;
                font-family: Arial;
                text-align: center;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
                line-height: 40px;
                height: 40px;
                margin-right: 5px;
            }

            .tooltip .tooltiptext {
                visibility: hidden;
                width: 140px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px;
                position: absolute;
                z-index: 1;
                bottom: 150%;
                left: 50%;
                margin-left: -140px;
                opacity: 0;
                transition: opacity 0.3s;
            }
                
            .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: 55px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }
                
            .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
            }

            /* width */
            ::-webkit-scrollbar {
                width: 5px;
            }

            /* height */
            ::-webkit-scrollbar {
                height: 5px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: #f1f1f1; 
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #888; 
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
            
        `;
    }

    constructor() {
        super();
        this.bt = null;
        this.fcs = new Array();
        this.code = "";
        this.codeViewer = "codeViewer";
        this.codeTooltip = "codeTooltip";
    }

    render() {
        return html`
            <div>FoodEx2 Code</div>
            <div class="container">
                <input id="${this.codeViewer}" type="text" value="${this.code}" readonly></input>
                <div class="tooltip">
                    <paper-icon-button-light>
                        <button title="Copy code" @click="${this.copyCode}" @mouseout="${this.resetTooltip}">
                            <span class="tooltiptext" id="${this.codeTooltip}">Copy to clipboard</span>
                            <iron-icon icon="content-copy"></iron-icon>
                        </button>
                    </paper-icon-button-light>
                </div>
            </div>
        `
    }

    /**
     * Update div UI when specific property value is changed.
     * 
     * @param  {*} changedProperties
     */
    shouldUpdate(changedProperties) {

        var changedBt = changedProperties.has('bt');
        var changedFcs = changedProperties.has('fcs');

        // update the foodex2 code baset on selected bt/fcs
        if (changedBt || changedFcs)
            this.updateCode();

        return changedBt || changedFcs;
    }

    /**
     * Method used for updating the FoodEx2 code.
     */
    updateCode() {

        if (!this.bt || this.bt == "")
            this.code = "";
        else {
            this.code = this.bt.code;

            var fcsLen = this.fcs.length;
            // sort list by category (if cat same than by code)
            this.fcs = this.fcs.sort((a, b) => (a.cat > b.cat) ? 1 : (a.cat === b.cat) ? ((a.code > b.code) ? 1 : -1) : -1 );
            for (var i = 0; i < fcsLen; i++) {
                if (i == 0)
                    this.code += "#";
                var fc = this.fcs[i];
                this.code += fc.cat + "." + fc.code;
                if (i < fcsLen - 1)
                    this.code = this.code + "$";
            }
        }
    }

    /**
     * this method allows to copy the FoodEx2 code generated
     */
    copyCode() {
        var copyCode = this.shadowRoot.getElementById(this.codeViewer);
        // show alert if no code is available
        if(copyCode.value.length<=0) {
            alert("Nothing to copy.");
        }
        copyCode.select();
        document.execCommand("copy");
        // show the tooltip with the code copied
        var tooltip = this.shadowRoot.getElementById(this.codeTooltip);
        tooltip.innerHTML = "Copied: " + copyCode.value;
    }

    /**
     * Reset tooltip
     */
    resetTooltip() {
        var tooltip = this.shadowRoot.getElementById(this.codeTooltip);
        if(tooltip) {
            tooltip.innerHTML = "Copy to clipboard";
        }
    }

}

customElements.define("code-component", CodeComponent)