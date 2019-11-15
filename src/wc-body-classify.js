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
            classStyle: {
                type: String
            },
            ppText: {
                type: Map
            }
        }
    }

    constructor() {
        super();
        this.tagId = 'tags';
        this.classStyle = '';
        this.ppText = new Map();
    }

    render() {
        return html `
            ${style}
            <main>
                <label>Tag </label>
                <form id="form">
                    <input type="radio" name="radio" value="bt" @click="${this.updateType}">Baseterm(bt)</input>
                    <input type="radio" name="radio" value="fc" @click="${this.updateType}">Facet/s(fc)</input>
                </form>
                <div id="${this.tagId}"/>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var ppTextUpdated = changedProperties.has('ppText');
        var radioUpdated = changedProperties.has('classStyle');

        // if map has been updated
        if (ppTextUpdated) {
            //console.log("requesting map update");
            this.populateTags();
        }

        // if term type has been updated
        if (radioUpdated) {
            //console.log("requesting radios update ", this.classStyle);
            this.updateClass(this.classStyle);
        }

        return ppTextUpdated && radioUpdated;
    }

    // method used for populating the tags area
    populateTags() {

        var tagInput = this.shadowRoot.getElementById('tags');

        // if div undefined
        if (!tagInput)
            return;

        // clean the content of the element
        while (tagInput.firstElementChild) {
            tagInput.removeChild(tagInput.firstElementChild);
        }

        for (const entry of this.ppText.entries()) {

            var tag;

            switch (entry[1]) {
                case 1:
                    // if stop word
                    tag = document.createElement('SW-TAG');
                    break;
                default:
                    // if stop word
                    tag = document.createElement('TAG');
            }

            tag.setAttribute("class", this.classStyle);
            tag.innerHTML = entry[0];

            tagInput.appendChild(tag);
        };
    }

    // change css class when term type is changed
    updateType() {

        var radios = this.shadowRoot.getElementById("form");

        // if undefined
        if (!radios)
            return;

        // update the global var if there is an element checked
        radios.childNodes.forEach(radio => {
            if (radio.nodeType == 1 && radio.checked)
                this.classStyle = radio.value;
        });

    }

    // method used for changing the style of the already existing tags
    updateClass(type) {

        var tagInput = this.shadowRoot.getElementById(this.tagId);

        // if element undefined
        if (!tagInput)
            return;

        // update the class style to all tags
        Array.from(tagInput.getElementsByTagName("TAG")).forEach(item => {

            // set class if empty update the already exsisting one otherwise
            if (item.classList.length <= 0)
                item.className = type;
            else if ((item.classList.contains("bt") && type != "bt"))
                item.classList.replace("bt", type);
            else if (item.classList.contains("fc") && type != "fc")
                item.classList.replace("fc", type);
        });

        // when clicking on tab
        tagInput.onclick = function (item) {
            var tag = item.target;
            if (tag.tagName === "TAG") {
                console.log("I have been clicked");
                // if tag has already a child
                if (tag.lastElementChild) {
                    // remove it
                    tag.removeChild(tag.lastElementChild);
                    // clear style
                    tag.setAttribute("class", type);
                } else {
                    // set the tag as selected
                    tag.setAttribute("class", "selected-" + type);
                    // append th new inner tag
                    var innerTag = document.createElement('inner-' + type);
                    innerTag.innerHTML = type;
                    tag.appendChild(innerTag);
                }
            }
        };
    }

}

customElements.define("wc-body-classify", WcBodyClassify)