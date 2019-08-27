import { LitElement, html } from 'lit-element';
import { stopwords } from '../lib/stopwords_en.js'
import { style } from './main-styles.js'

export class WcBodyAnalyse extends LitElement {

    static get properties() {
        return {
            textAreaId: { type: String },
            textResultId: { type: String },
            tokens: { type: Array }
        }
    }

    constructor() {
        super()
        this.textAreaId = 'description';
        this.tokens = [];
    }

    render() {
        return html`
            ${style}
            <main>
                <label>Insert the food description:</label>
                <div class='input-button-grid'>
                    <div>
                        <!-- add "onkeyup" function: when enter is press call the remove_stopwords function -->
                        <input type="text" id="${this.textAreaId}" placeholder="Add text here" @keypress=${this.handleKeyPress}" />
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

        // initialise the tokens array
        this.tokens = [];

        // get the text inserted
        const textArea = this.shadowRoot.getElementById(this.textAreaId).value;

        // split the text by words
        var words = textArea.split(' ')

        // iterate words
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            // store non stop words and string w/o white spaces
            if (!stopwords.includes(word) && word.trim(word.length > 0)) {
                this.tokens.push(word)
            }
        }

        // print the join array
        //console.log(this.tokens.join(' '));

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