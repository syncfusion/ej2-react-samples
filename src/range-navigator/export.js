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
 * Sample for Range Navigator Export
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var export_data_1 = require("./export-data");
exports.dateTimeData = export_data_1.dataCollection;
exports.themes = ['Material', 'Fabric', 'Bootstrap', 'Highcontrast'];
exports.borderColor = ['#FF4081', '#007897', '#428BCA', '#FFD939'];
exports.regionColor = ['rgba(255, 64, 129, 0.3)', ' rgba(0, 120, 151, 0.3)',
    'rgba(66, 139, 202, 0.3)', 'rgba(255, 217, 57, 0.3)'];
var SAMPLE_CSS = "\n        .control-fluid {\n            padding: 0px !important;\n        }\n        #title{\n            font-size: 15px;\n            font-style: normal;\n            font-family: \"Segoe UI\";\n            font-weight: 500;\n            text-anchor: middle;\n            transform: none;\n            opacity: 1;\n        }\n        #btn-control {\n            width: 100%;\n            text-align: center;\n        }\n        .e-export-icon::before {\n            content: '\\e720';\n        }\n    \n         .e-print-icon::before {\n            content: '\\e34b';\n        }";
var RangeExport = (function (_super) {
    __extends(RangeExport, _super);
    function RangeExport() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = [
            { value: 'JPEG' },
            { value: 'PNG' },
            { value: 'SVG' },
            { value: 'PDF' }
        ];
        return _this;
    }
    RangeExport.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement("div", { className: "row", style: { textAlign: "center" } },
                        React.createElement("div", { id: "title" }, "Conns,Inc Stock Details")),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_charts_1.RangeNavigatorComponent, { id: 'rangenavigator', ref: function (rangenav) { return _this.rangeInstance = rangenav; }, style: { textAlign: "center" }, valueType: 'DateTime', intervalType: 'Months', labelFormat: 'MMM', enableGrouping: true, value: [new Date('2013-05-01'), new Date('2013-08-01')], dataSource: exports.dateTimeData, xName: 'xDate', yName: 'Close', width: ej2_base_1.Browser.isDevice ? '100%' : '80%', load: this.rangeLoad.bind(this), changed: this.changed.bind(this) },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime] }))),
                    React.createElement("div", { className: "row" },
                        React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                                valueType: 'DateTime',
                                crosshairTooltip: { enable: true },
                                edgeLabelPlacement: 'Shift',
                                majorGridLines: { width: 0 }
                            }, primaryYAxis: {
                                minimum: 81, maximum: 87, interval: 2,
                                title: 'Million in USD',
                                majorTickLines: { width: 0 },
                                lineStyle: { width: 0 },
                                labelFormat: '${value}M'
                            }, load: this.chartLoad.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '80%', height: '350', chartArea: { border: { width: 0 } }, tooltip: {
                                enable: true, shared: true
                            } },
                            React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Export] }),
                            React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                                React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dateTimeData, xName: 'xDate', yName: 'Close', border: { width: 2 }, animation: { enable: false }, name: 'Close', type: 'SplineArea', width: 2 }))))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '80%' } },
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "30%" } }, "Export Type:"),
                                React.createElement("td", { style: { width: "30%" } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 60, id: "etype", value: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.type, fields: { text: 'value', value: 'value' }, placeholder: "JPEG" }))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { style: { width: "40%" } }, "File Name:"),
                                React.createElement("td", { style: { width: "40%" } },
                                    React.createElement("div", { className: "e-float-input", style: { width: 70, 'margin-top': '0px' } },
                                        React.createElement("input", { type: "text", defaultValue: "Chart", id: "fileName", style: { "margin-left": "-10px" } })))),
                            React.createElement("tr", { style: { height: '40px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { 'margin-left': '20px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "exporticon", onClick: this.exportClick.bind(this), iconCss: 'e-icons e-export-icon', cssClass: 'e-flat', isPrimary: true }, "Export")))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { 'margin-left': '20px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "printicon", onClick: this.printClick.bind(this), iconCss: 'e-icons e-print-icon', cssClass: 'e-flat', isPrimary: true }, "Print")))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates the export feature in the range navigator. You can export the range navigator in PNG, SVG, PDF, or JPEG format by clicking ",
                    React.createElement("code", null, "Export"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the export feature. The rendered range navigator can be exported as either JPEG, PNG, or SVG format. It can be achieved using the Blob. It is supported only in modern browsers."),
                React.createElement("p", null,
                    "More information on the export can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/chart/api-series.html#type-chartseriestype" }, "documentation section"),
                    "."))));
    };
    RangeExport.prototype.changed = function (args) {
        if (this.chartInstance && this.chartRendered) {
            this.chartInstance.primaryXAxis.zoomFactor = args.zoomFactor;
            this.chartInstance.primaryXAxis.zoomPosition = args.zoomPosition;
            this.chartInstance.dataBind();
        }
        else {
            exports.zoomFactor = args.zoomFactor;
            exports.zoomPosition = args.zoomPosition;
        }
    };
    ;
    RangeExport.prototype.chartLoad = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
        var chartTheme = args.chart.theme;
        args.chart.series[0].fill = exports.regionColor[exports.themes.indexOf(chartTheme)];
        args.chart.series[0].border.color = exports.borderColor[exports.themes.indexOf(chartTheme)];
        this.chartRendered = true;
    };
    ;
    // custom code start
    RangeExport.prototype.rangeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark");
    };
    ;
    // custom code end
    RangeExport.prototype.exportClick = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.chartInstance.exportModule.export(this.mode.value, fileName, null, [this.rangeInstance, this.chartInstance]);
    };
    RangeExport.prototype.printClick = function (e) {
        this.rangeInstance.print(['rangenavigator', 'charts']);
    };
    return RangeExport;
}(sample_base_1.SampleBase));
exports.RangeExport = RangeExport;
