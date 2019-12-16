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
 * Sample for Ranges
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
exports.range = ['#9ef47a', '#f4f47a', '#ed5e5e'];
var Ranges = /** @class */ (function (_super) {
    __extends(Ranges, _super);
    function Ranges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: '0', text: 'Low' },
            { value: '1', text: 'Moderate' },
            { value: '2', text: 'High' },
        ];
        _this.modelist = [
            { value: 'font', text: 'Default Color' },
            { value: 'range', text: 'Range Color' }
        ];
        return _this;
    }
    // custom code start
    Ranges.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    // Code for Property Panel
    Ranges.prototype.indexChange = function () {
        this.startElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].start.toString();
        this.endElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].end.toString();
        this.startWidthElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].startWidth.toString();
        this.endWidthElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].endWidth.toString();
        this.colorElement.value = this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].color.toString();
        document.getElementById('startWidthValue').innerHTML = 'Range Start Width <span>&nbsp;&nbsp;&nbsp;' + this.startWidthElement.value;
        document.getElementById('endWidthValue').innerHTML = 'Range End Width <span>&nbsp;&nbsp;&nbsp;' + this.endWidthElement.value;
        document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + this.startElement.value;
        document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + this.endElement.value;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.rangeColorChange = function () {
        this.gaugeInstance.axes[0].labelStyle.useRangeColor = (this.rangeColorElement.value === 'range') ? true : false;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.startChange = function () {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].start = parseInt(this.startElement.value, 10);
        document.getElementById('startRangeValue').innerHTML = 'Range Start <span>&nbsp;&nbsp;&nbsp;' + this.startElement.value;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.endChange = function () {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].end = parseInt(this.endElement.value, 10);
        document.getElementById('endRangeValue').innerHTML = 'Range End <span>&nbsp;&nbsp;&nbsp;' + this.endElement.value;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.startWidthChange = function () {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].startWidth = parseInt(this.startWidthElement.value, 10);
        document.getElementById('startWidthValue').innerHTML = 'Range Start Width <span>&nbsp;&nbsp;&nbsp;' + this.startWidthElement.value;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.colorChange = function () {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].color = this.colorElement.value;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.endWidthChange = function () {
        this.gaugeInstance.axes[0].ranges[parseInt(this.indexElement.value, 10)].endWidth = parseInt(this.endWidthElement.value, 10);
        document.getElementById('endWidthValue').innerHTML = 'Range End Width <span>&nbsp;&nbsp;&nbsp;' + this.endWidthElement.value;
        this.gaugeInstance.refresh();
    };
    Ranges.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gauge', ref: function (gauge) { return _this.gaugeInstance = gauge; }, orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { majorTicks: { height: 0 }, minorTicks: { height: 0 }, line: { width: 0 }, labelStyle: { format: '{value}%', offset: 30 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 35, height: 10, width: 10, offset: -40, markerType: 'Triangle', placement: 'Near' })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 32, startWidth: 15, endWidth: 15, color: '#30B32D' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 32, end: 68, startWidth: 15, endWidth: 15, color: '#FFDF00' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 68, end: 100, startWidth: 15, endWidth: 15, color: '#F03E3E' })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="pointer" style="width:20px"><h1 style="font-size:18px;">35</h1></div>', axisIndex: 0, axisValue: 35, zIndex: '1', y: -50 })))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Range Index")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "rangeIndex", style: { "width": "auto" }, change: this.indexChange.bind(this), ref: function (d) { return _this.indexElement = d; }, dataSource: this.droplist, fields: { text: 'text', value: 'value' }, text: "Low", value: "0" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Range Color")),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "e-float-input", style: { 'margin-top': '0px' } },
                                        React.createElement("input", { id: "color", onChange: this.colorChange.bind(this), ref: function (d) { return _this.colorElement = d; }, type: "text", defaultValue: "#F03E3E", style: { "width": "90%" } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Range Font Color")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "rangeColor", style: { "width": "auto" }, change: this.rangeColorChange.bind(this), ref: function (d) { return _this.rangeColorElement = d; }, dataSource: this.modelist, fields: { text: 'text', value: 'value' }, text: "Default Color", value: "font" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { id: 'startRangeValue' },
                                        "Range Start ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A00"),
                                        " ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": 'rangeslider' },
                                        React.createElement("input", { type: "range", onChange: this.startChange.bind(this), ref: function (d) { return _this.startElement = d; }, name: "range-min", id: "start", defaultValue: "0", min: "0", max: "100", style: { width: '100px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { id: 'endRangeValue' },
                                        "Range End ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A032"),
                                        " ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": 'rangeslider' },
                                        React.createElement("input", { type: "range", onChange: this.endChange.bind(this), ref: function (d) { return _this.endElement = d; }, id: "end", defaultValue: "732", min: "0", max: "100", style: { width: '100px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { id: 'startWidthValue' },
                                        "Range Start Width ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A010"),
                                        " ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": 'rangeslider' },
                                        React.createElement("input", { type: "range", onChange: this.startWidthChange.bind(this), ref: function (d) { return _this.startWidthElement = d; }, name: "range-min", id: "startWidth", defaultValue: "15", min: "0", max: "30", style: { width: '100px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { id: 'endWidthValue' },
                                        "Range End Width ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A010"),
                                        " ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": 'rangeslider' },
                                        React.createElement("input", { type: "range", onChange: this.endWidthChange.bind(this), ref: function (d) { return _this.endWidthElement = d; }, id: "endWidth", defaultValue: "0", min: "0", max: "30", style: { width: '100px' } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how to highlight a region in an axis by using ranges in gauge. Start, end, color, and width of the range can be changed by using the options provided in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the orientation and container customization in linear gauge. The gauge can be rendered either in vertical or horizontal orientation. And you can use ",
                    React.createElement("code", null, "type"),
                    " property in container to change the type of the container."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Ranges;
}(sample_base_1.SampleBase));
exports.Ranges = Ranges;
