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
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, height: '350' },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default rendering of the Grid with minimum configuration.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid component is used to display and manipulate tabular data with configuration options to control the way the data is presented and manipulated. It will pull the the data from a data source, such as an array of JSON objects, OData web services, or ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/documentation/data/api-dataManager.html' }, "DataManager")),
                    " binding data fields to columns. Also, displaying a column header to identify the field with support for grouped records."),
                React.createElement("p", null, "In this demo, the Grid is populated with its minimum default settings."),
                React.createElement("p", null,
                    "More information on the Grid instantiation can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/grid/getting-started.html' }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
