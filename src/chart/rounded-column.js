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
 * Sample for column series with rounded corner
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
exports.data1 = [
    { x: 'Egg', y: 106 },
    { x: 'Fish', y: 103 },
    { x: 'Misc', y: 198 },
    { x: 'Tea', y: 189 },
    { x: 'Fruits', y: 250 }
];
exports.labelRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.highContrastColors[args.point.index % 10];
    }
    else {
        args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
    }
};
var count = 0;
var RoundedColumn = (function (_super) {
    __extends(RoundedColumn, _super);
    function RoundedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundedColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts2', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, tickPosition: 'Inside',
                        labelPosition: 'Inside', labelStyle: { color: '#ffffff' } }, primaryYAxis: { minimum: 0, maximum: 300, interval: 50, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: 'Trade in Food Groups', loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', tooltip: { enable: false }, pointRender: exports.labelRender },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Tiger', cornerRadius: { bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10 }, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a rounded column series. Data points values are showed by using data label.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the column type charts with rounded corner. Column type charts are used for comparing the frequency, count, total or average of data in different categories. You can use ",
                    React.createElement("code", null, "border"),
                    ",",
                    React.createElement("code", null, "fill"),
                    " properties to customize the vertical rectangle. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", { style: { "font-weight": 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject",
                    React.createElement("code", null, "ColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services")),
                React.createElement("p", null,
                    "More information on the column series can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    RoundedColumn.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts2');
        chart.setAttribute('title', '');
        args.chart.loaded = null;
        var columninterval = setInterval(function () {
            if (document.getElementById('charts2')) {
                if (count === 0) {
                    args.chart.series[0].dataSource = [
                        { x: 'Egg', y: 206 },
                        { x: 'Fish', y: 123 },
                        { x: 'Misc', y: 48 },
                        { x: 'Tea', y: 240 },
                        { x: 'Fruits', y: 170 }
                    ];
                    args.chart.animate();
                    count++;
                }
                else if (count === 1) {
                    args.chart.series[0].dataSource = [
                        { x: 'Egg', y: 86 },
                        { x: 'Fish', y: 173 },
                        { x: 'Misc', y: 188 },
                        { x: 'Tea', y: 109 },
                        { x: 'Fruits', y: 100 }
                    ];
                    args.chart.animate();
                    count++;
                }
                else if (count === 2) {
                    args.chart.series[0].dataSource = [
                        { x: 'Egg', y: 156 },
                        { x: 'Fish', y: 33 },
                        { x: 'Misc', y: 260 },
                        { x: 'Tea', y: 200 },
                        { x: 'Fruits', y: 30 }
                    ];
                    args.chart.animate();
                    count = 0;
                }
            }
            else {
                clearInterval(columninterval);
            }
        }, 2000);
    };
    ;
    // custom code start
    RoundedColumn.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return RoundedColumn;
}(sample_base_1.SampleBase));
exports.RoundedColumn = RoundedColumn;
