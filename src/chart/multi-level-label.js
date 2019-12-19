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
var theme_color_1 = require("./theme-color");
exports.pointRender = function (args) {
    var selectedTheme = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = theme_color_1.fabricColors[args.point.index % 10];
    }
    else if (selectedTheme === 'material') {
        args.fill = theme_color_1.materialColors[args.point.index % 10];
    }
    else if (selectedTheme === 'highcontrast') {
        args.fill = theme_color_1.highContrastColors[args.point.index % 10];
    }
    else {
        args.fill = theme_color_1.bootstrapColors[args.point.index % 10];
    }
};
exports.data1 = [{ x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
    { x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
    { x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
    { x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
    { x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var Multilevellabels = (function (_super) {
    __extends(Multilevellabels, _super);
    function Multilevellabels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Multilevellabels.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", null,
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', primaryXAxis: {
                            valueType: 'Category', labelRotation: 90,
                            border: { width: 1, type: 'Rectangle' },
                            isIndexed: true, interval: 1, majorGridLines: { width: 0 },
                            multiLevelLabels: (ej2_base_1.Browser.isDevice ? ([
                                {
                                    border: { type: 'Rectangle' },
                                    categories: [
                                        { start: -0.5, end: 2.5, text: 'In Season', },
                                        { start: 2.5, end: 5.5, text: 'Out of Season', },
                                        { start: 5.5, end: 7.5, text: 'In Season', },
                                        { start: 7.5, end: 9.5, text: 'Out of Season', },
                                    ]
                                }, {
                                    border: { type: 'Rectangle' },
                                    textStyle: { fontWeight: 'Bold' },
                                    categories: [
                                        { start: -0.5, end: 5.5, text: 'Fruits', },
                                        { start: 5.5, end: 9.5, text: 'Vegetables', },
                                    ]
                                }
                            ]) : [
                                {
                                    border: { type: 'Rectangle' },
                                    categories: [
                                        { start: -0.5, end: 0.5, text: 'Seedless', },
                                        { start: 0.5, end: 2.5, text: 'Seeded', },
                                        { start: 2.5, end: 3.5, text: 'Seedless', },
                                        { start: 3.5, end: 5.5, text: 'Seeded', },
                                        { start: 5.5, end: 6.5, text: 'Seedless', },
                                        { start: 6.5, end: 7.5, text: 'Seeded', },
                                        { start: 7.5, end: 8.5, text: 'Seedless', },
                                        { start: 8.5, end: 9.5, text: 'Seeded', }
                                    ]
                                }, {
                                    border: { type: 'Rectangle' },
                                    categories: [
                                        { start: -0.5, end: 2.5, text: 'In Season', },
                                        { start: 2.5, end: 5.5, text: 'Out of Season', },
                                        { start: 5.5, end: 7.5, text: 'In Season', },
                                        { start: 7.5, end: 9.5, text: 'Out of Season', },
                                    ]
                                }, {
                                    border: { type: 'Rectangle' },
                                    textStyle: { fontWeight: 'Bold' },
                                    categories: [
                                        { start: -0.5, end: 5.5, text: 'Fruits', },
                                        { start: 5.5, end: 9.5, text: 'Vegetables', },
                                    ]
                                }
                            ])
                        }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } }, primaryYAxis: {
                            minimum: 0, maximum: 120, interval: 30,
                            majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
                        }, load: this.load.bind(this), pointRender: exports.pointRender, title: "Fruits and Vegetables - Season", loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.MultiLevelLabel] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Column', marker: { dataLabel: { visible: true, position: 'Outer' } } }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Axis labels are placed based on the start and end range values and we can add any number of labels to an axis.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to group axis labels. You can customize text in each level by using ",
                    React.createElement("code", null, "alignment"),
                    ", ",
                    React.createElement("code", null, "overflow"),
                    ", ",
                    React.createElement("code", null, "textSytle"),
                    " and ",
                    React.createElement("code", null, "border"),
                    " properties."),
                React.createElement("p", null,
                    "Axis labels in each level can be arranged smartly using ",
                    React.createElement("code", null, "overflow"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Trim"),
                        " - Trim the label when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Wrap"),
                        " - Wrap the label when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Shows all the labels.")),
                React.createElement("p", null,
                    "Border of the axis labels can be customized by using ",
                    React.createElement("code", null, "type"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Rectangle")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Brace")),
                    React.createElement("li", null,
                        React.createElement("code", null, "WithoutTopBorder")),
                    React.createElement("li", null,
                        React.createElement("code", null, "WithoutTopandBottomBorder")),
                    React.createElement("li", null,
                        React.createElement("code", null, "CurlyBrace")),
                    React.createElement("li", null,
                        React.createElement("code", null, "withoutBorder"),
                        ".")),
                React.createElement("p", null,
                    "More information on the multi level labels can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Multilevellabels.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Multilevellabels.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    return Multilevellabels;
}(sample_base_1.SampleBase));
exports.Multilevellabels = Multilevellabels;
