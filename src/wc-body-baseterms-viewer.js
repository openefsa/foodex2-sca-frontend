import {
    LitElement,
    html
} from 'lit-element'
import {
    style
} from './main-styles.js'

class Term {
    constructor(name, code, acc) {
        this.name = name;
        this.code = code;
        this.acc = acc;
    }
}

// overrides the toString default method
Term.prototype.toString = function toString() {
    var ret = 'Name: ' + this.name + 
            '\nCode: ' + this.code + 
            '\nAccuracy: ' + this.acc.toFixed(2) + '%';
    return ret;
}

export class WcBodyBasetermsViewer extends LitElement {
    static get properties() {
        return {
            fieldId: {
                type: String
            },
            baseterms: {
                type: Object
            }
        }
    }

    constructor() {
        super();
        this.fieldId = "btViewer";
        this.baseterms = null;
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    Select a baseterm
                    <div id="${this.fieldId}" class="scroll_container"></div>
                </div>
            </main>
            `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var newBaseterms = changedProperties.has('baseterms');
        
        // if new baseterms list update field
        if (newBaseterms)
            this.populateBaseterms();

        return newBaseterms;
    }

    // populate baseterm viewer with list of baseterms
    populateBaseterms() {

        // get the fiels component
        var tagInput = this.shadowRoot.getElementById(this.fieldId);

        // return if div undefined
        if (!tagInput)
            return;

        // clean the component content
        tagInput.innerHTML = null;

        // map each baseterm
        var results = Object.entries(this.baseterms).map(([key, value]) => new Term(value.name, key, value.acc*100));

        // flag for auto-selecting first term
        var flag = true;

        // iterate each baseterm in list
        results.forEach(term => {

            // create inner tag with baseterm properties
            var tag = document.createElement('button');
            tag.setAttribute('class', 'inner-bt');
            tag.innerHTML = term.name;
            // use the toString and shows the tooltip with term information
            tag.title = term; 
            
            // when clicking on tag
            tag.onclick = () => {
                
                if (tag.style.backgroundColor === "") {
                    // clean all buttons styles since only single term can be selected
                    Array.from(tagInput.getElementsByTagName("button")).forEach(term => {
                        term.style.background = ""
                    });
                    // apply the selection only to single term (since olny one baseterm can be selected)
                    tag.style.backgroundColor = "#bad0e7";
                    
                    // update the selected baseterm
                    this.updatedBt(term);
                } else {
                    // reset button style
                    tag.style.backgroundColor = "";
                    // update the selected baseterm
                    this.updatedBt(null);
                }
            };

            // append the new inner tag
            tagInput.appendChild(tag);

            // auto select first term
            if(flag){
                tag.onclick.apply(tag);
                flag = false;
            }

        }, this);
    }

    // method used for updating the baseterm selection
    updatedBt(bt) {
        // fire event to parent
        let event = new CustomEvent('bt', {
            detail: {
                selectedBt: bt
            }
        });
        this.dispatchEvent(event);
    }

}

customElements.define("wc-body-baseterms-viewer", WcBodyBasetermsViewer)