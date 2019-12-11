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
exports.dataValues = [];
[
    380, 410, 310, 540, 510, 330, 490, 470, 472, 460, 550, 420, 380, 430, 385, 520, 580, 420, 350, 505,
    535, 410, 204, 400, 415, 408, 415, 350, 375, 500, 390, 450, 440, 350, 400, 365, 490, 400, 520, 510,
    395, 380, 404, 400, 500, 390, 610, 380, 390, 420, 440, 570, 600, 380, 410, 405, 480, 320, 420, 440,
    320, 280, 320, 400, 390, 460, 470, 490, 420, 480, 410, 420, 580, 410, 380, 480, 360, 650, 680, 720,
    580, 480, 520, 440, 420, 430, 380, 520, 410, 540, 400, 390, 460, 470, 490, 420, 480, 470, 490, 330,
    520, 480, 580, 590, 600, 310, 480, 500, 400, 508, 480, 460, 700, 705, 480, 410, 480,
].map(function (value, index) {
    exports.dataValues.push({ XValue: new Date(1900 + index, 0, 1), YValue: value });
});
var content = "<div style='width:80px; padding: 5px;'><table style='width: 100%'>" +
    "<tr> <td><div style='width: 10px; height: 10px; background:blue;border-radius: 15px;'></div>" +
    "</td> <td style='padding-left: 5px;'>High</td></tr><tr><td>" +
    "<div style='width: 10px; height: 10px; background:green;;border-radius: 15px;'></div>" +
    "</td><td style='padding-left: 5px;'>Medium </td></tr><tr><td>" +
    "<div style='width: 10px; height: 10px; background:red;;border-radius: 15px;'></div>" +
    "</td><td style='padding-left: 5px;'>Low</td></tr></table></div>";
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Area empty sample
 */
var LineZone = /** @class */ (function (_super) {
    __extends(LineZone, _super);
    function LineZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineZone.prototype.render = function () {
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
                        labelFormat: '{value}mm',
                        rangePadding: 'None',
                        minimum: 200,
                        maximum: 800,
                        interval: 100,
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, tooltip: { enable: true, shared: true, enableAnimation: false }, legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: "Annual Mean Rainfall for Australia", loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.MultiColoredLineSeries, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content, region: 'Series', x: '90%', y: '12%' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataValues, xName: 'XValue', yName: 'YValue', name: 'Australia', type: 'MultiColoredLine', segmentAxis: 'Y' },
                            React.createElement(ej2_react_charts_1.SegmentsDirective, null,
                                React.createElement(ej2_react_charts_1.SegmentDirective, { value: 450, color: 'red' }),
                                React.createElement(ej2_react_charts_1.SegmentDirective, { value: 500, color: 'green' }),
                                React.createElement(ej2_react_charts_1.SegmentDirective, { color: 'blue' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the annual mean rainfall data with multi colored line series in the chart. Data points are enhanced with segments and tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the points in a particular range by using ",
                    React.createElement("code", null, "MultiColoredLine"),
                    " series type. Points under the range can be configured with ",
                    React.createElement("code", null, "color"),
                    ", ",
                    React.createElement("code", null, "width"),
                    ", and ",
                    React.createElement("code", null, "dashArray"),
                    "."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap a point in touch enabled devices."),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject",
                    React.createElement("code", null, "MultiColoredLineSeries"),
                    " module using",
                    React.createElement("code", null, "Chart.Inject(MultiColoredLineSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    LineZone.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    LineZone.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].segments[0].color = '#FF4741';
            args.chart.series[0].segments[1].color = '#00B400';
            args.chart.series[0].segments[2].color = '#3F9BFF';
        }
    };
    ;
    return LineZone;
}(sample_base_1.SampleBase));
exports.LineZone = LineZone;
