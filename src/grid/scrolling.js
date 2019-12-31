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
var Scrolling = (function (_super) {
    __extends(Scrolling, _super);
    function Scrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scrolling.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, height: "400" },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderID', headerText: 'Order ID', width: '150', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '160' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', width: '155', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '130', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShippedDate', headerText: 'Shipped Date', width: '155', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipName', headerText: 'Ship Name', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipAddress', headerText: 'Ship Address', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCity', headerText: 'Ship City', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Grid component with the horizontal and vertical scrollbars to view the exceeded grid content.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Grid component will show scrollbar when the content exceeds the element width or height. The vertical and horizontal scrollbar will be displayed based on the following criteria."),
                React.createElement("ul", null,
                    React.createElement("li", null, "The vertical scrollbar appears when the total height of rows present in Grid exceeds its element height."),
                    React.createElement("li", null, "The horizontal scrollbar appears when the sum of column`s width exceeds Grid element width.")),
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#height-string---number" }, "height")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#width-string---number" }, "width")),
                    " property is used to set the Grid height and width respectively. The value of these properties can be a numeric value, pixel(",
                    React.createElement("code", null, "px"),
                    ") or percentage (",
                    React.createElement("code", null, "%"),
                    ")."),
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#height-string---number" }, "height")),
                    " and ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-gridComponent.html#width-string---number" }, "width")),
                    " property of the Grid is set to ",
                    React.createElement("strong", null,
                        React.createElement("em", null, "400")),
                    " and ",
                    React.createElement("strong", null,
                        React.createElement("em", null, "auto")),
                    "respectively. Now, the Grid will render with vertical scrollbar when the total height of rows exceeds its element height and horizontal scrollbar will appear when the total column width exceeds the element width."))));
    };
    return Scrolling;
}(sample_base_1.SampleBase));
exports.Scrolling = Scrolling;
