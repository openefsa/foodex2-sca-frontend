
import {
    LitElement,
    html,
    css
} from 'lit-element';

import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-dialog/paper-dialog.js";
import '@polymer/paper-progress/paper-progress.js';
import '@polymer/paper-slider/paper-slider.js';

import config from "../../config.js";

class MulEncodePage extends LitElement {

    static get properties() {
        return {
            data: {
                type: Array
            },
            activatePb: {
                type: Boolean
            },
            counter: {
                type: String
            },
            dialog: {
                type: String
            },
            directions: {
                type: Array
            },
            cols: {
                type: Array
            },
            thld: {
                type: Number
            }
        }
    }

    static get styles() {
        return css`

        .flexbox {
            display: flex;
            flex-direction: row;
            height: 100%;
        }
      
        .main-panel {
            display: flex;
            flex-direction: column;
            flex: 2;
            min-width: 200px;
            padding: 5px;
        }

        .flex-container {
            display: flex;
            flex-direction: row;
            width: 100%;
        }

        .flex-item {
            flex: 1;
        }

        .thld-label {
            font-size: 13px;
        }

        .caption {
            padding-left: 6px;
            font-weight: bold;
        }

        #thld {
            height: 1px;
            --paper-slider-secondary-color: var(--paper-red-a200);
        }

        fieldset {
            border: 0.1em solid #d6d6d6;
            border-radius: 10px;
            margin: 0px;
        }
        
        .table {
            table-layout: fixed;
            min-height: 50px;
            height: 100%;
            max-height: 560px;
            border: 0.1em solid #d6d6d6;
            margin: 10px 0 0 0;
            overflow: auto;
        }

        .noBorderTable {
            border-collapse: collapse;
        }

        paper-icon-button {
            padding: 3px;
            width: 30px;
            height: 30px;
        }
                  
        td, th {
            border: 1px solid black;
            text-align: center;
            vertical-align: middle;
            margin: 1px;
            width: 50%;
        }

        th {
            position: sticky;
            top: 0;
            z-index: 1;
            font-size: 12px;
            vertical-align: middle;
            background-color: #666;
            color: #fff;
            cursor: pointer;
        }

        td {
            word-wrap: break-word;
            max-width: 150px
        }
          
        tr:nth-child(even) th[scope=row] {
            background-color: #f2f2f2;
        }

        tr:nth-child(odd) th[scope=row] {
            background-color: #fff;
        }

        tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.05);
        }
          
        tr:nth-child(odd) {
            background-color: rgba(255, 255, 255, 0.05);
        }

        input {
            width: 100%;
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        ::-webkit-scrollbar {
            width: 4px;
        }
        
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background-color: darkgrey;
          outline: 1px solid slategrey;
        }
        `;
    }

    constructor() {
        super();

        this.data = []; // data containing desc, code, avg_accuracy
        this.activatePb = false; // flag to enable paper-dialog
        this.counter = "-/-"; // fetchs executed
        this.dialog = "pDialog"; // paper-dialog id

        this.thldLevels = {
            '30': 'LOW (30%)',
            '50': 'MEDIUM (50%)',
            '70': 'HIGH (70%)'
        };
        
        // default threshold
        this.thld = 50;

        // set column properties
        this.cols = [
            { id: 0, property: 'desc', header: 'Food description' },
            { id: 1, property: 'code', header: 'FoodEx2 code' },
            { id: 2, property: 'avg_acc', header: 'Average accuracy (%)' },
            { id: 3, property: 'delete', header: 'Delete' }
        ];

        // Track sort directions
        this.directions = Array.from(this.cols).map(() => {
            return '';
        });
    }

    render() {
        // define template html row
        const headers = this.cols.map(col => html`<th @click="${() => this.sortColumn(col.id)}">${col.header}</th>`);
            
        return html`
        <div class="flexbox">
            <div class="main-panel">
                <fieldset>
                    <legend>Toolbar</legend>
                    <label>
                        <div class="flex-container">
                            <div class="flex-item">
                                <paper-icon-button icon="add" title="Add row" @click="${this.addRow}"></paper-icon-button>
                                <paper-icon-button icon="content-paste" title="Paste" @click="${this.getData}"></paper-icon-button>
                                <paper-icon-button icon="clear" title="Clean" @click="${this.cleanData}"></paper-icon-button>
                                <paper-icon-button icon="send" title="Run" @click="${this.encodeData}"></paper-icon-button>
                                <paper-icon-button icon="file-download" title="Export CSV" @click="${this.exportTable}"></paper-icon-button>
                            </div>
                            <div>
                                <div class="thld-label">Threshold level:<span class="caption">${this.thldLevels[this.thld]}</span></div><br>
                                <paper-slider id="thld" pin min="30" max="70" step="20" secondary-progress="50" value="${this.thld}" @change="${(e) => this.updateThld(e.target.value)}"></paper-slider>
                            </div>
                        </div>
                    </label>
                </fieldset>
                <div class="table">
                    <table class="noBorderTable">
                        <thead id="tableHeader"><tr>${headers}</tr></thead>
                        <tbody id="tableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <paper-dialog id="${this.dialog}" modal no-cancel-on-outside-click>
            <h2>Fetching data ${this.counter}</h2>
            <paper-progress indeterminate></paper-progress>
        </paper-dialog>
        `
    }

