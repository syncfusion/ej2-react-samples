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
 * Sample for Polar Series with drawType Scatter
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
exports.data1 = [
    { text: 'Myanmar', x: 'MMR', y: 7.3, y1: 6.3, y2: 7.5 },
    { text: 'India', x: 'IND', y: 7.9, y1: 6.8, y2: 7.2 },
    { text: 'Bangladesh', x: 'BGD', y: 6.8, y1: 6.9, y2: 6.9 },
    { text: 'Cambodia', x: 'KHM', y: 7.0, y1: 7.0, y2: 6.9 },
    { text: 'China', x: 'CHN', y: 6.9, y1: 6.7, y2: 6.6 },
    { text: 'Bhutan', x: 'BTN', y: 6.1, y1: 6.2, y2: 5.9 },
    { text: 'Iceland', x: 'ISL', y: 4.1, y1: 7.2, y2: 5.7 },
    { text: 'Nepal', x: 'NPL', y: 2.7, y1: 0.6, y2: 5.5 },
    { text: 'Pakistan', x: 'PAK', y: 4.0, y1: 4.7, y2: 5.0 },
    { text: 'Poland', x: 'POL', y: 3.9, y1: 2.7, y2: 3.4 },
    { text: 'Australia', x: 'AUS', y: 2.4, y1: 2.5, y2: 3.1 },
    { text: 'Korea', x: 'KOR', y: 2.8, y1: 2.8, y2: 2.7 },
    { text: 'Singapore', x: 'SGP', y: 1.9, y1: 2.0, y2: 2. },
    { text: 'Canada', x: 'CAN', y: 0.9, y1: 1.4, y2: 1.9 },
    { text: 'Germany', x: 'DEU', y: 1.5, y1: 1.8, y2: 1.6 },
    { text: 'Denmark', x: 'DNK', y: 1.6, y1: 1.1, y2: 1.5 },
    { text: 'France', x: 'FRA', y: 1.3, y1: 1.3, y2: 1.4 },
    { text: 'Austria', x: 'AUT', y: 1.0, y1: 1.5, y2: 1.4 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var PolarScatter = (function (_super) {
    __extends(PolarScatter, _super);
    function PolarScatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Polar' },
            { value: 'Radar' }
        ];
        return _this;
        // custom code end
    }
    PolarScatter.prototype.change = function () {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.series[1].type = this.dropElement.value;
        this.chartInstance.series[2].type = this.dropElement.value;
        this.chartInstance.refresh();
    };
    ;
    PolarScatter.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'Category',
                            labelPlacement: 'OnTicks',
                            interval: 1,
                            coefficient: ej2_base_1.Browser.isDevice ? 80 : 100
                        }, primaryYAxis: {
                            minimum: 0, maximum: 8, interval: 2
                        }, load: this.load.bind(this), title: "Real GDP Growth", loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: '${point.text} : <b>${point.y}%</b>' } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Tooltip] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: '2015', type: 'Polar', drawType: 'Scatter', marker: { height: 10, width: 10, dataLabel: { name: 'text' } } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y1', name: '2016', type: 'Polar', drawType: 'Scatter', marker: { height: 10, width: 10, shape: 'Diamond', dataLabel: { name: 'text' } } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y2', name: '2017', type: 'Polar', drawType: 'Scatter', marker: { height: 10, width: 10, shape: 'Triangle', dataLabel: { name: 'text' } } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Series Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Polar" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates polar series with scatter type for GDP for different countries in recent years. The switching between polar and radar series can be done by using ",
                    React.createElement("code", null, "Series Type"),
                    " in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the scatter type charts. Scatter charts are used to plot financial or scientific data. You can use ",
                    React.createElement("code", null, "shape"),
                    " property in the marker to change the scatter shape. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject",
                    React.createElement("code", null, "ScatterSeries"),
                    ", ",
                    React.createElement("code", null, "PolarSeries"),
                    " and ",
                    React.createElement("code", null, "RadarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the scatter series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    PolarScatter.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    PolarScatter.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return PolarScatter;
}(sample_base_1.SampleBase));
exports.PolarScatter = PolarScatter;
