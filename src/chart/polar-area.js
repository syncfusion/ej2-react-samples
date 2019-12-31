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
 * Sample for Polar Series with drawType Area
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [{ x: '2000', y: 4 }, { x: '2001', y: 3.0 },
    { x: '2002', y: 3.8 }, { x: '2003', y: 3.4 },
    { x: '2004', y: 3.2 }, { x: '2005', y: 3.9 }];
exports.data2 = [{ x: '2000', y: 2.6 }, { x: '2001', y: 2.8 },
    { x: '2002', y: 2.6 }, { x: '2003', y: 3 },
    { x: '2004', y: 3.6 }, { x: '2005', y: 3 }];
exports.data3 = [{ x: '2000', y: 2.8 }, { x: '2001', y: 2.5 },
    { x: '2002', y: 2.8 }, { x: '2003', y: 3.2 },
    { x: '2004', y: 2.9 }, { x: '2005', y: 2 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var PolarArea = (function (_super) {
    __extends(PolarArea, _super);
    function PolarArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Polar' },
            { value: 'Radar' }
        ];
        return _this;
        // custom code end
    }
    PolarArea.prototype.change = function () {
        this.chartInstance.series[0].type = this.dropElement.value;
        this.chartInstance.series[1].type = this.dropElement.value;
        this.chartInstance.series[2].type = this.dropElement.value;
        this.chartInstance.refresh();
    };
    ;
    PolarArea.prototype.render = function () {
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
                            title: 'Revenue in Millions',
                            labelFormat: '{value}M'
                        }, load: this.load.bind(this), title: "Average Sales Comparison", loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Product A', width: 2, opacity: 0.5, type: 'Polar', drawType: 'Area', border: { color: 'transparent' } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Product B', width: 2, opacity: 0.5, type: 'Polar', drawType: 'Area', border: { color: 'transparent' } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'Product C', width: 2, opacity: 0.5, type: 'Polar', drawType: 'Area', border: { color: 'transparent' } })))),
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
                    "This sample demonstrates polar series with area type for average sales comparison of products in recent year.  The switching between polar and radar series can be done by using ",
                    React.createElement("code", null, "Series Type"),
                    " in property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the area type charts. Similar to line type series, but the area get closed and filled with series color. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the area. ",
                    React.createElement("code", null, "marker"),
                    " and ",
                    React.createElement("code", null, "dataLabel"),
                    " are used to represent individual data and its value. Legend is enabled in this example with series type shape."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject",
                    React.createElement("code", null, "AreaSeries"),
                    ", ",
                    React.createElement("code", null, "PolarSeries"),
                    " and ",
                    React.createElement("code", null, "RadarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    PolarArea.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    PolarArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return PolarArea;
}(sample_base_1.SampleBase));
exports.PolarArea = PolarArea;
