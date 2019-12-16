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
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var refresh;
var Exporting = /** @class */ (function (_super) {
    __extends(Exporting, _super);
    function Exporting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['ExcelExport', 'PdfExport', 'CsvExport'];
        _this.groupOptions = { showDropArea: false, columns: ['ShipCountry'] };
        return _this;
    }
    Exporting.prototype.dataBound = function () {
        if (refresh) {
            this.gridInstance.groupColumn('ShipCountry');
            refresh = false;
        }
    };
    Exporting.prototype.load = function () {
        refresh = this.refreshing;
    };
    Exporting.prototype.toolbarClick = function (args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.gridInstance.pdfExport();
                break;
            case 'Excel Export':
                this.gridInstance.excelExport();
                break;
            case 'CSV Export':
                this.gridInstance.csvExport();
                break;
        }
    };
    Exporting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, ref: function (grid) { return _this.gridInstance = grid; }, toolbar: this.toolbarOptions, allowPaging: true, allowExcelExport: true, allowPdfExport: true, allowGrouping: true, toolbarClick: this.toolbarClick.bind(this), groupSettings: this.groupOptions, dataBound: this.dataBound.bind(this), load: this.load },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerID', headerText: 'Customer ID', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '150', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Toolbar, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.PdfExport, ej2_react_grids_1.Group] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates the client-side exporting of the Grid, which allows you to export its data to the Excel, Pdf and CSV formats. Use the toolbar buttons to export Grid data to desired format.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null, "Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats."),
                    React.createElement("p", null,
                        "In this demo, Grouping is applied for ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "ShipCountry")),
                        " column and excelexport, pdfexport and csvexport items are defined in the toolbar. For these toolbar items, we have defined actions in toolbarClick event to export the Grid data using the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#excelexport" }, "excelExport")),
                        ",",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#pdfexport" }, "pdfExport")),
                        "            and ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#csvexport" }, "csvExport")),
                        " methods."),
                    React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject ",
                        React.createElement("code", null, "ExcelExport"),
                        "and ",
                        React.createElement("code", null, "PdfExport"),
                        " module into the ",
                        React.createElement("code", null, "services"))))));
    };
    return Exporting;
}(sample_base_1.SampleBase));
exports.Exporting = Exporting;
