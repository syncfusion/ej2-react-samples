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
var CellFormatting = /** @class */ (function (_super) {
    __extends(CellFormatting, _super);
    function CellFormatting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rows = [
            {
                height: 36,
                // Applying cell formatting through cell binding
                cells: [{ style: { textAlign: 'right' } }, { style: { textIndent: '2pt' } }, { style: { textAlign: 'right' } },
                    { style: { textIndent: '2pt' } }, { index: 5, style: { textAlign: 'right' } },
                    { index: 7, style: { textAlign: 'center' } }, { index: 8, style: { textAlign: 'right' } }]
            },
            { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 },
            { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 }, { height: 42 },
            { height: 42 }, { height: 42 }
        ];
        _this.sheetSettings = [{
                name: 'Order Details',
                rangeSettings: [{ dataSource: data_1.orderDetails }],
                columns: [{ width: 80 }, { width: 140 }, { width: 100 }, { width: 232 }, { width: 120 }, { width: 100 },
                    { width: 100 }, { width: 120 }, { width: 80 }],
                rows: _this.rows,
                showGridLines: false
            }];
        return _this;
    }
    CellFormatting.prototype.beforeDataBound = function () {
        if (this.spreadsheet.activeSheetTab === 1 && !this.spreadsheet.isOpen) {
            // Skip setting cell formatting for other sheets.
            if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name !== 'Order Details') {
                return;
            }
            // Applying cell formatting dynamically using cellFormat method.
            this.spreadsheet.cellFormat({ fontWeight: 'bold', backgroundColor: '#4b5366', color: '#ffffff', fontSize: '12pt' }, 'A1:I1');
            this.spreadsheet.cellFormat({ fontWeight: 'bold', textIndent: '2pt' }, 'B2:B16');
            this.spreadsheet.cellFormat({ fontStyle: 'italic', textIndent: '2pt' }, 'D2:D16');
            this.spreadsheet.cellFormat({ textIndent: '2pt' }, 'E1:E16');
            this.spreadsheet.cellFormat({ textIndent: '2pt' }, 'G1:G16');
            this.spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'H2:H16');
            this.spreadsheet.cellFormat({ fontFamily: 'Helvetica New', verticalAlign: 'middle' }, 'A1:I16');
        }
    };
    CellFormatting.prototype.beforeCellRender = function (args) {
        if (this.spreadsheet.sheets[this.spreadsheet.activeSheetTab - 1].name === 'Order Details' && !this.spreadsheet.isOpen) {
            if (args.cell && args.cell.value) {
                // Applying cell formatting before rendering the particular cell.
                switch (args.cell.value) {
                    case 'Delivered':
                        this.spreadsheet.cellFormat({ color: '#10c469', textDecoration: 'line-through' }, args.address);
                        break;
                    case 'Shipped':
                        this.spreadsheet.cellFormat({ color: '#62c9e8' }, args.address);
                        break;
                    case 'Pending':
                        this.spreadsheet.cellFormat({ color: '#FFC107', textDecoration: 'underline' }, args.address);
                        break;
                    case 'Cancelled':
                        this.spreadsheet.cellFormat({ color: '#ff5b5b' }, args.address);
                        break;
                }
            }
        }
    };
    CellFormatting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showRibbon: false, showFormulaBar: false, sheets: this.sheetSettings, ref: function (ssObj) { _this.spreadsheet = ssObj; }, beforeDataBound: this.beforeDataBound.bind(this), beforeCellRender: this.beforeCellRender.bind(this) })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the ",
                    React.createElement("code", null, "Spreadsheet"),
                    " cell formatting feature by applying different styles to a range of cells .")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("p", null,
                        "Cell formatting allows you to highlight cell data that appears in the Spreadsheet. It can be enabled or disabled using the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/#allowcellformatting" }, "allowCellFormatting")),
                        " property."),
                    React.createElement("p", null,
                        "In this sample, gridlines are hidden using the ",
                        React.createElement("code", null, "showGridLines"),
                        " property and the styles are applied using the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/cellModel/#style" }, "style")),
                        " property and ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/#cellFormat" }, "cellFormat")),
                        " method.")),
                React.createElement("p", null,
                    "More information about ",
                    React.createElement("code", null, "cell formatting"),
                    " can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/spreadsheet/getting-started" }, " documentation"),
                    " section."))));
    };
    return CellFormatting;
}(sample_base_1.SampleBase));
exports.CellFormatting = CellFormatting;
