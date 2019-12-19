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
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var FilterMenu = (function (_super) {
    __extends(FilterMenu, _super);
    function FilterMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filterType = [
            { text: 'Menu', value: 'Menu' },
            { text: 'Checkbox', value: 'CheckBox' },
            { text: 'Excel', value: 'Excel' },
        ];
        _this.filterSettings = { type: 'Menu' };
        _this.fields = { text: 'text', value: 'value' };
        _this.format = { type: 'datetime', format: 'M/d/y hh:mm a' };
        return _this;
    }
    FilterMenu.prototype.onChange = function (sel) {
        this.gridInstance.filterSettings.type = sel.itemData.value;
        this.gridInstance.clearFiltering();
    };
    FilterMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { style: { padding: '14px' } },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: this.filterType, fields: this.fields, change: this.onChange.bind(this), index: 0, popupHeight: "150px", width: "200px" })),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDataSource, allowPaging: true, ref: function (grid) { return _this.gridInstance = grid; }, pageSettings: { pageSize: 10, pageCount: 5 }, allowFiltering: true, filterSettings: this.filterSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '120', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '130', format: this.format, textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Filter, ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the way of filtering Grid columns using menu, checkbox and excel filter UI. In this sample, click the filtering icon from column header to show filter UI for a particular column. You can change the filter type from the dropdown.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The filtering feature enables the user to view the reduced amount of records based on filter criteria. It can be enabled by setting ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#allowfiltering-boolean' }, "allowFiltering")),
                    " property as true."),
                React.createElement("p", null, "Grid supports the following filter types.  They are, "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "FilterBar")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Menu")),
                    React.createElement("li", null,
                        React.createElement("code", null, "CheckBox")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Excel"))),
                React.createElement("p", null,
                    "you can enale the filter type by setting ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/documentation/grid/api-filterSettings.html?lang=typescript#type-string' }, "filterSettings->type"))))));
    };
    return FilterMenu;
}(sample_base_1.SampleBase));
exports.FilterMenu = FilterMenu;
