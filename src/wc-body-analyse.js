import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js'

// tokenize and stemming
import PorterStemmer from "./natural/stemmers/porter_stemmer";

export class WcBodyAnalyse extends LitElement {

    static get properties() {
        return {
            textAreaId: {
                type: String
            },
            textResultId: {
                type: String
            },
            tokens: {
                type: Array
            }
        }
    }

    constructor() {
        super()
        this.textAreaId = 'description';
        this.tokens = new Array();
    }

    render() {
        return html `
            ${style}
            <main>
                <label>Insert description</label>
                <div class='input-button-grid'>
                    <div>
                        <input type="text" id="${this.textAreaId}" placeholder="Add text here" @keypress=${this.handleKeyPress}"/>
                    </div>
                    <div>
                        <button class="submit-style" @click=${this.remove_stopwords}> &#8594; </button>
                    </div>
                </div>
            </main>
        `
    }

    /* the method is used for removing the stop words and updating the desc property */
    remove_stopwords() {

        // get the text inserted
        //const textArea = this.shadowRoot.getElementById(this.textAreaId).value;
        // uncomment debugging
        const textArea = "White chocolate with processed sugar and added cinnamon as ingredient";

        // aggressive tokenizer + stemming + dont keep stop words
        this.tokens = PorterStemmer.tokenizeAndStem(textArea, false);

        // debugging print array
        console.log(this.tokens);

        // update the array in the main component
        this.updateTokens(this.tokens);

    }

    /* check if the key pressed is "enter" */
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.remove_stopwords();
            }
        }
    }
}

customElements.define("wc-body-analyse", WcBodyAnalyse)