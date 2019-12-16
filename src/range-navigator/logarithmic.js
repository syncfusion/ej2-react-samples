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
 * Sample for Logarithmic Axis Range Navigator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data = [];
exports.max = 100;
for (var i = 0; i < 100; i++) {
    exports.data.push({
        x: Math.pow(10, i * 0.1),
        y: Math.floor(Math.random() * (80 - 30 + 1)) + 30
    });
}
exports.themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
exports.borderColor = ['#00bdae', '#4472c4', '#a16ee5', '#79ECE4'];
exports.regionColor = ['rgba(0, 189, 174, 0.3)', 'rgba(68, 114, 196, 0.3)',
    'rgba(161, 110, 229, 0.3)', 'rgba(121, 236, 228, 0.3)'];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px;\n    }\n    #title{\n        font-size: 15px;\n        font-style: normal;\n        font-family: \"Segoe UI\";\n        font-weight: 500;\n        text-anchor: middle;\n        transform: none;\n        opacity: 1;\n    }\n    #control-container {\n        padding: 0px !important;\n    }\n\n    #material-gradient-chart stop {\n        stop-color: #00bdae;\n    }\n\n    #fabric-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #bootstrap4-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #highcontrast-gradient-chart stop {\n        stop-color: #79ECE4;\n    }\n\n    .chart-gradient stop[offset=\"0\"] {\n        stop-opacity: 0.9;\n    }\n\n    .chart-gradient stop[offset=\"1\"] {\n        stop-opacity: 0.3;\n    }\n    ";
var LogarithmicAxis = /** @class */ (function (_super) {
    __extends(LogarithmicAxis, _super);
    function LogarithmicAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogarithmicAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { textAlign: "center" } },
                    React.createElement("div", { id: "title" }, "Inflation vs Goods Consumers")),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenavigator) { return _this.rangenavigator1 = rangenavigator; }, style: { textAlign: "center" }, labelPosition: 'Outside', valueType: 'Logarithmic', tooltip: { enable: true }, interval: 1, value: [4, 6], labelIntersectAction: 'None', width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: this.rangeLoad.bind(this), labelRender: this.renderLabel.bind(this), tooltipRender: this.renderTooltip.bind(this), changed: this.changed.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepLineSeries, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.RangeTooltip] }),
                        React.createElement(ej2_react_charts_1.RangenavigatorSeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.RangenavigatorSeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', type: 'StepLine', width: 2 })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart1 = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'Logarithmic',
                            crosshairTooltip: { enable: false },
                            interval: 1,
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            title: 'Numers of Goods Consumers'
                        }, primaryYAxis: {
                            minimum: 0, maximum: 100,
                            title: 'Inflation',
                            labelFormat: '{value}%',
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 }
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', load: this.chartLoad.bind(this), chartArea: { border: { width: 0 } }, crosshair: {
                            enable: false,
                            lineType: 'Vertical'
                        } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepAreaSeries, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', border: { width: 2 }, type: 'StepArea', animation: { enable: false }, marker: { visible: true }, width: 2 })))),
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
                    React.createElement("p", null, "This sample demonstrates rendering logarithmic axis in the range navigator.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "Logarithmic axis uses logarithmic scale and it is very useful in visualizing when the data has values with both lower order of magnitude (eg: 10^-6) and higher order of magnitude (eg: 10^6). To render Logarithmic axis, set ",
                        React.createElement("code", null, "valueType"),
                        " to ",
                        React.createElement("code", null, "Logarithmic"),
                        ". Tooltip is enabled in this example, to see the tooltip in action, while the selected range is changed."),
                    React.createElement("br", null),
                    React.createElement("p", null,
                        React.createElement("b", null, "Injecting Module")),
                    React.createElement("p", null,
                        "The range navigator component features are segregated into individual feature-wise modules. To use logarithmic axis, inject the  ",
                        React.createElement("code", null, "Logarithmic"),
                        " module using the",
                        React.createElement("code", null, "RangeNavigator.Inject(Logarithmic)"),
                        " method.")))));
    };
    LogarithmicAxis.prototype.changed = function (args) {
        if (this.chart1) {
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
    // custom code start
    LogarithmicAxis.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        args.chart.series[0].fill = 'url(#' + args.chart.theme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = exports.borderColor[exports.themes.indexOf(args.chart.theme)];
    };
    ;
    LogarithmicAxis.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
        args.rangeNavigator.series[0].fill = 'url(#' + args.rangeNavigator.theme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.width = 2;
        args.rangeNavigator.series[0].border.color = exports.borderColor[exports.themes.indexOf(args.rangeNavigator.theme)];
    };
    ;
    // custom code end
    LogarithmicAxis.prototype.renderLabel = function (args) {
        args.text = (+args.text).toExponential().toLocaleUpperCase();
    };
    ;
    LogarithmicAxis.prototype.renderTooltip = function (args) {
        args.text = [(+(+args.text).toFixed(1)).toExponential(1).toString().toLocaleUpperCase()];
    };
    ;
    return LogarithmicAxis;
}(sample_base_1.SampleBase));
exports.LogarithmicAxis = LogarithmicAxis;
