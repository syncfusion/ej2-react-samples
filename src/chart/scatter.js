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
 * Sample for scatter series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var scatter_data_1 = require("./scatter-data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Scatter = (function (_super) {
    __extends(Scatter, _super);
    function Scatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scatter.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        minimum: 100,
                        maximum: 220,
                        majorGridLines: { width: 0 },
                        edgeLabelPlacement: 'Shift',
                        title: 'Height in Inches'
                    }, primaryYAxis: {
                        majorTickLines: {
                            width: 0
                        },
                        minimum: 50,
                        maximum: 80,
                        lineStyle: {
                            width: 0
                        },
                        title: 'Weight in Pounds',
                        rangePadding: 'None'
                    }, load: this.load.bind(this), title: 'Height vs Weight', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, format: 'Weight: <b>${point.x} lbs</b> <br/> Height: <b>${point.y}"</b>' }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getMaleData, width: 2, xName: 'x', yName: 'y', name: 'Male', type: 'Scatter', opacity: 0.6, marker: { visible: false, width: 12, height: 12, shape: 'Circle' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getFemaleData, xName: 'x', yName: 'y', name: 'Female', type: 'Scatter', opacity: 0.6, marker: { visible: false, width: 12, height: 12, shape: 'Diamond' } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample compares the height and weight of the genders by using default scatter series in the chart. Tooltip shows the information about the data.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the scatter type charts. Scatter charts are used to plot financial or scientific data. You can use",
                    React.createElement("code", null, "shape"),
                    " property in the marker to change the scatter shape.",
                    React.createElement("code", null, "dataLabel"),
                    " is used to represent individual data value."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject",
                    React.createElement("code", null, "ScatterSeries"),
                    " module into",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the scatter series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Scatter.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Scatter.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return Scatter;
}(sample_base_1.SampleBase));
exports.Scatter = Scatter;
