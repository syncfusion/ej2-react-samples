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
 * Sample for Crosshair in chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
/**
 * Crosshair sample
 */
var CrosshairChart = (function (_super) {
    __extends(CrosshairChart, _super);
    function CrosshairChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CrosshairChart.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        majorGridLines: { width: 0 },
                        valueType: 'DateTime',
                        crosshairTooltip: { enable: true },
                        labelFormat: 'MMM'
                    }, load: this.load.bind(this), primaryYAxis: {
                        minimum: 83, maximum: 87, interval: 1,
                        title: 'Millions in USD',
                        labelFormat: '{value}M',
                        rowIndex: 0,
                        crosshairTooltip: {
                            enable: true
                        }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', title: 'Conns,Inc Stock Details', loaded: this.onChartLoad.bind(this), crosshair: { enable: true }, legendSettings: { visible: false } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.DateTime] }),
                    React.createElement(ej2_react_charts_1.AxesDirective, null,
                        React.createElement(ej2_react_charts_1.AxisDirective, { majorGridLines: { width: 0 }, rowIndex: 0, opposedPosition: true, minimum: 82, maximum: 88, interval: 2, name: 'yAxis', title: 'Millions in USD (Stock)', crosshairTooltip: { enable: true } })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'Line', dataSource: financial_data_1.axesData, border: { width: 1.5 }, xName: 'xDate', width: 2, yName: 'High', marker: {
                                visible: true
                            } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'HiloOpenClose', dataSource: financial_data_1.axesData, yAxisName: 'yAxis', border: { width: 1.5 }, bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', xName: 'xDate', width: 2, high: 'High', low: 'Low', open: 'Open', close: 'Close' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates crosshair feature in chart. To see crosshair, hover or long press the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the crosshair behavior in chart. Crosshair is used to inspect or focus on an individual data point. You can customize the axis tooltip using ",
                    React.createElement("code", null, "crosshairTooltip"),
                    " properties in axis."),
                React.createElement("p", null, "Hover the chart area to view crosshair and its tooltip. Touch and hold to enable crosshair in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Crosshair, we need to inject",
                    React.createElement("code", null, "Crosshair"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Crosshair can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-crosshairSettings.html" }, "documentation section"),
                    "."))));
    };
    CrosshairChart.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    CrosshairChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return CrosshairChart;
}(sample_base_1.SampleBase));
exports.CrosshairChart = CrosshairChart;
