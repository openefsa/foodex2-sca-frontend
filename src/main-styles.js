import {
    html
} from 'lit-element'

export const style = html`

    <style>

        html, body {
            height:100%;
        }

        #container {
            width: 600px;
            position:relative;
            border:1px solid #18A592;
        }

        #header {
            display: flex;
            align-items: center;
            background-color: #18A592;
            color: white;
            letter-spacing: 1px;
            height:auto;
        }

        #title {
            font-family: Arial;
            font-size: 22px;
            color: white;
            letter-spacing: 1px;
        }

        #sub-title {
            font-family: Arial;
            font-size: 15px;
            color: white;
            letter-spacing: 1px;
        }

        #body {
            margin:10px;
            padding-bottom:40px;   /* Height of the footer */
        }

        #footer {
            position: absolute;
            bottom: 0;
            font-size: 10px;
            background-color: #18A592;
            color: white;
            letter-spacing: 1px;
            text-align: right;
            width:100%;
            height:30px;   /* Height of the footer */ 
        }

        * {
            box-sizing: border-box;
        }
        main > * {
            margin: 5px 0;
        }

        p {
            padding: 0px 10px;
        }

        label {
            font-family: Arial;
            font-size: 15px;
            color: black;
        }

        button {
            margin: 0 auto;
            padding: 0;
            display: inline-block;
            text-align: center;
            width:20px;
            height: 20px;
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }
        
        .dropbtn {
            background-color: #757171;
            color: white;
            width: wrap;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            border: none;
            border-radius: 4px;
            background-color: #ffffff;
            color: #000000;
            min-width: wrap;
            box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }
        
        .dropdown-content a {
            color: black;
            padding: 2px;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            display: block;
        }

        .dropdown-content a:hover {background-color: lightgray}
        
        .dropdown:hover .dropdown-content {
            display: block;
        }
        
        .dropdown:hover .dropbtn {
            background-color: lightgray;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .textinput {
            font-family: Arial;
            font-size: 15px;
            height:40px;
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 4px;
        }

        .textarea {
            font-family: Arial;
            font-size: 15px;
            width:100%;
            height:40px;
            line-height: 40px;
            border: 1px solid lightgray;
            border-radius: 4px;
            color: red; 
            text-align: center;
        }

        .submit-style {
            font-family: Arial;
            font-size: 15px;
            background-color: lightgray;
            color: black;
            width:100%;
            height:100%;
            border: 1px solid lightgray;
            border-radius: 4px;
            padding: 10px;
            text-align: center;
        }
               
        .submit-style:hover {
            background-color: #18A592; 
            color: white;
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
            grid-template-columns: auto auto auto;
            grid-gap: 5px;
            padding: 5px;
        }

        .grid-container > div {
            height: wrap;
            margin: 0 5px;
            text-align: left;
        }

        .grid-container > div.middle {
            width: 100%;
        }

        #sugg{
            border:1px solid lightgray; 
            background: white;
            border-radius: 4px;
            padding:5px; 
            overflow-y: auto;
            height: 75px;
        }

        #tags{
            border:1px solid lightgray; 
            background: white;
            border-radius: 4px;
            padding:5px; 
            overflow-y: auto;
            height: 75px;
        }

        #tags tag{
            border-radius: 2px;
            display: block; 
            float: left; 
            cursor: pointer;
            padding: 5px; 
            background: #FFFFFF;
            color: #000000; 
            margin: 3px;
            font-family: Arial;
            font-size:13px;
        }

        #tags sw-tag{
            border-radius: 2px;
            display: block; 
            float: left;
            padding: 5px; 
            background: #787672;
            color: #FFFFFF; 
            margin: 3px;
            font-family: Arial;
            font-size:13px;
        }

        #tags tag.selected-bt {
            border: 0;
            border-radius: 2px;
            display: block; 
            float: left;
            cursor: pointer;
            padding: 5px; 
            background: #bad0e7;
            color: #2f3774; 
            margin: 3px 0 3px 3px;
            font-family: Arial;
            font-size:13px;
        }

        #tags tag.selected-fc {
            border: 0;
            border-radius: 2px;
            display: block; 
            float: left;
            cursor: pointer;
            padding: 5px; 
            background: #cde69c;
            color: #1f3f2b; 
            margin: 3px 0 3px 3px;
            font-family: Arial;
            font-size:13px;
        }

        #tags inner-bt{
            cursor: pointer;
            border-radius: 2px;
            padding: 1px;
            margin: 0 0 0 5px;
            background: #2f3774;
            color: #bad0e7;
            font-family: Arial;
            font-size:12px;
        }
        
        #tags inner-fc{
            cursor: pointer;
            border-radius: 2px;
            padding: 1px;
            margin: 0 0 0 5px;
            background: #1f3f2b;
            color: #cde69c;
            font-family: Arial;
            font-size:12px;
        }

        #tags tag.bt:hover{
            background: #bad0e7;
            color: #2f3774; 
            opacity:0.7;
            cursor:pointer;
        }

        #tags tag.fc:hover{
            background: #cde69c;
            color: #1f3f2b; 
            opacity:0.7;
            cursor:pointer;
        }
        
    </style>
`