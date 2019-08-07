import { html } from 'lit-element'

export const style = html`
    <style>
        .container
        {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        }
        .title
        {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
        }
        .subtitle
        {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
        }

        .button {
        font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
        background-color: white;
        color: #35495e;
        border: 2px solid #35495e;
        border-radius: 4px;
        padding: 10px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-weight: 600;
        font-size: 30px;
        }
 
        .input {
            font-family: inherit;
            line-height:inherit;
            color:#2e3750;
            min-width:12em;
        }
        
        .button:hover {
        background-color: #35495e; 
        color: white;
        }
    </style>
`