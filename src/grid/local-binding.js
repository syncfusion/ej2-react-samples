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
var Localbinding = (function (_super) {
    __extends(Localbinding, _super);
    function Localbinding() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Localbinding.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, pageSettings: { pageCount: 5 } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '130', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the way of data binding Grid component with JavaScript object array (local data source).")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid supports data binding. The  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#datasource-object---datamanager' }, "dataSource")),
                    " property can be assigned either with the array of JavaScript objects or instance of  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#datasource-object---datamanager' }, "datamanager")),
                    "."),
                React.createElement("p", null, "Grid component features are segregated into individual feature-wise modules. "),
                React.createElement("p", null,
                    "More information on the dataBinding feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#datasource-object---datamanager' }, " documentation section"),
                    "."))));
    };
    return Localbinding;
}(sample_base_1.SampleBase));
exports.Localbinding = Localbinding;
