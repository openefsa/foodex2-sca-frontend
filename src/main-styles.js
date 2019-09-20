import { html } from 'lit-element'

export const style = html`

    <style>

        html, body {
            height:100%;
        }

        #container {
            width: 600px;
            position:relative;
            border:1px solid darkgray;
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
            margin:10px;
            padding-bottom:40px;   /* Height of the footer */
        }

        #footer {
            position: absolute;
            bottom: 0;
            font-weight: 300;
            font-size: 10px;
            background-color: darkgray;
            color: white;
            letter-spacing: 1px;
            text-align: right;
            width:100%;
            height:30px;   /* Height of the footer */ 
        }

        main > * {
            margin: 5px;
        }

        p {
            padding: 0px 10px;
        }

        label {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 15px;
            color: #526488;
        }

        input {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 15px;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 4px;
        }

        button {
            margin: 0 auto;
            padding: 0;
            display: inline-block;
            text-align: center;
            width:20px;
            height: 20px;
        }

        .textarea {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 15px;
            height: 20px;
            border: 1px solid lightgray;
            border-radius: 4px;
            color: red;
        }

        .submit-style {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 15px;
            background-color: lightgray;
            color: #35495e;
            width:100%;
            height:100%;
            border: 1px solid lightgray;
            border-radius: 4px;
            padding: 10px;
            text-align: center;
        }
               
        .submit-style:hover {
            background-color: blue; 
            color: white;
        }

        .title {
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-weight: 100;
            font-size: 25px;
            color: white;
            letter-spacing: 1px;
        }

        .input-button-grid {
            display: grid;
            grid-template-columns: auto 40px;
            grid-template-rows: auto;
            justify-items: stretch;
            align-items: stretch;
            justify-content: stretch;
            align-content: stretch;
        }

        .grid-container {
            display: grid;
            grid-template-columns: 265px 39px 265px;
            grid-template-rows: 30px 80px;
            justify-items: stretch;
            align-items: stretch;
            justify-content: stretch;
            align-content: stretch;	
            border: 0.5px solid lightgray;
            background:lightgray;
            vertical-align: middle;
        }

        .grid-container > div {
            margin: 0.5px;
            padding: 5px;
            text-align: center;
            background:white;
        }

        .item2 {
            grid-column: 2;
            grid-row: 2;
        }

        #tags{
            border:1px solid lightgray; 
            background: white;
            border-radius: 4px;
            padding:5px; 
            overflow-y: auto;
            height: 75px;
        }

        #tags span.tag{
            border: 1px solid #a5d24a;
            border-radius: 2px;
            display: block; 
            float: left; 
            padding: 5px; 
            background: #cde69c; 
            color: #638421; 
            margin: 5px;
            font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
            font-size:13px;
        }

        #tags span.tag:hover{
            opacity:0.7;
        }

        #tags span.tag a {
            cursor: pointer;
            font-weight: bold; 
            color: red;
            font-size: 13px;
        }

    </style>
`