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
var HierarchyExport = /** @class */ (function (_super) {
    __extends(HierarchyExport, _super);
    function HierarchyExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.secondChildGrid = {
            dataSource: data_1.customerData,
            queryString: 'CustomerID',
            columns: [
                { field: 'CustomerID', headerText: 'Customer ID', textAlign: 'Right', width: 75 },
                { field: 'ContactName', headerText: 'Contact Name', width: 100 },
                { field: 'Address', headerText: 'Address', width: 120 },
                { field: 'Country', headerText: 'Country', width: 100 }
            ]
        };
        _this.childGrid = {
            dataSource: data_1.hierarchyOrderdata,
            queryString: 'EmployeeID',
            allowPaging: true,
            pageSettings: { pageSize: 6, pageCount: 5 },
            columns: [
                { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120 },
                { field: 'ShipCity', headerText: 'Ship City', width: 120 },
                { field: 'Freight', headerText: 'Freight', width: 120 },
                { field: 'ShipName', headerText: 'Ship Name', width: 150 }
            ],
            childGrid: _this.secondChildGrid
        };
        return _this;
    }
    HierarchyExport.prototype.toolbarClick = function (args) {
        if (args.item.text === 'Excel Export') {
            this.grid.excelExport({ hierarchyExportMode: 'All' });
        }
        if (args.item.text === 'PDF Export') {
            this.grid.pdfExport({ hierarchyExportMode: 'All' });
        }
    };
    HierarchyExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (r) { return _this.grid = r; }, dataSource: data_1.employeeData, childGrid: this.childGrid, toolbar: ['PdfExport', 'ExcelExport'], allowPdfExport: true, allowExcelExport: true, toolbarClick: this.toolbarClick.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '125', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '125' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', width: '135', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '135', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.DetailRow, ej2_react_grids_1.Toolbar, ej2_react_grids_1.PdfExport, ej2_react_grids_1.ExcelExport] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the hierarchy Grid export feature. In this sample, you can export the hierarchy grid by clicking the corresponding export button from the grid's toolbar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Grid supports client-side Hierarchy Grid exporting which allows you to export its data to the Excel and Pdf formats."),
                React.createElement("p", null,
                    "In this demo, ExcelExport and PdfExport items are defined in the toolbar. For these toolbar items, we have defined actions in toolbarClick event to export hierarchy Grid using the",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#excelexport" }, "excelExport")),
                    ",",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#pdfexport" }, "pdfExport")),
                    "methods and the grid will export using ",
                    React.createElement("code", null, "All"),
                    " mode."),
                "The hierarchy grid allows us to export the grid with following options,",
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Expanded"),
                        " - Exports only the visible child grids in expanded state."),
                    React.createElement("li", null,
                        React.createElement("code", null, "All"),
                        " - Exports the all the child grids in expanded state."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Exports the child grids in collapse state.")),
                React.createElement("p", null,
                    "We can change the hierarchy grid's export option by using the ",
                    React.createElement("code", null, "hierarchyExportMode"),
                    " property."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use Hierarchy, PdfExport and ExcelExport Grid feature, we need to inject ",
                    React.createElement("code", null, "DetailRow"),
                    ", ",
                    React.createElement("code", null, "PdfExport"),
                    ", ",
                    React.createElement("code", null, "ExcelExport"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the exporting configuration can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/pdf-export" }, "pdf-export"),
                    " and  ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/excel-exporting" }, "excel-export"),
                    " documentation sections."))));
    };
    return HierarchyExport;
}(sample_base_1.SampleBase));
exports.HierarchyExport = HierarchyExport;
