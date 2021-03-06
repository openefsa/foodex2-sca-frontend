/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\overview-component.js
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

class OverviewComponent extends LitElement {

    static get properties() {
        return {
            fieldId: {
                type: String
            },
            bt: {
                type: Object
            },
            fcs: {
                type: Object
            }
        }
    }

    static get styles() {
        return css`
            #overview {
                min-height: 100px;
                height: calc(100% - 25px);
                border:1px solid lightgray;
                border-radius: 4px;
                overflow-y: auto;
            }

            #overview > tag {
                margin: 3px;
            }

            .selected-bt {
                font-family: Arial;
                font-size:13px;
                width:auto;
                border: 1px solid lightgray;
                border-radius: 4px;
                text-align: center;
                padding: 5px; 
                background: #bad0e7;
                float: left;
                cursor: pointer;
            }

            .selected-fc {
                font-family: Arial;
                font-size:13px;
                width:auto;
                border: 1px solid lightgray;
                border-radius: 4px;
                text-align: center;
                padding: 5px; 
                background: #cde69c;
                float: left;
                cursor: pointer;
            }

            .inner-bt{
                font-family: Arial;
                font-size:13px;
                border-radius: 2px;
                padding: 2px;
                margin: 2px;
                background: #2f3774;
                color: #bad0e7;
            }
            
            .inner-fc{
                font-family: Arial;
                font-size:13px;
                border-radius: 2px;
                padding: 2px;
                margin: 2px;
                background: #1f3f2b;
                color: #cde69c;
            }
        `;
    }

    constructor() {
        super();
        this.fieldId = "overview";
        this.bt = null;
        this.fcs = new Array();
    }

    render() {
        return html`
            <div>Overview</div>
            <div id="${this.fieldId}"></div>
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

        // update the tags field if bt/fc is selected
        if (changedBt || changedFcs) {
            this.populateTags();
        }
        return changedBt || changedFcs;
    }

    /**
     * Populate overview section with list of selected terms.
     */
    populateTags() {

        // get the fiels component
        var tagInput = this.shadowRoot.getElementById(this.fieldId);

        // return if div undefined
        if (!tagInput)
            return;

        // clean the content of the element and baseterm
        tagInput.innerHTML = null;

        // add baseterm
        if (this.bt) {
            this.addTag(tagInput, this.bt, "bt");
        }
        // add facets
        if (this.fcs) {
            this.fcs.forEach(fc => {
                this.addTag(tagInput, fc, "fc");
            });
        }
    }

    /**
     * Add tag to overview.
     * 
     * @param  {Object} tagInput
     * @param  {Object} term
     * @param  {String} type
     */
    addTag(tagInput, term, type) {
        // create main tag
        var tag = document.createElement('tag');
        tag.setAttribute('class', 'selected-' + type);
        tag.innerHTML = term.name;
        // append the inner label to the tag
        var innerTag = document.createElement('tag');
        innerTag.setAttribute('class', 'inner-' + type);
        innerTag.innerHTML = (type === "bt") ? type.toUpperCase() : term.cat;
        tag.appendChild(innerTag);

        // TODO append remove button (allows to remove a tag directly from overview)

        // when clicking on tag
        tag.onclick = () => {
            // fire event to parent
            let event = new CustomEvent('showInfo', { detail: term });
            this.dispatchEvent(event);
        }
        // append main tag to overview field
        tagInput.appendChild(tag);
    }
}

customElements.define("overview-component", OverviewComponent)