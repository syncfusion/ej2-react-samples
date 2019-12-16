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
 * Sample for Step line series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
/**
 * StepLine Series
 */
exports.data1 = [
    { x: new Date(1975, 0, 1), y: 16 },
    { x: new Date(1980, 0, 1), y: 12.5 },
    { x: new Date(1985, 0, 1), y: 19 },
    { x: new Date(1990, 0, 1), y: 14.4 },
    { x: new Date(1995, 0, 1), y: 11.5 },
    { x: new Date(2000, 0, 1), y: 14 },
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2010, 0, 1), y: 16 }
];
exports.data2 = [
    { x: new Date(1975, 0, 1), y: 10 },
    { x: new Date(1980, 0, 1), y: 7.5 },
    { x: new Date(1985, 0, 1), y: 11 },
    { x: new Date(1990, 0, 1), y: 7 },
    { x: new Date(1995, 0, 1), y: 8 },
    { x: new Date(2000, 0, 1), y: 6 },
    { x: new Date(2005, 0, 1), y: 3.5 },
    { x: new Date(2010, 0, 1), y: 7 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StepLine = /** @class */ (function (_super) {
    __extends(StepLine, _super);
    function StepLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepLine.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        labelFormat: 'y',
                        intervalType: 'Years',
                        majorGridLines: { width: 0 },
                        valueType: 'DateTime',
                        edgeLabelPlacement: 'Shift'
                    }, load: this.load.bind(this), primaryYAxis: {
                        lineStyle: { width: 0 },
                        interval: 5,
                        majorTickLines: { width: 0 },
                        labelFormat: '{value}%'
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, tooltip: { enable: true }, loaded: this.onChartLoad.bind(this), title: 'Unemployment Rates 1975-2010' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepLineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'China', width: 2, type: 'StepLine', marker: { visible: true, width: 10, height: 10 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Australia', width: 2, type: 'StepLine', marker: { visible: true, width: 10, height: 10 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the unemployment rate from 1975 to 2010 with default stepline series in the chart. Data points are enhanced with marker and tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the stepline type charts. This series forms the step line progress, by connecting points through vertical and horizontal lines. You can use ",
                    React.createElement("code", null, "dashArray"),
                    ", ",
                    React.createElement("code", null, "width"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the line. ",
                    React.createElement("code", null, "marker"),
                    " and ",
                    React.createElement("code", null, "dataLabel"),
                    " are used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use step line series, we need to inject",
                    React.createElement("code", null, "StepLineSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the StepLine series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    StepLine.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    StepLine.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return StepLine;
}(sample_base_1.SampleBase));
exports.StepLine = StepLine;
