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
 * Sample for Stochastic Indicator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var datasource_1 = require("./datasource");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var Stochastic = (function (_super) {
    __extends(Stochastic, _super);
    function Stochastic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Stochastic.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: this.load.bind(this), style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        majorGridLines: { width: 0 },
                        zoomFactor: 0.2, zoomPosition: 0.6,
                        crosshairTooltip: { enable: true },
                    }, primaryYAxis: {
                        title: 'Price',
                        labelFormat: '${value}',
                        minimum: 50, maximum: 170,
                        plotOffset: 25,
                        interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }
                    }, tooltip: { enable: true, shared: true }, crosshair: { enable: true, lineType: 'Vertical' }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, zoomSettings: { enableSelectionZooming: true, mode: 'X', enablePan: true }, title: 'AAPL 2012-2017', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries,
                            ej2_react_charts_1.StochasticIndicator, ej2_react_charts_1.StripLine] }),
                    React.createElement(ej2_react_charts_1.RowsDirective, null,
                        React.createElement(ej2_react_charts_1.RowDirective, { height: '40%' }),
                        React.createElement(ej2_react_charts_1.RowDirective, { height: '60%' })),
                    React.createElement(ej2_react_charts_1.AxesDirective, null,
                        React.createElement(ej2_react_charts_1.AxisDirective, { rowIndex: 0, name: 'secondary', opposedPosition: true, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0, maximum: 120, interval: 60, title: 'Stochastic', lineStyle: { width: 0 } },
                            React.createElement(ej2_react_charts_1.StripLinesDirective, null,
                                React.createElement(ej2_react_charts_1.StripLineDirective, { start: 0, end: 120, text: '', color: 'black', visible: true, opacity: 0.03, zIndex: 'Behind' })))),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: datasource_1.chartData, width: 2, xName: 'x', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open', name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', type: 'Candle', animation: { enable: true } })),
                    React.createElement(ej2_react_charts_1.IndicatorsDirective, null,
                        React.createElement(ej2_react_charts_1.IndicatorDirective, { type: 'Stochastic', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff', kPeriod: 2, dPeriod: 3, showZones: true, periodLine: { color: '#f2ec2f' }, period: 3, animation: { enable: false }, upperLine: { color: '#e74c3d' }, lowerLine: { color: '#2ecd71' } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a stock chart with candle series and an Stochastic indicator. Trackball shows the information about the stock and indicator value of a day.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the Stochastic Indicator."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Stochastic Indicator, we need to inject",
                    React.createElement("code", null, "StochasticIndicator"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Stochastic Indicator can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Stochastic.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Stochastic.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Stochastic;
}(sample_base_1.SampleBase));
exports.Stochastic = Stochastic;
