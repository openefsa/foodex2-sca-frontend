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
        this.accuracy;
        this.index;
        this.dialogName = "dialogId";
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    <div class="grid-container-2col-auto">
                        <div>Description</div>
                        <div style="display: flex; justify-content: flex-end">Accuracy: ${this.accuracy=Math.round(this.accuracy)}%</div>
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
                            <div>${this.selCode}</div>
                        </div>
                        <div>
                            <button class="submit-style" @click="${this.next}">></button>
                        </div>
                    </div>
                </div>
                <div class="grid-container-2col-auto">
                    <div>You did not find your FoodEx2 code? Click <a href="#" @click="${this.classify}">here</a></div>
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