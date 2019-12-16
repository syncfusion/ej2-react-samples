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
 * Sample for Tornado chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [
    { x: '4.5', y: 31 }, { x: '4.8', y: 37 },
    { x: '5.1', y: 49 }, { x: '5.4', y: 57 },
    { x: '5.7', y: 63 }, { x: '6', y: 69 }
];
exports.data2 = [
    { x: '4.5', y: -31, text: '31 KG' }, { x: '4.8', y: -39, text: '39 KG' },
    { x: '5.1', y: -52, text: '52 KG' }, { x: '5.4', y: -64, text: '64 KG' },
    { x: '5.7', y: -70, text: '70 KG' }, { x: '6', y: -74, text: '74 KG' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
exports.textRender = function (args) {
    args.text = args.text.indexOf('-') > 0 ? args.text.replace('-', '') : args.text;
};
var NegativeStack = /** @class */ (function (_super) {
    __extends(NegativeStack, _super);
    function NegativeStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NegativeStack.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        title: 'Height in Inches',
                        minorGridLines: { width: 0 },
                        minorTickLines: { width: 0 },
                        interval: 1,
                        majorGridLines: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } }, primaryYAxis: {
                        labelFormat: '{value} KG',
                        edgeLabelPlacement: 'Shift',
                        majorGridLines: { width: 0 },
                        majorTickLines: { width: 0 },
                        lineStyle: { width: 0 },
                        labelStyle: {
                            color: 'transparent'
                        }
                    }, tooltipRender: exports.textRender, legendSettings: { position: ej2_base_1.Browser.isDevice ? 'Auto' : 'Right' }, load: this.load.bind(this), title: 'Height vs Weight', loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingBarSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, width: 2, xName: 'x', yName: 'y', name: 'Female', type: 'StackingBar', marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600' } } } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, width: 2, xName: 'x', yName: 'y', name: 'Male', type: 'StackingBar', marker: { dataLabel: { name: 'text', visible: true, position: 'Top', font: { fontWeight: '600' } } } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates stacked bar with negative data points. Data points values are showed by using data label.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the bar type charts. Similar to column charts, but the orientation of y axis is horizontal instead of vertical. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the data appearance. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Stackingbar series, we need to inject",
                    React.createElement("code", null, "StackingBarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the stackingbar series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    NegativeStack.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    NegativeStack.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return NegativeStack;
}(sample_base_1.SampleBase));
exports.NegativeStack = NegativeStack;
