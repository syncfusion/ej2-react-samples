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
 * Sample for Inversed Spline series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: 'Jan', y: -1 }, { x: 'Mar', y: 12 },
    { x: 'Apr', y: 25 },
    { x: 'Jun', y: 31 },
    { x: 'Aug', y: 26 }, { x: 'Oct', y: 14 },
    { x: 'Dec', y: 8 },
];
exports.data2 = [
    { x: 'Jan', y: 7 }, { x: 'Mar', y: 2 },
    { x: 'Apr', y: 13 },
    { x: 'Jun', y: 21 },
    { x: 'Aug', y: 26 }, { x: 'Oct', y: 10 },
    { x: 'Dec', y: 0 },
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var SplineInversed = (function (_super) {
    __extends(SplineInversed, _super);
    function SplineInversed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplineInversed.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, isTransposed: true, primaryXAxis: { valueType: 'Category', interval: 1, labelIntersectAction: 'Rotate90', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '{value}°C', majorGridLines: { width: 0 } }, tooltip: { enable: true }, title: 'Climate Graph - 2012', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'London', type: 'Spline', marker: { visible: true, width: 10, height: 10 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', width: 2, name: 'France', type: 'Spline', marker: { visible: true, width: 10, height: 10 } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.worldweatheronline.com/mooresville-weather/north-carolina/us.aspx", target: "_blank" }, "www.worldweatheronline.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a spline series by inversing X and Y Axis. Data points are enhanced with marker and tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the spline type charts. Spline chart connects each point in series through a curved line. You can use ",
                    React.createElement("code", null, "dashArray"),
                    ", ",
                    React.createElement("code", null, "width"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the spline. ",
                    React.createElement("code", null, "marker"),
                    " and ",
                    React.createElement("code", null, "dataLabel"),
                    " are used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject",
                    React.createElement("code", null, "SplineSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the spline series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    SplineInversed.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    SplineInversed.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return SplineInversed;
}(sample_base_1.SampleBase));
exports.SplineInversed = SplineInversed;
