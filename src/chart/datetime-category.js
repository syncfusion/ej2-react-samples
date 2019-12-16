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
 * Sample for smart axis labels
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.pointRender = function (args) {
    var materialColors = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    var fabricColors = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    var selectedTheme = location.hash.split('/')[1];
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    }
    else {
        args.fill = materialColors[args.point.index];
    }
};
exports.data1 = [{ x: new Date(2017, 11, 20), y: 21 }, { x: new Date(2017, 11, 21), y: 24 },
    { x: new Date(2017, 11, 22), y: 24 }, { x: new Date(2017, 11, 26), y: 70 },
    { x: new Date(2017, 11, 27), y: 75 }, { x: new Date(2018, 0, 2), y: 82 },
    { x: new Date(2018, 0, 3), y: 53 }, { x: new Date(2018, 0, 4), y: 54 },
    { x: new Date(2018, 0, 5), y: 53 }, { x: new Date(2018, 0, 8), y: 45 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var DatetimeCategoryAxis = /** @class */ (function (_super) {
    __extends(DatetimeCategoryAxis, _super);
    function DatetimeCategoryAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatetimeCategoryAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", null,
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'DateTimeCategory',
                            intervalType: 'Days',
                            skeleton: 'Ed',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 },
                            stripLines: [
                                { visible: true, start: new Date(2017, 11, 20), end: new Date(2017, 11, 27), color: 'skyblue', opacity: 0.5, },
                                { visible: true, start: new Date(2018, 0, 2), end: new Date(2018, 0, 8), color: 'pink', opacity: 0.5 },
                            ],
                            title: 'Business Days'
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            labelFormat: '{value}M',
                            rangePadding: 'None',
                            minimum: 0,
                            maximum: 100,
                            interval: 20,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                        }, load: this.load.bind(this), pointRender: exports.pointRender, title: "Sales Comparison of a Product", loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTimeCategory, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.StripLine] }),
                        React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div style="color:#FF0000;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>', x: new Date(2017, 11, 22), y: 90, coordinateUnits: 'Point' }),
                            React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div style="color:#FF0000;font-family: bold; font-weight: 800">New Year Offer<br> Jan 2018</div>', x: new Date(2018, 0, 4), y: 90, coordinateUnits: 'Point' })),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Product", type: 'Column' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates sales of a product in business days. Data points in this sample are enhanced with tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, you can see how to render and configure the date time category axis. Date time category axis is used to represent only business days in datetime axis."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices."),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. For datetime category axis, you should inject",
                    React.createElement("code", null, "DateTimeCategory"),
                    " module by using",
                    React.createElement("code", null, "Chart.Inject(DateTimeCategory)"),
                    "method."),
                React.createElement("p", null,
                    "More information on the date time category can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    DatetimeCategoryAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    DatetimeCategoryAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return DatetimeCategoryAxis;
}(sample_base_1.SampleBase));
exports.DatetimeCategoryAxis = DatetimeCategoryAxis;
// custom code end 
