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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Export = (function (_super) {
    __extends(Export, _super);
    function Export() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['ExcelExport', 'PdfExport', 'CsvExport'];
        return _this;
    }
    Export.prototype.toolbarClick = function (args) {
        switch (args.item.text) {
            case 'PDF Export':
                this.treegridInstance.pdfExport();
                break;
            case 'Excel Export':
                this.treegridInstance.excelExport();
                break;
            case 'CSV Export':
                this.treegridInstance.csvExport();
                break;
        }
    };
    Export.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, ref: function (treegrid) { return _this.treegridInstance = treegrid; }, treeColumnIndex: 1, childMapping: 'subtasks', toolbar: this.toolbarOptions, toolbarClick: this.toolbarClick.bind(this), height: '410', allowExcelExport: true, allowPdfExport: true },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '180' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.ExcelExport, ej2_react_treegrid_1.PdfExport] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the client-side exporting of the TreeGrid, which allows you to export its data to the Excel, Pdf and CSV formats. Use the toolbar buttons to export TreeGrid data to desired format. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "TreeGrid supports client-side exporting which allows you to export its data to the Excel, Pdf and CSV formats."),
                React.createElement("p", null,
                    "In this demo, for the toolbar items of exporting, we have defined actions in ",
                    React.createElement("code", null, "toolbarClick"),
                    " event to export the TreeGrid data using the ",
                    React.createElement("code", null, "excelExport"),
                    ", ",
                    React.createElement("code", null, "pdfExport"),
                    " and ",
                    React.createElement("code", null, "csvExport"),
                    " methods."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use exporting feature, we need to inject ",
                    React.createElement("code", null, "ExcelExport"),
                    " and ",
                    React.createElement("code", null, "PdfExport"),
                    " module into the services."),
                React.createElement("p", null, "More information on the Exporting can be found in the  documentation section."))));
    };
    return Export;
}(sample_base_1.SampleBase));
exports.Export = Export;
