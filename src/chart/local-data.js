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
 * Sample for local data
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
function GetLocalData() {
    var series1 = [];
    var series2 = [];
    var point1;
    var point2;
    var value = 80;
    var value1 = 90;
    var i;
    for (i = 1; i < 500; i++) {
        if (Math.random() > .5) {
            value += Math.random();
            value1 += Math.random();
        }
        else {
            value -= Math.random();
            value1 -= Math.random();
        }
        point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
        point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
        series1.push(point1);
        series2.push(point2);
    }
    return { 'series1': series1, 'series2': series2 };
}
exports.GetLocalData = GetLocalData;
exports.data1 = GetLocalData().series1;
exports.data2 = GetLocalData().series2;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var LocalData = /** @class */ (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalData.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        title: 'Years',
                        skeleton: 'y',
                        majorGridLines: { width: 0 },
                        valueType: 'DateTime',
                        edgeLabelPlacement: 'Shift'
                    }, load: this.load.bind(this), primaryYAxis: {
                        title: 'Price',
                        labelFormat: '${value}',
                        rangePadding: 'None',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 },
                        minorTickLines: { width: 0 }
                    }, crosshair: {
                        enable: true,
                        line: {
                            color: 'rgba(204,214,235,0.25)',
                            width: ej2_base_1.Browser.isDevice ? 50 : 20,
                        },
                        lineType: 'Vertical'
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', title: 'Stock Price Analysis', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Product X', animation: { enable: true }, type: 'Line' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', width: 2, name: 'Product Y', animation: { enable: true }, type: 'Line' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates  plotting of local data about stock price analysis of two products for a certain period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Chart supports data binding. The ",
                    React.createElement("code", null,
                        " ",
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#datasource-object---datamanager" }, "dataSource")),
                    " property can be assigned either with the array of JavaScript objects or instance of ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/data/api-dataManager.html" }, "DataManager")),
                    "."),
                React.createElement("p", null, "In this demo, the array of JavaScript objects is assigned as the data source to the Chart."))));
    };
    LocalData.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    LocalData.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return LocalData;
}(sample_base_1.SampleBase));
exports.LocalData = LocalData;
