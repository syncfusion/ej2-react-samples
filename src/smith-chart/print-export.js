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
 * print and export sample for smith chart
 */
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
// custom code start
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #btn-control {\n        width: 100%;\n        text-align: center;\n        text-transform:none !important;\n    }\n    .e-play-icon::before {\n        content: \"\\e728\";\n    }\n    .e-play-icon::before {\n        content: \"\\e813\";\n    }";
// custom code end
var Print = (function (_super) {
    __extends(Print, _super);
    function Print() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { text: 'JPEG', value: 'JPEG' },
            { text: 'PNG', value: 'PNG' },
            { text: 'SVG', value: 'SVG' },
            { text: 'PDF', value: 'PDF' },
        ];
        return _this;
    }
    Print.prototype.onClick2 = function (e) {
        this.smithchartInstance.print();
    };
    Print.prototype.onClick1 = function (e) {
        var fileName = document.getElementById('fileName').value;
        this.smithchartInstance.export(this.mode.value, fileName);
    };
    // custom code start
    Print.prototype.load = function (args) {
        var theme = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1));
    };
    // custom code end
    Print.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-md-8 control-section' },
                React.createElement(ej2_react_charts_1.SmithchartComponent, { load: this.load.bind(this), id: 'smith-chart', ref: function (gauge) { return _this.smithchartInstance = gauge; }, horizontalAxis: { minorGridLines: { visible: true } }, legendSettings: { visible: true, shape: 'Circle' }, radialAxis: { minorGridLines: { visible: true } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.TooltipRender, ej2_react_charts_1.SmithchartLegend] }),
                    React.createElement(ej2_react_charts_1.SmithchartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SmithchartSeriesDirective, { points: [
                                { resistance: 0.15, reactance: 0 }, { resistance: 0.15, reactance: 0.15 },
                                { resistance: 0.18, reactance: 0.3 }, { resistance: 0.2, reactance: 0.4 },
                                { resistance: 0.25, reactance: 0.6 }, { resistance: 0.38, reactance: 0.95 },
                                { resistance: 0.6, reactance: 1.25 }, { resistance: 1, reactance: 1.6 },
                                { resistance: 1.65, reactance: 1.9 }, { resistance: 2.75, reactance: 2 },
                                { resistance: 4.5, reactance: 0 }, { resistance: 3, reactance: -2 },
                                { resistance: 1.65, reactance: -1.95 }, { resistance: 1, reactance: -1.65 },
                                { resistance: 0.6, reactance: -1.25 }, { resistance: 0.35, reactance: -0.9 },
                                { resistance: 0.25, reactance: -0.6 }, { resistance: 0.25, reactance: -0.4 },
                                { resistance: 0.25, reactance: -0.3 }, { resistance: 0.25, reactance: -0.15 },
                                { resistance: 0.25, reactance: 0 },
                            ], name: 'Transmission', enableAnimation: true, tooltip: { visible: true }, marker: { shape: 'Circle', visible: true, border: { width: 2 } } })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Export Type")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "mode", width: "100px", index: 0, placeholder: "JPEG", ref: function (d) { return _this.mode = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' } })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "File Name")),
                            React.createElement("td", null,
                                React.createElement("div", { className: "e-float-input", style: { 'margin-top': '0px' } },
                                    React.createElement("input", { id: "fileName", ref: function (d) { return _this.nameElement = d; }, type: "text", defaultValue: "Smith chart", style: { "width": "100px" } })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { id: "btn-control" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick1.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Export")))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { id: "btn-control" },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: this.onClick2.bind(this), style: { width: '80px' }, cssClass: 'e-info', isPrimary: true }, "Print"))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explores the exporting and printing functionality in Smith chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to export and print the rendered Smith chart. Smith chart can be exported to JPEG, PNG, SVG, and PDF formats."))));
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
