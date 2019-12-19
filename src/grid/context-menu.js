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
require("./grid-context-menu.css");
var ContextMenuSample = (function (_super) {
    __extends(ContextMenuSample, _super);
    function ContextMenuSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupOptions = { showGroupedColumn: true };
        _this.contextMenuItems = ['AutoFit', 'AutoFitAll',
            'SortAscending', 'SortDescending', 'Copy', 'Edit', 'Delete', 'Save',
            'Cancel', 'PdfExport', 'ExcelExport', 'CsvExport', 'FirstPage', 'PrevPage',
            'LastPage', 'NextPage'];
        _this.editing = { allowDeleting: true, allowEditing: true };
        return _this;
    }
    ContextMenuSample.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'gridcomp', dataSource: data_1.orderDetails, allowPaging: true, allowSorting: true, allowExcelExport: true, allowPdfExport: true, contextMenuItems: this.contextMenuItems, editSettings: this.editing },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right', isPrimaryKey: true }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', format: 'C2', textAlign: 'Right', editType: 'numericedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '200' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150', editType: 'dropdownedit' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Resize, ej2_react_grids_1.Sort, ej2_react_grids_1.ContextMenu, ej2_react_grids_1.Filter, ej2_react_grids_1.Page, ej2_react_grids_1.ExcelExport, ej2_react_grids_1.Edit, ej2_react_grids_1.PdfExport] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of context menu in Grid component. Right click anywhere on the Grid to view context menu.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Grid has options to show the context menu when right click on it. To configure the items in context menu, you should define either default or custom item in",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#contextmenuitems-contextmenuitem---contextmenuitemmodel" }, "contextMenuItems")),
                    ". Each item will be shown based on it target. The default items are"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "edit"),
                        " - Edit the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "delete"),
                        " - Delete the current record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "save"),
                        " - Save the edited record."),
                    React.createElement("li", null,
                        React.createElement("code", null, "cancel"),
                        " - Cancel the edited state."),
                    React.createElement("li", null,
                        React.createElement("code", null, "copy"),
                        " - Copy the selected records."),
                    React.createElement("li", null,
                        React.createElement("code", null, "pdfExport"),
                        " - Export the grid as Pdf format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "excelExport"),
                        " - Export the grid as Excel format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "csvExport"),
                        " - Export the grid as CSV format."),
                    React.createElement("li", null,
                        React.createElement("code", null, "sortAscending"),
                        " - Sort the current column in ascending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "sortDescending"),
                        " - Sort the current column in descending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "firstPage"),
                        " - Go to the first page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "prevPage"),
                        " - Go to the previous page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "lastPage"),
                        " - Go to the last page."),
                    React.createElement("li", null,
                        React.createElement("code", null, "nextPage"),
                        " - Go to the next page.")),
                React.createElement("br", null),
                React.createElement("p", null, "While using the Grid in a touch device environment, touch and hold the Grid row cell to show the context menu."),
                React.createElement("p", null,
                    "In this demo, Context Menu feature has enabled by defining the",
                    React.createElement("code", null, " contextMenuItems "),
                    " property with all default items."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use context menu feature, we need to inject ",
                    React.createElement("code", null, "ContextMenu"),
                    " modeule into the ",
                    React.createElement("code", null, "services")))));
    };
    return ContextMenuSample;
}(sample_base_1.SampleBase));
exports.ContextMenuSample = ContextMenuSample;
