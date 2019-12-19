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
 * Sample for Multiple Axis
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Axes = (function (_super) {
    __extends(Axes, _super);
    function Axes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.axisIndex = 0;
        _this.loaded = false;
        return _this;
    }
    // custom code start
    Axes.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Axes.prototype.onChartLoad = function (args) {
        var _this = this;
        var id = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (!this.loaded) {
            this.loaded = true;
            this.axis = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 140,
                change: function () {
                    _this.axisIndex = +_this.axis.value;
                    var direction = _this.gauge.axes[_this.axisIndex].direction;
                    _this.direction.value = direction;
                    var startAngle = _this.gauge.axes[_this.axisIndex].startAngle;
                    var endAngle = _this.gauge.axes[_this.axisIndex].endAngle;
                    document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + startAngle;
                    document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + endAngle;
                    _this.start.value = startAngle.toString();
                    _this.end.value = endAngle.toString();
                }
            });
            this.axis.appendTo('#axisIndex');
            this.direction = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 140,
                change: function () {
                    _this.gauge.axes[_this.axisIndex].direction = _this.direction.value == 'ClockWise' ? 'ClockWise' : 'AntiClockWise';
                    _this.gauge.axes[0].pointers[0].animation.enable = false;
                    _this.gauge.axes[1].pointers[0].animation.enable = false;
                    _this.gauge.refresh();
                }
            });
            this.direction.appendTo('#axisDirection');
        }
    };
    ;
    Axes.prototype.startAngle = function () {
        var value = +this.start.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].startAngle = value;
        document.getElementById('start').innerHTML = 'Start Angle <span> &nbsp;&nbsp;&nbsp;' + value;
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            ej2_react_circulargauge_1.isCompleteAngle(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    };
    Axes.prototype.endAngle = function () {
        var value = +this.end.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].endAngle = value;
        document.getElementById('end').innerHTML = 'End Angle <span> &nbsp;&nbsp;&nbsp;' + value;
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            ej2_react_circulargauge_1.isCompleteAngle(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    };
    Axes.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'range-container', title: "Gauge with Multiple Axes", titleStyle: {
                            color: 'gray',
                            size: '16px'
                        }, ref: function (gauge) { return _this.gauge = gauge; }, loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { lineStyle: { width: 1.5, color: ' #9E9E9E' }, radius: '95%', startAngle: 220, endAngle: 140, minimum: 0, maximum: 160, majorTicks: {
                                    position: 'Inside',
                                    width: 2, height: 10, color: '#757575'
                                }, minorTicks: {
                                    position: 'Inside', width: 2,
                                    height: 5, color: '#757575'
                                }, labelStyle: {
                                    position: 'Inside', autoAngle: true,
                                    hiddenLabel: 'None', font: { color: '#333333' }
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '100%', color: '#333333', markerHeight: 15, markerWidth: 15, type: 'Marker', markerShape: 'Triangle' }))),
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { lineStyle: { width: 1.5, color: ' #E84011' }, radius: '95%', startAngle: 220, endAngle: 140, minimum: 0, maximum: 240, majorTicks: {
                                    position: 'Outside', width: 2, height: 10,
                                    color: '#E84011'
                                }, minorTicks: {
                                    position: 'Outside', width: 2,
                                    height: 5, color: '#E84011'
                                }, labelStyle: {
                                    position: 'Outside', autoAngle: true,
                                    hiddenLabel: 'None'
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 120, radius: '100%', color: '#C62E0A', markerHeight: 15, markerWidth: 15, type: 'Marker', markerShape: 'InvertedTriangle' })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Axis ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "axisIndex", className: "form-control", style: { width: "90%" } },
                                                React.createElement("option", { value: "0" }, "Axis 1"),
                                                React.createElement("option", { value: "1" }, "Axis 2"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Direction ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "axisDirection", className: "form-control", style: { width: "90%" } },
                                                React.createElement("option", { value: "ClockWise" }, "ClockWise"),
                                                React.createElement("option", { value: "AntiClockWise" }, "AntiClockWise"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'start' },
                                            "Start Angle ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A0220"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "startAngle", onChange: this.startAngle.bind(this), ref: function (d) { return _this.start = d; }, defaultValue: "220", min: "0", max: "360", style: { width: "90%" } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'end' },
                                            "End Angle ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A0140"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "endAngle", onChange: this.endAngle.bind(this), ref: function (d) { return _this.end = d; }, defaultValue: "140", min: "0", max: "360", style: { width: "90%" } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the multiple axes in the gauge and options are available to change the direction, start, and end angle of an axis.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure multipe axes in gauge. Use ",
                    React.createElement("code", null, "axes"),
                    " collection to render multiple axis in gauge. Each axis can be customized with its own ",
                    React.createElement("code", null, "pointer"),
                    " and ",
                    React.createElement("code", null, "scales"),
                    "."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the axis can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    return Axes;
}(sample_base_1.SampleBase));
exports.Axes = Axes;