    /**
     * Update div UI when specific property value is changed.
     * 
     * @param  {*} changedProperties
     */
    shouldUpdate(changedProperties) {

        var changedData = changedProperties.has('data');
        var counter = changedProperties.has('counter');
        var thld = changedProperties.has('thld');

        // update the tags field if bt/fc is selected
        if (changedData) {
            this.populateCells();
        }
        return changedData || counter || thld;
    }

    populateCells() {
        // get the fiels component
        var table = this.shadowRoot.getElementById("tableBody");
        // return if div undefined
        if (!table)
            return;
        // clean the content of the element and baseterm
        table.innerHTML = null;
        // for each data object create a row
        Object.values(this.data).map(record => {
            // insert a new row at the end
            var row = table.insertRow(-1);
            var idx = 0;
            // for each entry in the object initialise a cell
            Object.entries(record).map(([key, value]) => {
                var cell = row.insertCell(idx);
                cell.innerHTML = value;
                cell.setAttribute('contentEditable', (key === "desc"));
                if (key === "avg_acc") {
                    // color code cell based on accuracy
                    cell.style.fontWeight = "bold"
                    cell.style.color = (value > 50) ? "green" : "red";
                }
                // add on focus lost to update cell content
                cell.addEventListener("focusout", () => {
                    this.updateCell(row.rowIndex - 1, cell.textContent);
                });
                idx += 1;
            });
            // add remove row cell in last column
            var delCell = row.insertCell(3);
            delCell.innerHTML = "&#10060;";
            delCell.style.cursor = "pointer";
            // add delete listener
            delCell.addEventListener("click", () => {
                this.removeRow(row.rowIndex - 1);
            });
        });
    }

    /**
     * Update cell value
     * @param {*} rowIdx 
     * @param {*} newTxt 
     */
    updateCell(rowIdx, newTxt) {
        this.data[rowIdx].desc = newTxt;
    }

    /**
     * Remove the selected row
     * @param {*} rowIdx 
     */
    removeRow(rowIdx) {
        this.data.splice(rowIdx, 1);
        var tmp = this.data;
        this.data = tmp.slice();
    }

    /**
     * add an empty object to list of data
     */
    addRow() {
        var temp = this.data;
        temp.unshift({ "desc": "", "code": "", "avg_acc": "" });
        this.data = temp.slice();
    }

    /**
     * it allows to get text from the clipboard and insert it into the table
     */
    getData() {
        navigator.clipboard.readText().then(clipText => {
            // split clip by new line
            var clip = clipText.split("\r\n");
            if (clip != null) {
                // alert that all exsisting data will be removed
                if (this.data.length > 0) {
                    var answer = window.confirm("The exsisting data will be replaced.\nDo you want to continue?");
                    if (!answer) {
                        return;
                    }
                }
                // remove empty records
                clip = clip.filter(v => v);
                this.data = new Array();
                // remove duplicate descriptions
                let len = clip.length;
                let filtered = new Set(clip);
                if (len != filtered.size) {
                    alert("Duplicate descriptions have been detected and will be removed from the list.");
                }
                // push items in global data
                filtered.forEach(element => {
                    this.data.push({ "desc": element, "code": "", "avg_acc": "" });
                });
            }
        });
    }

    /**
     * clean data
     */
    cleanData() {
        this.data = new Array();
    }

    /**
     * calls the encode API for each description found
     */
    encodeData() {
        let urls = [];
        this.data.forEach(element => {
            // get the food description
            var desc = element.desc;
            // do not call api if empty
            if (!desc || desc == "")
                return;

            // url params 
            let params = {
                'desc': desc,
                'thld': localStorage.getItem('thld'),
                'smartAcc': localStorage.getItem('smartAcc'),
                'lang': localStorage.getItem('lang')
            };

            // build url with params
            let url = new URL(config.BASE_URL + 'predict');
            url.search = new URLSearchParams(params).toString();

            // append new url
            urls.push(url);
        });

        // show progress bar dialog
        this.shadowRoot.getElementById(this.dialog).toggle();

        // map every url to the promise of the fetch
        let requests = urls.map(url => fetch(url));

        Promise.all(requests)
            .then(responses => {
                // Get a JSON object from each of the responses
                return Promise.all(responses.map(response => {
                    return response.json();
                }));
            }).then(data => {
                // Log the data to the console
                this.updateTable(data);
            }).catch(error => {
                // if there's an error, log it
                console.log(error);
            });

        let progress = 0;
        requests.forEach(r => r.then(() => {
            progress++;
            this.counter = progress + "/" + requests.length;
        }));
    }

