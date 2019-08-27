import { LitElement, html } from 'lit-element';

import { style } from './main-styles.js';

export class WcBodyClassify extends LitElement {

    static get properties() {
        return {
            listAreaId: { type: String },
            classAreaId: { type: String },
            termTypeId: { type: String },
            tagInputId: { type: String },
            tokens: { type: Array },
            classification: { type: Array },
            selOption: { type: Number }
        }
    }

    constructor() {
        super()
        this.listAreaId = 'tokens';
        this.classAreaId = 'classification';
        this.termTypeId = 'term-type';
        this.tagInputId = 'tag-input';
        this.tokens = new Array();
        this.classification = new Array();
        this.selOption = 0;
    }

    render() {
        return html`
            ${style}
            <main>
                <label>Classify tokens</label>
                <div class="grid-container">
                    <div>
                        <label>Tokens</label>
                    </div>
                    <div></div>
                    <div>
                        <select id="${this.termTypeId}" class="left" @change="${this.updateIndex}">
                            <option value="0">Baseterm</option>
                        </select>
                        <button @click="${this.addOption}" class="right">&#43;</button>
                        <button @click="${this.removeOption}" class="right">&#45;</button>
                    </div>
                    <div>
                        <select id="${this.listAreaId}" class="list-style" onload="${this.populate()}" multiple="multiple"></select>
                    </div>
                    <div>
                        <button @click="${this.moveRight}" class="command">&#26;</button>
                        <button @click="${this.moveLeft}" class="command">&#27;</button>
                    </div>
                    <div>
                        <select id="${this.classAreaId}" class="list-style" multiple="multiple"></select>
                    </div>
                </div>
                <label>Result</label>
                <div id="tags" onload="${this.populateTags()}"></div>
            </main>
        `
    }

    /* method used to update the gloabal index used for the dropdown list */
    updateIndex() {

        // get the dropdown element
        var dropdown = this.shadowRoot.getElementById(this.termTypeId);

        // return if not defined
        if (!dropdown)
            return;

        // get the value selected in the dropdown
        this.selOption = dropdown.value;

        console.log("updated index", this.selOption);


        // get the classify area
        var element = this.shadowRoot.getElementById(this.classAreaId);

        // update the UI
        this.updateUI(element, this.classification[this.selOption]);

    }

    /* method used for populating the main div with list of buttons for each word */
    populate() {

        // get the div to which append the buttons
        var div = this.shadowRoot.getElementById(this.listAreaId);

        // return if div or words not defined
        if (!div || this.tokens === undefined) {
            return;
        }

        // update the UI
        this.updateUI(div, this.tokens);
    }

    // method used for removing an option to the drop down list
    addOption() {

        // get reference to select element
        var sel = this.shadowRoot.getElementById(this.termTypeId);

        // get last index of the dropdown list
        var value = sel.options.length;

        // create new option element
        var opt = document.createElement('option');

        // create text node to add to option element (opt)
        opt.appendChild(document.createTextNode("Facet " + value));

        // set value property of opt
        opt.value = value;

        console.log("adding option ", opt.value);

        // add opt to end of select box (sel)
        sel.appendChild(opt);
    }

    // method used for adding an option to the drop down list
    removeOption() {

        // get reference to select element
        var sel = this.shadowRoot.getElementById(this.termTypeId);

        // cannot remove baseterm option
        if (sel.value === 0)
            return;

        // remove the selected options 
        var length = sel.options.length;
        for (var i = 1; i < length; i++) {
            if (sel.options[i].value == sel.value) {
                sel.remove(i);
                break;
            }
        }

    }

    // method used for adding the tokens selected to the classify section
    moveRight() {

        // get the list area
        var list = this.shadowRoot.getElementById(this.listAreaId);

        // if the list is not null
        if (!list)
            return;

        // get all the text of the selected options
        let selectedValues = Array.from(list.selectedOptions)
            .map(option => option.textContent);

        // if no value return
        if (selectedValues.length <= 0)
            return;

        console.log("adding", selectedValues);

        // add the selected values to the array at index
        if (this.classification[this.selOption])
            this.classification[this.selOption] = this.classification[this.selOption].concat(selectedValues);
        else
            this.classification[this.selOption] = selectedValues;

        // remove the tokens from the list
        this.tokens = this.tokens.filter(function (x) {
            return selectedValues.indexOf(x) < 0;
        });

        // get the classify area
        var element = this.shadowRoot.getElementById(this.classAreaId);

        // update the list ui
        this.updateUI(list, this.tokens);

        // update the classify ui
        this.updateUI(element, this.classification[this.selOption])

    }

    // method used for removing the tokens selected from the classify section
    moveLeft() {

        // get the list area
        var list = this.shadowRoot.getElementById(this.classAreaId);

        // if the list is not null
        if (!list)
            return;

        // get all the text of the selected options
        let selectedValues = Array.from(list.selectedOptions)
            .map(option => option.textContent);

        // if no value return
        if (selectedValues.length <= 0)
            return;

        console.log("removing", selectedValues);

        // add back the values to the original array
        this.tokens = this.tokens.concat(selectedValues);

        // remove the tokens from the list
        this.classification[this.selOption] = this.classification[this.selOption].filter(function (x) {
            return selectedValues.indexOf(x) < 0;
        });

        // get the list area
        var element = this.shadowRoot.getElementById(this.listAreaId);

        // update the classify ui
        this.updateUI(list, this.classification[this.selOption])

        // update the list ui
        this.updateUI(element, this.tokens);

    }

    // method used for updating the ui
    updateUI(element, list) {

        // if list undefined
        if (!list)
            return;

        // clean the content of the element
        this.cleanElement(element);

        // fill the list with the values given in input
        for (var i = 0; i < list.length; i++) {
            // button with word text
            var opt = document.createElement("OPTION");
            //opt.setAttribute("type", "checkbox");
            opt.textContent = list[i];
            // append the button to the div
            element.appendChild(opt);
        }
    }

    /* method used for populating the tags area */
    populateTags() {

        var tagInput = this.shadowRoot.getElementById("tags");

        // clean the content of the element
        this.cleanElement(tagInput);

        for(var i=0; i<this.tokens.length; i++){
            
            var newSpan = document.createElement('span');
            newSpan.setAttribute("class","tag");
            var innerSpan = document.createElement('span');
            innerSpan.innerHTML = this.tokens[i]+'&nbsp;&nbsp';
            var innerRef = document.createElement('a');
            innerRef.href = "#";
            innerRef.title = "Removing tag";
            innerRef.text = "x";
            innerRef.onclick = function() {
                console.log("remove item");
                //return $('#' + id).removeTag(escape(value));
            }
            
            newSpan.appendChild(innerSpan);
            newSpan.appendChild(innerRef);
            tagInput.appendChild(newSpan);
        }
    }

    /* mthod used for removing all the childs content */
    cleanElement(element){

        // if element undefined
        if (!element)
            return;

        // clear the element content
        while (element.firstElementChild) {
            element.removeChild(element.firstElementChild);
        }
    }

    function(e) {
        // comma|enter (add more keyCodes delimited with | pipe)
        if (/(188|13)/.test(e.which)) $(this).focusout();
    }

    function() {
        if (confirm("Really delete this tag?")) $(this).remove();
    }

}

customElements.define("wc-body-classify", WcBodyClassify)