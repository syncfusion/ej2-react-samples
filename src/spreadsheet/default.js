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
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boldRight = { fontWeight: 'bold', textAlign: 'right' };
        _this.bold = { fontWeight: 'bold' };
        return _this;
    }
    Default.prototype.onDataBound = function () {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Car Sales Report' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
            this.spreadsheet.numberFormat('$#,##0.00', 'F2:F31');
        }
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { _this.spreadsheet = ssObj; }, dataBound: this.onDataBound.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: "Car Sales Report" },
                            React.createElement(ej2_react_spreadsheet_1.RangeSettingsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeSettingDirective, { dataSource: data_1.defaultData })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 30 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: "Total Amount:", style: this.boldRight }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: "=SUM(F2:F30)", style: this.bold })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 180 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 180 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the ",
                    React.createElement("code", null, "Spreadsheet"),
                    " component and its features such as editing, formulas, formatting, importing, and exporting.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Spreadsheet"),
                    " component is used to organize and analyze data in a tabular format. It has a built-in calculation library that supports most commonly used formulas. Excel workbook files can be imported and exported by providing ",
                    React.createElement("code", null, "openUrl"),
                    " &",
                    React.createElement("code", null, "saveUrl"),
                    " property."),
                React.createElement("p", null,
                    "Data binding can be achieved by setting an array of JavaScript objects or an instance of Data Manager to the",
                    React.createElement("code", null, "dataSource"),
                    " property under the rangeSettings of sheet. The ",
                    React.createElement("code", null, "cellFormat"),
                    " and",
                    React.createElement("code", null, "numberFormat"),
                    "methods are used to apply format to a range of cells in the ",
                    React.createElement("code", null, "dataBound"),
                    " event."),
                React.createElement("p", null,
                    "More information about the Spreadsheet component can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/spreadsheet/getting-started" }, " documentation"),
                    " section."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
