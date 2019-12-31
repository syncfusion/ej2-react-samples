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
 * Sample for Step Area series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data = [{ x: 2000, y: 416 }, { x: 2001, y: 490 }, { x: 2002, y: 470 }, { x: 2003, y: 500 },
    { x: 2004, y: 449 }, { x: 2005, y: 470 }, { x: 2006, y: 437 }, { x: 2007, y: 458 },
    { x: 2008, y: 500 }, { x: 2009, y: 473 }, { x: 2010, y: 520 }, { x: 2011, y: 509 }];
exports.data1 = [{ x: 2000, y: 180 }, { x: 2001, y: 240 }, { x: 2002, y: 370 }, { x: 2003, y: 200 },
    { x: 2004, y: 229 }, { x: 2005, y: 210 }, { x: 2006, y: 337 }, { x: 2007, y: 258 },
    { x: 2008, y: 300 }, { x: 2009, y: 173 }, { x: 2010, y: 220 }, { x: 2011, y: 309 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StepArea = (function (_super) {
    __extends(StepArea, _super);
    function StepArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepArea.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Double',
                        majorGridLines: { width: 0 },
                        edgeLabelPlacement: 'Shift'
                    }, load: this.load.bind(this), primaryYAxis: {
                        title: 'Production (Billion as kWh)',
                        valueType: 'Double',
                        labelFormat: '{value}B',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 },
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '60%', chartArea: { border: { width: 0 } }, loaded: this.onChartLoad.bind(this), title: 'Electricity- Production' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepAreaSeries, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'Renewable', width: 2, type: 'StepArea' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Non-Renewable', width: 2, type: 'StepArea' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the data about electricity production by using renewable and non-renewable resources by using default step area series in the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the StepArea type charts. ",
                    React.createElement("code", null, "marker"),
                    " and ",
                    React.createElement("code", null, "dataLabel"),
                    " are used to represent individual data and its value."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use step area series, we need to inject",
                    React.createElement("code", null, "StepAreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the StepArea series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    StepArea.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    StepArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return StepArea;
}(sample_base_1.SampleBase));
exports.StepArea = StepArea;
