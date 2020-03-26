import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js';

export class WcBodyOverview extends LitElement {

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

    constructor() {
        super();
        this.fieldId = "tags";
        this.bt = null;
        this.fcs = new Array();
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    Overview
                    <div id="${this.fieldId}"></div>
                </div>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var changedBt = changedProperties.has('bt');
        var changedFcs = changedProperties.has('fcs');

        // update the tags field if bt/fc is selected
        if (changedBt || changedFcs)
            this.populateTags();
        
        return changedBt || changedFcs;
    }

    // populate overview area with list of selected terms
    populateTags() {

        // get the fiels component
        var tagInput = this.shadowRoot.getElementById(this.fieldId);

        // return if div undefined
        if (!tagInput)
            return;

        // clean the content of the element and baseterm
        tagInput.innerHTML = null;

        // add baseterm
        if (this.bt)
            this.addTag(tagInput, this.bt, "bt");

        // add facets
        if (this.fcs) {
            this.fcs.forEach(fc => {
                this.addTag(tagInput, fc, "fc");
            });
        }
    }

    // method used for adding tags
    addTag(tagInput, term, type) {
        // create main tag
        var tag = document.createElement('TAG');
        tag.setAttribute('class', 'selected-' + type);
        tag.innerHTML = term.name;
        // append the inner label to the tag
        var innerTag = document.createElement('inner-' + type);
        innerTag.innerHTML = (type === "bt") ? type.toUpperCase() : term.cat;
        tag.appendChild(innerTag);
        // append main tag to overview field
        tagInput.appendChild(tag);
    }

}

customElements.define("wc-body-overview", WcBodyOverview)