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
 * Sample for Pareto chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
exports.data1 = [
    { x: 'Traffic', y: 56 }, { x: 'Child Care', y: 44.8 },
    { x: 'Transport', y: 27.2 }, { x: 'Weather', y: 19.6 },
    { x: 'Emergency', y: 6.6 }
];
var ParetoChart = /** @class */ (function (_super) {
    __extends(ParetoChart, _super);
    function ParetoChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParetoChart.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { title: 'Defects', interval: 1, valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, }, primaryYAxis: { title: 'Frequency', minimum: 0, maximum: 150, interval: 30, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: 'Defect vs Frequency', loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', tooltip: { enable: true, shared: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ParetoSeries] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Defect', type: 'Pareto', width: 2, marker: { visible: true, width: 10, height: 10 } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a Pareto chart with line and column series. Trackball shows the information about the data point closest to the mouse")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the different type of charts. You can render any combination of series in chart except bar. Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { "font-weight": 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "In this example, we have used pareto series with the help of column and line series. To use pareto feature, we need to inject",
                    React.createElement("code", null, "ParetoSeries"),
                    " ",
                    React.createElement("code", null, "ColumnSeries"),
                    " ",
                    React.createElement("code", null, "LineSeries"),
                    " modules using",
                    React.createElement("code", null, "Chart.Inject(ParetoSeries)"),
                    " ",
                    React.createElement("code", null, "Chart.Inject(ColumnSeries)"),
                    " ",
                    React.createElement("code", null, "Chart.Inject(LineSeries)"),
                    "  method."),
                React.createElement("p", null,
                    "More information on the series can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/chartSeriesType/" }, " documentation section"),
                    "."))));
    };
    ParetoChart.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    ParetoChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return ParetoChart;
}(sample_base_1.SampleBase));
exports.ParetoChart = ParetoChart;
