import {
    LitElement,
    html
} from 'lit-element';
import {
    style
} from './main-styles.js'
import stop_words from './util/stop_words_en';

export class WcBodyAnalyse extends LitElement {

    static get properties() {
        return {
            textAreaId: {
                type: String
            }
        }
    }

    constructor() {
        super()
        this.textAreaId = 'description';
    }

    render() {
        return html `
            ${style}
            <main>
                <div class='input-button-grid'>
                    <div>
                        <input class="textinput" type="text" id="${this.textAreaId}" placeholder="Insert food description here" @keypress=${this.handleKeyPress}"/>
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
        var userText = this.shadowRoot.getElementById(this.textAreaId).value;

        // uncomment below for debugging
        // let userText = "White chocolate with processed sugar and added cinnamon as ingredient";

        // map in which to store key value
        var ppText = new Map();

        // tokenize the inserted text
        var tokens = this.tokenize(userText);

        // for each token mark stop words
        tokens.forEach(function (token) {
            if (stop_words.indexOf(token) == -1)
                ppText.set(token, 0); // if not stop word
            else
                ppText.set(token, 1); // if stop word
        });

        // fire event to parent component
        this.fireEvent(ppText);

    }

    // check if the key pressed is "enter"
    handleKeyPress(event) {
        if (event.value !== '') {
            if (event.key === 'Enter') {
                this.remove_stopwords();
            }
        }
    }

    // tokenise sentence
    tokenize(text) {
        // break a string up into an array of tokens by anything non-word
        return text.split(/\W+/).map(s => s.trim());
    };

    // propagate event to parent component
    fireEvent(ppText) {
        let event = new CustomEvent('analysed', {
            detail: {
                ppText: ppText
            }
        });
        this.dispatchEvent(event);
    }
}

customElements.define("wc-body-analyser", WcBodyAnalyse)