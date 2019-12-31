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
 * Sample for 100 percent Stacking Line series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.chartData = [
    { x: 'Food', y: 90, y1: 40, y2: 70, y3: 120 },
    { x: 'Transport', y: 80, y1: 90, y2: 110, y3: 70 },
    { x: 'Medical', y: 50, y1: 80, y2: 120, y3: 50 },
    { x: 'Clothes', y: 70, y1: 30, y2: 60, y3: 180 },
    { x: 'Personal Care', y: 30, y1: 80, y2: 80, y3: 30 },
    { x: 'Books', y: 10, y1: 40, y2: 30, y3: 270 },
    { x: 'Fitness', y: 100, y1: 30, y2: 70, y3: 40 },
    { x: 'Electricity', y: 55, y1: 95, y2: 55, y3: 75 },
    { x: 'Tax', y: 20, y1: 50, y2: 40, y3: 65 },
    { x: 'Pet Care', y: 40, y1: 20, y2: 80, y3: 95 },
    { x: 'Education', y: 45, y1: 15, y2: 45, y3: 195 },
    { x: 'Entertainment', y: 75, y1: 45, y2: 65, y3: 115 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedLine100 = (function (_super) {
    __extends(StackedLine100, _super);
    function StackedLine100() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedLine100.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
                        majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
                        interval: 1, lineStyle: { width: 0 }, valueType: 'Category'
                    }, primaryYAxis: {
                        title: 'Expense',
                        lineStyle: { width: 0 },
                        interval: 20,
                        minorTickLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        majorGridLines: { width: 1 },
                        minorGridLines: { width: 1 },
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '90%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: 'Family Expense for Month', tooltip: { enable: true,
                        format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingLineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData, xName: 'x', yName: 'y', name: 'John', width: '2', type: 'StackingLine100', marker: { visible: true }, dashArray: '5,1' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData, xName: 'x', yName: 'y1', name: 'Peter', width: '2', type: 'StackingLine100', marker: { visible: true }, dashArray: '5,1' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData, xName: 'x', yName: 'y2', name: 'Steve', width: '2', type: 'StackingLine100', marker: { visible: true }, dashArray: '5,1' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData, xName: 'x', yName: 'y3', name: 'Charle', width: '2', type: 'StackingLine100', marker: { visible: true }, dashArray: '5,1' }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.cyberagent.co.jp/en/newsinfo/press/detail/id=12026", target: "_blank" }, "www.cyberagent.co.jp"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the family expense data with stacked line series in the chart to identify who spent more money in each category. Data points are enhanced with marker and tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the stacked line type charts. 100% Stacked Line type charts are used to represent time-dependent data, showing trends in data at equal intervals with stacked values of multiple series. You can use ",
                    React.createElement("code", null, "dashArray"),
                    ", ",
                    React.createElement("code", null, "width"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the line. ",
                    React.createElement("code", null, "marker"),
                    " used to represent individual data."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use 100% stacking line series, we need to inject",
                    React.createElement("code", null, "StackingLineSeries"),
                    "  module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the stacking column series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    // custom code start
    StackedLine100.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return StackedLine100;
}(sample_base_1.SampleBase));
exports.StackedLine100 = StackedLine100;
