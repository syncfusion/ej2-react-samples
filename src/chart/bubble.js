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
 * Sample for Bubble Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
exports.pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.highContrastColors[args.point.index % 10];
    }
    else {
        args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
    }
};
exports.data = [
    { x: 92.2, y: 7.8, size: 1.347, text: 'China' },
    { x: 74, y: 6.5, size: 1.241, text: 'India' },
    { x: 90.4, y: 6.0, size: 0.238, text: 'Indonesia' },
    { x: 99.4, y: 2.2, size: 0.312, text: 'US' },
    { x: 88.6, y: 1.3, size: 0.197, text: 'Brazil' },
    { x: 99, y: 0.7, size: 0.0818, text: 'Germany' },
    { x: 72, y: 2.0, size: 0.0826, text: 'Egypt' },
    { x: 99.6, y: 3.4, size: 0.143, text: 'Russia' },
    { x: 99, y: 0.2, size: 0.128, text: 'Japan' },
    { x: 86.1, y: 4.0, size: 0.115, text: 'Mexico' },
    { x: 92.6, y: 6.6, size: 0.096, text: 'Philippines' },
    { x: 61.3, y: 1.45, size: 0.162, text: 'Nigeria' },
    { x: 82.2, y: 3.97, size: 0.7, text: 'Hong Kong' },
    { x: 79.2, y: 3.9, size: 0.162, text: 'Netherland' },
    { x: 72.5, y: 4.5, size: 0.7, text: 'Jordan' },
    { x: 81, y: 3.5, size: 0.21, text: 'Australia' },
    { x: 66.8, y: 3.9, size: 0.028, text: 'Mongolia' },
    { x: 78.4, y: 2.9, size: 0.231, text: 'Taiwan' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Bubble sample
 */
var Bubble = (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bubble.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Literacy Rate',
                        minimum: 60,
                        maximum: 100,
                        interval: 5
                    }, load: this.load.bind(this), primaryYAxis: {
                        title: 'GDP Growth Rate',
                        minimum: 0,
                        maximum: 10,
                        interval: 2.5
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'World Countries Details', pointRender: exports.pointRender, legendSettings: { visible: false }, loaded: this.onChartLoad.bind(this), tooltip: {
                        enable: true,
                        format: '${point.text}<br/>Literacy Rate : <b>${point.x}%</b>' +
                            '<br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>'
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BubbleSeries, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, type: 'Bubble', minRadius: 3, maxRadius: ej2_base_1.Browser.isDevice ? 6 : 8, xName: 'x', yName: 'y', size: 'size', name: 'Pound', marker: { dataLabel: { name: 'text' } } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the  Literacy Rate and GDP Growth Rate of world countries by using bubble series in the chart. Tooltip shows the information about the  countries.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the bubble type charts.A bubble chart is a type of chart that displays three dimensions of data. Each points is drawn as a bubble, where bubble's size depends on ",
                    React.createElement("code", null, "size"),
                    " property. You can use ",
                    React.createElement("code", null, "fill"),
                    " property to customize the data appearance."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use bubble series, we need to inject",
                    React.createElement("code", null, "BubbleSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the bubble series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Bubble.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Bubble.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return Bubble;
}(sample_base_1.SampleBase));
exports.Bubble = Bubble;
