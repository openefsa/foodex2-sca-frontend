import {
    LitElement,
    html,
    css
} from 'lit-element'

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

class WcBasetermsViewer extends LitElement {
    
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

    static get styles() {
        return css`

            #btViewer {
                height:40px;
                border:1px solid lightgray;
                border-radius: 4px;
                overflow: auto;
                white-space: nowrap;
            }

            #btViewer > * {
                margin: 2px;
            }

            .inner-bt {
                font-family: Arial;
                font-size: 13px;
                width:auto;
                height:30px;
                border: 1px solid lightgray;
                border-radius: 4px;
                text-align: center;
                padding: 5px; 
                cursor: pointer;
            }
                   
            .inner-bt:hover {
                background: #d8e3f0;
                color: #2f3774; 
            }

            /* width */
            ::-webkit-scrollbar {
                width: 5px;
            }

            /* height */
            ::-webkit-scrollbar {
                height: 5px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
                background: #f1f1f1; 
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #888; 
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #555; 
            }
            
        `;
    }

    constructor() {
        super();
        this.fieldId = "btViewer";
        this.baseterms = null;
    }

    render() {
        return html `
            <div>Select a baseterm</div>
            <div id="${this.fieldId}"></div>
            
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

customElements.define("wc-baseterms-viewer", WcBasetermsViewer)