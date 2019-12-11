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
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./pivot-chart.css");
/**
 * PivotView Sample with Selection feature.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    dataSource: Pivot_Data,
    expandAll: true,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
    filters: []
};
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'value' };
        _this.modes = [
            { 'value': 'Cell', 'text': 'Cell' },
            { 'value': 'Row', 'text': 'Row Only' },
            { 'value': 'Column', 'text': 'Column Only' },
            { 'value': 'Both', 'text': 'Both' }
        ];
        _this.types = [
            { 'value': 'Single', 'text': 'Single' },
            { 'value': 'Multiple', 'text': 'Multiple' }
        ];
        return _this;
    }
    Selection.prototype.onSelected = function (args) {
        document.getElementById('EventLog').innerHTML = '';
        if (args.selectedCellsInfo.length > 0) {
            for (var _i = 0, _a = args.selectedCellsInfo; _i < _a.length; _i++) {
                var cell = _a[_i];
                var summMeasure = this.pivotObj.engineModule.fieldList[cell.measure] ? this.pivotObj.engineModule.fieldList[cell.measure].aggregateType + ' of ' +
                    this.pivotObj.engineModule.fieldList[cell.measure].caption : '';
                this.appendElement((cell.columnHeaders == '' ? '' : 'Column Headers: ' + '<b>' + cell.columnHeaders + '</b></br>') +
                    (cell.rowHeaders == '' ? '' : 'Row Headers: ' + '<b>' + cell.rowHeaders + '</b></br>') +
                    (summMeasure == '' ? '' : 'Measure: ' + '<b>' + summMeasure + '</b></br>') +
                    'Value: ' + '<b>' + cell.currentCell.formattedText + '</b><hr></br>');
            }
        }
    };
    Selection.prototype.modeOnChange = function (args) {
        this.pivotObj.gridSettings.selectionSettings.mode = args.value;
        this.pivotObj.renderModule.updateGridSettings();
    };
    Selection.prototype.typeOnChange = function (args) {
        this.pivotObj.gridSettings.selectionSettings.type = args.value;
        this.pivotObj.renderModule.updateGridSettings();
    };
    Selection.prototype.appendElement = function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        var log = document.getElementById('EventLog');
        log.appendChild(span);
    };
    Selection.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-8 control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return _this.pivotObj = d; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '400', cellSelected: this.onSelected.bind(this), gridSettings: {
                        columnWidth: 120, allowSelection: true,
                        selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
                    } })),
            React.createElement("div", { className: 'col-lg-4 property-section pivottable-property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Selection Modes:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { floatLabelType: 'Auto', fields: this.fields, change: this.modeOnChange.bind(this), id: "mode", index: 0, enabled: true, dataSource: this.modes })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Selection Types:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { floatLabelType: 'Auto', fields: this.fields, change: this.typeOnChange.bind(this), id: "type", index: 0, enabled: true, dataSource: this.types })))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", null,
                                        React.createElement("b", null,
                                            React.createElement("hr", null),
                                            "Event Trace:")))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", { className: "eventarea", style: { height: '230px', overflow: 'auto' } },
                                        React.createElement("span", { className: "EventLog", id: "EventLog", style: { wordBreak: 'normal' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates different types of grid cell selection options and an event for getting complete information about the selection. The selection of headers, value cells, and summary cells can be done through mouse and keyboard actions.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This feature provides interactive support to highlight rows, columns, values, and summary cells that you select. Selection can be done through either mouse or keyboard interaction. To enable selection, set ",
                    React.createElement("code", null, "allowSelection"),
                    "property as true."),
                React.createElement("p", null,
                    "The pivot table supports two types of selection which can be set using",
                    React.createElement("code", null, "selectionSettings.type"),
                    " property. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Single"),
                        " - Enabled by default. Allows the user to select single row or column or cell at a time."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Multiple"),
                        " - Allows the user to select more than one row or column or cell at the same time.")),
                React.createElement("p", null,
                    "Also, there are three modes of selection which can be set using",
                    React.createElement("code", null, "selectionSettings.mode"),
                    " property. They are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Row"),
                        " - Enabled by default. Enables the complete row selection in a pivot table."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Column"),
                        " - Enables the complete column selection in a pivot table."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cell"),
                        " - Enables the cell selection in pivot table."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Both"),
                        " - Enables both the row and column selection in pivot table.")),
                React.createElement("p", null,
                    "To perform the multiselection, hold ",
                    React.createElement("strong", null, "CTRL"),
                    " key and click the desired cells. To select range of cells, hold ",
                    React.createElement("strong", null, "SHIFT"),
                    " key and click the cells."),
                React.createElement("p", null, "While using the pivot table in a touch device environment, tap over a row, column, or other cells. This results in a pop-up with a multiselect icon. Now tap the icon to proceed with multiselection."),
                React.createElement("p", null,
                    "In this demo, pick the selection type and selection mode from the properties panel in order to perform the desired selection process. The selected cell information can be seen in the Event Trace part with the help of the ",
                    React.createElement("code", null, "cellSelected"),
                    "event."))));
    };
    return Selection;
}(sample_base_1.SampleBase));
exports.Selection = Selection;
