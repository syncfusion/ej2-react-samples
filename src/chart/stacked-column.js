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
 * Sample for Stacking Column series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: '2014', y: 111.1 },
    { x: '2015', y: 127.3 },
    { x: '2016', y: 143.4 },
    { x: '2017', y: 159.9 }
];
exports.data2 = [
    { x: '2014', y: 76.9 },
    { x: '2015', y: 99.5 },
    { x: '2016', y: 121.7 },
    { x: '2017', y: 142.5 }
];
exports.data3 = [
    { x: '2014', y: 66.1 },
    { x: '2015', y: 79.3 },
    { x: '2016', y: 91.3 },
    { x: '2017', y: 102.4 }
];
exports.data4 = [
    { x: '2014', y: 34.1 },
    { x: '2015', y: 38.2 },
    { x: '2016', y: 44.0 },
    { x: '2017', y: 51.6 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedColumn = (function (_super) {
    __extends(StackedColumn, _super);
    function StackedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        majorGridLines: { width: 0 },
                        minorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 },
                        interval: 1,
                        lineStyle: { width: 0 },
                        labelIntersectAction: 'Rotate45',
                        valueType: 'Category'
                    }, primaryYAxis: {
                        title: 'Sales',
                        lineStyle: { width: 0 },
                        minimum: 0,
                        maximum: 500,
                        interval: 100,
                        majorTickLines: { width: 0 },
                        majorGridLines: { width: 1 },
                        minorGridLines: { width: 1 },
                        minorTickLines: { width: 0 },
                        labelFormat: '{value}B',
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: 'Mobile Game Market by Country', loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'UK', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Germany', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'France', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data4, xName: 'x', yName: 'y', name: 'Italy', type: 'StackingColumn' }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026", target: "_blank" }, "www.cyberagent.co.jp"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes mobile game market for different countries with default stacked column series in chart. Legend in the sample shows the information about those series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the stacking column type charts. Stacks the points in the series vertically and also you can use ",
                    React.createElement("code", null, "stackingGroup"),
                    " property to group the stacking collection based on categories. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical bar. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject",
                    React.createElement("code", null, "StackingColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the stacking column series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    StackedColumn.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    StackedColumn.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return StackedColumn;
}(sample_base_1.SampleBase));
exports.StackedColumn = StackedColumn;
