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
 * Sample for smart axis labels
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
exports.data1 = [{ x: -6, y: 2 }, { x: -3, y: -4 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }];
exports.data2 = [{ x: -6, y: 2 }, { x: -5, y: 0 }, { x: -4.511, y: -0.977 }, { x: -3, y: -4 }, { x: -1.348, y: -1.247 },
    { x: -0.6, y: 0 }, { x: 0, y: 1 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }];
exports.data3 = [{ x: -6, y: 2 }, { x: -5.291, y: 0 }, { x: -5, y: -0.774 }, { x: -3, y: -4 }, { x: -0.6, y: -0.965 },
    { x: -0.175, y: 0 }, { x: 0, y: 0.404 }, { x: 1.5, y: 3.5 }, { x: 3.863, y: 5.163 }, { x: 6, y: 4.5 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var AxisCrossing = (function (_super) {
    __extends(AxisCrossing, _super);
    function AxisCrossing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'X' },
            { value: 'Y' },
        ];
        return _this;
        // custom code end
    }
    AxisCrossing.prototype.change = function () {
        var target = document.getElementById('axisElements');
        if (this.dropElement.value === 'X') {
            target.checked = this.chartInstance.primaryXAxis.placeNextToAxisLine;
            this.numericValue.value = +this.chartInstance.primaryXAxis.crossesAt;
        }
        else {
            target.checked = this.chartInstance.primaryYAxis.placeNextToAxisLine;
            this.numericValue.value = +this.chartInstance.primaryYAxis.crossesAt;
        }
        this.chartInstance.dataBind();
    };
    ;
    AxisCrossing.prototype.axisElements = function () {
        var target = document.getElementById('axisElements');
        if (this.dropElement.value === 'X') {
            this.chartInstance.primaryXAxis.placeNextToAxisLine = target.checked;
        }
        else {
            this.chartInstance.primaryYAxis.placeNextToAxisLine = target.checked;
        }
        this.chartInstance.dataBind();
    };
    ;
    AxisCrossing.prototype.crosshingValue = function () {
        if (this.dropElement.value === 'X') {
            this.chartInstance.primaryXAxis.crossesAt = this.numericValue.value;
        }
        else {
            this.chartInstance.primaryYAxis.crossesAt = this.numericValue.value;
        }
        this.chartInstance.dataBind();
    };
    ;
    AxisCrossing.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            minimum: -8, maximum: 8, interval: 2,
                            valueType: 'Double',
                            lineStyle: {
                                width: 2
                            },
                            minorTickLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            crossesAt: 0,
                            minorTicksPerInterval: 3
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            minimum: -8, maximum: 8, interval: 2,
                            lineStyle: {
                                width: 2
                            },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                            crossesAt: 0,
                            minorTicksPerInterval: 3,
                        }, load: this.load.bind(this), title: "Spline Interpolation", loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Linear Interpolation", type: 'Line', width: 2, enableTooltip: false, fill: 'Blue' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Cubic Spline Interpolation", type: 'Spline', width: 2, enableTooltip: false, fill: 'Green' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Data Points", type: 'Scatter', width: 2, marker: { visible: false, width: 12, height: 12 }, fill: 'red' })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Axis: ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "X" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Crosses Value:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 0, min: -8, max: 8, width: 120, step: 2, change: this.crosshingValue.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return _this.numericValue = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Placing Label Near to Axis Line:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "axisElements", onChange: this.axisElements.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return _this.crossValue = d; }, checked: true })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates an interpolation of data points between linear and cubic by using spline and line series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the axis crossing behavior in chart. Axis can be positioned anywhere in the chart area by using the ",
                    React.createElement("code", null, "crossesAt"),
                    " property of axis. This property specifies where the horizontal axis should intersect or cross the vertical axis and vice-versa."),
                React.createElement("p", null,
                    "Default value of crossesAt property is null. So, you can use ",
                    React.createElement("code", null, "placeNextToAxisLine"),
                    " property to place the axis labels and ticks next to axis line. When there are multiple axes, you can choose an axis to cross by using ",
                    React.createElement("code", null, "crossesInAxis"),
                    " property. If the axis name is not valid, primaryXAxis or primaryYAxis will be used for crossing, by default."),
                React.createElement("p", null,
                    "More information on the smart axis labels can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    AxisCrossing.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    AxisCrossing.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return AxisCrossing;
}(sample_base_1.SampleBase));
exports.AxisCrossing = AxisCrossing;
