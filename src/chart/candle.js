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
 * Sample for Candle Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var stock_chart_data_1 = require("./stock-chart-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.pointColors = [];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #title{\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    ";
/**
 * Candle sample
 */
var Candle = /** @class */ (function (_super) {
    __extends(Candle, _super);
    function Candle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getLabelText = function (value) {
            return (((value) / 1000000000)).toFixed(1) + 'bn';
        };
        return _this;
    }
    Candle.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "title" }, " AAPL Historical")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, ref: function (chart) { return _this.chart1 = chart; }, load: this.load.bind(this), primaryXAxis: {
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            title: 'Volume',
                            rangePadding: 'None',
                            valueType: 'Logarithmic',
                            opposedPosition: true,
                            majorGridLines: { width: 1 },
                            lineStyle: { width: 0 },
                            stripLines: [
                                {
                                    end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                                    opacity: 0.03, zIndex: 'Behind'
                                }
                            ]
                        }, tooltip: {
                            enable: true, shared: true
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', crosshair: { enable: true, lineType: 'Vertical' }, pointRender: this.renderPoint.bind(this), axisLabelRender: this.axisLabelRender.bind(this), tooltipRender: this.tooltipLabelRender.bind(this), chartArea: { border: { width: 0 } } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.StripLine, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.RowsDirective, null,
                            React.createElement(ej2_react_charts_1.RowDirective, { height: '30%' }),
                            React.createElement(ej2_react_charts_1.RowDirective, { height: '70%' })),
                        React.createElement(ej2_react_charts_1.AxesDirective, null,
                            React.createElement(ej2_react_charts_1.AxisDirective, { name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 }, labelFormat: 'n0', title: 'Price', plotOffset: 30, lineStyle: { width: 0 } })),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'Column', dataSource: stock_chart_data_1.chartData, animation: { enable: true }, xName: 'x', yName: 'volume', name: 'Volume' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', dataSource: stock_chart_data_1.chartData, animation: { enable: true }, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc', volume: 'volume' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the AAPL historical data with default candle series in the chart. Tooltip and crosshair shows the information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the Candle type charts. Candle type chart is used to represent the price movements in stock. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rect."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Candle series, we need to inject",
                    React.createElement("code", null, "CandleSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Candle series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Candle.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Candle.prototype.load = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    Candle.prototype.axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = this.getLabelText(+args.text);
        }
        if (args.axis.name === 'secondary') {
            args.text = '$' + args.text;
        }
    };
    Candle.prototype.tooltipLabelRender = function (args) {
        if (!args.series.index) {
            args.text = 'Volume : <b>' +
                this.getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
        }
    };
    Candle.prototype.renderPoint = function (args) {
        if (args.series.type === 'Candle') {
            exports.pointColors.push(args.fill);
        }
        else {
            args.fill = exports.pointColors[args.point.index];
        }
    };
    ;
    return Candle;
}(sample_base_1.SampleBase));
exports.Candle = Candle;
