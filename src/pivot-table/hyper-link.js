"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./hyper-link.css");
/**
 * PivotView Hyperlink Sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    drilledMembers: [{ name: 'Country', items: ['France', 'Germany'] }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    dataSource: Pivot_Data,
    expandAll: true
};
var hyperlinkSettings = {
    showValueCellHyperlink: true,
    cssClass: 'e-custom-class'
};
var operators = ['Equals', 'NotEquals', 'GreaterThan', 'GreaterThanOrEqualTo',
    'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'];
var measures = [
    { value: 'In_Stock', text: 'In Stock' },
    { value: 'Sold', text: 'Units Sold' },
    { value: 'Amount', text: 'Sold Amount' }
];
var options = [
    { value: 'allcells', text: 'All cells' },
    { value: 'rowheader', text: 'Row headers' },
    { value: 'columnheader', text: 'Column headers' },
    { value: 'valuecells', text: 'Value cells' },
    { value: 'summarycells', text: 'Summary cells' },
    { value: 'conditional', text: 'Condition based option' },
    { value: 'headertext', text: 'Header based option' }
];
var measureFields = { text: 'text', value: 'value' };
var pivotObj;
var optionsdll;
var measuresddl;
var applyBtn;
var operatorddl;
var valueInput1;
var valueInput2;
var textInput;
var alertButtons;
var HyperLink = (function (_super) {
    __extends(HyperLink, _super);
    function HyperLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HyperLink.prototype.onCellClick = function (args) {
        var cell = '';
        if (args.currentCell.className.indexOf('e-stot') > -1 ||
            args.currentCell.className.indexOf('e-gtot') > -1 ||
            args.currentCell.className.indexOf('e-summary') > -1) {
            cell += 'Summary ';
        }
        if (args.currentCell.querySelector('.e-headercelldiv') && !args.data.indexObject) {
            cell += 'Value Header ';
        }
        else if (args.currentCell.className.indexOf('e-rowsheader') > -1) {
            cell += 'Row Header ';
        }
        else if (args.currentCell.className.indexOf('e-columnsheader') > -1) {
            cell += 'Column Header ';
        }
        else if (args.currentCell.className.indexOf('e-valuescontent') > -1) {
            cell += 'Value ';
        }
        if (args.currentCell.querySelector('a') &&
            (args.currentCell.querySelector('a').innerText === 'France' || args.currentCell.querySelector('a').innerText === 'Germany')) {
            var country = args.currentCell.querySelector('a').innerText;
            args.currentCell.querySelector('a').setAttribute('data-url', (country === 'France' ?
                'https://en.wikipedia.org/wiki/France' : 'https://en.wikipedia.org/wiki/Germany'));
            args.cancel = false;
        }
        else {
            this.appendElement('<b>' + cell + '</b>' + ' cell click event called<hr>');
        }
    };
    HyperLink.prototype.onOptionChange = function (args) {
        document.querySelector('.text1cls').style.display = 'none';
        document.querySelector('.text2cls').style.display = 'none';
        document.querySelector('.measurecls').style.display = 'none';
        document.querySelector('.conditioncls').style.display = 'none';
        document.querySelector('.input1cls').style.display = 'none';
        document.querySelector('.input2cls').style.display = 'none';
        document.querySelector('.textinputcls').style.display = 'none';
        document.querySelector('.updatecls').style.display = 'none';
        if (args.value == 'allcells') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: true,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'rowheader') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: true,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'columnheader') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: true,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'valuecells') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: true,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'summarycells') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: true,
                headerText: undefined,
                conditionalSettings: []
            };
        }
        else if (args.value == 'conditional') {
            document.querySelector('.text1cls').style.display = '';
            document.querySelector('.measurecls').style.display = '';
            document.querySelector('.conditioncls').style.display = '';
            document.querySelector('.input1cls').style.display = '';
            if (operatorddl.value === 'Between' || operatorddl.value === 'NotBetween') {
                document.querySelector('.input2cls').style.display = '';
            }
            document.querySelector('.updatecls').style.display = '';
        }
        else if (args.value == 'headertext') {
            document.querySelector('.text2cls').style.display = '';
            document.querySelector('.textinputcls').style.display = '';
            document.querySelector('.updatecls').style.display = '';
        }
    };
    HyperLink.prototype.onClick = function () {
        if (optionsdll.value === 'conditional') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: undefined,
                conditionalSettings: [
                    {
                        measure: measuresddl.value,
                        conditions: operatorddl.value,
                        value1: valueInput1.value,
                        value2: valueInput2.value
                    }
                ]
            };
        }
        else if (optionsdll.value === 'headertext') {
            pivotObj.hyperlinkSettings = {
                showHyperlink: false,
                showRowHeaderHyperlink: false,
                showColumnHeaderHyperlink: false,
                showValueCellHyperlink: false,
                showSummaryCellHyperlink: false,
                headerText: textInput.value,
                conditionalSettings: []
            };
        }
    };
    HyperLink.prototype.onOperatorChange = function (args) {
        if (args.value === 'Between' || args.value === 'NotBetween') {
            document.querySelector('.input2cls').style.display = '';
        }
        else {
            document.querySelector('.input2cls').style.display = 'none';
        }
    };
    HyperLink.prototype.onClear = function () {
        document.getElementById('EventLog').innerHTML = '';
    };
    HyperLink.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    };
    HyperLink.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
                React.createElement("div", { className: 'col-lg-8 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, showTooltip: false, dataSourceSettings: dataSourceSettings, width: '100%', height: '600', gridSettings: { columnWidth: 140 }, hyperlinkSettings: hyperlinkSettings, hyperlinkCellClick: this.onCellClick.bind(this) })),
                React.createElement("div", { className: 'col-lg-4 property-section pivottable-property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", null, "Fields:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { optionsdll = scope; }, index: 3, width: '100%', id: "fields", change: this.onOptionChange.bind(this), dataSource: options, fields: measureFields })))),
                                React.createElement("tr", { className: "text1cls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", null, "Condition based settings:"))),
                                React.createElement("tr", { className: "measurecls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", null, "Measures:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { measuresddl = scope; }, index: 0, width: '100%', id: "measures", dataSource: measures, fields: measureFields })))),
                                React.createElement("tr", { className: "conditioncls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", null, "Condition:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: 'conditionscls' },
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { operatorddl = scope; }, value: 'NotEquals', width: '100%', id: "conditions", change: this.onOperatorChange.bind(this), dataSource: operators })))),
                                React.createElement("tr", { className: "input1cls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", null, "Value 1:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: "value1cls" },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "value1", ref: function (scope) { valueInput1 = scope; }, value: 0, width: '100%', placeholder: 'Example: 400' })))),
                                React.createElement("tr", { className: "input2cls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", null, "Value 2:"),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: "value2cls" },
                                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "value2", ref: function (scope) { valueInput2 = scope; }, value: 0, width: '100%', placeholder: 'Example: 4000' })))),
                                React.createElement("tr", { className: "text2cls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", null, "Header based settings:"))),
                                React.createElement("tr", { className: "textinputcls", style: { height: "50px", display: "none" } },
                                    React.createElement("td", null,
                                        React.createElement("div", null, "Header Text:")),
                                    React.createElement("td", { style: { paddingBottom: '16px' } },
                                        React.createElement("div", { className: "textcls" },
                                            React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { id: "text", ref: function (scope) { textInput = scope; }, value: '', width: '100%', placeholder: 'Example: "FY 2015.In Stock"' })))),
                                React.createElement("tr", { className: "updatecls", style: { height: '50px', display: "none" } },
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { style: { float: 'right', marginRight: "4px" } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { applyBtn = scope; }, onClick: this.onClick.bind(this), isPrimary: true }, "Apply")))),
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", null,
                                            React.createElement("b", null,
                                                React.createElement("hr", null),
                                                "Event Trace:")))),
                                React.createElement("tr", null,
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { className: "eventarea", style: { height: '160px', overflow: 'auto' } },
                                            React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: 'normal' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { className: "evtbtn", style: { float: 'right', marginRight: '4px' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'clear', onClick: this.onClear.bind(this) }, "Clear"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates showing hyperlink options in row headers, column headers, value cells, and summary cells in the pivot table. Also, hyperlink options can be enabled for specific headers and value cells based on the applied condition.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, hyperlinks are enabled in cells based on the options selected from the ",
                    React.createElement("b", null, "Show Hyperlink"),
                    " drop-down list. The following options are available for setting the hyperlinks:"),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '10px 0', width: '180px;' } },
                            React.createElement("code", null, "All cells :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to all cells.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Row headers :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to row headers.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Column headers :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to column headers.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Value cells :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to value cells.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Summary cells :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to summary cells.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Condition based option :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to value and summary cells based on the applied condition like less than, greater than, equals, etc.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Header based option :")),
                        React.createElement("td", null, "Allows to set the visibility of hyperlink to specific row/column based on the given header text."))))));
    };
    return HyperLink;
}(sample_base_1.SampleBase));
exports.HyperLink = HyperLink;
