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
var AdvancedExporting = /** @class */ (function (_super) {
    __extends(AdvancedExporting, _super);
    function AdvancedExporting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.month = ((new Date()).getMonth().toString()) + '/';
        _this.date = ((new Date()).getDate().toString()) + '/';
        _this.year = ((new Date()).getFullYear().toString());
        _this.toolbarOptions = ['ExcelExport', 'PdfExport'];
        return _this;
    }
    AdvancedExporting.prototype.toolbarClick = function (args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.gridInstance.pdfExport(this.getPdfExportProperties());
                break;
            case 'Excel Export':
                this.gridInstance.excelExport(this.getExcelExportProperties());
                break;
        }
    };
    /* tslint:disable-next-line:no-any */
    AdvancedExporting.prototype.getExcelExportProperties = function () {
        return {
            header: {
                headerRows: 7,
                rows: [
                    {
                        index: 1,
                        cells: [
                            /* tslint:disable-next-line:max-line-length */
                            { index: 1, colSpan: 5, value: 'INVOICE', style: { fontColor: '#C25050', fontSize: 25, hAlign: 'Center', bold: true } }
                        ]
                    },
                    {
                        index: 3,
                        cells: [
                            { index: 1, colSpan: 2, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
                            { index: 4, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
                            { index: 5, value: 'DATE', style: { fontColor: '#C67878', bold: true }, width: 150 }
                        ]
                    },
                    {
                        index: 4,
                        cells: [
                            { index: 1, colSpan: 2, value: '2501 Aerial Center Parkway' },
                            { index: 4, value: 2034 },
                            { index: 5, value: (this.month + this.date + this.year).toString(), width: 150 }
                        ]
                    },
                    {
                        index: 5,
                        cells: [
                            { index: 1, colSpan: 2, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
                            { index: 4, value: 'CUSOTMER ID', style: { fontColor: '#C67878', bold: true } },
                            { index: 5, value: 'TERMS', width: 150, style: { fontColor: '#C67878', bold: true } }
                        ]
                    },
                    {
                        index: 6,
                        cells: [
                            { index: 4, value: 564 },
                            { index: 5, value: 'Net 30 days', width: 150 }
                        ]
                    }
                ]
            },
            footer: {
                footerRows: 5,
                rows: [
                    /* tslint:disable-next-line:max-line-length */
                    { cells: [{ colSpan: 6, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] },
                    { cells: [{ colSpan: 6, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] }
                ]
            },
            fileName: "exceldocument.xlsx"
        };
    };
    /* tslint:disable-next-line:no-any */
    AdvancedExporting.prototype.getPdfExportProperties = function () {
        return {
            header: {
                fromTop: 0,
                height: 120,
                contents: [
                    {
                        type: 'Text',
                        value: 'INVOICE',
                        position: { x: 280, y: 0 },
                        style: { textBrushColor: '#C25050', fontSize: 25 },
                    },
                    {
                        type: 'Text',
                        value: 'INVOICE NUMBER',
                        position: { x: 500, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Date',
                        position: { x: 600, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    }, {
                        type: 'Text',
                        value: '223344',
                        position: { x: 500, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: (this.month + this.date + this.year).toString(),
                        position: { x: 600, y: 50 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'CUSTOMER ID',
                        position: { x: 500, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'TERMS',
                        position: { x: 600, y: 70 },
                        style: { textBrushColor: '#C67878', fontSize: 10 },
                    }, {
                        type: 'Text',
                        value: '223',
                        position: { x: 500, y: 90 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Net 30 days',
                        position: { x: 600, y: 90 },
                        style: { textBrushColor: '#000000', fontSize: 10 },
                    },
                    {
                        type: 'Text',
                        value: 'Adventure Traders',
                        position: { x: 20, y: 30 },
                        style: { textBrushColor: '#C67878', fontSize: 20 }
                    },
                    {
                        type: 'Text',
                        value: '2501 Aerial Center Parkway',
                        position: { x: 20, y: 65 },
                        style: { textBrushColor: '#000000', fontSize: 11 }
                    },
                    {
                        type: 'Text',
                        value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                        position: { x: 20, y: 80 },
                        style: { textBrushColor: '#000000', fontSize: 11 }
                    },
                ]
            },
            footer: {
                fromBottom: 160,
                height: 100,
                contents: [
                    {
                        type: 'Text',
                        value: 'Thank you for your business !',
                        position: { x: 250, y: 20 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    },
                    {
                        type: 'Text',
                        value: '! Visit Again !',
                        position: { x: 300, y: 45 },
                        style: { textBrushColor: '#C67878', fontSize: 14 }
                    }
                ]
            },
            fileName: "pdfdocument.pdf"
        };
    };
    AdvancedExporting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", null,
                    React.createElement(ej2_react_grids_1.GridComponent, { id: "Grid", dataSource: data_1.productData, ref: function (grid) { return _this.gridInstance = grid; }, toolbar: this.toolbarOptions, allowExcelExport: true, allowPdfExport: true, toolbarClick: this.toolbarClick.bind(this), allowPaging: true, pageSettings: { pageCount: 2, pageSize: 10 } },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductID', headerText: 'Product ID', width: '120', textAlign: 'Right' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '200' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'QuantityPerUnit', headerText: 'Quantity Per Unit', width: '180' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitPrice', headerText: 'Units Price', width: '150', textAlign: 'Right', format: 'C2' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Units In Stock', width: '150', textAlign: 'Right' })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.PdfExport, ej2_react_grids_1.Page] }))),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null, "Grid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats."),
                    React.createElement("p", null,
                        "In this demo, excelexport and pdfexport items are defined in the toolbar. For these toolbar items, we have defined actions in toolbarClick event to export Grid with header and footer using the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#excelexport" }, "excelExport")),
                        ",",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#pdfexport" }, "pdfExport")),
                        "methods."),
                    React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject ",
                        React.createElement("code", null, "ExcelExport"),
                        "and ",
                        React.createElement("code", null, "PdfExport"),
                        " module into the ",
                        React.createElement("code", null, "services"))))));
    };
    return AdvancedExporting;
}(sample_base_1.SampleBase));
exports.AdvancedExporting = AdvancedExporting;
