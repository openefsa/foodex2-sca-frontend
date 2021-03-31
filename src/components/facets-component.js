/*
 * *********************************************************************
 * |                                                                    
 * | File: \src\components\facets-component.js
 * | Project: foodex2-smart-coding-app-frontend
 * | Created Date: 20th April 2020
 * | Author: Alban Shahaj (shahaal)
 * | Email: data.collection@efsa.europa.eu
 * | -----------------------------------------------------------------  
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
    /**
     * Constructor of Facet class.
     * 
     * @param {*} code 
     * @param {*} cat 
     * @param {*} obj 
     */
    constructor(cat, obj) {
        this.code = obj.termCode;
        this.name = obj.termExtendedName;
        this.scopeNote = obj.termScopeNote;
        this.termType = obj.termType;
        this.detailLevel = obj.detailLevel;
        this.deprecated = obj.deprecated;
        this.cat = cat;
        this.acc = parseInt(obj.acc * 100);
    }
}

class Category {
    /**
     * Constructor of Category class.
     * 
     * @param {*} code 
     * @param {*} obj 
     */
    constructor(obj) {
        this.code = obj.code;
        this.label = obj.label;
        this.name = obj.name;
        this.scopeNote = obj.scopeNote;
        this.deprecated = obj.deprecated;
        this.attributeReportable = obj.attributeReportable;
        this.attributeSingleOrRepeatable = obj.attributeSingleOrRepeatable;
        this.acc = parseInt(obj.acc * 100);
        this.facets = Object.values(obj.facets).map(ob => new Facet(this.code, ob));
        this.noFacets = this.facets.length;
    }
}


/**
 * Overrides default toString method.
 */
Facet.prototype.toString = function toString() {
    var res = 'Name: ' + this.name +
        '\nCode: ' + this.code +
        '\nAccuracy: ' + this.acc + "%" +
        '\nCategory: ' + this.cat;
    return res;
}

/**
 * Overrides default toString method.
 */
Category.prototype.toString = function toString() {
    var res = 'Name: ' + this.name +
        '\nLabel: ' + this.label +
        '\nCode: ' + this.code +
        '\nAccuracy: ' + this.acc + "%" +
        '\nFacets suggested: ' + this.noFacets;
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
            bt: {
                type: Object
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
                ? html`<option>none</option>`
                : Object.values(this.cats).map(i => html`
                                <option value="${i.code}" title="${i}">
                                    ${i.code} ${i.label} (${i.acc}%) - ${i.noFacets} facets
                                </option>`)
            }
                    </select>
                </label>
            </div>
            <div id="${this.fcsFieldId}"></div>
            
            `
    }

    /**
     * Reflects property values to attributes and calls render to render DOM via lit-html.
     * 
     * @param {*} changedProperties 
     */
    updated(changedProperties) {

        var btChanged = changedProperties.has('bt');
        var newData = changedProperties.has('data');
        var newCats = changedProperties.has('cats');
        var catChanged = changedProperties.has('selCat');
        var fcsChanged = changedProperties.has('selFcs');

        /**
         * If new data available than update categories and auto select facets (if enabled).
         * 
         * @param  {Boolean} newData
         */
        if (newData) {
            this.populateCategories();
        }

        /**
         * If new bt selected than than auto select facets (if enabled).
         * 
         * @param  {Boolean} newData
         */
        if (btChanged) {
            this.autoSelectFacets();
        }

        /**
         * If new list of categories than auto select first option.
         * 
         * @param  {Boolean} newCats
         */
        if (newCats) {
            this.onCategorySelection();
        }

        /**
         * If category is changed than update facet tags.
         * 
         * @param  {Boolean} catChanged
         */
        if (catChanged || btChanged) {
            this.populateFacets();
        }

        /**
         * If facets selection is raised.
         * 
         * @param  {Boolean} fcsChanged
         */
        if (fcsChanged) {
            this.updatedFcs();
        }

        return newData || catChanged || btChanged || fcsChanged;
    }

    /**
     * Populate facet categories
     */
    populateCategories() {
        // return if no categories are available
        if (!this.data)
            return;
        // initialise the categories and facets
        this.cats = new Object();
        this.selFcs = new Array();
        // map each facet for the selected category
        Object.values(this.data).map(obj => {
            this.cats[obj.code] = new Category(obj);
        });
    }

    /**
     * handle event when facet category is changed.
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
     * Auto select facets when category and facet in category have both an accuracy higher than the minimum default accuracy.
     */
    autoSelectFacets() {
        // return if auto facet selection is disabled
        if (localStorage.getItem('fcsAutoSel') === 'true') {
            var temp = [];
            // iterate over facet categories
            Object.values(this.cats).forEach(c => {
                if (c.acc > this.minCatAcc) {
                    // iterate facets in category
                    Object.values(c.facets).forEach(f => {
                        // add the facet object if accuracy higher than threshold in category
                        if (f.code != this.bt.code && f.acc > this.minCatAcc) {
                            temp.push(f);
                        }
                    });
                }
            });
            // update the selected facets
            this.selFcs = temp;
        }
    }

    /**
     * Method used to create term's tag
     * 
     * @param {*} tagType 
     * @param {*} tagClass 
     * @param {*} disable 
     * @param {*} tagLabel 
     * @param {*} tagTitle 
     */
    createTag(tagType, tagClass, disable, tagLabel, tagTitle) {
        var tag = document.createElement(tagType);
        if (tagClass != null)
            tag.setAttribute('class', tagClass);
        tag.disabled = disable;
        tag.innerHTML = tagLabel;
        if (tagTitle != null)
            tag.title = tagTitle;
        return tag;
    }

    /**
     *  Populate the facets-component section with the list of returned facets.
     */
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

        if (this.selCat.facets.length > 0) {
            // iterate each facet
            this.selCat.facets.forEach(fc => {
                // create inner tag with baseterm properties
                var tag = this.createTag('button', 'fc', false, fc.name, fc);
                // append the inner label to the tag
                var innerTag = this.createTag('tag', 'inner-tag', true, fc.acc + "%", null);
                // append inner tag to tag
                tag.appendChild(innerTag);
                // if bt is selected than not allow selection of facet equal to bt
                if (this.bt) {
                    tag.disabled = (this.bt.code === fc.code);
                }

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
        } else {
            // create empty tag
            var termName = "No suggestions found";
            var termTitle = "I'm sorry but I couldn't find any foodex2 terms relevant to the description provided, please change the food description and try again.";
            var emptyTag = this.createTag('button', null, true, termName, termTitle);
            // append the new inner tag
            tagInput.appendChild(emptyTag);
        }
    }

    /**
     * Changing the tag style and add facet to selected list.
     * 
     * @param  {Button} tag
     * @param  {Facet} fc
     */
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

    /**
     * Add the selected facet to the list of selected facets.
     * 
     * @param  {Facet} fc
     */
    addToFacets(fc) {
        this.selFcs.push(fc);
    }

    /**
     * Remove the selected facet from the list of selected facets.
     * 
     * @param  {} fc
     */
    removeFromFacets(fc) {
        const index = this.selFcs.findIndex(facet => facet.code === fc.code);
        if (index > -1) {
            this.selFcs.splice(index, 1);
        }
    }

    /**
     * Rise event to parent when changes occur to the list of selected facets.
     */
    updatedFcs() {
        if (!this.selFcs)
            return;
        let event = new CustomEvent('fcs', { detail: this.selFcs });
        this.dispatchEvent(event);
    }
}

customElements.define("facets-component", FacetsComponent)