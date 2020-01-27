import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js';

class Term {
    constructor(name, code, affinity) {
        this.name = name;
        this.code = code;
        this.affinity = affinity;
    }
}

export class WcBodyShowCode extends LitElement {

    static get properties() {
        return {
            codes: {
                type: Array
            },
            selected: {
                type: Term
            },
            dialogName: {
                type: String
            },
            index: {
                type: Number
            }
        }
    }

    constructor() {
        super();
        this.codes = [];
        this.index;
        this.selected = {};
        this.dialogName = "dialogId";
    }

    render() {
        return html `
            ${style}
            <main>
                Select a baseterm:
                <div id="" class="scroll_container">
                    <button class="inner-bt" @click="">something</button>
                </div>
                Select the facets:
                <div class="scroll_container">
                    <button class="inner-fc" @click="">something</button>
                </div>
                <div>
                    <div class="grid-container-2col-auto">
                        <div>Description</div>
                        <div style="display: flex; justify-content: flex-end">Accuracy: ${Math.round(this.selected.affinity)}%</div>
                    </div>
                    <div id="tags"></div>
                </div>
                <div>
                    <div class="grid-container-2col-auto">
                        <div>Code</div>
                        <div style="display: flex; justify-content: flex-end">
                            Selected: ${this.index+1}/10
                        </div>
                    </div>
                    <div class="grid-container">
                        <div>
                            <button class="submit-style" @click="${this.prev}"><</button>
                        </div>
                        <div class="textarea">
                            <div>${this.selected.code}</div>
                        </div>
                        <div>
                            <button class="submit-style" @click="${this.next}">></button>
                        </div>
                    </div>
                </div>
                <div class="grid-container-2col-auto">
                    <div>If you did not find your FoodEx2 code click <a href="#" @click="${this.classify}">here</a></div>
                    <div style="display: flex; justify-content: flex-end">
                        <div class="tooltip">
                            <img src="src/icons/help.png"></img>
                            <span class="tooltiptext">For additional information check the following <a href="https://www.efsa.europa.eu/en/data/data-standardisation" target="_blank">link</a>.</span>
                        </div>
                    </div>
                </div>
                <!-- The Modal dialog -->
                <wc-body-classifier id="${this.dialogName}"></wc-body-classifier>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var codesChanged = changedProperties.has('codes');
        var selectChanged = changedProperties.has('selected');

        // if codes has been updated
        if (codesChanged) {
            var item = this.codes[this.index = 0];
            if (item) {
                this.selected = new Term(item.name, item.code, item.affinity);
            }
        }

        // if selection has been changed
        this.populateTags();

        return codesChanged || selectChanged;
    }

    // select the previous
    prev() {
        if (this.index > 0 && this.codes.length>0) {
            var item = this.codes[this.index -= 1];
            this.selected = new Term(item.name, item.code, item.affinity);
        }
    }

    // select the next
    next() {
        if (this.index < 9 && this.index > -1 && this.codes.length>0) {
            var item = this.codes[this.index += 1];
            this.selected = new Term(item.name, item.code, item.affinity);
        }
    }

    // method used for populating the tags area
    populateTags() {

        var tagInput = this.shadowRoot.getElementById('tags');

        // if div undefined
        if (!tagInput)
            return;
        
        // clean the content of the element and baseterm
        tagInput.innerHTML = "";

        var words = this.selected.name.split(';');

        var type = "bt";

        words.forEach(function (word, i) {
            // change style of tag if more than a term is present
            if (i > 0) {
                type = "fc";
            }

            var tag = document.createElement('TAG');
            tag.setAttribute('class', 'selected-' + type);
            tag.innerHTML = word;
            // append the new inner tag
            var innerTag = document.createElement('inner-' + type);
            innerTag.innerHTML = type;
            tag.appendChild(innerTag);

            tagInput.appendChild(tag);
        });
    }

    // updated the information area
    classify() {

        if (this.isEmpty(this.selected)) {
            alert("Codify a term before!");
            return;
        }

        // Get the modal
        var modal = this.shadowRoot.getElementById(this.dialogName);
        // activate modal component
        modal.showDialog();

    }

    // check if an object is empty
    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}

customElements.define("wc-body-showcode", WcBodyShowCode)