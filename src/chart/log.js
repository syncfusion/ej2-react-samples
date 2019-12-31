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
 * Samples for Logarithmic Axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data = [
    { x: new Date(1995, 0, 1), y: 80 },
    { x: new Date(1996, 0, 1), y: 200 },
    { x: new Date(1997, 0, 1), y: 400 },
    { x: new Date(1998, 0, 1), y: 600 },
    { x: new Date(1999, 0, 1), y: 700 },
    { x: new Date(2000, 0, 1), y: 1400 },
    { x: new Date(2001, 0, 1), y: 2000 },
    { x: new Date(2002, 0, 1), y: 4000 },
    { x: new Date(2003, 0, 1), y: 6000 },
    { x: new Date(2004, 0, 1), y: 8000 },
    { x: new Date(2005, 0, 1), y: 11000 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var LogAxis = (function (_super) {
    __extends(LogAxis, _super);
    function LogAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        labelFormat: 'y',
                        valueType: 'DateTime',
                        edgeLabelPlacement: 'Shift'
                    }, load: this.load.bind(this), primaryYAxis: {
                        valueType: 'Logarithmic',
                        edgeLabelPlacement: 'Shift',
                        minorTicksPerInterval: 5,
                        majorGridLines: { width: 1.5 },
                        minorTickLines: { width: 0, height: 4 },
                        minimum: 0,
                        maximum: 100000,
                        interval: 1,
                        title: ej2_base_1.Browser.isDevice ? '' : 'Profit',
                        labelFormat: '${value}'
                    }, legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'Product X Growth [1995-2005]', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, header: 'Profit' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', name: 'Product X', yName: 'y', type: 'Line', width: 2, marker: { visible: true, height: 10, width: 10 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of logarithmic axis in the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Logarithmic axis uses logarithmic scale and it is very useful in visualizing when the data has values with both lower order of magnitude (eg: 10^-6) and higher order of magnitude (eg: 10^6). To render Logarithmic axis, set ",
                    React.createElement("code", null, "valueType"),
                    " in axis to ",
                    React.createElement("b", null, "Logarithmic"),
                    "."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Logarithmic axis, we need to inject",
                    React.createElement("code", null, "Logarithmic"),
                    " module using ",
                    React.createElement("code", null, "servives"),
                    "."),
                React.createElement("p", null,
                    "More information on the Logarithmic axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#valuetype-valuetype" }, "documentation section"),
                    "."))));
    };
    LogAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    LogAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return LogAxis;
}(sample_base_1.SampleBase));
exports.LogAxis = LogAxis;
