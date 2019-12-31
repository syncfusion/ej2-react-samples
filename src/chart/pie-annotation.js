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
 * Sample for Annotation in Chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
ej2_react_charts_1.AccumulationChart.Inject(ej2_react_charts_1.AccumulationChart, ej2_react_charts_1.AccumulationDataLabel);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
exports.dataSource = [
    { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
    { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
    { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
    { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
];
exports.pieDataSource = [
    { x: 'UK', y: 111 }, { x: 'Germany', y: 76 },
    { x: 'France', y: 66 }, { x: 'Italy', y: 34 }
];
var PieAnnotation = (function (_super) {
    __extends(PieAnnotation, _super);
    function PieAnnotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieAnnotation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart = chart; }, style: { textAlign: "center" }, primaryXAxis: { title: 'Years', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 1 }, minorTickLines: { width: 1 }, interval: 1, labelIntersectAction: 'Rotate45', }, primaryYAxis: { title: 'Sales', lineStyle: { width: 0 }, minimum: 0, maximum: 700, interval: 100, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}B', majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), chartMouseUp: this.chartMouseUp.bind(this), animationComplete: this.animationComplete.bind(this), loaded: this.onChartLoad.bind(this), title: 'Mobile Game Market by Country', selectionMode: 'Cluster', selectedDataIndexes: [{ series: 0, point: 0 }], legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', tooltip: { enable: true, shared: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.ChartAnnotation] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_annotation" style={{width:"200px"; height:"200px"}}></div>', x: '20%', y: '25%', coordinateUnits: 'Pixel', region: 'Series' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataSource, xName: 'x', yName: 'y0', width: 2, name: 'UK', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataSource, xName: 'x', yName: 'y1', width: 2, name: 'Germany', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataSource, xName: 'x', yName: 'y2', width: 2, name: 'France', type: 'StackingColumn' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataSource, xName: 'x', yName: 'y3', width: 2, name: 'Italy  ', type: 'StackingColumn' }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates annotation feature in chart. Accumulation chart is placed in cartesian chart by using annotation.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure annotation feature in chart. We have used a pie chart\u00A0to depict the sales for each year using annotation support,\u00A0while selecting a particular year from the StackedColumn series, the respective data's are showed in pie. An annotation can hold any html element as its content, here we have added the Pie chart as its content."),
                React.createElement("br", null),
                React.createElement("p", { style: { "font-weight": 500 } }, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To annotation feature in chart, we need to inject",
                    React.createElement("code", null, "ChartAnnotation"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the chart annotation can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-chartAnnotation.html" }, "documentation section"),
                    "."))));
    };
    PieAnnotation.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        if (this.isRender) {
            this.pie.destroy();
            this.pie = new ej2_react_charts_1.AccumulationChart({
                background: 'transparent',
                series: [{
                        radius: '65%', animation: { enable: false },
                        dataSource: exports.pieDataSource,
                        xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                    }],
                load: function (args) {
                    var selectedTheme = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
                },
                legendSettings: { visible: false }
            });
            this.pie.appendTo('#chart_annotation');
        }
    };
    ;
    // custom code start
    PieAnnotation.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    PieAnnotation.prototype.chartMouseUp = function (args) {
        if (args.target.indexOf('Point') > -1 && args.target.indexOf('annotation') === -1) {
            var pointIndex = parseInt(args.target[args.target.length - 1], 10);
            exports.pieDataSource = [];
            for (var _i = 0, _a = this.chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                exports.pieDataSource.push({ 'x': series.name, 'y': series.points[pointIndex].y });
            }
            this.pie.series[0].dataSource = exports.pieDataSource;
            this.pie.series[0].xName = 'x';
            this.pie.series[0].yName = 'y';
            this.pie.refresh();
        }
    };
    PieAnnotation.prototype.animationComplete = function (args) {
        this.isRender = true;
        var selectedTheme = location.hash.split('/')[1];
        this.pie = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: exports.pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' } },
                }],
            legendSettings: { visible: false },
            theme: (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)),
            resized: function (args) {
                location.reload();
            }
        });
        this.pie.appendTo('#chart_annotation');
    };
    return PieAnnotation;
}(sample_base_1.SampleBase));
exports.PieAnnotation = PieAnnotation;
