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
 * Sample for Area series with empty points
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [{ x: '2002', y: 2 }, { x: '2003', y: 1.7 }, { x: '2004', y: 1.8 }, { x: '2005', y: 2.1 },
    { x: '2006', y: 2.3 }, { x: '2007', y: 1.7 }, { x: '2008', y: 1.5 }, { x: '2009', y: 1.8 },
    { x: '2010', y: 2 }, { x: 2011, y: 3.1 }];
exports.data2 = [{ x: '2002', y: 2.2 }, { x: '2003', y: 3.4 }, { x: '2004', y: 2.8 }, { x: '2005', y: null },
    { x: '2006', y: null }, { x: '2007', y: 2.5 }, { x: '2008', y: 2.9 }, { x: '2009', y: 3.8 },
    { x: '2010', y: 1.4 }, { x: 2011, y: 3.1 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Area empty sample
 */
var AreaEmpty = (function (_super) {
    __extends(AreaEmpty, _super);
    function AreaEmpty() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AreaEmpty.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'Category',
                        interval: 2,
                        majorGridLines: { width: 0 },
                        edgeLabelPlacement: 'Shift'
                    }, primaryYAxis: {
                        title: 'Rates',
                        labelFormat: '{value}M',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 },
                        minimum: 1, maximum: 5, interval: 1
                    }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '60%', title: "Inflation Rate", loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'France', opacity: 0.8, type: 'Area', width: 2 }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'US', opacity: 0.8, type: 'Area', width: 2 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates an area series with empty points. Data points with null points are dropped here.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the area type charts. Similar to line type series, but the area get closed and filled with series color. You can use ",
                    React.createElement("code", null, "border"),
                    ", ",
                    React.createElement("code", null, "fill"),
                    " properties to customize the area. ",
                    React.createElement("code", null, "marker"),
                    " and ",
                    React.createElement("code", null, "dataLabel"),
                    " are used to represent individual data and its value. Legend is enabled in this example with series type shape."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject",
                    React.createElement("code", null, "AreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    AreaEmpty.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    AreaEmpty.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return AreaEmpty;
}(sample_base_1.SampleBase));
exports.AreaEmpty = AreaEmpty;
