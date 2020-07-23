/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\code-component.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 3rd April 2020
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
} from 'lit-element'

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
            }
        }
    }

    static get styles() {
        return css`

            #codeViewer {
                font-family: Arial;
                color: red; 
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                height: 40px;
                border:1px solid lightgray;
                border-radius: 4px;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
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
    }

    render() {
        return html`
            <div>FoodEx2 Code</div>
            <div id="codeViewer">${this.code}</div>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var changedBt = changedProperties.has('bt');
        var changedFcs = changedProperties.has('fcs');

        // update the foodex2 code baset on selected bt/fcs
        if (changedBt || changedFcs)
            this.updateCode();

        return changedBt || changedFcs;
    }

    // method ised for updateing the foodex2 code
    updateCode() {

        if (!this.bt || this.bt == "")
            this.code = "";
        else {
            this.code = this.bt.code;

            var fcsLen = this.fcs.length;
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

}

customElements.define("code-component", CodeComponent)