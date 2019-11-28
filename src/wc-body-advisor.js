import {
    LitElement,
    html
} from 'lit-element';

import {
    style
} from './main-styles.js';

export class WcBodyAdvisor extends LitElement {

    static get properties() {
        return {
            basetermSugg: { type: Array },
            baseterm: { type: String},
            facets: { type: Array }
        }
    }

    constructor() {
        super();
        this.basetermSugg = [];
        this.baseterm = "";
        this.facets = [];
    }

    render() {
        return html`
            ${style}
            <main>
                <!-- The Modal dialog -->
                <div id="dialog" class="modal">
                    <!-- Modal content -->
                    <div class="modal-content">
                        <span id="close" class="close">&times;</span>
                        <div>
                            <label>Choose one of the baseterm found:<label>
                            <select id="btSel"></select>
                        </div>
                    </div>
                </div>
            </main>
        `
    }

    populate(){
        

        var selectList = this.shadowRoot.getElementById("btSel");
        this.baseterm.forEach((i) => {
            var option = document.createElement("option");
            option.text = i;
            selectList.appendChild(option);
        });

        // Get the modal
        var modal = this.shadowRoot.getElementById("dialog");

        // Get the <span> element that closes the modal
        var span = this.shadowRoot.getElementById("close");

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

}

customElements.define("wc-body-advisor", WcBodyAdvisor)