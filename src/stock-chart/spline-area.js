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
 * Sample for Stock Chart with Spline Area
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var stock_data_1 = require("./stock-data");
var SplineArea = /** @class */ (function (_super) {
    __extends(SplineArea, _super);
    function SplineArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplineArea.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartsplinearea', primaryXAxis: {
                        valueType: 'DateTime', majorGridLines: { width: 0 },
                        crosshairTooltip: { enable: true }
                    }, primaryYAxis: {
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent', width: 0 },
                        crosshairTooltip: { enable: true }
                    }, load: this.load.bind(this), seriesType: [], indicatorType: [], chartArea: { border: { width: 0 } }, crosshair: { enable: true }, title: 'Google Stock Price', titleStyle: {
                        fontWeight: '500', color: '#424242 '
                    } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.googl, xName: 'x', yName: 'high', type: 'SplineArea', fill: '#BDEDE9' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes stock data with spline area. Period and range selector help us to navigate different of data.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the dynamic stock chart.",
                    React.createElement("code", null, "SplineAreaSeries"),
                    " is used to represent selected data value."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the SplineAreaSeries, inject the ",
                    React.createElement("code", null, "SplineAreaSeries"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(SplineAreaSeries)"),
                    " method."))));
    };
    // custom code start
    SplineArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return SplineArea;
}(sample_base_1.SampleBase));
exports.SplineArea = SplineArea;
