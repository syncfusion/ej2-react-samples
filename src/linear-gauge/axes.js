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
 * Sample for Axes
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var Axes = (function (_super) {
    __extends(Axes, _super);
    function Axes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Marker' },
            { value: 'Bar' }
        ];
        _this.placelist = [
            { value: 'Near' },
            { value: 'Center' },
            { value: 'Far' }
        ];
        return _this;
    }
    // custom code start
    Axes.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    // Code for Property Panel
    Axes.prototype.minChange = function () {
        this.gaugeInstance.axes[0].minimum = parseInt(this.rangeMinElement.value, 10);
        document.getElementById('minValue').innerHTML = 'Axis Minimum <span>&nbsp;&nbsp;&nbsp;' + this.rangeMinElement.value;
        this.gaugeInstance.annotations[0].axisValue = this.gaugeInstance.axes[0].pointers[0].currentValue;
        this.gaugeInstance.refresh();
    };
    Axes.prototype.maxChange = function () {
        this.gaugeInstance.axes[0].maximum = parseInt(this.rangeMaxElement.value, 10);
        document.getElementById('maxValue').innerHTML = 'Axis Maximum <span>&nbsp;&nbsp;&nbsp;' + this.rangeMaxElement.value;
        this.gaugeInstance.annotations[0].axisValue = this.gaugeInstance.axes[0].pointers[0].currentValue;
        this.gaugeInstance.refresh();
    };
    Axes.prototype.inverseChange = function () {
        this.gaugeInstance.axes[0].isInversed = this.inversedElement.checked;
        this.gaugeInstance.refresh();
    };
    Axes.prototype.opposedChange = function () {
        this.gaugeInstance.axes[0].opposedPosition = this.opposedElement.checked;
        if (this.opposedElement.checked) {
            this.gaugeInstance.axes[0].pointers[0].placement = 'Near';
            this.gaugeInstance.axes[0].pointers[0].markerType = 'Triangle';
            this.gaugeInstance.axes[0].pointers[0].offset = -20;
            this.gaugeInstance.axes[0].labelStyle.offset = 0;
            this.gaugeInstance.annotations[0].x = 10;
            this.gaugeInstance.annotations[0].y = -60;
        }
        else {
            this.gaugeInstance.axes[0].pointers[0].placement = 'Far';
            this.gaugeInstance.axes[0].pointers[0].offset = 0;
            this.gaugeInstance.axes[0].pointers[0].offset = 30;
            this.gaugeInstance.axes[0].pointers[0].markerType = 'InvertedTriangle';
            this.gaugeInstance.axes[0].labelStyle.offset = 38;
            this.gaugeInstance.annotations[0].x = 10;
            this.gaugeInstance.annotations[0].y = 60;
        }
        this.gaugeInstance.refresh();
    };
    Axes.prototype.labelChange = function () {
        this.gaugeInstance.axes[0].labelStyle.format = this.labelElement.value.indexOf('{value}') > -1 ? this.labelElement.value : this.gaugeInstance.axes[0].labelStyle.format;
        this.gaugeInstance.refresh();
    };
    Axes.prototype.typeChange = function () {
        this.gaugeInstance.axes[0].pointers[0].type = this.typeElement.value;
        this.placeElement.enabled = (this.typeElement.value === 'Marker');
        this.gaugeInstance.refresh();
    };
    Axes.prototype.placeChange = function () {
        this.gaugeInstance.axes[0].pointers[0].placement = this.placeElement.value;
        this.gaugeInstance.refresh();
    };
    Axes.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gauge', ref: function (gauge) { return _this.gaugeInstance = gauge; }, orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { color: '#9E9E9E' }, majorTicks: { color: '#9E9E9E', interval: 10 }, minorTicks: { color: '#9E9E9E', interval: 2 }, labelStyle: { offset: 48 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, height: 15, width: 15, color: '#757575', offset: 30 })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px;">${axes[0].pointers[0].currentValue} MPH</h1></div>', axisIndex: 0, axisValue: 10, x: 10, y: 60, zIndex: '1' })))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginBottom: '20px' } },
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { id: 'minValue' },
                                        "Axis Minimum ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A040"),
                                        " ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": 'rangeslider' },
                                        React.createElement("input", { type: "range", onChange: this.minChange.bind(this), ref: function (d) { return _this.rangeMinElement = d; }, name: "range-min", step: '5', id: "min", defaultValue: "0", min: "0", max: "100", style: { width: '100px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '30%' } },
                                    React.createElement("div", { id: 'maxValue' },
                                        "Axis Maximum ",
                                        React.createElement("span", null, "\u00A0\u00A0\u00A080"),
                                        " ")),
                                React.createElement("td", { style: { width: '70%' } },
                                    React.createElement("div", { "data-role": 'rangeslider' },
                                        React.createElement("input", { type: "range", onChange: this.maxChange.bind(this), ref: function (d) { return _this.rangeMaxElement = d; }, step: '5', id: "max", defaultValue: "80", min: "0", max: "100", style: { width: '100px' } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Axis Inversed")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", onChange: this.inverseChange.bind(this), ref: function (d) { return _this.inversedElement = d; }, id: 'axisInversed' })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Axis Opposed")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", onChange: this.opposedChange.bind(this), ref: function (d) { return _this.opposedElement = d; }, id: 'opposed' })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Label Format")),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "e-float-input", style: { 'margin-top': '0px' } },
                                        React.createElement("input", { id: "format", onChange: this.labelChange.bind(this), ref: function (d) { return _this.labelElement = d; }, type: "text", defaultValue: "{value}", style: { "width": "100px" } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Pointer type")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "pointerType", style: { "width": "auto" }, change: this.typeChange.bind(this), ref: function (d) { return _this.typeElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Marker" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Marker Placement")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "pointerPlace", style: { "width": "auto" }, change: this.placeChange.bind(this), ref: function (d) { return _this.placeElement = d; }, dataSource: this.placelist, fields: { text: 'value', value: 'value' }, value: "Far" })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the axis and pointers feature in the linear gauge. Axis and pointers can be customized by using options available in the panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to customize the axes and pointers. Use ",
                    React.createElement("code", null, "format"),
                    " of labelStyle property to customize the axis labels and use ",
                    React.createElement("code", null, "type"),
                    ", ",
                    React.createElement("code", null, "markerType"),
                    " and ",
                    React.createElement("code", null, "placement"),
                    " properties to customize the pointers in linear gauge."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Axes;
}(sample_base_1.SampleBase));
exports.Axes = Axes;
