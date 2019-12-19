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
 * Sample for Waterfall series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: 'Income', y: 4711 }, { x: 'Sales', y: -1015 },
    { x: 'Development', y: -688 },
    { x: 'Revenue', y: 1030 }, { x: 'Balance' },
    { x: 'Expense', y: -361 }, { x: 'Tax', y: -695 },
    { x: 'Net Profit' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #control-charts {\n        padding: 0px !important;\n    }\n\n    #charts_Series_0_Connector_ {\n        stroke-dasharray: 10px 10px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 1s linear infinite;\n        animation: dash 1s linear infinite;\n    }\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }";
var Waterfall = (function (_super) {
    __extends(Waterfall, _super);
    function Waterfall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Waterfall.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: this.load.bind(this), style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        majorGridLines: { width: 0 },
                        plotOffset: 20
                    }, primaryYAxis: {
                        minimum: 0, maximum: 5000, interval: 1000,
                        majorGridLines: { width: 0 },
                        title: 'Expenditure'
                    }, tooltip: { enable: true, shared: false }, textRender: this.textRender.bind(this), axisLabelRender: this.axisLabelRender.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, title: 'Company Revenue and Profit', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.WaterfallSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', type: 'Waterfall', intermediateSumIndexes: [4], sumIndexes: [7], marker: { dataLabel: { visible: true, font: { color: '#ffffff' } } }, connector: { color: '#5F6A6A', width: 2 }, columnWidth: 0.9, negativeFillColor: '#e56590' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the revenue and profits of a company by using default waterfall series in the chart. Tooltip shows the information about the profits earned by each department on the company.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the Waterfall type charts. Waterfall type charts are used to represent the financial datas. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rect. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Waterfall series, we need to inject",
                    React.createElement("code", null, "WaterfallSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Waterfall series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Waterfall.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Waterfall.prototype.textRender = function (args) {
        var value = Number(args.text) / 1000;
        value = Math.round((value * 100)) / 100;
        args.text = value.toString();
    };
    ;
    // custom code start
    Waterfall.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    Waterfall.prototype.axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '$' + Number(args.text) / 1000 + 'B';
        }
    };
    ;
    return Waterfall;
}(sample_base_1.SampleBase));
exports.Waterfall = Waterfall;
