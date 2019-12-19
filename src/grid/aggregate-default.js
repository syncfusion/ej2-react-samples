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
var AggregateDefault = (function (_super) {
    __extends(AggregateDefault, _super);
    function AggregateDefault() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageSettings = { pageCount: 5 };
        return _this;
    }
    AggregateDefault.prototype.footerSum = function (props) {
        return (React.createElement("span", null,
            "Sum: ",
            props.Sum));
    };
    AggregateDefault.prototype.footerAvg = function (props) {
        return (React.createElement("span", null,
            "Average: ",
            props.Average));
    };
    AggregateDefault.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.data, allowPaging: true, pageSettings: this.pageSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CustomerName', headerText: 'Customer Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Freight', headerText: 'Freight', width: '120', format: 'C2', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'OrderDate', headerText: 'Order Date', format: 'yMd', width: '170' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ShipCountry', headerText: 'Ship Country', width: '150' })),
                    React.createElement(ej2_react_grids_1.AggregatesDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Freight', type: 'Sum', format: 'C2', footerTemplate: this.footerSum }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Freight', type: 'Average', format: 'C2', footerTemplate: this.footerAvg }, " ")))),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Aggregate] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates aggregate functionality of the Grid. In this sample, the aggregate value for the column \u201CFreight\u201D is displayed in column footer.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "The Grid supports aggregates which will be displayed at the footer, group footer and group caption of the Grid. The aggregate configurations can be provided by the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-grid.html" }, "aggregates")),
                        " property."),
                    React.createElement("p", null, "The built-in aggregates are,"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Sum")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Average")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Min")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Max")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Count")),
                        React.createElement("li", null,
                            React.createElement("code", null, "TrueCount")),
                        React.createElement("li", null,
                            React.createElement("code", null, "FalseCount")),
                        React.createElement("li", null,
                            React.createElement("code", null, "Custom"),
                            " - Requires the ",
                            React.createElement("code", null,
                                React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#customaggregate-string" }, "customAggregate")),
                            " property to perform aggregation. The custom aggregate value can be accessed inside template using the key ",
                            React.createElement("code", null, "custom"))),
                    React.createElement("p", null,
                        "In this demo, the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#footertemplate-string" }, "footerTemplate")),
                        " property is used to display four different aggregates in the Grid footer. In the first aggregate row, the ",
                        React.createElement("code", null, "sum"),
                        " aggregate type is used by setting the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#type-string---string" }, "type")),
                        " and ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#field-string" }, "field")),
                        " property as ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Freight")),
                        " which will be used to perform the aggregation. The aggregate value is accessed inside the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#footertemplate-string" }, "footerTemplate")),
                        " using its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#type-string---string" }, "type")),
                        " name (",
                        React.createElement("code", null, "sum"),
                        "). The aggregate value will be formatted based on its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#format-string---numberformatoptions---dateformatoptions" }, "format")),
                        " value(",
                        React.createElement("strong", null,
                            React.createElement("i", null, "C2")),
                        ") before being displayed."),
                    React.createElement("p", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject",
                        React.createElement("code", null, "Aggregate"),
                        " into the ",
                        React.createElement("code", null, "provide"),
                        " section.")))));
    };
    return AggregateDefault;
}(sample_base_1.SampleBase));
exports.AggregateDefault = AggregateDefault;
