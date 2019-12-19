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
 * Sample for Area series with empty points
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
exports.dataValues = [];
var colors = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue',
    'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];
financial_data_1.rainFallData.map(function (value, index) {
    exports.dataValues.push({
        XValue: new Date(2017, -index, 1), YValue: value.toFixed(2),
        color: colors[Math.floor(index / 16)]
    });
});
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Area empty sample
 */
var LineMultiLine = (function (_super) {
    __extends(LineMultiLine, _super);
    function LineMultiLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineMultiLine.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        labelFormat: 'y',
                        intervalType: 'Years',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, primaryYAxis: {
                        rangePadding: 'None',
                        minimum: 4,
                        maximum: 10,
                        title: 'Particulate Matter(PM)',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, tooltip: { enable: true, shared: true, enableAnimation: false }, legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: "Particulate Levels in Rainfall", loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.MultiColoredLineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataValues, width: 1.5, xName: 'XValue', yName: 'YValue', name: 'Rainfall', type: 'MultiColoredLine', pointColorMapping: 'color' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the annual mean rainfall data with multi colored line series in the chart. Data points are enhanced with segments and tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure each point in line type series. Multi colored line charts are used to represent time-dependent data to show the trends at equal intervals with their individual colors by using ",
                    React.createElement("code", null, "pointColorMapping"),
                    "."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap a point in touch enabled devices."),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use multi colored line series, we need to inject",
                    React.createElement("code", null, "MultiColoredLineSeries"),
                    " module using",
                    React.createElement("code", null, "Chart.Inject(MultiColoredLineSeries)"),
                    " method."))));
    };
    LineMultiLine.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    LineMultiLine.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return LineMultiLine;
}(sample_base_1.SampleBase));
exports.LineMultiLine = LineMultiLine;
