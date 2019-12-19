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
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./pivot-chart.css");
/**
 * PivotView Sample with Chart integration.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    rows: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    columns: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    dataSource: Pivot_Data,
    expandAll: false,
    drilledMembers: [{ name: 'Year', items: ['FY 2015'] }],
    formatSettings: [{ name: "Amount", format: "C" }],
    values: [{ name: "Amount", caption: "Sales Amount" }],
    filters: []
};
var ChartIntegration = (function (_super) {
    __extends(ChartIntegration, _super);
    function ChartIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'text', value: 'value' };
        _this.chartTypes = [
            { 'value': 'Column', 'text': 'Column' },
            { 'value': 'Bar', 'text': 'Bar' },
            { 'value': 'Line', 'text': 'Line' },
            { 'value': 'Spline', 'text': 'Spline' },
            { 'value': 'Area', 'text': 'Area' },
            { 'value': 'SplineArea', 'text': 'SplineArea' },
            { 'value': 'StepLine', 'text': 'StepLine' },
            { 'value': 'StepArea', 'text': 'StepArea' },
            { 'value': 'StackingColumn', 'text': 'StackingColumn' },
            { 'value': 'StackingBar', 'text': 'StackingBar' },
            { 'value': 'StackingArea', 'text': 'StackingArea' },
            { 'value': 'StackingColumn100', 'text': 'StackingColumn100' },
            { 'value': 'StackingBar100', 'text': 'StackingBar100' },
            { 'value': 'StackingArea100', 'text': 'StackingArea100' },
            { 'value': 'Scatter', 'text': 'Scatter' },
            { 'value': 'Bubble', 'text': 'Bubble' },
            { 'value': 'Polar', 'text': 'Polar' },
            { 'value': 'Radar', 'text': 'Radar' },
            { 'value': 'Pareto', 'text': 'Pareto' },
        ];
        return _this;
    }
    ChartIntegration.prototype.ddlOnChange = function (args) {
        this.pivotObj.chartSettings.chartSeries.type = args.value;
    };
    ChartIntegration.prototype.chartOnLoad = function (args) {
        var selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme =
            selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    };
    ChartIntegration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return _this.pivotObj = d; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '450', showFieldList: true, displayOption: { view: 'Chart' }, chartSettings: { title: 'Sales Analysis', chartSeries: { type: "Column" }, load: this.chartOnLoad.bind(this) } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.PivotChart, ej2_react_pivotview_1.FieldList] }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { placeholder: 'Chart Types', floatLabelType: 'Auto', fields: this.fields, change: this.ddlOnChange.bind(this), id: "charttypes", index: 0, enabled: true, dataSource: this.chartTypes })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates rendering a pivot chart using pivot data. Users can explore the data through drill-up and drill-down operations by clicking the grouping labels. The field list can also be used to change the report at runtime.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, the pivot table plots chart based on the pivot report which is mentioned. This can be achieved by setting the property ",
                    React.createElement("code", null, "displayOption.view"),
                    " as ",
                    React.createElement("code", null, "Chart"),
                    ". The built-in options are:"),
                React.createElement("p", null,
                    React.createElement("code", null, "Table"),
                    " -> Plots pivot table only which is default,"),
                React.createElement("p", null,
                    React.createElement("code", null, "Chart"),
                    " -> Plots pivot chart only,"),
                React.createElement("p", null,
                    React.createElement("code", null, "Both"),
                    " -> Plots both pivot table and pivot chart,"),
                React.createElement("p", null,
                    "You can change the chart types using the dropdown list separately. The chart types can be set using the property ",
                    React.createElement("code", null, "chartSettings.chartSeries.type"),
                    ". The built-in chart types are:"),
                React.createElement("p", null,
                    React.createElement("code", null, "Column")),
                React.createElement("p", null,
                    React.createElement("code", null, "Line")),
                React.createElement("p", null,
                    React.createElement("code", null, "Spline")),
                React.createElement("p", null,
                    React.createElement("code", null, "Bar")),
                React.createElement("p", null,
                    React.createElement("code", null, "Area")),
                React.createElement("p", null,
                    React.createElement("code", null, "StepArea")),
                React.createElement("p", null,
                    React.createElement("code", null, "SplineArea")),
                React.createElement("p", null,
                    React.createElement("code", null, "StackingColumn")),
                React.createElement("p", null,
                    React.createElement("code", null, "StackingArea")),
                React.createElement("p", null,
                    React.createElement("code", null, "StackingBar")),
                React.createElement("p", null,
                    React.createElement("code", null, "StepLine")),
                React.createElement("p", null,
                    React.createElement("code", null, "Pareto")),
                React.createElement("p", null,
                    React.createElement("code", null, "Bubble")),
                React.createElement("p", null,
                    React.createElement("code", null, "Scatter")),
                React.createElement("p", null,
                    React.createElement("code", null, "StackingColumn100")),
                React.createElement("p", null,
                    React.createElement("code", null, "StackingBar100")),
                React.createElement("p", null,
                    React.createElement("code", null, "StackingArea100")),
                React.createElement("p", null,
                    React.createElement("code", null, "Polar")),
                React.createElement("p", null,
                    React.createElement("code", null, "Radar")),
                "In the sample, the field list option is enabled, through which you can see the result in the chart by altering the report dynamically.",
                React.createElement("p", null,
                    React.createElement("strong", null, "Injecting Module:")),
                React.createElement("p", null,
                    "The pivot table features are segregated into individual modules. To take advantage of chart support, we need to inject the",
                    React.createElement("code", null, " PivotChart"),
                    " module into the",
                    React.createElement("code", null, " services"),
                    "."))));
    };
    return ChartIntegration;
}(sample_base_1.SampleBase));
exports.ChartIntegration = ChartIntegration;
