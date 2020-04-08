import {
    LitElement,
    html,
    css
} from 'lit-element';

class WcOverview extends LitElement {

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
                height: 90%;
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
        return html `
            <div>Overview</div>
            <div id="${this.fieldId}"></div>
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
        var tag = document.createElement('tag');
        tag.setAttribute('class', 'selected-' + type);
        tag.innerHTML = term.name;
        // append the inner label to the tag
        var innerTag = document.createElement('tag');
        innerTag.setAttribute('class', 'inner-' + type);
        innerTag.innerHTML = (type === "bt") ? type.toUpperCase() : term.cat;
        tag.appendChild(innerTag);
        // append main tag to overview field
        tagInput.appendChild(tag);
    }

}

customElements.define("wc-overview", WcOverview)