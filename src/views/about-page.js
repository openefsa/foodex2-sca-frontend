import {
    LitElement,
    html,
    css
} from 'lit-element';

class AboutPage extends LitElement {

    static get properties() {
        return { }
    }

    static get styles() {
        return css`
        .content {
            height: 100%;
        }

        .content > * {
            margin: 5px;
            padding: 5px;
        }
        `;
    }

    constructor() {
        super();
    }

    render() {

        return html `
        <div class="content">
            <h2>FoodEx2 Smart Coding App v.1.1<h2>
            <h4>Github frontend: <a href="https://github.com/openefsa/foodex-web-component-frontend" target="_blank">link</a>.</h4>
            <h4>Github backend: <a href="https://github.com/openefsa/foodex-web-component-backend" target="_blank">link</a>.</h4>
            <h4>Frequently asked questions: <a href="url" target="_blank">link</a>.</h4>
            <h4>EFSA Data Standardisation: <a href="http://www.efsa.europa.eu/en/data/data-standardisation" target="_blank">link</a>.</h4>
            <h4>EFSA web site: <a href="http://www.efsa.europa.eu/en/" target="_blank">link</a>.</h4>
        </div>
        `
    }

}

customElements.define('about-page', AboutPage)