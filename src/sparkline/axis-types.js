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
 * Axis types samples for sparkline
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var tableWidth = { width: '100%' };
var padding10 = { padding: '10px' };
var Axis = (function (_super) {
    __extends(Axis, _super);
    function Axis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Axis.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Axis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "spark-container", className: "row" },
                    React.createElement("div", { className: "cols-sample-area" },
                        React.createElement("table", { style: tableWidth },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { "text-align": "center", "font-size": "14px", "font-weight": "600", "font-family": "Roboto" } },
                                        React.createElement("div", null, "Mean working hours for a month"),
                                        React.createElement("div", null,
                                            React.createElement("i", null, "(DateTime axis)"))),
                                    React.createElement("td", { style: padding10 },
                                        React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark1-container', height: '100px', width: '170px', lineWidth: 1, type: 'Column', valueType: 'DateTime', fill: '#3C78EF', tooltipSettings: {
                                                visible: true, format: '${xDate} : ${yval}hrs',
                                            }, dataSource: [
                                                { xDate: new Date(2018, 0, 1), x: 0, yval: 4 },
                                                { xDate: new Date(2018, 0, 2), x: 1, yval: 4.5 },
                                                { xDate: new Date(2018, 0, 3), x: 2, yval: 8 },
                                                { xDate: new Date(2018, 0, 4), x: 3, yval: 7 },
                                                { xDate: new Date(2018, 0, 5), x: 4, yval: 6 },
                                                { xDate: new Date(2018, 0, 8), x: 5, yval: 8 },
                                                { xDate: new Date(2018, 0, 9), x: 6, yval: 8 },
                                                { xDate: new Date(2018, 0, 10), x: 7, yval: 6.5 },
                                                { xDate: new Date(2018, 0, 11), x: 8, yval: 4 },
                                                { xDate: new Date(2018, 0, 12), x: 9, yval: 5.5 },
                                                { xDate: new Date(2018, 0, 15), x: 10, yval: 8 },
                                                { xDate: new Date(2018, 0, 16), x: 11, yval: 6 },
                                                { xDate: new Date(2018, 0, 17), x: 12, yval: 6.5 },
                                                { xDate: new Date(2018, 0, 18), x: 13, yval: 7.5 },
                                                { xDate: new Date(2018, 0, 19), x: 14, yval: 7.5 },
                                                { xDate: new Date(2018, 0, 22), x: 15, yval: 4 },
                                                { xDate: new Date(2018, 0, 23), x: 16, yval: 8 },
                                                { xDate: new Date(2018, 0, 24), x: 17, yval: 6 },
                                                { xDate: new Date(2018, 0, 25), x: 18, yval: 7.5 },
                                                { xDate: new Date(2018, 0, 26), x: 19, yval: 4.5 },
                                                { xDate: new Date(2018, 0, 29), x: 20, yval: 6 },
                                                { xDate: new Date(2018, 0, 30), x: 21, yval: 5 },
                                                { xDate: new Date(2018, 0, 31), x: 22, yval: 7 }
                                            ], xName: 'xDate', yName: 'yval' },
                                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { "text-align": "center", "font-size": "14px", "font-weight": "600", "font-family": "Roboto" } },
                                        React.createElement("div", null, "Percentage of the students in a class"),
                                        React.createElement("div", null,
                                            React.createElement("i", null, "(Category axis)"))),
                                    React.createElement("td", { style: padding10 },
                                        React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark2-container', height: '100px', width: '170px', lineWidth: 1, type: 'Column', valueType: 'Category', fill: '#3C78EF', tooltipSettings: {
                                                visible: true, format: '${xval} : ${yval}%',
                                            }, dataSource: [
                                                { x: 0, xval: 'Robert', yval: 60 },
                                                { x: 1, xval: 'Andrew', yval: 65 },
                                                { x: 2, xval: 'Suyama', yval: 70 },
                                                { x: 3, xval: 'Michael', yval: 80 },
                                                { x: 4, xval: 'Janet', yval: 55 },
                                                { x: 5, xval: 'Davolio', yval: 90 },
                                                { x: 6, xval: 'Fuller', yval: 75 },
                                                { x: 7, xval: 'Nancy', yval: 85 },
                                                { x: 8, xval: 'Margaret', yval: 77 },
                                                { x: 9, xval: 'Steven', yval: 68 },
                                                { x: 10, xval: 'Laura', yval: 96 },
                                                { x: 11, xval: 'Elizabeth', yval: 57 }
                                            ], xName: 'xval', yName: 'yval' },
                                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] })))),
                                React.createElement("tr", null,
                                    React.createElement("td", { style: { "text-align": "center", "font-size": "14px", "font-weight": "600", "font-family": "Roboto" } },
                                        React.createElement("div", null, "Expenditure details of various trips"),
                                        React.createElement("div", null,
                                            React.createElement("i", null, "(Numeric axis)"))),
                                    React.createElement("td", { style: padding10 },
                                        React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark3-container', height: '100px', width: '170px', lineWidth: 1, type: 'Column', valueType: 'Numeric', fill: '#3C78EF', tooltipSettings: {
                                                visible: true, format: '${x} : $${yval}',
                                            }, dataSource: [
                                                { x: 1, xval: 2010, yval: 190 },
                                                { x: 2, xval: 2011, yval: 165 },
                                                { x: 3, xval: 2012, yval: 158 },
                                                { x: 4, xval: 2013, yval: 175 },
                                                { x: 5, xval: 2014, yval: 200 },
                                                { x: 6, xval: 2015, yval: 180 },
                                                { x: 7, xval: 2016, yval: 210 }
                                            ], xName: 'x', yName: 'yval' },
                                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the various types of axis value types available in sparkline.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see the sparklines with various axis value types such as date-time, category, and numeric. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices."))));
    };
    return Axis;
}(sample_base_1.SampleBase));
exports.Axis = Axis;
