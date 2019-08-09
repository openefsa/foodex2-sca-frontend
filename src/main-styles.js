import { html } from 'lit-element'

export const style = html`

    <style>

        html, body {
            margin:0;
            padding:0;
            height:100%;
        }

        #container {
            margin: 5px;
            min-height:100%;
            height:100%;
            max-width: 600px;
            position:relative;
        }

        #header {
            display: flex;
            align-items: center;
            background-color: darkgray;
            color: white;
            letter-spacing: 1px;
            height:auto;
        }

        #body {
            padding:10px;
            padding-bottom:60px;   /* Height of the footer */
        }

        #footer {
            position: absolute;
            bottom: 0;
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 300;
            font-size: 10px;
            background-color: darkgray;
            color: white;
            letter-spacing: 1px;
            text-align: right;
            width:100%;
            height:30px;   /* Height of the footer */ 
        }

        img {
            margin : 5px;
        }

        label {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 200;
            font-size: 20px;
            color: #526488;
        }

        input {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 15px;
            width: 100%;
            padding: 12px;
            border-radius: 4px;
            box-sizing: border-box;
        }

        .title {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 25px;
            color: white;
            letter-spacing: 1px;
        }

        .button {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 15px;
            background-color: lightgray;
            color: #35495e;
            width:40px;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 12px;
            text-align: center;
        }
               
        .button:hover {
            background-color: #35495e; 
            color: white;
        }

        .main {
            display: flex;
        }

        .col-1 {
            flex-grow: 1;
            margin:5px;
        }

        .col-2 {
            width: 40px;
            margin:5px;
        }

    </style>
`