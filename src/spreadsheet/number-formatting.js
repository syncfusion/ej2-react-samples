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
var NumberFormatting = (function (_super) {
    __extends(NumberFormatting, _super);
    function NumberFormatting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bold = { fontWeight: 'bold' };
        return _this;
    }
    NumberFormatting.prototype.onDataBound = function () {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Restaurant Invoice' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold' }, 'A1:E2');
            this.spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'A3:E3');
            this.spreadsheet.cellFormat({ textAlign: 'center' }, 'A4:A14');
            this.spreadsheet.cellFormat({ textAlign: 'center' }, 'C4:C14');
            this.spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, 'A4:E15');
            this.spreadsheet.cellFormat({ backgroundColor: '#1E88E5', color: '#F5F5F5' }, 'A1:E2');
            this.spreadsheet.cellFormat({ backgroundColor: '#BBDEFB' }, 'A3:E3');
            this.spreadsheet.cellFormat({ backgroundColor: '#B3E5FC' }, 'A15:E17');
            this.spreadsheet.numberFormat('$#,##0.00', 'D4:E14');
            this.spreadsheet.numberFormat('$#,##0.00', 'E15:E17');
        }
    };
    NumberFormatting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, showFormulaBar: false, ref: function (ssObj) { _this.spreadsheet = ssObj; }, dataBound: this.onDataBound.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Restaurant Invoice', selectedRange: 'E17' },
                            React.createElement(ej2_react_spreadsheet_1.RangeSettingsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeSettingDirective, { dataSource: data_1.numberFormatData, startCell: 'A3' })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 30 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Customer Name' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Cristi Espinos' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Waiter Name' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Raye Whines' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 30 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Table No.' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '8' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Date' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '5/7/2019' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 14 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Subtotal:' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, formula: '=SUBTOTAL(9,E4:E14)', format: '$#,##0.00' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Discount (8%):' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, formula: '=PRODUCT(8,E15)/100', format: '$#,##0.00' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Total Amount:', style: this.bold }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, formula: '=SUM(E15-E16)', format: ej2_react_spreadsheet_1.getFormatFromType('Accounting'), style: this.bold })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 180 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates number formatting feature with a restaurant invoice.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, number formatting is applied to specific cells by using the ",
                    React.createElement("code", null, "format"),
                    " property, and a range of cells by using the ",
                    React.createElement("code", null, "numberFormat"),
                    " method."),
                React.createElement("p", null,
                    "More information about number formatting can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/spreadsheet/getting-started" }, " documentation"),
                    " section."))));
    };
    return NumberFormatting;
}(sample_base_1.SampleBase));
exports.NumberFormatting = NumberFormatting;
