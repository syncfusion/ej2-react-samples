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
 * Sample for DateTime axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: new Date(2016, 3, 1), y: 6.3 },
    { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
    { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
    { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 }
];
exports.data2 = [
    { x: new Date(2016, 3, 1), y: -5.3 },
    { x: new Date(2016, 4, 1), y: 1.0 }, { x: new Date(2016, 5, 1), y: 6.9 },
    { x: new Date(2016, 6, 1), y: 9.4 }, { x: new Date(2016, 7, 1), y: 7.6 },
    { x: new Date(2016, 8, 1), y: 2.6 }, { x: new Date(2016, 9, 1), y: -4.9 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var DateTimeAxis = /** @class */ (function (_super) {
    __extends(DateTimeAxis, _super);
    function DateTimeAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateTimeAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        labelFormat: 'MMM',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 }
                    }, load: this.load.bind(this), primaryYAxis: {
                        minimum: -20,
                        maximum: 30,
                        interval: 10,
                        edgeLabelPlacement: 'Shift',
                        labelFormat: '{value}°C',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: 'Alaska Weather Statistics - 2016', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Warmest', type: 'Line', marker: {
                                visible: true, height: 10, width: 10, shape: 'Pentagon',
                                dataLabel: { visible: true, position: 'Top' }
                            }, width: 2 }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Coldest', type: 'Line', marker: {
                                visible: true, height: 10, width: 10, shape: 'Pentagon',
                                dataLabel: { visible: true, position: 'Top' }
                            }, width: 2 }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://www.yr.no/place/USA/Alaska/Hatcher_Pass/statistics.html", target: "_blank" }, "www.yr.no"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of date time axis in the chart with weather statistics analysis of Alaska for a year.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "DateTime data is used in this sample and data values are represented using dataLabel. Date time axis uses date time scale and displays the date time values as axis labels. To render dateTime axis, set ",
                    React.createElement("code", null, "valueType"),
                    " in axis to ",
                    React.createElement("code", null, "DateTime"),
                    ". Format for the axis label will be calculated based on intervalType of axis or we can set the format through labelFormat property in axis."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use DateTime axis, we need to inject",
                    React.createElement("code", null, "DateTime"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the DateTime axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-axis.html#valuetype-valuetype" }, "documentation section"),
                    "."))));
    };
    DateTimeAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    DateTimeAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return DateTimeAxis;
}(sample_base_1.SampleBase));
exports.DateTimeAxis = DateTimeAxis;
