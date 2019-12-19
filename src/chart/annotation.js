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
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
ej2_react_charts_1.AccumulationChart.Inject(ej2_react_charts_1.AccumulationDataLabel);
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Sample for annotation
 */
function getValue(series, pointIndex, y) {
    var totalValue = 0;
    for (var _i = 0, series_1 = series; _i < series_1.length; _i++) {
        var ser = series_1[_i];
        totalValue += ser.points[pointIndex].y;
    }
    return (Math.round((y / totalValue) * 100)) + '%';
}
exports.getValue = getValue;
var Annotation = (function (_super) {
    __extends(Annotation, _super);
    function Annotation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRender = false;
        _this.dataSource = [
            { x: '2014', y0: 51, y1: 77, y2: 66, y3: 34 }, { x: '2015', y0: 67, y1: 49, y2: 19, y3: 38 },
            { x: '2016', y0: 143, y1: 121, y2: 91, y3: 44 }, { x: '2017', y0: 19, y1: 28, y2: 65, y3: 51 },
            { x: '2018', y0: 30, y1: 66, y2: 32, y3: 61 }, { x: '2019', y0: 189, y1: 128, y2: 122, y3: 76 },
            { x: '2020', y0: 72, y1: 97, y2: 65, y3: 82 }
        ];
        _this.pieDataSource = [
            { x: 'UK', y: 51, text: '22%' }, { x: 'Germany', y: 77, text: '34%' },
            { x: 'France', y: 66, text: '29%' }, { x: 'Italy', y: 34, text: '15%' }
        ];
        return _this;
    }
    Annotation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chart = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Years', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 1 },
                        minorTickLines: { width: 1 }, interval: 1, labelIntersectAction: 'Rotate45',
                    }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                        title: 'Sales', lineStyle: { width: 0 },
                        minimum: 0, maximum: 700, interval: 100,
                        majorGridLines: { width: 1 }, minorGridLines: { width: 1 },
                        minorTickLines: { width: 0 }, labelFormat: '{value}B',
                        majorTickLines: { width: 0 }
                    }, load: this.load.bind(this), loaded: this.loaded.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', animationComplete: this.onChartLoad.bind(this), chartMouseUp: this.chartMouseUp.bind(this), selectionMode: 'Cluster', selectedDataIndexes: [{ series: 0, point: 0 }], legendSettings: { visible: true, toggleVisibility: false }, title: "Mobile Game Market by Country" },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Selection, ej2_react_charts_1.ChartAnnotation] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_annotation" style="width: 200px; height: 200px"></div>', x: '20%', y: '25%', coordinateUnits: 'Pixel', region: 'Series' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.dataSource, type: 'StackingColumn', xName: 'x', yName: 'y0', name: 'UK' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.dataSource, type: 'StackingColumn', xName: 'x', yName: 'y1', name: 'Germany' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.dataSource, type: 'StackingColumn', xName: 'x', yName: 'y2', name: 'France' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: this.dataSource, type: 'StackingColumn', xName: 'x', yName: 'y3', name: 'Italy' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates annotation feature in chart. Accumulation chart is placed in cartesian chart by using annotation.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure annotation feature in chart. We have used a pie chart\u00A0to depict the sales for each year using annotation support, while selecting a particular year from the StackedColumn series, the respective data's are showed in pie. An annotation can hold any html element as its content, here we have added the Pie chart as its content."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use annotation feature in chart, we need to inject",
                    React.createElement("code", null, "ChartAnnotation"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the chart annotation can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-chartAnnotation.html" }, "documentation section"),
                    "."))));
    };
    Annotation.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        this.isRender = true;
        this.pie = new ej2_react_charts_1.AccumulationChart({
            background: 'transparent',
            series: [{
                    radius: '65%', animation: { enable: false },
                    dataSource: this.pieDataSource,
                    xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' }, name: 'text' },
                }],
            load: function (args) {
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
            },
            legendSettings: { visible: false }
        });
        this.pie.appendTo('#chart_annotation');
    };
    ;
    // custom code start
    Annotation.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    Annotation.prototype.loaded = function (args) {
        if (this.isRender) {
            this.pie.destroy();
            this.pie = new ej2_react_charts_1.AccumulationChart({
                background: 'transparent',
                series: [{
                        radius: '65%', animation: { enable: false },
                        dataSource: this.pieDataSource,
                        xName: 'x', yName: 'y', dataLabel: { visible: true, position: 'Inside', font: { color: 'white' }, name: 'text' },
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
    Annotation.prototype.chartMouseUp = function (args) {
        if (args.target.indexOf('Point') > -1) {
            var pointIndex = parseInt(args.target[args.target.length - 1], 10);
            this.pieDataSource = [];
            for (var _i = 0, _a = this.chart.visibleSeries; _i < _a.length; _i++) {
                var series = _a[_i];
                var value = series.points[pointIndex].y;
                this.pieDataSource.push({
                    'x': series.name, 'y': value, 'text': getValue(this.chart.visibleSeries, pointIndex, value)
                });
            }
            this.pie.series[0].dataSource = this.pieDataSource;
            this.pie.series[0].xName = 'x';
            this.pie.series[0].yName = 'y';
            this.pie.refresh();
        }
    };
    ;
    return Annotation;
}(sample_base_1.SampleBase));
exports.Annotation = Annotation;
