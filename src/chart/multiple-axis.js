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
 * Sample for multiple axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
    { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
    { x: 'Sat', y: 50 }
];
exports.data2 = [
    { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
    { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
    { x: 'Sat', y: 34 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var MultipleAxis = /** @class */ (function (_super) {
    __extends(MultipleAxis, _super);
    function MultipleAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, ref: function (charts) { return _this.chartInstance = charts; }, primaryXAxis: {
                        valueType: 'Category',
                        interval: 1,
                        labelIntersectAction: 'Rotate90',
                        majorGridLines: { width: 0 }
                    }, primaryYAxis: {
                        minimum: 0, maximum: 100, interval: 20,
                        lineStyle: { width: 0 },
                        labelFormat: '{value}°F'
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), legendSettings: { visible: false }, title: 'Weather Condition JPN vs DEU', loaded: this.onChartLoad.bind(this), tooltip: { enable: true }, animationComplete: this.animationComplete.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation] }),
                    React.createElement(ej2_react_charts_1.AxesDirective, null,
                        React.createElement(ej2_react_charts_1.AxisDirective, { majorGridLines: { width: 0 }, rowIndex: 0, opposedPosition: true, lineStyle: { width: 0 }, minimum: 24, maximum: 36, interval: 2, majorTickLines: { width: 0 }, name: 'yAxis1', labelFormat: '{value}°C' })),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png"  style={{width: "41px"; height: "41px"}}/></div>', x: 'Sun', y: 35, coordinateUnits: 'Point', verticalAlignment: 'Top' }),
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png"  style={{width: "41px"; height: "41px"}}/></div>', x: 'Sat', y: 34, coordinateUnits: 'Point', yAxisName: 'yAxis1' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Germany', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Japan', type: 'Line', marker: {
                                visible: true, width: 10, height: 10, border: { width: 2, color: '#F8AB1D' }
                            }, yAxisName: 'yAxis1', width: 2 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates multiple axis in chart to represent the temperature in Celsius in an axis and Fahrenheit  in another axis.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure multipe axes. Use axes collection to render secondary axis to the chart and bind it to the specify series. You can also customize the axis line and its labels similar to primary axis."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "More information on the multiple axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-axis.html" }, "documentation section"),
                    "."))));
    };
    MultipleAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    MultipleAxis.prototype.animationComplete = function (args) {
        this.chartInstance.removeSvg();
        this.chartInstance.animateSeries = false;
        this.chartInstance['renderElements']();
    };
    ;
    // custom code start
    MultipleAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return MultipleAxis;
}(sample_base_1.SampleBase));
exports.MultipleAxis = MultipleAxis;
