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
var Formula = /** @class */ (function (_super) {
    __extends(Formula, _super);
    function Formula() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Formula.prototype.onDataBound = function () {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Stock Details' && !this.spreadsheet.isOpen) {
            this.spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#4ECDC4', textAlign: 'center', fontSize: '14px' }, 'A1:F1');
            this.spreadsheet.cellFormat({ backgroundColor: '#F2F2F2' }, 'A2:F11');
            this.spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#C6EFCE' }, 'A12:F15');
            this.spreadsheet.numberFormat('0.00', 'F2:F11');
        }
    };
    Formula.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, ref: function (ssObj) { _this.spreadsheet = ssObj; }, dataBound: this.onDataBound.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Stock Details', selectedRange: 'F15' },
                            React.createElement(ej2_react_spreadsheet_1.RangeSettingsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeSettingDirective, { dataSource: data_1.formulaData })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 40 }),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 11 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Average profit:' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=AVERAGE(F2:F11)', format: '0.00' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 25 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Maximum stock value:' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=MAX(D2:D11)', format: '0.00' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 25 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Minimum stock value:' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=MIN(E2:E11)' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { height: 25 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 3, value: 'Non-profitable days:' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 5, formula: '=COUNTIF(F2:F11,"<=0")' })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 140 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 140 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the analysis of a company's stock value for a certain period with formula feature.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " The ",
                    React.createElement("code", null, "Spreadsheet"),
                    " component provides a built-in calculation library that supports most commonly used formulas. In this demo, a formula is specified to a cell using the ",
                    React.createElement("code", null, "formula"),
                    " property."),
                React.createElement("p", null,
                    "More information about formula support can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/spreadsheet/getting-started" }, " documentation"),
                    " section."))));
    };
    return Formula;
}(sample_base_1.SampleBase));
exports.Formula = Formula;
