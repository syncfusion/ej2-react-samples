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
 * Sample for DateTime Axis Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
exports.themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
exports.borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
exports.regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #days {\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    #control-container {\n        padding: 0px !important;\n    }\n\n    #material-gradient-chart stop {\n        stop-color: #00bdae;\n    }\n\n    #fabric-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #bootstrap4-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #highcontrast-gradient-chart stop {\n        stop-color: #79ECE4;\n    }\n\n    .chart-gradient stop[offset=\"0\"] {\n        stop-opacity: 0.9;\n    }\n\n    .chart-gradient stop[offset=\"1\"] {\n        stop-opacity: 0.3;\n    }\n    ";
var DateTimeAxis = (function (_super) {
    __extends(DateTimeAxis, _super);
    function DateTimeAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "days" }, "EUR Exchange Rate from USD")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return _this.rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, labelPosition: 'Outside', valueType: 'DateTime', majorTickLines: {
                            width: 0
                        }, tooltip: { enable: true, format: 'yyyy/MM/dd', displayMode: 'Always' }, value: [new Date('2011-01-01'), new Date('2013-12-31')], width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: this.rangeLoad.bind(this), changed: this.changed.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.RangeTooltip] }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: stock_data_1.stockData, xName: 'x', yName: 'y', type: 'Area', width: 2, animation: { enable: false }, border: { width: 2 } })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'DateTime',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            labelFormat: 'n1',
                            minimum: 0.6,
                            maximum: 1,
                            interval: 0.1,
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 }
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', axisLabelRender: this.labelRender.bind(this), load: this.chartLoad.bind(this), height: '350', chartArea: { border: { width: 0 } }, tooltip: {
                            enable: true, shared: true
                        }, crosshair: {
                            enable: false,
                            lineType: 'None'
                        } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Crosshair, ej2_react_charts_1.DateTime, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { name: 'Rate', type: 'Spline', dataSource: stock_data_1.stockData, xName: 'x', yName: 'y', width: 2 })))),
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
                            React.createElement("stop", { offset: "1" }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes rendering of date-time in the range navigator with exchange rate analysis of EUR to USD.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Date-time data is used in this sample, and the selected range values are showed with tooltip. Date-time axis uses date-time scale and displays date-time values as axis labels. To render date-time axis, set the ",
                    React.createElement("code", null, "valueType"),
                    " to ",
                    React.createElement("code", null, "DateTime"),
                    ". Format of the axis label will be calculated based on the intervalType of the range navigator. You can also directly set the format using the labelFormat property."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the",
                    React.createElement("code", null, "AreaSeries"),
                    " module using",
                    React.createElement("code", null, "RangeNavigator.Inject(AreaSeries)"),
                    " method. To use date time axis, inject the",
                    React.createElement("code", null, "DateTime"),
                    " module using",
                    React.createElement("code", null, "RangeNavigator.Inject(DateTime)"),
                    " method."))));
    };
    DateTimeAxis.prototype.changed = function (args) {
        if (this.chart1 && this.chartRendered) {
            this.chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chart1.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    DateTimeAxis.prototype.labelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = '€' + args.text;
        }
    };
    DateTimeAxis.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        this.chartRendered = true;
    };
    ;
    DateTimeAxis.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        var rangeTheme = args.rangeNavigator.theme;
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + rangeTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = exports.borderColor[exports.themes.indexOf(rangeTheme)];
    };
    ;
    return DateTimeAxis;
}(sample_base_1.SampleBase));
exports.DateTimeAxis = DateTimeAxis;
