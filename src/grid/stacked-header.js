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
var StackedHeader = (function (_super) {
    __extends(StackedHeader, _super);
    function StackedHeader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedHeader.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, allowPaging: true, allowResizing: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { columns: [{ field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: 130, textAlign: 'Right' }, { field: 'Freight', headerText: 'Freight ($)', width: 120, format: 'C1', textAlign: 'Right' }], headerText: 'Order Details' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { columns: [{ field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', textAlign: 'Right', width: 150 }, { field: 'ShipCountry', headerText: 'Ship Country', width: 150 }], headerText: 'Ship Details' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Resize] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the stacked header and resize feature. In this sample, we have shown multiple level of column headers.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid columns can be stacked/grouped in order to show multiple level of column headers. It can be done by setting the  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/api/grid#columns' }, "columns")),
                    " property."),
                React.createElement("p", null,
                    "The Grid columns can be resized by clicking and dragging at the right edge of columns header. To enable column, resize behavior, set ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid#allowresizing" }, "allowResizing")),
                    " property as true. You can also prevent the resize of the particular column by setting",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/api/grid/column#allowresizing" }, "columns->allowResizing")),
                    " as false in columns definition."),
                React.createElement("p", null,
                    "In this demo, the columns ",
                    React.createElement("b", null, "OrderDate"),
                    ", ",
                    React.createElement("b", null, "Freight"),
                    " are grouped under ",
                    React.createElement("b", null, "Order Details"),
                    ", the columns ",
                    React.createElement("b", null, "ShippedDate"),
                    ", ",
                    React.createElement("b", null, "ShipCountry"),
                    " are grouped under",
                    React.createElement("b", null, " Ship Details"),
                    ". "),
                React.createElement("p", null,
                    " More information on the Stacked Header feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/api/grid/column/#columns' }, " documentation section"),
                    "."))));
    };
    return StackedHeader;
}(sample_base_1.SampleBase));
exports.StackedHeader = StackedHeader;
