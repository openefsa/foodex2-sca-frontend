import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js'

export class WcBody extends LitElement {

    static get properties() {
        return {
            selectedBt: {
                type: Object
            },
            selectedFcs: {
                type: Object
            },
            baseterms: {
                type: Object
            },
            facets: {
                type: Object
            },
            text: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.baseterms = null;
        this.facets = null;
        this.selectedBt = null;
        this.selectedFcs = new Array();
        this.text = "";
    }

    render() {
        return html `
            ${style}
            <div id="body">
                <!-- component for inserting food description and fetching server -->
                <wc-body-analyser @data="${(e) => (this.updateData(e))}"></wc-body-analyser>
                <!-- component for showing baseterm -->
                <wc-body-baseterms-viewer .baseterms="${this.baseterms}" @bt="${(e)=>(this.updateBaseterm(e))}"></wc-body-baseterms-viewer>
                <!-- component for showing facets -->
                <wc-body-facets-viewer .categories="${this.facets}" @fcs="${(e) =>(this.updateFacets(e))}"></wc-body-facets-viewer>
                <!-- component for showing overview of user interaction -->
                <wc-body-overview .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></wc-body-overview>
                <!-- component for showing the foodex2 code -->
                <wc-body-showcode .bt="${this.selectedBt}" .fcs="${this.selectedFcs}"></wc-body-showcode>
                <!-- component for manual classification (if requested) -->
                <wc-body-feedback .text="${this.text}"></wc-body-feedback>
            </div>
        `
    }

    // updated the returned results
    updateData(event) {
        var res = event.detail.res;
        this.baseterms = res[0].baseterm;
        this.facets = res[1].facets;
        this.text = event.detail.text;
    }

    // updated the selected baseterm
    updateBaseterm(event) {
        this.selectedBt = event.detail.selectedBt;
    }

    // updated the selected facets
    updateFacets(event) {
        // re-initilise the array in order to catch the event change
        this.selectedFcs = event.detail.selectedFcs.slice(0);
    }

}

customElements.define("wc-body", WcBody)