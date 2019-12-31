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
 * Sample for Combination Serie
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: '2007', y: 1, y1: 0.5, y2: 1.5, y3: -1, y4: 2 },
    { x: '2008', y: 0.25, y1: 0.35, y2: 0.35, y3: -.35, y4: 0.1 },
    { x: '2009', y: 0.1, y1: 0.9, y2: -2.7, y3: -0.3, y4: -2.7 },
    { x: '2010', y: 1, y1: 0.5, y2: 0.5, y3: -0.5, y4: 1.8 },
    { x: '2011', y: 0.1, y1: 0.25, y2: 0.25, y3: 0, y4: 2 },
    { x: '2012', y: -0.25, y1: -0.5, y2: -0.1, y3: -0.4, y4: 0.4 },
    { x: '2013', y: 0.25, y1: 0.5, y2: -0.3, y3: 0, y4: 0.9 },
    { x: '2014', y: 0.6, y1: 0.6, y2: -0.6, y3: -0.6, y4: 0.4 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var CombinationSeries = (function (_super) {
    __extends(CombinationSeries, _super);
    function CombinationSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CombinationSeries.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Years',
                        interval: ej2_base_1.Browser.isDevice ? 2 : 1,
                        labelIntersectAction: 'Rotate45',
                        valueType: 'Category',
                        majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                    }, load: this.load.bind(this), primaryYAxis: {
                        title: 'Growth',
                        minimum: -3,
                        maximum: 3,
                        interval: 1,
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
                        minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
                        labelFormat: '{value}B',
                    }, chartArea: { border: { width: 0 } }, title: 'Annual Growth GDP in France', loaded: this.onChartLoad.bind(this), tooltip: { enable: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', legendSettings: { visible: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'Private Consumption', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y1', name: 'Government Consumption', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y2', name: 'Investment', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y3', name: 'Net Foreign Trade', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y4', name: 'GDP', type: 'Line', width: 2, opacity: 0.6, marker: { visible: true, width: 10, height: 10 } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://perspectives.pictet.com/2016/01/29/growth-accelerated-markedly-in-france-and-spain-in-2015/", target: "_blank" }, "perspectives.pictet.com"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a combination of line and stacked column series. Tooltip shows the information about the data point.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the different type of charts. You can render any combination of series in chart except bar. Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "In this example, we have used line and column series. To use column and line feature, we need to inject",
                    React.createElement("code", null, "ColumnSeries"),
                    " ",
                    React.createElement("code", null, "LineSeries"),
                    " modules into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    CombinationSeries.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    CombinationSeries.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return CombinationSeries;
}(sample_base_1.SampleBase));
exports.CombinationSeries = CombinationSeries;
