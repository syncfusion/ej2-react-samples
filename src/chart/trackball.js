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
 * Sample for Trackball in chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var trackball_data_1 = require("./trackball-data");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var TrackballChart = /** @class */ (function (_super) {
    __extends(TrackballChart, _super);
    function TrackballChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrackballChart.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11),
                        valueType: 'DateTime',
                        skeleton: 'y',
                        lineStyle: { width: 0 },
                        majorGridLines: { width: 0 },
                        edgeLabelPlacement: 'Shift'
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), primaryYAxis: {
                        title: 'Revenue',
                        labelFormat: '{value}M',
                        majorTickLines: { width: 0 },
                        minimum: 10, maximum: 80,
                        lineStyle: { width: 0 },
                    }, title: 'Average Sales per Person', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, shared: true }, crosshair: { enable: true, lineType: 'Vertical' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: trackball_data_1.john, xName: 'x', yName: 'y', width: 2, name: 'John', type: 'Line', marker: { visible: true } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: trackball_data_1.andrew, xName: 'x', yName: 'y', width: 2, name: 'Andrew', type: 'Line', marker: { visible: true } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: trackball_data_1.thomas, xName: 'x', yName: 'y', width: 2, name: 'Thomas', type: 'Line', marker: { visible: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates trackball feature in chart. To show trackball, hover or long press the chart and you can see the point value near to the mouse point.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the trackball behavior in chart. Trackball is used to track a data point closer to the current mouse position or touch contact point. You can show tooltip for individual point or group of points closer to mouse position using ",
                    React.createElement("code", null, "shared"),
                    " properties in tooltip."),
                React.createElement("p", null, "Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Trackball, we need to inject",
                    React.createElement("code", null, "Tooltip"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Tooltip and Trackball can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-tooltipSettingsModel.html" }, "documentation section"),
                    "."))));
    };
    TrackballChart.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    TrackballChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return TrackballChart;
}(sample_base_1.SampleBase));
exports.TrackballChart = TrackballChart;
