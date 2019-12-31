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
 * Sample for Chart print
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var theme_color_1 = require("./theme-color");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'John', y: 10000 }, { x: 'Jake', y: 12000 }, { x: 'Peter', y: 18000 },
    { x: 'James', y: 11000 }, { x: 'Mary', y: 9700 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n    }\n    .e-play-icon::before {\n        content: \"\\e34b\";\n    }";
var Print = (function (_super) {
    __extends(Print, _super);
    function Print() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Print.prototype.mode = function () {
        this.chartInstance.print();
    };
    ;
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            title: 'Manager',
                            valueType: 'Category',
                            majorGridLines: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            title: 'Sales',
                            minimum: 0,
                            maximum: 20000,
                            majorGridLines: { width: 0 }
                        }, pointRender: this.labelRender.bind(this), load: this.load.bind(this), title: "Sales Comparision", loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, type: 'Column' })))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { id: "btn-control" },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick.bind(this), iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true }, "Print")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the print feature in chart. By clicking ",
                    React.createElement("code", null, "Print"),
                    ", you can print the chart directly from the browser.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the print. The rendered chart can be printed directly from the browser by calling the public method print."),
                React.createElement("p", null,
                    "More information on the print can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    Print.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    Print.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    Print.prototype.labelRender = function (args) {
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
    Print.prototype.onClick = function (e) {
        this.chartInstance.print();
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
