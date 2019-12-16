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
var Stacked = /** @class */ (function (_super) {
    __extends(Stacked, _super);
    function Stacked() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stacked.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.stackedData, treeColumnIndex: 1, childMapping: 'subtasks', allowPaging: 'true', pageSettings: { pageCount: 5 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { columns: [{ field: 'orderID', headerText: 'Order ID', width: 90, textAlign: 'Right' },
                                { field: 'orderName', headerText: 'Order Name', width: 170, textAlign: 'Left' },
                                { field: 'orderDate', headerText: 'Order Date', width: 120, textAlign: 'Right', format: 'yMd' }], headerText: 'Order Details', textAlign: 'Center' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { columns: [{ field: 'shipMentCategory', headerText: 'Shipment Category', width: 150, textAlign: 'Left' },
                                { field: 'shippedDate', headerText: 'Shipped Date', width: 120, textAlign: 'Right', format: 'yMd' },
                                { field: 'units', headerText: 'Units', width: 90, textAlign: 'Left' },], headerText: 'Shipment Details', textAlign: 'Center' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { columns: [{ field: 'unitPrice', headerText: 'Price per unit', format: 'C2', type: 'number', textAlign: 'Right', width: 130 },
                                { field: 'price', headerText: 'Total Price', width: 130, format: 'C', type: 'number' }], headerText: 'Price Details', textAlign: 'Center' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the TreeGrid component with the stacked header feature. In this sample, we have shown multiple levels of column header.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The TreeGrid columns can be stacked/grouped in order to show multiple levels of column header. It can be done by setting the ",
                    React.createElement("code", null, "columns->columns property"),
                    "."),
                React.createElement("p", null,
                    "In this demo, the columns ",
                    React.createElement("b", null, "Order ID"),
                    ", ",
                    React.createElement("b", null, "Order Name"),
                    ", ",
                    React.createElement("b", null, "Order Date"),
                    " are grouped under Order Details, the columns ",
                    React.createElement("b", null, "Shipment Category"),
                    ",",
                    React.createElement("b", null, "Shipped Date"),
                    ", ",
                    React.createElement("b", null, "Units"),
                    " are grouped under Shipment Details and Price per Unit, Total Price are grouped under Price details."),
                React.createElement("p", null, "More information on the stacked header configuration can be found in this documentation section."))));
    };
    return Stacked;
}(sample_base_1.SampleBase));
exports.Stacked = Stacked;
