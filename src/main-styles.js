import { html } from 'lit-element'

export const style = html`
    <style>

        div {
            border: 2px solid #35495e;
        }

        .container
        {
            display: flex;
            justify-content: flex-start;
        }

        .title
        {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            display: inline;
            font-weight: 300;
            font-size: 50px;
            background-color: blue;
            color: white;
            letter-spacing: 1px;
        }

        .subtitle
        {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 200;
            font-size: 20px;
            color: #526488;
            word-spacing: 5px;
            padding-bottom: 5px;
        }

        .button {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            background-color: lightgray;
            color: #35495e;
            border-radius: 4px;
            padding: 5px 5px;
            text-align: center;
            font-weight: 200;
            font-size: 20px;
        }

        .input {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            background-color: white;
            color: #35495e;
            border: 2px solid #35495e;
            border-radius: 4px;
            padding: 5px 5px;
            font-weight: 200;
            font-size: 20px;
            padding-bottom: 5px;
        }
                
        .button:hover {
            background-color: #35495e; 
            color: white;
        }
        
    </style>
`