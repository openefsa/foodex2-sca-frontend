import {
    html
} from 'lit-element'

export const style = html `

    <style>

        * {
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
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
        }

        #footer {
            position: relative;
            bottom: 0;
            background-color: #18A592;
            color: white;
            text-align: right;
            height:15px;   /* Height of the footer */
            line-height:15px;
        }

        /* The Modal (background) */
        .modal {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 1; /* Sit on top */
            padding-top: 100px; /* Location of the box */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0,0,0); /* Fallback color */
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
        }

        /* Modal Content */
        .modal-content {
            background-color: white;
            margin: auto;
            padding: 10px;
            border: 1px solid black;
            width: 90%;
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
            display: inline-block;
            width: 40px;
            margin: 0 auto;
        }
        
        select {
            width: 150px;
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
            font-size: 13px;
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

        .grid-container-2col {
            display: grid;
            grid-template-columns: auto 80px;
            grid-gap: 5px;
        }

        .grid-container-2col-auto {
            display: grid;
            grid-template-columns: auto auto;
            grid-gap: 5px;
        }

        .grid-container {
            display: grid;
            grid-template-columns: 40px auto 40px;
            grid-gap: 5px;
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
            height: 100px;
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

        .tooltip {
            position: relative;
            display: inline-block;
        }
          
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 180px;
            background-color: gray;
            color: #fff;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            top: -15px;
            right: 120%;
        }
          
        .tooltip .tooltiptext::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent gray;
        }

        .tooltip:hover .tooltiptext {
            visibility: visible;
        }
        
    </style>
`