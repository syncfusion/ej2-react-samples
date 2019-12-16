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
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var AggregateRow = /** @class */ (function (_super) {
    __extends(AggregateRow, _super);
    function AggregateRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregateRow.prototype.footerSum = function (props) {
        return (React.createElement("span", null,
            "Minimum: ",
            props.Min));
    };
    AggregateRow.prototype.footerSum2 = function (props) {
        return (React.createElement("span", null,
            "Maximum: ",
            props.Max));
    };
    AggregateRow.prototype.onChange = function (args) {
        if (args.checked) {
            this.treegridObj.aggregates[0].showChildSummary = true;
            this.treegridObj.refresh();
        }
        else {
            this.treegridObj.aggregates[0].showChildSummary = false;
            this.treegridObj.refresh();
        }
    };
    AggregateRow.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.summaryRowData, treeColumnIndex: 0, childMapping: 'children', height: '410', ref: function (treegrid) { return _this.treegridObj = treegrid; } },
                        React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FreightID', headerText: 'Freight ID', width: '150' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'FreightName', headerText: 'Freight Name', width: '190' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'TotalUnits', headerText: 'Total Units', width: '160', textAlign: 'Right' }),
                            React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'UnitWeight', headerText: 'Weight Per Unit', width: '130', textAlign: 'Right' })),
                        React.createElement(ej2_react_treegrid_1.AggregatesDirective, null,
                            React.createElement(ej2_react_treegrid_1.AggregateDirective, null,
                                React.createElement(ej2_react_treegrid_1.AggregateColumnsDirective, null,
                                    React.createElement(ej2_react_treegrid_1.AggregateColumnDirective, { field: 'TotalUnits', columnName: 'TotalUnits', type: 'Min', footerTemplate: this.footerSum }, " "),
                                    React.createElement(ej2_react_treegrid_1.AggregateColumnDirective, { field: 'UnitWeight', columnName: 'UnitWeight', type: 'Max', footerTemplate: this.footerSum2 }, " ")))),
                        React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Aggregate] }))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Show Child Summary")),
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: this.onChange.bind(this) })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates aggregate functionality of the TreeGrid. In this sample, the aggregate value for the columns \u201CTotal Units\u201D and \u201CUnit Weight\u201D is displayed in column footer and provide an option to show child summary.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The TreeGrid supports aggregates which will be displayed at the footer and every hierarchy level. The aggregate configurations can be provided by the ",
                    React.createElement("code", null, " aggregates"),
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
                        React.createElement("code", null, "customAggregate"),
                        " property to perform aggregation. The custom aggregate value can be accessed inside template using the key ",
                        React.createElement("code", null,
                            "$",
                            'custom'))),
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "footerTemplate"),
                    " property is used to display three different aggregates in the TreeGrid footer.",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "Showing minimum aggregate for \u201CTotal Units\u201D column and the footerTemplate using its type name as ",
                            React.createElement("code", null,
                                "($",
                                'Min',
                                ")"),
                            "."),
                        React.createElement("li", null,
                            "Showing average aggregate for \u201CUnit weight column\u201D column and the footerTemplate using its type name as ",
                            React.createElement("code", null,
                                "($",
                                'Max',
                                ")"),
                            "."))),
                React.createElement("p", null,
                    "The template expression should be provided inside ",
                    React.createElement("code", null,
                        "$",
                        '...'),
                    " the interpolation syntax."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "TreeGrid features are segregated into individual feature-wise modules. To use aggregate feature, we need to inject ",
                    React.createElement("code", null, "Aggregate"),
                    " module into the services."),
                React.createElement("p", null, " More information about aggregate can be found in this documentation section."))));
    };
    return AggregateRow;
}(sample_base_1.SampleBase));
exports.AggregateRow = AggregateRow;
