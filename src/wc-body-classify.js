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
            },
            baseterm: {
                type: Array
            },
            facets: {
                type: Array
            }
        }
    }

    constructor() {
        super();
        this.tagId = 'tags';
        this.classStyle = '';
        this.ppText = new Map();
        this.baseterm = new Array();
        this.facets = new Array();
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <label>Tag </label>
                    <div style="display: inline-block;">
                        <form id="form">
                            <input type="radio" name="radio" value="bt" @click="${this.updateType}">Baseterm(bt)</input>
                            <input type="radio" name="radio" value="fc" @click="${this.updateType}">Facet/s(fc)</input>
                        </form>
                    </div>
                </div>
                <div class='input-button-grid'>
                    <div id="${this.tagId}"></div>
                    <div>
                        <button class="submit-style" @click="${this.handleClick}"> &#8594; </button>
                    </div>
                </div>
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
                    // if no stop word
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

        // when clicking on tag
        tagInput.onclick = (item) => {
            var tag = item.target;
            if (tag.tagName === "TAG") {
                // if tag has already a child
                if (tag.lastElementChild) {

                    var innerTag = tag.lastElementChild;

                    switch (innerTag.innerHTML) {
                        case "bt":
                            console.log("remove from baseterms");
                            this.baseterm.splice(this.baseterm.indexOf(tag.childNodes[0].nodeValue), 1);
                            break;
                        case "fc":
                            console.log("remove from facets ", tag.childNodes[0].nodeValue);
                            this.facets.splice(this.facets.indexOf(tag.childNodes[0].nodeValue), 1);
                    }

                    // remove it
                    tag.removeChild(innerTag);
                    // clear style
                    tag.setAttribute("class", type);

                } else {

                    switch (type) {
                        case "bt":
                            console.log("add to baseterm");
                            this.baseterm.push(tag.childNodes[0].nodeValue);
                            break;
                        case "fc":
                            console.log("add to facets ", tag.innerHTML);
                            this.facets.push(tag.childNodes[0].nodeValue);
                    }

                    // set the tag as selected
                    tag.setAttribute("class", "selected-" + type);
                    // append th new inner tag
                    var innerTag = document.createElement('inner-' + type);
                    innerTag.innerHTML = type;
                    tag.appendChild(innerTag);
                }

                // fire the event ot the parent
                this.fireEvent(this.baseterm, this.facets);
            }
        };
    }

    // propagate event to parent component
    fireEvent(baseterm, facets) {
        let event = new CustomEvent('classified', {
            detail: {
                baseterm: baseterm,
                facets: facets
            }
        });
        this.dispatchEvent(event);
    }

    // propagate event to parent component
    handleClick() {
        this.dispatchEvent(new CustomEvent('sugg'));
    }
}

customElements.define("wc-body-classify", WcBodyClassify)