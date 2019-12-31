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
 * Sample for chart export
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
    { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
    { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n    }\n    .e-play-icon::before {\n        content: \"\\e720\";\n    }";
var ChartExport = (function (_super) {
    __extends(ChartExport, _super);
    function ChartExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' }
        ];
        return _this;
    }
    ChartExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            title: 'Countries',
                            valueType: 'Category',
                            majorGridLines: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, primaryYAxis: {
                            title: 'Measurements',
                            labelFormat: '{value}GW',
                            minimum: 0,
                            maximum: 40,
                            interval: 10,
                            majorGridLines: { width: 0 }
                        }, pointRender: this.labelRender.bind(this), load: this.load.bind(this), title: "Top 10 Countries Using Solar Power", loaded: this.onChartLoad.bind(this), tooltip: { enable: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Export] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, type: 'Column' })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "30%" } }, "Export Type:"),
                                React.createElement("td", { style: { width: "30%" } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "etype", value: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" }))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "40%" } }, "File Name:"),
                                React.createElement("td", { style: { width: "40%" } },
                                    React.createElement("div", { className: "e-float-input", style: { width: 120, 'margin-top': '0px' } },
                                        React.createElement("input", { type: "text", defaultValue: "Chart", id: "fileName", style: { "margin-left": "-10px" } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { 'margin-left': '60px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick.bind(this), iconCss: 'e-icons e-play-icon', cssClass: 'e-flat', isPrimary: true }, "Export")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the export feature in chart. By clicking ",
                    React.createElement("code", null, "Export"),
                    ", you can export the chart in PNG or JPEG format.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the export. The rendered chart can be exported as either JPEG or PNG format. It can be achieved using Blob and it's supported only in modern browsers."),
                React.createElement("p", null,
                    "More information on the export can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    ChartExport.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    // custom code start
    ChartExport.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/dark/i, "Dark").
            replace(/light/i, "Light");
    };
    ;
    // custom code end
    ChartExport.prototype.labelRender = function (args) {
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
    ChartExport.prototype.onClick = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.chartInstance.exportModule.export(this.mode.value, fileName);
    };
    return ChartExport;
}(sample_base_1.SampleBase));
exports.ChartExport = ChartExport;
