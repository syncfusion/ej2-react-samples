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
/**
 * Sample for RangeColumn series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: 'Sun', low: 3.1, high: 10.8 },
    { x: 'Mon', low: 5.7, high: 14.4 }, { x: 'Tue', low: 8.4, high: 16.9 },
    { x: 'Wed', low: 10.6, high: 19.2 },
    { x: 'Thu', low: 8.5, high: 16.1 }, { x: 'Fri', low: 6.0, high: 12.5 },
    { x: 'Sat', low: 1.5, high: 6.9 }
];
exports.data1 = [
    { x: 'Sun', low: 2.5, high: 9.8 },
    { x: 'Mon', low: 4.7, high: 11.4 }, { x: 'Tue', low: 6.4, high: 14.4 },
    { x: 'Wed', low: 9.6, high: 17.2 },
    { x: 'Thu', low: 7.5, high: 15.1 }, { x: 'Fri', low: 3.0, high: 10.5 },
    { x: 'Sat', low: 1.2, high: 7.9 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var RangeColumn = /** @class */ (function (_super) {
    __extends(RangeColumn, _super);
    function RangeColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}˚C', maximum: 20, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, title: 'Temperature Variation', loaded: this.onChartLoad.bind(this), load: this.load.bind(this), chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', tooltip: {
                        enable: true
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, name: 'India', xName: 'x', low: 'low', high: 'high', type: 'RangeColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, name: 'Germany', xName: 'x', low: 'low', high: 'high', type: 'RangeColumn' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the maximum and minimum temperatures for a week of different countries with default range column series in the chart. Tooltip shows the information about the data points.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the range column type chart. You can use ",
                    React.createElement("code", null, "border"),
                    ",",
                    React.createElement("code", null, "fill"),
                    " properties to customize the Columns. ",
                    React.createElement("code", null, "dataLabel"),
                    " are used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting",
                    React.createElement("code", null, "RangeColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the range column series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    RangeColumn.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    RangeColumn.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return RangeColumn;
}(sample_base_1.SampleBase));
exports.RangeColumn = RangeColumn;
