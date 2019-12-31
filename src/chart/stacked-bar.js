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
 * Sample for stackingBar series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 12 }, { x: 'Apr', y: 15.5 },
    { x: 'May', y: 20 }, { x: 'Jun', y: 24 }];
exports.data2 = [{ x: 'Jan', y: 6 }, { x: 'Feb', y: 8 }, { x: 'Mar', y: 11 }, { x: 'Apr', y: 16 },
    { x: 'May', y: 21 }, { x: 'Jun', y: 25 }];
exports.data3 = [{ x: 'Jan', y: -1 }, { x: 'Feb', y: -1.5 }, { x: 'Mar', y: -2 }, { x: 'Apr', y: -2.5 },
    { x: 'May', y: -3 }, { x: 'Jun', y: -3.5 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedBar = (function (_super) {
    __extends(StackedBar, _super);
    function StackedBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedBar.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        majorGridLines: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, primaryYAxis: {
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        labelFormat: '{value}%',
                        edgeLabelPlacement: 'Shift'
                    }, load: this.load.bind(this), title: 'Sales Comparison', loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingBarSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, width: 2, xName: 'x', yName: 'y', name: 'Apple', type: 'StackingBar' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, width: 2, xName: 'x', yName: 'y', name: 'orange', type: 'StackingBar' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, width: 2, xName: 'x', yName: 'y', name: 'Wastage', type: 'StackingBar' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes sales comparison of different fruits with default stacked bar series in chart. Legend in the sample shows the information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the stacking bar type charts. Stacks the points in the series horizontally and also you can use ",
                    React.createElement("code", null, "stackingGroup"),
                    " property to group the stacking collection based on categories. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the horizontal bar. ",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data and its value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject",
                    React.createElement("code", null, "StackingBarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the stacking bar series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    StackedBar.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    StackedBar.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return StackedBar;
}(sample_base_1.SampleBase));
exports.StackedBar = StackedBar;
