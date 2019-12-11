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
 * Sample for stripline recurrence
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: new Date(1970, 1, 1), y: 16500 }, { x: new Date(1975, 1, 1), y: 16000 }, { x: new Date(1980, 1, 1), y: 15400 },
    { x: new Date(1985, 1, 1), y: 15800 }, { x: new Date(1990, 1, 1), y: 14000 }, { x: new Date(1995, 1, 1), y: 10500 },
    { x: new Date(2000, 1, 1), y: 13300 }, { x: new Date(2005, 1, 1), y: 12800 }
];
exports.data2 = [{ x: new Date(1970, 1, 1), y: 8000 }, { x: new Date(1975, 1, 1), y: 7600 }, { x: new Date(1980, 1, 1), y: 6400 },
    { x: new Date(1985, 1, 1), y: 3700 }, { x: new Date(1990, 1, 1), y: 7200 }, { x: new Date(1995, 1, 1), y: 2300 },
    { x: new Date(2000, 1, 1), y: 4000 }, { x: new Date(2005, 1, 1), y: 4800 }];
var SAMPLE_CSS = "\n    .control-container {\n\t\tpadding: 0px !important;\n    }";
var Striplinerecurrence = /** @class */ (function (_super) {
    __extends(Striplinerecurrence, _super);
    function Striplinerecurrence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Striplinerecurrence.prototype.xIndex = function () {
        this.chartInstance.primaryXAxis.stripLines[0].visible = this.xcheckElement.checked;
    };
    ;
    Striplinerecurrence.prototype.yIndex = function () {
        this.chartInstance.primaryYAxis.stripLines[0].visible = this.ycheckElement.checked;
    };
    ;
    Striplinerecurrence.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'DateTime', interval: 5, intervalType: 'Years', majorGridLines: { width: 0 },
                            edgeLabelPlacement: 'Shift',
                            minimum: new Date(1965, 1, 1), maximum: new Date(2010, 1, 1),
                            stripLines: [{
                                    startFromAxis: true, size: 5, sizeType: 'Years', isRepeat: true, repeatEvery: 10, visible: true,
                                    color: 'rgba(167,169,171, 0.1)'
                                }]
                        }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), primaryYAxis: {
                            minimum: 0, maximum: 18000, interval: 2000, majorGridLines: { color: 'rgba(167,169,171, 0.3)' },
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' },
                            stripLines: [
                                {
                                    startFromAxis: true, size: 2000, isRepeat: true, repeatEvery: 4000, visible: true,
                                    color: 'rgba(167,169,171, 0.1)'
                                }
                            ]
                        }, tooltip: {
                            enable: true, format: ' Year: ${point.x}<br> Tons Per Day: ${point.y}'
                        }, loaded: this.onChartLoad.bind(this), title: 'World Pollution Report' },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.StripLine] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, type: 'Column', name: 'AllSources' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', width: 2, type: 'Column', name: 'Autos && Light Trucks' })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "X Axis:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "xIndex", defaultChecked: true, onChange: this.xIndex.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return _this.xcheckElement = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Y Axis:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "yIndex", defaultChecked: true, onChange: this.yIndex.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return _this.ycheckElement = d; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the Olympic medal count in Rio with default column series in the chart. Data points values are showed by using data label.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the column type charts. Column type charts are used for comparing the frequency, count, total or average of data in different categories. You can use ",
                    React.createElement("code", null, "border"),
                    ",",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rectangle. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject",
                    React.createElement("code", null, "ColumnSeries"),
                    " module using ",
                    React.createElement("code", null, "Chart.Inject(ColumnSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the column series can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Striplinerecurrence.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    Striplinerecurrence.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Striplinerecurrence;
}(sample_base_1.SampleBase));
exports.Striplinerecurrence = Striplinerecurrence;