    /**
     * Update the table with new fetched data
     * @param {*} value 
     */
    updateTable(data) {
        var tmp = this.data;
        data.forEach(value => {
            let obj = tmp.find(f => f.desc === value.desc.orig);
            if (obj) {
                let code_acc = this.buildCode(value);
                obj.code = code_acc[0];
                let acc = code_acc[1];
                obj.avg_acc = (acc === "N/A") ? acc : (acc * 100).toFixed(2);
            }
        });

        // update ui
        this.data = tmp.slice();
        // hide progress bar
        this.shadowRoot.getElementById(this.dialog).toggle();
    }

    /**
     * used for sorting category or facet codes
     * @param {*} a 
     * @param {*} b 
     * @returns 
     */
    compare(a, b) {
        return (a > b) ? 1 : -1;
    }

    /**
     * Build the final code and calculate avg accuracy
     * @param {*} value 
     */
    buildCode(value) {
        let code_acc = [];

        let final_code = "N/A"; // final FoodEx2 Code (bt+facets)
        let final_facets = []; // final facets code (categories+terms)
        let final_acc = []; // final accuracy (bt+cat+fcs)
        
        if (value.bt && value.bt[0]) {
            // get base term with higher accuracy
            let bt = value.bt[0];
            // append to final code the base term
            final_code = bt.termCode;
            // store percentage of accuracy
            final_acc.push(bt.acc);
            // iterate each category suggested
            let categories = value.cat;
            // sort the categories
            categories = categories.sort((a, b) => this.compare(a.code, b.code));
            categories.forEach(category => {
                // iterate each facets found within the category
                let facets = category.facets;
                // sort the facets
                facets = facets.sort((a, b) => this.compare(a.termCode, b.termCode));
                facets.forEach(facet => {
                    // do not compute facet equal to the base term
                    if (facet.termCode === bt.termCode)
                        return;
                    // calculate the weighted arithmetic mean
                    let avg_acc = (category.acc + facet.acc) / 2;
                    if (avg_acc > (this.thld/100)) {
                        final_facets.push(category.code + "." + facet.termCode);
                        final_acc.push(avg_acc);
                    }
                });
            });
        }
        // compose final code
        if (final_facets.length > 0) {
            final_code = final_code + "#" + final_facets.join("$");
        }
        // comine final code with final avg accuracy
        code_acc.push(final_code);
        code_acc.push(this.calculateAvg(final_acc));

        return code_acc;
    }

    /**
     * calculate average accuracy 
     * @param {*} list 
     * @returns 
     */
    calculateAvg(list) {
        if (list.length > 0)
            return list.reduce((prev, curr) => prev + curr) / list.length
        else
            return "N/A";
    }

    /**
     * sort table alphabetically or numerically on selected column header
     * @param {*} e 
     */
    sortColumn(col) {
        if (col === "delete")
            return;

        // get the body of the table
        var tableBody = this.shadowRoot.getElementById("tableBody");

        // return if table undefined
        if (!tableBody)
            return;

        // Get the current direction
        const direction = this.directions[col] || 'asc';

        // A factor based on the direction
        const multiplier = (direction === 'asc') ? 1 : -1;

        // get rows
        let rows = tableBody.rows;
        const newRows = Array.from(rows);

        // compare rows
        newRows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll('td')[col].innerHTML;
            const cellB = rowB.querySelectorAll('td')[col].innerHTML;

            switch (true) {
                case cellA > cellB:
                    return 1 * multiplier;
                case cellA < cellB:
                    return -1 * multiplier;
                case cellA === cellB:
                    return 0;
            }
        });

        // Remove old rows
        [].forEach.call(rows, (row) => {
            tableBody.removeChild(row);
        });

        // Reverse the direction
        this.directions[col] = direction === 'asc' ? 'desc' : 'asc';

        // Append new row
        newRows.forEach(function (newRow) {
            tableBody.appendChild(newRow);
        });

    }

    /**
     * export the table as xlsx file
     */
    exportTable() {

        // build semicolon separated array
        var csv = [];
        var delim = ";";

        // filter, join and add header result to csv
        var header = this.cols.filter(v => v.header != "Delete").map(item => item["header"]).join(delim);
        csv.push(header);

        // push body to csv
        this.data.forEach(item => {
            csv.push(Object.values(item).join(delim));
        });

        // merge items by new line
        csv = csv.join("\n");

        // create the file
        var csvFile = new Blob([csv], { type: "text/csv" });

        // create link and download file
        var a = document.createElement("a");
        a.href = URL.createObjectURL(csvFile);
        a.setAttribute("download", "output.csv");
        a.click();
    }

    /**
     * update the global threshold
     * @param {Number} newVal 
     */
    updateThld(newVal) {
        this.thld = newVal;
    }
}

customElements.define('mul-encode-page', MulEncodePage)