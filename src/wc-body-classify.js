import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js';

export class WcBodyClassify extends LitElement {

    static get properties() {
        return {
            tagId: {
                type: String
            },
            tokens: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.tagId = 'tags';
        this.tokens = new Array();
    }

    render() {
        return html `
            ${style}
            <main>
                <label>Key Words</label>
                <div id="${this.tagId}" onload="${this.populateTags()}"></div>
            </main>
        `
    }

    /* method used for populating the tags area */
    populateTags() {

        var tagInput = this.shadowRoot.getElementById(this.tagId);

        // clean the content of the element
        this.cleanElement(tagInput);

        for (var i = 0; i < this.tokens.length; i++) {

            var newSpan = document.createElement('span');
            newSpan.setAttribute("class", "tag");
            var innerSpan = document.createElement('span');
            innerSpan.innerHTML = this.tokens[i] + '&nbsp;&nbsp';
            var innerRef = document.createElement('a');
            innerRef.href = "#";
            innerRef.title = "Remove tag";
            innerRef.text = "x";
            innerRef.onclick = function () {
                console.log("remove item");
                //return $('#' + id).removeTag(escape(value));
            }

            newSpan.appendChild(innerSpan);
            newSpan.appendChild(innerRef);
            tagInput.appendChild(newSpan);
        }
    }

    /* method used for removing all the childs content */
    cleanElement(element) {

        // if element undefined
        if (!element)
            return;

        // clear the element content
        while (element.firstElementChild) {
            element.removeChild(element.firstElementChild);
        }
    }

}

customElements.define("wc-body-classify", WcBodyClassify)