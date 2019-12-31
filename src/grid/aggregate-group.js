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
var AggregateGroup = (function (_super) {
    __extends(AggregateGroup, _super);
    function AggregateGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pageSettings = { pageCount: 5 };
        _this.groupSettings = { showDropArea: false, columns: ['CategoryName'] };
        return _this;
    }
    AggregateGroup.prototype.groupFooterSum = function (props) {
        return (React.createElement("span", null,
            "Total units: ",
            props.Sum));
    };
    AggregateGroup.prototype.groupFootertCount = function (props) {
        return (React.createElement("span", null,
            "Discontinued: ",
            props.TrueCount));
    };
    AggregateGroup.prototype.groupcFootertMax = function (props) {
        return (React.createElement("span", null,
            "Maximum: ",
            props.Max));
    };
    AggregateGroup.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.categoryData, allowPaging: true, pageSettings: this.pageSettings, allowGrouping: true, groupSettings: this.groupSettings },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'CategoryName', headerText: 'Category Name', width: '70' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'ProductName', headerText: 'Product Name', width: '150' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'QuantityPerUnit', headerText: 'Quantity per unit', width: '180', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'UnitsInStock', headerText: 'Units In Stock', width: '150', textAlign: 'Right' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'Discontinued', headerText: 'Discontinued', displayAsCheckBox: true, width: '150', textAlign: 'Center' })),
                    React.createElement(ej2_react_grids_1.AggregatesDirective, null,
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'UnitsInStock', type: 'Sum', groupFooterTemplate: this.groupFooterSum }, " "),
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'Discontinued', type: 'TrueCount', groupFooterTemplate: this.groupFootertCount }, " "))),
                        React.createElement(ej2_react_grids_1.AggregateDirective, null,
                            React.createElement(ej2_react_grids_1.AggregateColumnsDirective, null,
                                React.createElement(ej2_react_grids_1.AggregateColumnDirective, { field: 'UnitsInStock', type: 'Max', groupCaptionTemplate: this.groupcFootertMax }, " ")))),
                    React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Page, ej2_react_grids_1.Aggregate, ej2_react_grids_1.Group] })),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates Aggregate functionality of the Grid. In this sample, both \u201CUnit In Stock\u201D and \u201CDiscontinued\u201D columns are displayed their aggregate value in group footer. \u201CUnit In Stock\u201D column displayed its aggregate value in group caption also. ")),
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
                            " property to perform the aggregation. The custom aggregate value can be accessed inside template using the key ",
                            React.createElement("code", null, "Custom"))),
                    React.createElement("p", null,
                        "In this demo, the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#groupfootertemplate-string" }, "groupFooterTemplate")),
                        " property is used to display the group footer aggregation for the ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Unit In Stocks")),
                        " and ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Discontinued")),
                        " columns and ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#groupcaptiontemplate-string" }, "groupCaptionTemplate")),
                        " property is used to display the group caption aggregation for the ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Unit In Stocks")),
                        " column."),
                    React.createElement("p", null,
                        "    To enable group footer aggregation for ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Unit In Stocks")),
                        " column, the ",
                        React.createElement("code", null, "Sum"),
                        " aggregate type is used by setting the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#type-string---string" }, "type")),
                        " and the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#field-string" }, "field")),
                        " property is set as ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "UnitsInStock")),
                        " which will be used to perform the aggregation. The aggregate value is accessed inside the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#groupfootertemplate-string" }, "groupFooterTemplate")),
                        " using its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#type-string---string" }, "type")),
                        " name (",
                        React.createElement("code", null, "Sum"),
                        ")."),
                    React.createElement("p", null,
                        "    To enable group caption aggregation for ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "Unit In Stocks")),
                        " column, the ",
                        React.createElement("code", null, "Max"),
                        " aggregate type is used by setting the ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#type-string---string" }, "type")),
                        " and ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#field-string" }, "field")),
                        " property is set as ",
                        React.createElement("strong", null,
                            React.createElement("i", null, "UnitsInStock")),
                        " which will be used to perform the aggregation. The aggregate value is accessed inside the",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#groupcaptiontemplate-string" }, "groupCaptionTemplate")),
                        " using its ",
                        React.createElement("code", null,
                            React.createElement("a", { target: "_blank", className: "code", href: "http://ej2.syncfusion.com/react/documentation/grid/api-aggregateColumn.html#type-string---string" }, "type")),
                        " name (",
                        React.createElement("code", null, "Max"),
                        ")."),
                    React.createElement("p", null, "Injecting Module:"),
                    React.createElement("p", null,
                        "Grid component features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject",
                        React.createElement("code", null, "Aggregate"),
                        " into the ",
                        React.createElement("code", null, "provide"),
                        " section.  Since grouping feature is required to show group aggreations, we also need to inject ",
                        React.createElement("code", null, "Group"),
                        " module.")))));
    };
    return AggregateGroup;
}(sample_base_1.SampleBase));
exports.AggregateGroup = AggregateGroup;
