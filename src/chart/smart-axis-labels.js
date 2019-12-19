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
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
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
exports.data1 = [{ x: 'South Korea', y: 39 }, { x: 'India', y: 61 },
    { x: 'Pakistan', y: 20 }, { x: 'Germany', y: 65 },
    { x: 'Australia', y: 16 }, { x: 'Italy', y: 29 },
    { x: 'France', y: 45 }, { x: 'United Arab Emirates', y: 10 },
    { x: 'Russia', y: 41 }, { x: 'Mexico', y: 31 },
    { x: 'Brazil', y: 76 }, { x: 'China', y: 51 }];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var SmartAxisLabels = (function (_super) {
    __extends(SmartAxisLabels, _super);
    function SmartAxisLabels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Hide' },
            { value: 'Trim' },
            { value: 'Wrap' },
            { value: 'MultipleRows' },
            { value: 'Rotate45' },
            { value: 'Rotate90' },
            { value: 'None' }
        ];
        _this.modelist = [
            { value: 'None' },
            { value: 'Hide' },
            { value: 'Shift' }
        ];
        _this.poslist = [
            { value: 'Inside' },
            { value: 'Outside' }
        ];
        return _this;
        // custom code end
    }
    SmartAxisLabels.prototype.change = function () {
        this.chartInstance.primaryXAxis.labelIntersectAction = this.dropElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ;
    SmartAxisLabels.prototype.mode = function () {
        this.chartInstance.primaryXAxis.edgeLabelPlacement = this.modeElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    ;
    SmartAxisLabels.prototype.trim = function () {
        this.chartInstance.primaryXAxis.enableTrim = this.checkElement.checked;
        this.chartInstance.refresh();
    };
    ;
    SmartAxisLabels.prototype.xwid = function () {
        this.chartInstance.primaryXAxis.maximumLabelWidth = this.widthElement.value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    SmartAxisLabels.prototype.xpos = function () {
        this.chartInstance.primaryXAxis.labelPosition = this.posElement.value;
        this.chartInstance.refresh();
    };
    ;
    SmartAxisLabels.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            valueType: 'Category',
                            interval: 1,
                            majorGridLines: { width: 0 },
                            labelIntersectAction: 'Hide'
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            labelStyle: { size: '0px' },
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 0 },
                            lineStyle: { width: 0 },
                        }, load: this.load.bind(this), pointRender: exports.pointRender, title: "Internet Users in Millions", loaded: this.onChartLoad.bind(this), legendSettings: { visible: false }, tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Users", type: 'Column', marker: { dataLabel: { visible: true, position: ej2_base_1.Browser.isDevice ? 'Outer' : 'Top', font: { fontWeight: '600', color: ej2_base_1.Browser.isDevice ? '#404041' : '#ffffff' } } } })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Intersect Action: ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Hide" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        "Edge Label",
                                        React.createElement("br", null),
                                        "Placement: ")),
                                React.createElement("td", { style: { padding: 10 } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.mode.bind(this), ref: function (d) { return _this.modeElement = d; }, dataSource: this.modelist, fields: { text: 'value', value: 'value' }, value: "None" }))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Label Position: ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "labmode", change: this.xpos.bind(this), ref: function (d) { return _this.posElement = d; }, dataSource: this.poslist, fields: { text: 'value', value: 'value' }, value: "Outside" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Enable Trim:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "trimmode", defaultChecked: false, onChange: this.trim.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return _this.checkElement = d; } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Maximum Label Width:")),
                                React.createElement("td", { style: { padding: 10, width: '40%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { width: 120, value: 34, min: 1, change: this.xwid.bind(this), ref: function (d) { return _this.widthElement = d; } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "Labels in an axis can be placed smartly when it intersects with each other. Intersect action and edge label placement can be changed by using property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to arrange the axis labels smartly. When the Axis labels overlap with each other based on the chart dimensions and label size, you can use the ",
                    React.createElement("code", null, "labelIntersectAction"),
                    " property of the axis to avoid overlapping."),
                React.createElement("p", null,
                    "Chart supports the following by which can be set using ",
                    React.createElement("code", null, "labelIntersectAction"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Hide"),
                        " - Hide the label when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Trim"),
                        " - Trim the label when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Wrap"),
                        " - Wrap the label when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "MultipleRows"),
                        " - Arrange the label in multiple row when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Rotate45"),
                        " - Rotate the label to 45 degree when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Rotate90"),
                        " - Rotate the label to 90 degree when it intersect."),
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - Shows all the labels.")),
                React.createElement("p", null,
                    "Chart supports three types of edge labels placement which can be set using ",
                    React.createElement("code", null, "edgeLabelPlacement"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "None"),
                        " - No action will be performed."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Hide"),
                        " - Edge label will be hidden ."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Shift"),
                        " - Shifts the edge labels.")),
                React.createElement("p", null,
                    "More information on the smart axis labels can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    SmartAxisLabels.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    SmartAxisLabels.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    ;
    return SmartAxisLabels;
}(sample_base_1.SampleBase));
exports.SmartAxisLabels = SmartAxisLabels;
