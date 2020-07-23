/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\facets-component.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 20th April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
 * | Last Modified: Thursday, 24th June 2020
 * | Modified By: Alban Shahaj (shahaal)
 * | -----------------------------------------------------------------  
 * | Copyright (c) 2020 European Food Safety Authority (EFSA)
 * |                                                                    
 * *********************************************************************
 */



import {
    LitElement,
    html,
    css
} from 'lit-element'

class Facet {
    constructor(name, code, acc, cat) {
        this.name = name;
        this.code = code;
        this.acc = parseFloat((acc * 100).toFixed(2));
        this.cat = cat;
    }
}

class Category {
    constructor(name, code, acc, facets) {
        this.name = name;
        this.code = code;
        this.acc = parseFloat((acc * 100).toFixed(2));
        this.facets = Object.entries(facets).map(([k, v]) =>
            new Facet(v.name, k, v.acc, code)
        );
    }
}


// overrides the toString default method
Facet.prototype.toString = function toString() {
    var res = 'Name: ' + this.name +
        '\nCode: ' + this.code +
        '\nAccuracy: ' + this.acc + "%" +
        '\nCategory: ' + this.cat;
    return res;
}

class FacetsComponent extends LitElement {
    static get properties() {
        return {
            fcsFieldId: {
                type: String
            },
            catFieldId: {
                type: String
            },
            data: {
                type: Object
            },
            cats: {
                type: Object
            },
            selCat: {
                type: Object
            },
            selFcs: {
                type: Object
            },
            minCatAcc: {
                type: Number
            }
        }
    }

    static get styles() {
        return css`

        #fcsViewer {
            height: 40px;
            border:1px solid lightgray; 
            border-radius: 4px;
            overflow: auto;
            white-space: nowrap;
        }

        #fcsViewer > * {
            margin: 2px;
        }

        .fc {
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
               
        .fc:hover {
            background: #cde69c;
            color: #1f3f2b;
        }

        .inner-tag {
            font-family: Arial;
            font-size: 9px;
            width:auto;
            background: gray;
            color: #fff;
            border-radius: 4px;
            text-align: center;
            margin-left: 5px;
            padding: 2px; 
            cursor: pointer;
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
        this.fcsFieldId = "fcsViewer";
        this.catFieldId = "catViewer";
        this.cats = {};
        this.minCatAcc = 50;
    }

    render() {
        return html`
            <div>
                <label>Select facets in
                    <select required id="${this.catFieldId}" @change="${this.onCategorySelection}">
                        ${(Object.values(this.cats).length <= 0)
                            ? html` <option>none</option>`
                            : Object.values(this.cats).map(i => html`<option value=${i.code}>${i.code} - ${i.name} (${i.acc}%)</option>`)
                        }
                    </select>
                </label>
            </div>
            <div id="${this.fcsFieldId}"></div>
            
            `
    }

    /**
     * Listen for property changes
     * @param {*} changedProperties 
     */
    updated(changedProperties) {

        var newData = changedProperties.has('data');
        var newCats = changedProperties.has('cats');
        var catChanged = changedProperties.has('selCat');
        var fcsChanged = changedProperties.has('selFcs');

        // if new data update categories and selected facets
        if (newData) {
            this.populateCategories();
            this.autoSelectFacets();
        }

        // if new list of categories than auto select first option
        if (newCats) {
            this.onCategorySelection();
        }

        // if facets cat changed update facets input field
        if (catChanged) {
            this.populateFacets();
        }

        // if selected facets changed
        if (fcsChanged) {
            this.updatedFcs();
        }

        return newData || catChanged || fcsChanged;
    }

    /**
     * method used for populating the categories and calculate an average threshold 
     * for enabling auto selection (for each category)
     */
    populateCategories() {
        // return if no categories are available
        if (!this.data)
            return;
        // initialise the categories and facets
        this.cats = new Object();
        this.selFcs = new Array();
        // map each facet for the selected category
        Object.entries(this.data).map(([k, v]) => {
            this.cats[k] = new Category(v.name, k, v.acc, v.facets);
        });
    }

    /**
     * hanfle event when facet category is changed
     */
    onCategorySelection() {
        // get the select field component
        var sel = this.shadowRoot.getElementById(this.catFieldId);
        // return if no exsisting categories or key not found
        if (!sel || !this.cats || !sel.value) {
            return;
        }
        var cat = this.cats[sel.value];
        // get selected category
        this.selCat = cat ? cat : null;
    }

    /**
     * auto select facets with accuracy higher than the min one for the specific category
     */
    autoSelectFacets() {
        // return if auto facet selection is disabled
        if (localStorage.getItem('fcAutoSel') === 'true') {
            var temp = [];
            // iterate over facet categories
            Object.values(this.cats).forEach(c => {
                if (c.acc > this.minCatAcc) {
                    // iterate facets in category
                    Object.values(c.facets).forEach(f => {
                        // add the facet object if accuracy higher than threshold in category
                        if (f.acc > this.minCatAcc) {
                            temp.push(f);
                        }
                    });
                }
            });
            // update the selected facets
            this.selFcs = temp;
        }
    }

    // method used for populating the facets list area
    populateFacets() {

        // get the select field component
        var tagInput = this.shadowRoot.getElementById(this.fcsFieldId);
        // if undefined return
        if (!tagInput) {
            return;
        }
        // clean the content
        tagInput.innerHTML = null;
        // if undefined selected food category
        if (!this.selCat) {
            return;
        }
        // iterate each facet
        this.selCat.facets.forEach(fc => {

            var tag = document.createElement('button');
            tag.setAttribute('class', 'fc');
            tag.innerHTML = fc.name;
            tag.value = fc.code;
            // use the toString and shows the tooltip with facet information
            tag.title = fc;

            // append the inner label to the tag
            var innerTag = document.createElement('tag');
            innerTag.setAttribute('class', 'inner-tag');
            innerTag.innerHTML = fc.acc + "%";
            tag.appendChild(innerTag);

            //check if facet in selected facets
            const index = this.selFcs.findIndex(f => (f.code === fc.code && f.cat == fc.cat));

            // if term already selected change background color
            if (index > -1) {
                tag.style.backgroundColor = "#cde69c";
            }

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
        this.selFcs.push(fc);
    }

    // method used for removing the selected facet from the list of facets to show
    removeFromFacets(fc) {
        const index = this.selFcs.findIndex(facet => facet.code === fc.code);
        if (index > -1) {
            this.selFcs.splice(index, 1);
        }
    }

    // method used for updating the facets selection
    updatedFcs() {
        if (!this.selFcs)
            return;
        // fire event to parent
        let event = new CustomEvent('fcs', {
            detail: {
                selectedFcs: this.selFcs
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define("facets-component", FacetsComponent)