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
 * Sample for Range Area Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var series1 = [];
var value = 35;
var point1;
for (var i = 1; i < 100; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    }
    else {
        value -= Math.random();
    }
    point1 = { x: new Date(2017, 1, 1 + i), high: value, low: value - 10 };
    series1.push(point1);
}
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var RangeArea = (function (_super) {
    __extends(RangeArea, _super);
    function RangeArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeArea.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, load: this.load.bind(this), seriesRender: this.seriesRender.bind(this), primaryXAxis: {
                        valueType: 'DateTime',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, legendSettings: { visible: false }, zoomSettings: {
                        enableSelectionZooming: true,
                        mode: 'X'
                    }, primaryYAxis: {
                        labelFormat: '{value}˚C',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', title: 'Temperature Variation', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: series1, border: {
                                width: 2
                            }, xName: 'x', high: 'high', opacity: 0.4, marker: {
                                visible: false,
                                height: 8, width: 8, opacity: 1,
                                dataLabel: { visible: false, position: 'Outer' }
                            }, low: 'low', animation: { enable: true }, name: 'India', type: 'RangeArea' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the maximum and minimum temperatures  of different months with default range area series in the chart. Zoom the chart to check the temperature for week or day.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the range area type charts. You can use ",
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
                    "Chart component features are segregated into individual feature-wise modules. To use RangeArea series, we need to inject",
                    React.createElement("code", null, "RangeAreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the range area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    RangeArea.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    RangeArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    RangeArea.prototype.seriesRender = function (args) {
        var theme = args.series.chart.theme;
        var color;
        if (theme === 'Material') {
            color = '#004c46';
        }
        else if (theme === 'Bootstrap') {
            color = '#402c5c';
        }
        else {
            color = '#1b2e4e';
        }
        args.series.border.color = color;
    };
    return RangeArea;
}(sample_base_1.SampleBase));
exports.RangeArea = RangeArea;
