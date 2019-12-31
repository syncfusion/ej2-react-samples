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
 * Samples for Trendlines
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var series1 = [];
var yValue = [7.66, 8.03, 8.41, 8.97, 8.77, 8.20, 8.16, 7.89, 8.68, 9.48, 10.11, 11.36, 12.34, 12.60, 12.95,
    13.91, 16.21, 17.50, 22.72, 28.14, 31.26, 31.39, 32.43, 35.52, 36.36,
    41.33, 43.12, 45.00, 47.23, 48.62, 46.60, 45.28, 44.01, 45.17, 41.20, 43.41, 48.32, 45.65, 46.61, 53.34, 58.53];
var point1;
var i;
var j = 0;
for (i = 1973; i <= 2013; i++) {
    point1 = { x: i, y: yValue[j] };
    series1.push(point1);
    j++;
}
var powerData = [
    { x: 1, y: 10 }, { x: 2, y: 50 }, { x: 3, y: 80 }, { x: 4, y: 110 },
    { x: 5, y: 180 }, { x: 6, y: 220 }, { x: 7, y: 300 }, { x: 8, y: 370 }, { x: 9, y: 490 }, { x: 10, y: 500 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #charts_Series_0_TrendLine_0 {\n        stroke-dasharray: 10px 10px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 1s linear infinite;\n        animation: dash 1s linear infinite;\n    }\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }";
var Trend = (function (_super) {
    __extends(Trend, _super);
    function Trend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.forwardForecast = false;
        _this.backwardForecast = false;
        _this.polynomialOrder = true;
        _this.period = true;
        _this.droplist = [
            { value: 'Linear' },
            { value: 'Exponential' },
            { value: 'Power' },
            { value: 'Logarithmic' },
            { value: 'Polynomial' },
            { value: 'MovingAverage' }
        ];
        return _this;
        // custom code end
    }
    Trend.prototype.change = function (e) {
        var type = document.getElementById('trendLineType');
        this.chartInstance.series[0].dataSource = [];
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.series[0].trendlines[0].type = type.value;
        this.chartInstance.series[0].trendlines[0].name = type.value;
        if (type.value !== 'Power') {
            this.chartInstance.series[0].dataSource = series1;
            this.chartInstance.series[0].name = 'Rupees';
            this.chartInstance.primaryXAxis.title = '';
            this.chartInstance.primaryYAxis.interval = 10;
            this.chartInstance.primaryYAxis.title = 'Rupees against Dollars';
            this.chartInstance.title = 'Historical Indian Rupee Rate (INR USD)';
            if (type.value === 'MovingAverage') {
                this.chartInstance.series[0].trendlines[0].marker.visible = false;
            }
        }
        else {
            this.chartInstance.series[0].dataSource = powerData;
            this.chartInstance.series[0].name = 'Meters';
            this.chartInstance.primaryXAxis.title = 'Seconds';
            this.chartInstance.primaryYAxis.title = 'Meters';
            this.chartInstance.primaryYAxis.interval = 100;
            this.chartInstance.title = 'Distance Measurement';
        }
        if (type.value !== 'Polynomial' && type.value !== 'MovingAverage') {
            this.period = this.polynomialOrder = true;
            this.forwardForecast = this.backwardForecast = false;
        }
        else if (type.value === 'MovingAverage') {
            this.period = false;
            this.forwardForecast = this.backwardForecast = this.polynomialOrder = true;
        }
        else {
            this.forwardForecast = this.backwardForecast = this.polynomialOrder = false;
            this.period = true;
        }
        this.forwardElement.enabled = !this.forwardForecast;
        this.backwardElement.enabled = !this.backwardForecast;
        this.polynomialElement.enabled = !this.polynomialOrder;
        this.periodElement.enabled = !this.period;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkForwardForecast = function (e) {
        var value = Number(document.getElementById('forwardForecast').value);
        this.chartInstance.series[0].trendlines[0].forwardForecast = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkBackwardForecast = function (e) {
        var value = Number(document.getElementById('backwardForecast').value);
        this.chartInstance.series[0].trendlines[0].backwardForecast = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkPolynomialOrder = function (e) {
        var value = Number(document.getElementById('polynomial').value);
        this.chartInstance.series[0].trendlines[0].polynomialOrder = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkPeriod = function (e) {
        var value = Number(document.getElementById('period').value);
        this.chartInstance.series[0].trendlines[0].period = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, load: this.load.bind(this), primaryXAxis: {
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            title: 'Rupees against Dollars',
                            interval: 10, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                        }, tooltip: { enable: true }, chartArea: { border: { width: 0 } }, title: 'Historical Indian Rupee Rate (INR USD)', loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_1.Legend] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: series1, xName: 'x', yName: 'y', name: 'Rupees', type: 'Spline', marker: { visible: true } },
                                React.createElement(ej2_react_charts_1.TrendlinesDirective, null,
                                    React.createElement(ej2_react_charts_1.TrendlineDirective, { type: 'Linear', width: 3, marker: { visible: false }, name: 'Trends', fill: '#C64A75' })))))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "TrendLine Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "trendLineType", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, text: "Linear", value: "Linear" })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", null, "Forward Forecast:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "forwardForecast", value: 0, min: 1, max: 20, step: 1, change: this.checkForwardForecast.bind(this), ref: function (d) { return _this.forwardElement = d; } })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", null, "Backward Forecast:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "backwardForecast", value: 0, min: 1, max: 20, step: 1, change: this.checkBackwardForecast.bind(this), ref: function (d) { return _this.backwardElement = d; } })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", null, "Polynomial Order:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "polynomial", value: 0, min: 1, max: 20, step: 1, enabled: false, change: this.checkPolynomialOrder.bind(this), ref: function (d) { return _this.polynomialElement = d; } })))),
                            React.createElement("tr", { id: '', style: { height: '50px' } },
                                React.createElement("td", { style: { width: '80%' } },
                                    React.createElement("div", null, "Period:")),
                                React.createElement("td", { style: { width: '20%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "period", value: 0, min: 1, max: 20, step: 1, enabled: false, change: this.checkPeriod.bind(this), ref: function (d) { return _this.periodElement = d; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample visualizes the trend of Indian rupees and US dollar variation with trendline in the chart. The type of trend line can be changed by using ",
                    React.createElement("code", null, "TrendLine Type"),
                    ", forward and backward forecasting of trendlines can be changed by ",
                    React.createElement("code", null, "Forward Forecasting"),
                    " and ",
                    React.createElement("code", null, "Backward Forecast"),
                    " respectively. Polynomial and period for a trendlines can be changed by using ",
                    React.createElement("code", null, "Polynomial order"),
                    " and ",
                    React.createElement("code", null, "Period"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the Trend line type charts. Trend line type chart is used to represent the price movements in stock. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rect."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Trend Line series, we need to inject",
                    React.createElement("code", null, "Trendlines"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the TrendLines series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Trend.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    Trend.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Trend;
}(sample_base_1.SampleBase));
exports.Trend = Trend;
