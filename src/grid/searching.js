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
var Searching = (function (_super) {
    __extends(Searching, _super);
    function Searching() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Search'];
        return _this;
    }
    Searching.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.categoryData, toolbar: this.toolbarOptions, allowPaging: true, pageSettings: { pageSize: 10, pageCount: 5 } },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CategoryName', headerText: 'Category Name', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'QuantityPerUnit', headerText: 'Quantity PerUnit', width: '180', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Units In Stock', width: '150', textAlign: 'Right' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid searching feature. In this sample, use the search box from toolbar to search Grid records.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The searching feature enables the user to view the reduced amount of records based on search criteria. It can be enabled by setting  ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowsearching-boolean' }, "allowSearching")),
                    " property as true."),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use searching feature, we need to inject ",
                    React.createElement("code", null, "Search"),
                    " module into the ",
                    React.createElement("code", null, "services")),
                React.createElement("p", null,
                    "More information on the searching feature configuration can be found in this",
                    React.createElement("a", { target: '_blank', href: 'http://ej2.syncfusion.com/react/documentation/grid/searching.html' }, " documentation section"),
                    "."))));
    };
    return Searching;
}(sample_base_1.SampleBase));
exports.Searching = Searching;
