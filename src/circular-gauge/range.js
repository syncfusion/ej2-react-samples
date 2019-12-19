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
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Range = (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        return _this;
    }
    // custom code start
    Range.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    // Code for Property Panel
    Range.prototype.start = function () {
        var index = +this.listObj.value;
        var min = +this.startElement.value;
        document.getElementById('rangeStart').innerHTML = 'Range Start <span> &nbsp;&nbsp;&nbsp;' + min;
        this.gauge.axes[0].ranges[index].start = min;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.end = function () {
        var index = +this.listObj.value;
        var max = +this.endElement.value;
        document.getElementById('rangeEnd').innerHTML = 'Range End <span> &nbsp;&nbsp;&nbsp;' + max;
        this.gauge.axes[0].ranges[index].end = max;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.startWidth = function () {
        var index = +this.listObj.value;
        var startWidth = +this.startWidthElement.value;
        document.getElementById('rangeStartWidth').innerHTML = 'Start Width <span> &nbsp;&nbsp;&nbsp;' + startWidth;
        this.gauge.axes[0].ranges[index].startWidth = startWidth;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.endWidth = function () {
        var index = +this.listObj.value;
        var endWidth = +this.endWidthElement.value;
        document.getElementById('rangeEndWidth').innerHTML = 'End Width <span> &nbsp;&nbsp;&nbsp;' + endWidth;
        this.gauge.axes[0].ranges[index].endWidth = endWidth;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.radius = function () {
        var index = +this.listObj.value;
        var radius = +this.radiusElement.value;
        document.getElementById('roundedRadius').innerHTML = 'Corner Radius <span> &nbsp;&nbsp;&nbsp;' + radius;
        this.gauge.axes[0].ranges[index].roundedCornerRadius = radius;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.enable = function () {
        var index = +this.listObj.value;
        var useRangeColor = this.enableElement.checked;
        this.gauge.axes[0].labelStyle.useRangeColor = useRangeColor;
        this.gauge.axes[0].majorTicks.useRangeColor = useRangeColor;
        this.gauge.axes[0].minorTicks.useRangeColor = useRangeColor;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'range-container', ref: function (gauge) { return _this.gauge = gauge; }, loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, radius: '80%', endAngle: 150, minimum: 0, maximum: 120, majorTicks: {
                                    height: 10, offset: 5,
                                }, lineStyle: { width: 10, color: 'transparent' }, minorTicks: {
                                    height: 0
                                }, labelStyle: {
                                    position: 'Inside',
                                    font: {
                                        size: '12px',
                                        fontFamily: 'Roboto', fontStyle: 'Regular'
                                    },
                                    useRangeColor: false
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 65, radius: '60%', pointerWidth: 8, needleTail: {
                                            length: '18%'
                                        }, cap: {
                                            radius: 7
                                        } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 40, color: '#30B32D' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 80, color: '#FFDD00' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 80, end: 120, color: '#F03E3E' })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div><span style="font-size:14px; color:#9E9E9E; font-family:Regular">Speedometer</span></div>', angle: 0, zIndex: '1', radius: '30%' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div><span style="font-size:24px; color:#424242; font-family:Regular">65 MPH</span></div>', angle: 180, zIndex: '1', radius: '40%' })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Select Range ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "rangeSelect", className: "form-control", style: { width: '90%' } },
                                                React.createElement("option", { value: "0" }, " Low"),
                                                React.createElement("option", { value: "1" }, "Medium"),
                                                React.createElement("option", { value: "2" }, "High"))))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'rangeStart' },
                                            "Range Start ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A00"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "start", defaultValue: "0", min: "0", max: "120", style: { width: '90%' }, onChange: this.start.bind(this), ref: function (d) { return _this.startElement = d; } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'rangeEnd' },
                                            "Range End ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A040"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "end", defaultValue: "40", min: "0", max: "120", style: { width: '90%' }, onChange: this.end.bind(this), ref: function (d) { return _this.endElement = d; } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: '' }, "Range Color")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "rangeColor", className: "form-control" },
                                                React.createElement("option", { value: "#30B32D" }, "#30B32D"),
                                                React.createElement("option", { value: "#FFDD00" }, "#FFDD00"),
                                                React.createElement("option", { value: "#F03E3E" }, "#F03E3E"))))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '20%' } },
                                        React.createElement("div", { id: 'enablePointer' }, "Range Font Color")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "checkbox", id: "enable", onChange: this.enable.bind(this), ref: function (d) { return _this.enableElement = d; } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'rangeStartWidth' },
                                            "Start Width ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A010"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "startWidth", defaultValue: "10", min: "0", max: "30", style: { width: '90%' }, onChange: this.startWidth.bind(this), ref: function (d) { return _this.startWidthElement = d; } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'rangeEndWidth' },
                                            "End Width ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A010"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "endWidth", defaultValue: "10", min: "0", max: "30", style: { width: '90%' }, onChange: this.endWidth.bind(this), ref: function (d) { return _this.endWidthElement = d; } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'roundedRadius' },
                                            "Corner Radius ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A00"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "radius", defaultValue: "0", min: "0", max: "30", step: "5", style: { width: '90%' }, onChange: this.radius.bind(this), ref: function (d) { return _this.radiusElement = d; } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how to highlight a region in an axis by using ranges in gauge. Start, end, color, width and corner radius of the range can be changed by using the options provided in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to customize the ranges of an axis in the circular gauge. Ranges are used to group the axis values, you can use ",
                    React.createElement("code", null, "start"),
                    ",",
                    React.createElement("code", null, "end"),
                    ", ",
                    React.createElement("code", null, "color"),
                    ", ",
                    React.createElement("code", null, "startWidth"),
                    ", ",
                    React.createElement("code", null, "endWidth"),
                    React.createElement("code", null, "radius"),
                    " and ",
                    React.createElement("code", null, "roundedCornerRadius"),
                    " properties to customize the ranges. In this sample, an axis is shown with one range and options to customize the range properties with property panel."),
                React.createElement("p", null,
                    "More information on the ranges can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    Range.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.listObj = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 130,
                change: function () {
                    var index = +_this.listObj.value;
                    _this.colortObj.value = _this.gauge.axes[0].ranges[index].color;
                    _this.endWidthElement.value = _this.gauge.axes[0].ranges[index].endWidth.toString();
                    document.getElementById('rangeEndWidth').innerHTML = 'End Width <span> &nbsp;&nbsp;&nbsp;' + _this.gauge.axes[0].ranges[index].endWidth;
                    _this.startWidthElement.value = _this.gauge.axes[0].ranges[index].startWidth.toString();
                    document.getElementById('rangeStartWidth').innerHTML = 'Start Width <span> &nbsp;&nbsp;&nbsp;' + _this.gauge.axes[0].ranges[index].startWidth;
                    _this.endElement.value = _this.gauge.axes[0].ranges[index].end.toString();
                    document.getElementById('rangeEnd').innerHTML = 'Range End <span> &nbsp;&nbsp;&nbsp;' + _this.gauge.axes[0].ranges[index].end;
                    _this.startElement.value = _this.gauge.axes[0].ranges[index].start.toString();
                    document.getElementById('rangeStart').innerHTML = 'Range Start <span> &nbsp;&nbsp;&nbsp;' + _this.gauge.axes[0].ranges[index].start;
                    _this.radiusElement.value = _this.gauge.axes[0].ranges[index].roundedCornerRadius.toString();
                    document.getElementById('roundedRadius').innerHTML = 'Corner Radius <span> &nbsp;&nbsp;&nbsp;' + _this.gauge.axes[0].ranges[index].roundedCornerRadius;
                }
            });
            this.listObj.appendTo('#rangeSelect');
            this.colortObj = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 130,
                change: function () {
                    _this.gauge.axes[0].ranges[+_this.listObj.value].color = _this.colortObj.value.toString();
                    _this.gauge.axes[0].pointers[0].animation.enable = false;
                    _this.gauge.refresh();
                }
            });
            this.colortObj.appendTo('#rangeColor');
        }
    };
    ;
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
