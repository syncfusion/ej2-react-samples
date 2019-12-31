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
 * Sample for Stock Chart without Peroid Selector
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n#gradient-chart stop {\n    stop-color: #BDEDE9;\n}\n#gradient-chart stop[offset=\"0\"] {\n    stop-opacity: 1;\n}\n#gradient-chart stop[offset=\"1\"] {\n    stop-opacity: 0.4;\n}\n#control-container {\n    padding: 0px !important;\n}";
var PeriodSelector = (function (_super) {
    __extends(PeriodSelector, _super);
    function PeriodSelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PeriodSelector.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartperiod', primaryYAxis: {
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent', width: 0 }
                    }, primaryXAxis: { majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }, load: this.load.bind(this), chartArea: { border: { width: 0 } }, tooltip: { enable: true }, crosshair: { enable: true }, enablePeriodSelector: false },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.aapl, type: 'Area', xName: 'x', yName: 'open', fill: 'url(#gradient-chart)' }))),
                React.createElement("div", null,
                    React.createElement("svg", { style: { height: '0' } },
                        React.createElement("defs", null,
                            React.createElement("linearGradient", { id: "gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                                React.createElement("stop", { offset: "0" }),
                                React.createElement("stop", { offset: "1" })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample renders the stock chart without period selector, data's can be navigated through range selector.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the Stock chart.",
                    React.createElement("code", null, "AreaSeries"),
                    " is used to represent selected data value."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                    React.createElement("code", null, "DateTime"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method.  To use the AreaSeries, inject the ",
                    React.createElement("code", null, "AreaSeries"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(AreaSeries)"),
                    " method."))));
    };
    // custom code start
    PeriodSelector.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return PeriodSelector;
}(sample_base_1.SampleBase));
exports.PeriodSelector = PeriodSelector;
