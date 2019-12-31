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
 * Sample for Range Navigator Print
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var stock_data_1 = require("./stock-data");
exports.stockData = [];
exports.startDate = new Date(2012, 4, 2);
for (var i = 0; i <= 250; i++) {
    exports.stockData.push(stock_data_1.chartData[i]);
    if (i > 45 && 50 > i) {
        exports.stockData[i].open = null;
    }
    else if (i > 95 && 100 > i) {
        exports.stockData[i].open = null;
    }
    else if (i > 145 && 150 > i) {
        exports.stockData[i].open = null;
    }
    else if (i > 195 && 200 > i) {
        exports.stockData[i].open = null;
    }
    else if (i > 245 && 250 > i) {
        exports.stockData[i].open = null;
    }
}
exports.themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
exports.borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
exports.regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px;\n    }\n    #days {\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    #control-container {\n        padding: 0px !important;\n    }\n\n    #material-gradient-chart stop {\n        stop-color: #00bdae;\n    }\n\n    #fabric-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #bootstrap4-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #highcontrast-gradient-chart stop {\n        stop-color: #79ECE4;\n    }\n\n    .chart-gradient stop[offset=\"0\"] {\n        stop-opacity: 0.9;\n    }\n\n    .chart-gradient stop[offset=\"1\"] {\n        stop-opacity: 0.3;\n    }\n";
var EmptyData = (function (_super) {
    __extends(EmptyData, _super);
    function EmptyData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chartRendered = false;
        return _this;
        // custom code end
    }
    EmptyData.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "days" }, "AAPL 2012-17")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenav) { return _this.rangeInstance = rangenav; }, style: { textAlign: "center" }, labelPosition: 'Outside', valueType: 'DateTime', majorTickLines: {
                            width: 0
                        }, majorGridLines: {
                            width: 0
                        }, tooltip: { enable: true, displayMode: 'Always' }, value: [new Date('2013-12-27'), new Date('2015-03-23')], width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: this.rangeLoad.bind(this), changed: this.changed.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.DateTime] }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: exports.stockData, xName: 'x', yName: 'open', type: 'Area', width: 2 })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'DateTime',
                            crosshairTooltip: { enable: true },
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            labelFormat: '${value}',
                            minimum: 40,
                            maximum: 140,
                            interval: 20,
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: this.chartLoad.bind(this), height: '350', chartArea: { border: { width: 0 } }, tooltip: {
                            enable: true, shared: true
                        } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.stockData, xName: 'x', yName: 'open', animation: { enable: false }, border: { width: 2 }, type: 'Area', width: 2, name: 'AAPL' }))))),
            React.createElement("svg", { style: { height: '0' } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "material-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap4-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the functionality of empty points in the range navigator series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render empty points in range navigator. Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed."))));
    };
    // custom code start
    EmptyData.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        var rangeTheme = args.rangeNavigator.theme;
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + rangeTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.width = 2;
        args.rangeNavigator.series[0].border.color = exports.borderColor[exports.themes.indexOf(rangeTheme)];
    };
    ;
    // custom code end
    EmptyData.prototype.changed = function (args) {
        if (this.chartInstance && this.chartRendered) {
            this.chartInstance.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chartInstance.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chartInstance.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    // custom code start
    EmptyData.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        var chartTheme = args.chart.theme;
        args.chart.series[0].fill = 'url(#' + chartTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = exports.borderColor[exports.themes.indexOf(chartTheme)];
        this.chartRendered = true;
    };
    ;
    return EmptyData;
}(sample_base_1.SampleBase));
exports.EmptyData = EmptyData;
