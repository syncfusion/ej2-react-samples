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
 * Sample for Polar Series with drawType Column
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    //{text: 'China', 	  x: 'CHN', 	  	y: 1246.3, y1: 1341, y2: 448.3},
    //{text: 'India', 		x: 'IND', 		y: 893.3, y1: 1237, y2: 41.95},
    { text: 'Japan', x: 'JPN', y: 137.9, y1: 127.6, y2: 108.8 },
    //{text: 'USA', 			x: 'USA', 			y: 345.2, y1: 313.9, y2: 287.4},
    { text: 'Indonesia', x: 'Indonesia', y: 85.0, y1: 246.9, y2: 45.5 },
    //{text: 'Brazil', 		x: 'IDN', 		y: 272.6, y1: 137.2, y2: 110.2 },
    { text: 'Russia', x: 'RUS', y: 237.1, y1: 143.5, y2: 41.2 },
    { text: 'Vietnam', x: 'VNM', y: 127.7, y1: 88.8, y2: 18.0 },
    { text: 'Pakistan', x: 'PAK', y: 126.1, y1: 179.2, y2: null },
    { text: 'Nigeria', x: 'NGA', y: 175.0, y1: 168.8, y2: 12.7 },
    { text: 'Germany', x: 'DEU', y: 113.6, y1: 81.9, y2: 46.0 },
    { text: 'Bangladesh', x: 'BGS', y: 116.0, y1: 154.7, y2: 34.6 },
    { text: 'Philippines', x: 'PHL', y: 109.5, y1: 96.7, y2: 16.6 },
    { text: 'Mexico', x: 'MEX', y: 102.7, y1: 120.8, y2: 19.8 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var PolarColumn = (function (_super) {
    __extends(PolarColumn, _super);
    function PolarColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Polar' },
            { value: 'Radar' }
        ];
        return _this;
        // custom code end
    }
    PolarColumn.prototype.change = function () {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.series[1].type = this.dropElement.value;
        this.chartInstance.series[2].type = this.dropElement.value;
        this.chartInstance.refresh();
    };
    ;
    PolarColumn.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'Category',
                            labelPlacement: 'OnTicks',
                            coefficient: ej2_base_1.Browser.isDevice ? 80 : 100,
                            interval: 1
                        }, primaryYAxis: {
                            labelFormat: '{value}M'
                        }, load: this.load.bind(this), title: "Top 10 Mobile Markets by Number of Subscriptions", loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: '${point.text} : <b>${point.y}%</b>' } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.Tooltip] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Mobile Subscriptions', type: 'Polar', drawType: 'Column', border: { color: 'white', width: 1 }, marker: { dataLabel: { name: 'text' } } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y1', name: 'Population in Millions', type: 'Polar', drawType: 'Column', border: { color: 'white', width: 1 }, marker: { dataLabel: { name: 'text' } } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y2', name: '3G/4G Subscriptions', type: 'Polar', drawType: 'Column', border: { color: 'white', width: 1 }, marker: { dataLabel: { name: 'text' } } })))),
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
                    "This sample demonstrates polar series with column type for mobile market subscriptions in different countries. The switching between polar and radar series can be done by using ",
                    React.createElement("code", null, "Series Type"),
                    " in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the column type charts. Column type charts are used for comparing the frequency, count, total or average of data in different categories. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rect. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject",
                    React.createElement("code", null, "PolarSeries"),
                    " and ",
                    React.createElement("code", null, "RadarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the column series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    PolarColumn.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    PolarColumn.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return PolarColumn;
}(sample_base_1.SampleBase));
exports.PolarColumn = PolarColumn;
