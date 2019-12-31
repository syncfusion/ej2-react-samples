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
 * Sample for Empty Point
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var EmptyPoint = (function (_super) {
    __extends(EmptyPoint, _super);
    function EmptyPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Column' },
            { value: 'Area' },
            { value: 'Spline' },
        ];
        _this.modelist = [
            { value: 'Gap' },
            { value: 'Drop' },
            { value: 'Average' },
            { value: 'Zero' }
        ];
        return _this;
        // custom code end
    }
    EmptyPoint.prototype.change = function () {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.refresh();
    };
    ;
    EmptyPoint.prototype.mode = function () {
        this.chartInstance.series[0].emptyPointSettings.mode = this.modeElement.value;
        this.chartInstance.series[0].emptyPointSettings.fill = '#e6e6e6';
        this.chartInstance.refresh();
    };
    ;
    EmptyPoint.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            title: 'Product', valueType: 'Category', interval: 1
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            title: 'Profit', minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%'
                        }, load: this.load.bind(this), legendSettings: { visible: false }, title: "Annual Product-Wise Profit Analysis", loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.AreaSeries] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Profit', type: 'Column', marker: { visible: true, height: 10, width: 10 }, emptyPointSettings: {
                                    fill: '#e6e6e6'
                                } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Series Type: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Column" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Empty Point Mode: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.mode.bind(this), ref: function (d) { return _this.modeElement = d; }, dataSource: this.modelist, fields: { text: 'value', value: 'value' }, value: "Gap" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the empty point functionality in chart series. The mode of empty point can be changed by using ",
                    React.createElement("code", null, "Empty Point Mode"),
                    " in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the empty points. You can use ",
                    React.createElement("code", null, "border"),
                    ",",
                    React.createElement("code", null, "fill"),
                    ", ",
                    React.createElement("code", null, "mode"),
                    " properties to customize the empty points."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    "More information on the empty points can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    EmptyPoint.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    EmptyPoint.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
    };
    ;
    return EmptyPoint;
}(sample_base_1.SampleBase));
exports.EmptyPoint = EmptyPoint;
