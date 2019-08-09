import { LitElement, html } from 'lit-element';
import { stopwords } from '../lib/stopwords_en.js'
import { style } from './main-styles.js'

export class WcBodyTextAnalysis extends LitElement {

    static get properties() {
        return {
            textAreaId: { type: String },
            textResultId: { type: String },
            desc: { attribute: 'desc' }
        }
    }

    constructor() {
        super()
        this.textAreaId = 'description';
        this.textResultId = 'result';
    }

    render() {
        return html`
            ${style}
            <div class='main'>
                <div class="col-1">
                    <input type="text" id="${this.textAreaId}" placeholder="Insert the food description here" />
                </div>
                <div class="col-2">
                    <button @click="${this.remove_stopwords}" class="button"> &#8594; ${this.counter}</button>
                </div>
            </div>
            <div>
                <label id="${this.textResultId}"></label>
            </div>
        `
    }

    /* the method is used for removing the stop words and updating the desc property */
    remove_stopwords() {

        const textArea = this.shadowRoot.getElementById(this.textAreaId).value;

        var res = []
        var words = textArea.split(' ')
        for (var i = 0; i < words.length; i++) {
            if (!stopwords.includes(words[i])) {
                res.push(words[i])
            }
        }

        // update the result
        this.shadowRoot.getElementById(this.textResultId).innerText = res.join(' ');

    }
}

customElements.define("wc-body-textanalysis", WcBodyTextAnalysis)