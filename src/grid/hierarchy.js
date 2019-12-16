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
var Hierarchy = /** @class */ (function (_super) {
    __extends(Hierarchy, _super);
    function Hierarchy() {
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
            dataSource: data_1.orderDatas,
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
    Hierarchy.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeData, childGrid: this.childGrid, allowSorting: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'EmployeeID', headerText: 'Employee ID', width: '125', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'FirstName', headerText: 'Name', width: '125' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Title', headerText: 'Title', width: '180' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'HireDate', headerText: 'Hire Date', width: '135', format: { skeleton: 'yMd', type: 'date' }, textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ReportsTo', headerText: 'Reports To', width: '135', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.DetailRow, ej2_react_grids_1.Page, ej2_react_grids_1.Sort] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the hierarchical binding of the Grid component. Click the expand button to view the child Grid of a particular record.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Hierarchy Grid is used to display table data in hierarchical structure which can show or hide by clicking on expand or collapse button. This feature can be enabled by defining ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/documentation/grid/api-grid.html#childgrid-gridmodel" }, "childGrid")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/documentation/grid/api-grid.html#querystring-string" }, "childGrid.queryString")),
                    ". And the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/documentation/grid/api-grid.html#detaildatabound-emittypedetaildataboundeventargs" }, "detailDataBound")),
                    " event triggers at initial expand of every child Grid."),
                React.createElement("p", null, "In this demo, three level hierarchy is demonstrated with hierarchical structure Employee -> Orders -> Customers."),
                React.createElement("br", null),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid features are segregated into individual feature-wise modules. To use Hierarchy Grid feature, we need to inject ",
                    React.createElement("code", null, "DetailRow"),
                    " using the ",
                    React.createElement("code", null, "Grid.Inject(DetailRow)"),
                    " section."))));
    };
    return Hierarchy;
}(sample_base_1.SampleBase));
exports.Hierarchy = Hierarchy;
