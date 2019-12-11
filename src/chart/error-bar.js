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
 * Sample for error bar
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
exports.data1 = [
    { x: 'IND', y: 24 }, { x: 'AUS', y: 20 }, { x: 'USA', y: 35 },
    { x: 'DEU', y: 27 }, { x: 'ITA', y: 30 },
    { x: 'UK', y: 41 }, { x: 'RUS', y: 26 }
];
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
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var ErrorBarChart = /** @class */ (function (_super) {
    __extends(ErrorBarChart, _super);
    function ErrorBarChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'Fixed' },
            { value: 'Percentage' },
            { value: 'StandardDeviation' },
            { value: 'StandardError' },
            { value: 'Custom' }
        ];
        _this.emode = [
            { value: 'Vertical' },
            { value: 'Horizontal' },
            { value: 'Both' }
        ];
        _this.directions = [
            { value: 'Both' },
            { value: 'Minus' },
            { value: 'Plus' }
        ];
        return _this;
        // custom code end
    }
    ErrorBarChart.prototype.change = function () {
        this.chartInstance.series[0].errorBar.type = this.dropElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ;
    ErrorBarChart.prototype.mode = function () {
        this.chartInstance.series[0].errorBar.mode = this.modeElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ;
    ErrorBarChart.prototype.errorBarVisible = function () {
        this.chartInstance.series[0].errorBar.visible = this.checkElement.checked;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ErrorBarChart.prototype.errDirection = function () {
        this.chartInstance.series[0].errorBar.direction = this.directionElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ErrorBarChart.prototype.vError = function () {
        this.chartInstance.series[0].errorBar.verticalError = this.vErrElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ErrorBarChart.prototype.hError = function () {
        this.chartInstance.series[0].errorBar.horizontalError = this.hErrElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ErrorBarChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'Category', interval: 1,
                            majorGridLines: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            labelFormat: '{value}%', minimum: 15, maximum: 45,
                            lineStyle: { width: 0 }
                        }, pointRender: exports.pointRender, load: this.load.bind(this), title: "Sales Distribution of Car by Region", loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Category, ej2_react_charts_1.ErrorBar, ej2_react_charts_1.Tooltip] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Scatter', marker: { height: 10, width: 10 }, errorBar: { visible: true, verticalError: 3, horizontalError: 3 }, width: 2, name: 'Sales' })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Error Bar Type: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "type", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, value: "Fixed" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Drawing Mode: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "modes", change: this.mode.bind(this), ref: function (d) { return _this.modeElement = d; }, dataSource: this.emode, fields: { text: 'value', value: 'value' }, value: "Vertical" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Drawing Direction: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "directions", change: this.errDirection.bind(this), ref: function (d) { return _this.directionElement = d; }, dataSource: this.directions, fields: { text: 'value', value: 'value' }, value: "Both" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Vertical Error:")),
                                React.createElement("td", { style: { padding: 10, width: '40%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: 120, value: 3, min: 1, max: 20, step: 1, change: this.vError.bind(this), ref: function (d) { return _this.vErrElement = d; } }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Horizontal Error:")),
                                React.createElement("td", { style: { padding: 10, width: '40%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: 120, value: 3, min: 1, max: 20, step: 1, change: this.hError.bind(this), ref: function (d) { return _this.hErrElement = d; } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the errors in sales distribution of a car for a certain period with error bar in the chart. In property panel, the options are available to change error bar type, drawing mode, and drawing direction of error bar by means of dropdown")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the error bar charts. Line type charts are used for cartesian type series. You can use error bar by set ",
                    React.createElement("code", null, "visible"),
                    " property to true. You can change the error bar rendering type using ",
                    React.createElement("code", null, "type"),
                    " property like fixedValue, percentage, standardDeviation, standardError and custom option of errorBar. To change the error bar line length you can use ",
                    React.createElement("code", null, "verticalError"),
                    " property."),
                React.createElement("p", null, "Chart supports the following error bar types."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Fixed"),
                        " - Renders a fixed type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Percentage"),
                        " - Renders a percentage type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "StandardDeviation"),
                        " - Renders a standard deviation type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "StandardError"),
                        " - Renders a standard error type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Custom"),
                        " - Renders a custom type error bar.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use error bar, we need to inject",
                    React.createElement("code", null, "ErrorBar"),
                    " into the ",
                    React.createElement("code", null, "@services"),
                    " section."),
                React.createElement("p", null,
                    "More information on the smart axis labels can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    ErrorBarChart.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    // custom code start
    ErrorBarChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
    };
    ;
    return ErrorBarChart;
}(sample_base_1.SampleBase));
exports.ErrorBarChart = ErrorBarChart;
