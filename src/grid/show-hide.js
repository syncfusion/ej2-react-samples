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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var data_1 = require("./data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ShowHide = /** @class */ (function (_super) {
    __extends(ShowHide, _super);
    function ShowHide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flag = false;
        return _this;
    }
    ShowHide.prototype.click = function (e) {
        if (!this.flag) {
            return;
        }
        var element = e.target;
        if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
            return;
        }
        element = (element.tagName === 'BUTTON' ? element.firstElementChild : element);
        this.flag = false;
        var hidden = element.classList.contains('e-ghidden');
        var classFn = hidden ? ej2_base_1.removeClass : ej2_base_1.addClass;
        classFn([element], 'e-ghidden');
        if (hidden) {
            this.gridInstance.showColumns(element.innerHTML);
        }
        else {
            this.gridInstance.hideColumns(element.innerHTML);
        }
        this.flag = true;
    };
    ShowHide.prototype.dataBound = function () {
        this.flag = true;
    };
    ShowHide.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'e-statustext' }, "Select column name to toggle visibility"),
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "toolbar", ref: function (toolbar) { return _this.ToolbarInstance = toolbar; }, onClick: this.click.bind(this) },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Order ID" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Customer Name" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Freight" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Order Date" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Shipped Date" }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Ship Country" }))),
                React.createElement("br", null),
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.orderDetails, ref: function (grid) { return _this.gridInstance = grid; }, dataBound: this.dataBound.bind(this), allowPaging: true },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '150', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '155', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '150', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', format: 'yMd', width: '155', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '170' })),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates dynamic show hide columns feature of Grid. Click column name from the toolbar to toggle visibility.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Grid column can be showed/hidden dynamically using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#showcolumns' }, "ShowColumns")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/api-grid.html#hidecolumns' }, "hideColumns")),
                    " method of the Grid."),
                React.createElement("p", null,
                    "In this demo, the columns can be showed and hidden by clicking the column name in the toolbar. And the column`s visibility is toggled based on the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: '_blank', className: 'code', href: 'http://ej2.syncfusion.com/react/documentation/grid/columns.html#header-text' }, "columns->headerText")),
                    "value."),
                React.createElement("p", null, "The columns->visible property specifies the visibility of a column. To hide a column at the initial rendering, set the columns->visible property to false."))));
    };
    return ShowHide;
}(sample_base_1.SampleBase));
exports.ShowHide = ShowHide;
