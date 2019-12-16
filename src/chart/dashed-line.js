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
 * Sample for Line Series with dashed line
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: new Date(2005, 0, 1), y: 12 }, { x: new Date(2006, 0, 1), y: 10.6 },
    { x: new Date(2007, 0, 1), y: 15.6 }, { x: new Date(2008, 0, 1), y: 38.6 },
    { x: new Date(2009, 0, 1), y: 27.4 }, { x: new Date(2010, 0, 1), y: 23.5 },
    { x: new Date(2011, 0, 1), y: 16.6 }
];
exports.data2 = [
    { x: new Date(2005, 0, 1), y: 9.5 }, { x: new Date(2006, 0, 1), y: 19.9 },
    { x: new Date(2007, 0, 1), y: 25.2 }, { x: new Date(2008, 0, 1), y: 36 },
    { x: new Date(2009, 0, 1), y: 16.6 }, { x: new Date(2010, 0, 1), y: 14.2 }, { x: new Date(2011, 0, 1), y: 10.3 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #charts_Series_1,\n    #charts_Series_0 {\n        stroke-dasharray: 10px 10px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 1s linear infinite;\n        animation: dash 1s linear infinite;\n    }\n\n    #charts_Series_0_Point_3_Symbol {\n        -webkit-animation: opac 1s ease-out infinite;\n        animation: opac 1s ease-out infinite;\n    }\n\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n\n    @keyframes opac {\n        0% {\n            stroke-opacity: 1;\n            stroke-width: 0px;\n        }\n        100% {\n            stroke-opacity: 0;\n            stroke-width: 10px;\n        }\n    }";
var DashedLine = /** @class */ (function (_super) {
    __extends(DashedLine, _super);
    function DashedLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DashedLine.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        labelFormat: 'y',
                        intervalType: 'Years',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, load: this.load.bind(this), primaryYAxis: {
                        labelFormat: '{value}%',
                        rangePadding: 'None',
                        lineStyle: { width: 0 },
                        minimum: 0,
                        maximum: 40,
                        interval: 10,
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true }, crosshair: {
                        enable: true,
                        line: {
                            color: 'rgba(204,214,235,0.25)',
                            width: ej2_base_1.Browser.isDevice ? 50 : 20,
                        },
                        lineType: 'Vertical'
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'Fruits Production Statistics', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Crosshair] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Banana', dashArray: '5', width: 2, marker: { visible: true, width: 10, height: 10 }, type: 'Line' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Apple', width: 2, marker: { visible: true, width: 10, height: 10, shape: 'Diamond' }, dashArray: '10', type: 'Line' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a line series with dash array. Dashed lines are animated by using css animation.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the line type charts. Line type charts are used to represent time-dependent data, showing trends in data at equal intervals. You can use ",
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
                " ",
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject",
                    React.createElement("code", null, "LineSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the line series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    DashedLine.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    DashedLine.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return DashedLine;
}(sample_base_1.SampleBase));
exports.DashedLine = DashedLine;
