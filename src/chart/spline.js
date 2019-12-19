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
 * Sample for Spline series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: 'Sun', y: 15 }, { x: 'Mon', y: 22 },
    { x: 'Tue', y: 32 },
    { x: 'Wed', y: 31 },
    { x: 'Thu', y: 29 }, { x: 'Fri', y: 24 },
    { x: 'Sat', y: 18 },
];
exports.data2 = [
    { x: 'Sun', y: 10 }, { x: 'Mon', y: 18 },
    { x: 'Tue', y: 28 },
    { x: 'Wed', y: 28 },
    { x: 'Thu', y: 26 }, { x: 'Fri', y: 20 },
    { x: 'Sat', y: 15 }
];
exports.data3 = [
    { x: 'Sun', y: 2 }, { x: 'Mon', y: 12 },
    { x: 'Tue', y: 22 },
    { x: 'Wed', y: 23 },
    { x: 'Thu', y: 19 }, { x: 'Fri', y: 13 },
    { x: 'Sat', y: 8 },
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #charts_Series_0_Point_2_Symbol {\n        -webkit-animation: opac 1s ease-out infinite;\n        animation: opac 1s ease-out infinite;\n    }\n\n    #charts_Series_2_Point_0_Symbol {\n        -webkit-animation: opac 1s ease-out infinite;\n        animation: opac 1s ease-in-out infinite;\n    }\n\n    @keyframes opac {\n        0% {\n            stroke-opacity: 1;\n            stroke-width: 0px;\n        }\n        100% {\n            stroke-opacity: 0;\n            stroke-width: 10px;\n        }\n    }";
var Spline = (function (_super) {
    __extends(Spline, _super);
    function Spline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spline.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, ref: function (charts) { return _this.chartInstance = charts; }, primaryXAxis: {
                        valueType: 'Category',
                        interval: 1, majorGridLines: { width: 0 },
                        labelIntersectAction: 'Rotate90'
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), primaryYAxis: {
                        labelFormat: '{value}°C',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, tooltip: { enable: true }, title: 'NC Weather Report - 2016', loaded: this.onChartLoad.bind(this), animationComplete: this.animationComplete.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png" style={{width: "41px"; height: "41px"}} /></div>', x: 'Sun', y: 2, coordinateUnits: 'Point', verticalAlignment: 'Top' }),
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png"   style={{width: "41px"; height: "41px"}}/></div>', x: 'Tue', y: 33, coordinateUnits: 'Point', verticalAlignment: 'Top' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Max Temp', type: 'Spline', marker: { visible: true, width: 10, height: 10 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', width: 2, name: 'Avg Temp', type: 'Spline', marker: { visible: true, width: 10, height: 10 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', width: 2, name: 'Min Temp', type: 'Spline', marker: { visible: true, width: 10, height: 10 } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.worldweatheronline.com/mooresville-weather/north-carolina/us.aspx", target: "_blank" }, "www.worldweatheronline.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the NC weather report for the year 2016 with default spline series in the chart. Low and high temperature of the year are indicated by using annotation.")),
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
    Spline.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Spline.prototype.animationComplete = function (args) {
        this.chartInstance.removeSvg();
        this.chartInstance.animateSeries = false;
        this.chartInstance['renderElements']();
    };
    ;
    // custom code start
    Spline.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Spline;
}(sample_base_1.SampleBase));
exports.Spline = Spline;
