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
var ColumnResizing = (function (_super) {
    __extends(ColumnResizing, _super);
    function ColumnResizing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnResizing.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, allowResizing: true, height: '400' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', minWidth: '120', width: '200', maxWidth: '300', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', minWidth: '8', width: '200' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', minWidth: '8', width: '200', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', allowResizing: false, width: '200', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', minWidth: '8', width: '150', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', minWidth: '8', width: '200' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', minWidth: '8', width: '200' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', minWidth: '8', width: '200' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Resize] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid column resizing feature. Click and drag at the right corner of each column header to resize the column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Grid columns can be resized by clicking and dragging at the right corner of columns header. To enable column, resize behavior, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowresizing-boolean" }, "allowResizing")),
                    " property as true. You can also prevent the resize of the particular column by setting",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-columnModel.html#allowresizing-boolean" }, "columns->allowResizing")),
                    " as false in columns definition. And, by double clicking at the right corner of column header, the respective column width will get auto adjusted to its fit by ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#autofitcolumns" }, "autoFitColumns")),
                    " method."),
                React.createElement("p", null,
                    "In this demo, allowResizing feature have enabled through by setting the ",
                    React.createElement("code", null, " allowResizing "),
                    " property to true and ",
                    React.createElement("b", null, "Order ID"),
                    " column can be resized between the range of  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-columnModel.html#minwidth-string---number" }, "minWidth (120px)")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-columnModel.html#maxwidth-string---number" }, "maxWidth (300px).")),
                    " Also, column resizing has been disabled in the ",
                    React.createElement("b", null, "Shipped Date"),
                    " column."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use Resize feature, we need to inject ",
                    React.createElement("code", null, "Resize"),
                    " module into the ",
                    React.createElement("code", null, "services")))));
    };
    return ColumnResizing;
}(sample_base_1.SampleBase));
exports.ColumnResizing = ColumnResizing;
