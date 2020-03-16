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
            bt: {
                type: Object
            },
            fcs: {
                type: Object
            },
            code: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.bt = null;
        this.fcs = new Array();
        this.code = "";
    }

    render() {
        return html `
            ${style}
            <main>
                <div>
                    FoodEx2 Code
                    <div class="textarea">
                        <div>${this.code}</div>
                    </div>
                </div>
            </main>
        `
    }

    // update div ui in specific properties change
    shouldUpdate(changedProperties) {

        var changedBt = changedProperties.has('bt');
        var changedFcs = changedProperties.has('fcs');

        // update the foodex2 code baset on selected bt/fcs
        if (changedBt || changedFcs)
            this.updateCode();

        return changedBt || changedFcs;
    }

    // method ised for updateing the foodex2 code
    updateCode() {

        if (!this.bt || this.bt == "")
            this.code = "";
        else {
            this.code = this.bt.code;

            var fcsLen = this.fcs.length;
            for (var i = 0; i < fcsLen; i++) {
                if (i == 0)
                    this.code += "#";
                var fc = this.fcs[i];
                this.code += fc.cat + "." + fc.code;
                if (i < fcsLen - 1)
                    this.code = this.code + "$";
            }
        }
    }

}

customElements.define("wc-body-showcode", WcBodyShowCode)