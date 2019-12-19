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
var ColumnMenuSample = (function (_super) {
    __extends(ColumnMenuSample, _super);
    function ColumnMenuSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupOptions = { showGroupedColumn: true };
        _this.filterSettings = { type: "CheckBox" };
        return _this;
    }
    ColumnMenuSample.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { id: 'gridcomp', dataSource: data_1.orderDetails, allowPaging: true, allowGrouping: true, allowSorting: true, allowFiltering: true, showColumnMenu: true, groupSettings: this.groupOptions, filterSettings: this.filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '200', textAlign: 'Right', showInColumnChooser: false }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '150', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', visible: false, width: '200' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '200' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Resize, ej2_react_grids_1.Group, ej2_react_grids_1.Sort, ej2_react_grids_1.ColumnMenu, ej2_react_grids_1.Filter, ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the column menu feature. Click the multiple icon of each column to show the column menu.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Grid has option to show column menu when click on multiple icon of each column. The column menu has integrated options to interact the features like sorting, grouping, filtering, column chooser and autoFit. This features can be enabled by defining the",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#showcolumnmenu-boolean" }, "showColumnMenu")),
                    " as true. The default items are"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "sortAscending"),
                        " - Sort the current column in ascending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "sortDescending"),
                        " - Sort the current column in descending order."),
                    React.createElement("li", null,
                        React.createElement("code", null, "group"),
                        " - Group the current column."),
                    React.createElement("li", null,
                        React.createElement("code", null, "ungroup"),
                        " - Ungroup the current column."),
                    React.createElement("li", null,
                        React.createElement("code", null, "autoFit"),
                        " - Auto fit current column."),
                    React.createElement("li", null,
                        React.createElement("code", null, "autoFitAll"),
                        " - Auto fit all columns."),
                    React.createElement("li", null,
                        React.createElement("code", null, "columnChooser"),
                        " - Choose the column visibility."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Filter"),
                        " - Show the filter option as given in",
                        React.createElement("code", null, "filterSetting-> type"),
                        ".")),
                React.createElement("br", null),
                React.createElement("p", null,
                    "In this demo, Column Menu feature has enabled by defining",
                    React.createElement("code", null, " showColumnMenu "),
                    " as true with sorting, grouping, filtering, column chooser and autoFit options."),
                React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
                React.createElement("p", null,
                    "Grid component features are segregated into individual feature-wise modules. To use Column menu feature, we need to inject ",
                    React.createElement("code", null, "ColumnMenu"),
                    " modeule into the ",
                    React.createElement("code", null, "services")))));
    };
    return ColumnMenuSample;
}(sample_base_1.SampleBase));
exports.ColumnMenuSample = ColumnMenuSample;
