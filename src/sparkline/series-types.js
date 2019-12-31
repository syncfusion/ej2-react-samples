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
 * Sparkline sample for series types
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    td {\n        font-family: \"Roboto\", \"Segoe UI\", \"GeezaPro\", \"DejaVu Serif\", \"sans-serif\";\n        font-weight: 600;\n    }\n    .spark {\n        border: 1px solid rgb(209, 209, 209);\n        border-radius: 2px;\n        width: 100%;\n    }    \n    .sparent {\n        height: 110px;\n        margin-left: 3%;\n        margin-right: 0%;\n    }\n    .sparkpie {\n        float: left;\n        margin-top: 15px;\n        margin-left: 2%;\n    }\n    .pieparent {\n        width: 93%;\n    } \n    .pietext {\n        float: left;\n        margin-left: 5%;\n    }\n    .sparktext {\n         text-align: center;\n         width: 100%;\n    }";
var Series = (function (_super) {
    __extends(Series, _super);
    function Series() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Series.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.sparkline.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Series.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: "spark-container", className: "row" },
                    React.createElement("div", { className: "cols-sample-area", style: { "align": "center", "margin-top": "8%" } },
                        React.createElement("div", { className: "col-lg-2 col-md-3 col-sm-5 sparent", style: { "align": "center" } },
                            React.createElement("div", { className: "spark", id: 'line', style: { "align": "center" } },
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark1-container', height: '80px', width: '90%', lineWidth: 1, type: 'Line', valueType: 'Numeric', fill: '#3C78EF', tooltipSettings: {
                                        visible: true, format: '${x} : ${yval}',
                                        trackLineSettings: {
                                            visible: true,
                                        }
                                    }, markerSettings: { visible: ['All'], size: 2.5, fill: 'blue' }, dataSource: [
                                        { x: 1, yval: 5 },
                                        { x: 2, yval: 6 },
                                        { x: 3, yval: 5 },
                                        { x: 4, yval: 7 },
                                        { x: 5, yval: 4 },
                                        { x: 6, yval: 3 },
                                        { x: 7, yval: 9 },
                                        { x: 8, yval: 5 },
                                        { x: 9, yval: 6 },
                                        { x: 10, yval: 5 },
                                        { x: 11, yval: 7 },
                                        { x: 12, yval: 8 },
                                        { x: 13, yval: 4 },
                                        { x: 14, yval: 5 },
                                        { x: 15, yval: 3 },
                                        { x: 16, yval: 4 },
                                        { x: 17, yval: 11 },
                                        { x: 18, yval: 10 },
                                        { x: 19, yval: 2 },
                                        { x: 20, yval: 12 },
                                        { x: 21, yval: 4 },
                                        { x: 22, yval: 7 },
                                        { x: 23, yval: 6 },
                                        { x: 24, yval: 8 },
                                    ], xName: 'x', yName: 'yval' },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "sparktext", style: { "align": "center", "position": "absolute", "margin-top": "90px", "margin-left": "2px", "width": "100%" } }, "Power production for a day")))),
                        React.createElement("div", { className: "col-lg-2 col-md-3 col-sm-5 sparent", style: { "align": "center" } },
                            React.createElement("div", { className: "spark", id: 'area', style: { "align": "center" } },
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark2-container', height: '80px', width: '90%', lineWidth: 1, type: 'Area', valueType: 'Category', fill: '#b2cfff', opacity: 1, border: { color: '#3C78EF', width: 2 }, axisSettings: {
                                        lineSettings: {
                                            visible: true
                                        }
                                    }, tooltipSettings: {
                                        visible: true, format: '${xval} : ${yval}°C',
                                        trackLineSettings: {
                                            visible: true,
                                        }
                                    }, dataSource: [
                                        { x: 1, xval: 'Jan', yval: 34 },
                                        { x: 2, xval: 'Feb', yval: 36 },
                                        { x: 3, xval: 'Mar', yval: 32 },
                                        { x: 4, xval: 'Apr', yval: 35 },
                                        { x: 5, xval: 'May', yval: 40 },
                                        { x: 6, xval: 'Jun', yval: 38 },
                                        { x: 7, xval: 'Jul', yval: 33 },
                                        { x: 8, xval: 'Aug', yval: 37 },
                                        { x: 9, xval: 'Sep', yval: 34 },
                                        { x: 10, xval: 'Oct', yval: 31 },
                                        { x: 11, xval: 'Nov', yval: 30 },
                                        { x: 12, xval: 'Dec', yval: 29 },
                                    ], xName: 'xval', yName: 'yval' },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "sparktext", style: { "align": "center", "position": "absolute", "margin-top": "90px", "margin-left": "3px", "width": "100%" } }, "Average weather comparision")))),
                        React.createElement("div", { className: "col-lg-2 col-md-3 col-sm-5 sparent", style: { "align": "center" } },
                            React.createElement("div", { className: "spark", id: 'column', style: { "align": "center" } },
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark3-container', height: '80px', width: '90%', lineWidth: 1, type: 'Column', valueType: 'Category', fill: '#3C78EF', highPointColor: '#14aa21', tooltipSettings: {
                                        visible: true, format: '${xval} : ${yval}',
                                    }, dataSource: [
                                        { x: 1, xval: 'Jan', yval: 10 },
                                        { x: 2, xval: 'Feb', yval: 6 },
                                        { x: 3, xval: 'Mar', yval: 8 },
                                        { x: 4, xval: 'Apr', yval: -5 },
                                        { x: 5, xval: 'May', yval: 11 },
                                        { x: 6, xval: 'Jun', yval: 5 },
                                        { x: 7, xval: 'Jul', yval: -2 },
                                        { x: 8, xval: 'Aug', yval: 7 },
                                        { x: 9, xval: 'Sep', yval: -3 },
                                        { x: 10, xval: 'Oct', yval: 6 },
                                        { x: 11, xval: 'Nov', yval: 8 },
                                        { x: 12, xval: 'Dec', yval: 10 },
                                    ], xName: 'xval', yName: 'yval' },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "sparktext", style: { "align": "center", "position": "absolute", "margin-top": "90px", "margin-left": "10px", "width": "100%" } }, "Revenue status")))),
                        React.createElement("div", { className: "col-lg-2 col-md-5 col-sm-5 sparent", style: { "align": "center" } },
                            React.createElement("div", { className: "spark", id: 'winloss', style: { "align": "center" } },
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), id: 'spark4-container', height: '80px', width: '90%', lineWidth: 1, type: 'WinLoss', valueType: 'Numeric', fill: '#3C78EF', negativePointColor: '#fc5070', tooltipSettings: {
                                        format: '${x} : ${y}',
                                    }, dataSource: [12, 15, -10, 13, 15, 6, -12, 17, 13, 0, 8, -10] },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "sparktext", style: { "align": "center", "position": "absolute", "margin-top": "90px", "margin-left": "5px", "width": "100%" } }, "Customer satisfaction score")))),
                        React.createElement("div", { className: "col-lg-2 col-md-5 col-sm-10 sparent", style: { "align": "center" } },
                            React.createElement("div", { className: "spark", style: { "align": "center", "height": "87px" } },
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), className: "sparkpie", id: "pie1", style: { "height": "40px", "width": "29%" }, height: '40px', width: '100%', lineWidth: 1, type: 'Pie', valueType: 'Category', tooltipSettings: {
                                        visible: true,
                                        format: '${x} : ${y}',
                                    }, xName: 'x', yName: 'y', dataSource: [{ x: 'Gold', y: 46 }, { x: 'Silver', y: 37 }, { x: 'Bronze', y: 38 }] },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "pietext", style: { "align": "center", "position": "absolute", "margin-top": "40px", "width": "50%" } }, "USA")),
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), className: "sparkpie", id: "pie2", style: { "height": "40px", "width": "29%" }, height: '40px', width: '100%', lineWidth: 1, type: 'Pie', valueType: 'Category', tooltipSettings: {
                                        visible: true,
                                        format: '${x} : ${y}',
                                    }, xName: 'x', yName: 'y', dataSource: [{ x: 'Gold', y: 27 }, { x: 'Silver', y: 23 }, { x: 'Bronze', y: 17 }] },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "pietext", style: { "align": "center", "position": "absolute", "margin-top": "40px", "width": "50%" } }, "GBR")),
                                React.createElement(ej2_react_charts_1.SparklineComponent, { load: this.load.bind(this), className: "sparkpie", id: "pie3", style: { "height": "40px", "width": "29%" }, height: '40px', width: '100%', lineWidth: 1, type: 'Pie', valueType: 'Category', tooltipSettings: {
                                        visible: true,
                                        format: '${x} : ${y}'
                                    }, xName: 'x', yName: 'y', dataSource: [{ x: 'Gold', y: 26 }, { x: 'Silver', y: 18 }, { x: 'Bronze', y: 26 }] },
                                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SparklineTooltip] }),
                                    React.createElement("div", { className: "pietext", style: { "align": "center", "position": "absolute", "margin-top": "40px", "width": "50%" } }, "CHN")),
                                React.createElement("div", { className: "sparktext", style: { "align": "center", "position": "absolute", "margin-top": "90px", "width": "90%" } }, "Olympics medal details ")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the various types of series available in sparkline")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see the sparkline with various series types such as line, area, column, win loss, and pie. Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over the data points or tap on a data point in touch enabled devices."))));
    };
    return Series;
}(sample_base_1.SampleBase));
exports.Series = Series;
