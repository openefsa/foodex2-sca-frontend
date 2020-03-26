import {
    LitElement,
    html
} from 'lit-element'
import {
    style
} from './main-styles.js'

class Category {
    constructor(name, code, acc) {
        this.name = name;
        this.code = code;
        this.acc = acc.toFixed(4);
    }
}

class Facet {
    constructor(name, code, acc, cat) {
        this.name = name;
        this.code = code;
        this.acc = acc.toFixed(2);
        this.cat = cat;
    }
}

// overrides the toString default method
Facet.prototype.toString = function toString() {
    var ret = 'Name: ' + this.name +
        '\nCode: ' + this.code +
        '\nAccuracy: ' + this.acc + '%' +
        '\nCategory: ' + this.cat;
    return ret;
}

export class WcBoodyFacetsViewer extends LitElement {
    static get properties() {
        return {
            fcsFieldId: {
                type: String
            },
            catFieldId: {
                type: String
            },
            categories: {
                type: Array
            },
            facets: {
                type: Object
            },
            selectedCat: {
                type: Category
            },
            selectedFcs: {
                type: Object
            },
            threshold: {
                type: Number
            }

        }
    }

    constructor() {
        super();
        this.fcsFieldId = "fcsViewer";
        this.catFieldId = "catViewer";
        this.categories = [];
        this.facets = [];
        this.selectedCat = null;
        this.selectedFcs = new Array();
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    Select facets in
                    <select id="${this.catFieldId}" @change="${this.onCategorySelection}">
                        ${(this.categories)
                            ?(Object.entries(this.categories).map(([k, v]) => 
                                html`<option value=${k} @click="${(e) => this.onCategorySelection(e)}">${v.name} (${k})</option>`))
                            :( html`<option>None</option>`)}
                    </select>
                    <div id="${this.fcsFieldId}" class="scroll_container"></div>
                </div>
            </main>
            `
    }

    // listen to properties changes
    updated(changedProperties) {

        var newCategories = changedProperties.has('categories');
        var catChanged = changedProperties.has('selectedCat');
        var fcsChanged = changedProperties.has('selectedFcs');

        // if new facets list update fields
        if (newCategories) {
            // clean already selected facets
            this.selectedFcs = new Array();
            this.onCategorySelection();
            this.updateThreshold();
            //this.autoSelectFacets();
            this.populateFacets();
        }

        // if facets cat changed update facets input field
        if (catChanged)
            this.populateFacets();

        // if selected facets changed
        if (fcsChanged)
            this.updatedFcs();

        return newCategories || catChanged;
    }

    // event called when category is changed
    onCategorySelection() {

        // get the select fiedl component
        var key = this.shadowRoot.getElementById(this.catFieldId).value;

        // return if no exsisting categories or key not found
        if (!this.categories || this.categories[key] == undefined)
            return;

        // get obj of selected category
        var cat = this.categories[key];
        // map each facet for the selected category
        this.facets = Object.entries(cat.facets).map(([k, v]) => new Facet(v.name, k, v.acc*100, key));
        // update the selected category
        this.selectedCat = cat;

    }

    // calculate automatically the threshold for auto selecting facets (based on avg facets accuracy in relation with category accuracy)
    updateThreshold() {
        if (!this.facets || this.facets.length == 0)
            return;

        // get each facets accuracy as float number
        var data = this.facets.map(f => f.acc).map(Number);
        var avg = data.reduce((a, b) => a + b) / data.length;
        // calculate the threshold in relation with category accuracy
        this.threshold = avg * this.selectedCat.acc;
        console.log(`new threshold: ${this.threshold}`);
    }

    // auto select facets with higher accuracy
    autoSelectFacets() {
        
        Object.entries(this.categories).forEach(([k, v]) => {
            console.log("cat ", k);

            Object.entries(v.facets).forEach(([j, y]) => {
                var corr = v.acc * y.acc;
                console.log("fc ", corr > this.threshold);

                if (corr > this.threshold)
                    this.selectedFcs.push(new Facet(y.name, j, y.acc, k));
            });

        });
    }

    // method used for populating the facets list area
    populateFacets() {

        // get the select fiedl component
        var tagInput = this.shadowRoot.getElementById(this.fcsFieldId);

        // if undefined return
        if (!tagInput)
            return;

        // clean the content
        tagInput.innerHTML = null;

        // iterate each facet
        this.facets.forEach(fc => {

            var tag = document.createElement('button');
            tag.setAttribute('class', 'inner-fc');
            tag.innerHTML = fc.name;
            tag.value = fc.code;
            // use the toString and shows the tooltip with facet information
            tag.title = fc;

            //check if facet in selected facets
            const index = this.selectedFcs.findIndex(facet => (facet.code === fc.code && facet.cat == fc.cat));

            if (index > -1)
                // if term already selected change background color
                tag.style.backgroundColor = "#cde69c";
            /*else if ((fc.acc * this.selectedCat.acc) >= this.threshold) {
                // if facet not selected but accuracy higher than threshold auto select it
                this.selectTag(tag, fc);
            }*/

            // when clicking on tag
            tag.onclick = () => {
                this.selectTag(tag, fc);
            };

            // append the new inner tag
            tagInput.appendChild(tag);

        }, this);
    }

    // method used for changing tag style and add facet to selected list
    selectTag(tag, fc) {
        // change style of tag based on style property
        if (tag.style.backgroundColor == "") {
            // apply style to selection
            tag.style.backgroundColor = "#cde69c";
            // update the suggested facets lists
            this.addToFacets(fc);
        } else {
            // if facet already selected clean style
            tag.style.backgroundColor = "";
            // update the selected baseterm
            this.removeFromFacets(fc);
        }

        // update the parent with new selection
        this.updatedFcs();
    }

    // method used for adding the selected facet to the list of facets to show
    addToFacets(fc) {
        this.selectedFcs.push(fc);
    }

    // method used for removing the selected facet from the list of facets to show
    removeFromFacets(fc) {
        const index = this.selectedFcs.findIndex(facet => facet.code === fc.code);
        if (index > -1)
            this.selectedFcs.splice(index, 1);
    }

    // method used for updating the facets selection
    updatedFcs() {
        // fire event to parent
        let event = new CustomEvent('fcs', {
            detail: {
                selectedFcs: this.selectedFcs
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define("wc-body-facets-viewer", WcBoodyFacetsViewer)