import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js';

export class WcBodyShowCode extends LitElement {

    static get properties() {
        return {
            codes: {
                type: Array
            },
            selCode: {
                type: String
            },
            selName: {
                type: String
            },
            dialogName: {
                type: String
            },
            index: {
                type: Number
            },
            accuracy: {
                type: Number
            }
        }
    }

    constructor() {
        super();
        this.codes = [];
        this.selCode = "";
        this.selName = "";
        this.accuracy = -1;
        this.index = -1;
        this.dialogName = "dialogId";
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    <label>Description</label>
                    <div id="tags"></div>
                </div>
                <div>
                    <label>Code</label>
                    <div class="grid-container">
                        <div>
                            <button class="submit-style" @click="${this.prev}"><</button>
                        </div>
                        <div class="textarea">
                            <div>${this.selCode}</div>
                        </div>
                        <div>
                            <button class="submit-style" @click="${this.next}">></button>
                        </div>
                    </div>
                </div>
                <div class="grid-container">
                    <p>${this.index+1}/10</p>
                    <p>Accuracy: ${this.accuracy=Math.round(this.accuracy*100000)}%</p>
                    <p class="tooltip">
                        <img src="src/icons/help.png"></img>
                        <span class="tooltiptext">For additional information check the following <a href="https://www.efsa.europa.eu/en/data/data-standardisation" target="_blank">link</a>.\nInstead, if the returned results are not correct click <a href="#" @click="${this.classify}">here</a>.</span>
                    </p>
                </div>
                <!-- The Modal dialog -->
                <wc-body-classifier id="${this.dialogName}"></wc-body-classifier>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var changed = changedProperties.has('codes');
        var ui_interaction = changedProperties.has('selCode');

        // if codes has been updated
        if (changed) {
            if (this.codes[0]) {
                this.index = 0;
                var item = this.codes[this.index];
                this.selCode = item.code;
                this.selName = item.name;
                this.accuracy = item.affinity;
            }
        }

        // update tags area
        this.populateTags();

        return changed || ui_interaction;
    }

    // select the previous
    prev() {
        if (this.index > 0) {
            this.index -= 1;
            var item = this.codes[this.index];
            this.selCode = item.code;
            this.selName = item.name;
            this.accuracy = item.affinity;
        }
    }

    // select the next
    next() {
        if (this.index < 9 && this.index>-1) {
            this.index += 1;
            var item = this.codes[this.index];
            this.selCode = item.code;
            this.selName = item.name;
            this.accuracy = item.affinity;
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

        var words = this.selName.split(';');

        var type = "bt";

        words.forEach(function (word, i) {

            console.log("iter");
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

        if(!this.selName || !this.selCode){
            alert("Codify a term before!");
            return;
        }

        // Get the modal
        var modal = this.shadowRoot.getElementById(this.dialogName);
        // activate modal component
        modal.showDialog();

    }

}

customElements.define("wc-body-showcode", WcBodyShowCode)