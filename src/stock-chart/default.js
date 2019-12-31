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
 * Sample for Stock Chart with Default
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var indicator_data_1 = require("./indicator-data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .charts {\n            align :center\n        }";
exports.tooltipRender = function (args) {
    if (args.text.split('<br/>')[4]) {
        var target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
        var value = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
};
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartdefault', primaryXAxis: {
                        valueType: 'DateTime',
                        majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' },
                        crosshairTooltip: { enable: true }
                    }, primaryYAxis: {
                        labelFormat: 'n0',
                        lineStyle: { width: 0 }, rangePadding: 'None',
                        majorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true }, tooltipRender: exports.tooltipRender, crosshair: { enable: true }, load: this.load.bind(this), title: 'AAPL Stock Price', titleStyle: {
                        fontWeight: '500', color: '#424242 '
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: indicator_data_1.chartData, xName: 'x', type: 'Candle', animation: { enable: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes stock chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the Stock chart.",
                    React.createElement("code", null, "CandleSeries"),
                    " is used to represent selected data value."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the LineSeries, inject the",
                    React.createElement("code", null, "CandleSeries"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(CandleSeries)"),
                    " method."))));
    };
    Default.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
