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
            baseterms: {
                type: Array
            },
            facets: {
                type: Array
            },
            selBt: {
                type: Term
            },
            selFacets: {
                type: Array
            },
            code: {
                type: String
            },
            dialogName: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.baseterms = [];
        this.facets = [];
        this.selBt = null;
        this.selFacets = [];
        this.code = "";
        this.dialogName = "dialogId";
    }

    render() {
        return html`
            ${style}
            <main>
                <div>
                    <div>Select a baseterm:</div>
                    <div id="baseterms-suggested" class="scroll_container"></div>
                </div>
                <div>
                    <div>Select facets:</div>
                    <div id="facets-suggested" class="scroll_container">
                        <button class="inner-fc" style="background-color:#cde69c" @click="">hazelnuts</button>
                    </div>
                </div>
                <div>
                    <div>Description</div>
                    <div id="tags"></div>
                </div>
                <div>
                    <div>Your FoodEx2 Generated Code</div>
                    <div class="textarea">
                        <div>${this.code}</div>
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

        var basetermsChanged = changedProperties.has('baseterms');
        var selectedBt = changedProperties.has('selBt');

        // if codes has been updated
        if (basetermsChanged) {
            // populate the baseterms list
            this.populateBaseterms();
        }

        // update the tags field if baseterm is changed
        if (selectedBt) {
            // if selection has been changed
            this.populateTags();
        }

        // update the generated foodex2 code
        this.updateCode();

        return basetermsChanged || selectedBt;
    }

    // method used for populating list of baseterms
    populateBaseterms() {
        var tagInput = this.shadowRoot.getElementById('baseterms-suggested');

        // if div undefined
        if (!tagInput)
            return;

        // clean the content of the element and baseterm
        tagInput.innerHTML = "";

        this.baseterms.forEach(term => {

            var tag = document.createElement('button');
            tag.setAttribute('class', 'inner-bt');
            tag.innerHTML = term.name;

            // when clicking on tag
            tag.onclick = () => {
                if (tag.style.backgroundColor === "") {
                    // clean all buttons styles
                    Array.from(tagInput.getElementsByTagName("button")).forEach(item => {
                        item.style.backgroundColor = "";
                    });
                    // apply the selection only to single term (since olny one baseterm can be selected)
                    tag.style.backgroundColor = "#bad0e7";
                    // update the selected baseterm
                    this.selBt = new Term(term.name, term.code, term.affinity);
                    // update the suggested facets lists
                    this.populateFacets();
                } else {
                    // reset button style
                    tag.style.backgroundColor = "";
                    // update the selected baseterm
                    this.selBt = null;
                }
            };

            // append the new inner tag
            tagInput.appendChild(tag);

            // update the selected baseterm with null
            this.selBt = null;

        }, this);
    }

    // method used for populating the facets list area
    populateFacets(){

        var tagInput = this.shadowRoot.getElementById('facets-suggested');

        // if div undefined
        if (!tagInput)
            return;

        console.log("to finalise the facets population");
        // clean the content of the element and baseterm
        // tagInput.innerHTML = "";


    }

    // method used for populating the tags area
    populateTags() {

        var tagInput = this.shadowRoot.getElementById('tags');

        // if div undefined
        if (!tagInput)
            return;

        // clean the content of the element and baseterm
        tagInput.innerHTML = "";

        if (this.selBt) {
            // add baseterm
            this.addTag(tagInput, this.selBt, "bt");
            // add an example facet
            this.selFacets.push(new Term("hazelnuts", "A014L", "1"));
            // add tag for each facet term
            this.selFacets.forEach(term=>{
                this.addTag(tagInput, term, "fc");
            });
            /* add facets
            this.facets.forEach(function (term, i) {
                this.addTag(tagInput, term, "fc");
            });*/
        }
    }

    // method used for adding tags
    addTag(tagInput, term, type) {
        var tag = document.createElement('TAG');

        tag.setAttribute('class', 'selected-' + type);
        tag.innerHTML = term.name;
        // append the new inner tag
        var innerTag = document.createElement('inner-' + type);
        innerTag.innerHTML = (type==="fc")?"F04":type;//type;
        tag.appendChild(innerTag);

        tagInput.appendChild(tag);
    }

    // updated the information area
    classify() {

        if (this.isEmpty(this.code === null)) {
            alert("Codify a term before!");
            return;
        }

        // Get the modal
        var modal = this.shadowRoot.getElementById(this.dialogName);
        // activate modal component
        modal.showDialog();

    }

    // method ised for updateing the foodex2 code
    updateCode() {

        if (this.selBt) {
            this.code = this.selBt.code;
            if (this.selFacets.length > 0) {
                this.code += "#";
                this.selFacets.forEach(term => {
                    this.code += term.code;// + "$";
                });
            }
        }
    }

}

customElements.define("wc-body-showcode", WcBodyShowCode)