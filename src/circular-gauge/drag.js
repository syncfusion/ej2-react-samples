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
 * Sample for Pointer drag
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Drag = (function (_super) {
    __extends(Drag, _super);
    function Drag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';
        return _this;
    }
    Drag.prototype.dragChange = function () {
        var pointerValue = +this.drag.value;
        document.getElementById('pointerValue').innerHTML = 'Pointer Value <span> &nbsp;&nbsp;&nbsp;' + Math.round(pointerValue);
        this.setPointersValue(this.gauge, pointerValue);
    };
    // custom code start
    Drag.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Drag.prototype.pointerDragChange = function () {
        var value = this.pointerDrag.checked;
        this.gauge.enablePointerDrag = value;
    };
    Drag.prototype.setPointersValue = function (circulargauge, pointerValue) {
        var color;
        if (pointerValue >= 0 && pointerValue <= 40) {
            color = '#30B32D';
        }
        else if (pointerValue >= 40 && pointerValue <= 100) {
            color = '#E5C31C';
        }
        else {
            color = '#F03E3E';
        }
        circulargauge.axes[0].pointers[0].color = color;
        circulargauge.axes[0].pointers[1].color = color;
        circulargauge.axes[0].pointers[0].animation.enable = true;
        circulargauge.axes[0].pointers[1].animation.enable = true;
        circulargauge.axes[0].pointers[0].needleTail.color = color;
        circulargauge.axes[0].pointers[1].needleTail.color = color;
        circulargauge.axes[0].pointers[0].cap.border.color = color;
        circulargauge.axes[0].pointers[1].cap.border.color = color;
        circulargauge.setPointerValue(0, 1, pointerValue);
        circulargauge.setPointerValue(0, 0, pointerValue);
        this.content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, this.content + pointerValue + ' MPH</span></div>');
    };
    Drag.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-9' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), loaded: this.onChartLoad.bind(this), dragMove: this.dragMove.bind(this), dragEnd: this.dragEnd.bind(this), id: 'drag-container', ref: function (gauge) { return _this.gauge = gauge; }, enablePointerDrag: true },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 140, radius: '80%', minimum: 0, maximum: 120, majorTicks: {
                                    useRangeColor: true
                                }, lineStyle: { width: 0, color: '#9E9E9E' }, minorTicks: {
                                    useRangeColor: true
                                }, labelStyle: {
                                    useRangeColor: true
                                } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size: 14px;color:#FFDD00;font-weight: lighter;font-style: oblique;"><span>70 MPH</span></div>', angle: 180, radius: '45%', zIndex: '1' })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, type: "Marker", markerShape: 'InvertedTriangle', radius: '110%', markerHeight: 20, color: '#E5C31C', markerWidth: 20 }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', cap: {
                                            radius: 10, border: { width: 5, color: '#E5C31C' }
                                        }, needleTail: {
                                            length: '0%', color: '#E5C31C'
                                        }, color: '#E5C31C' })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 40, radius: '108%', color: '#30B32D', startWidth: 8, endWidth: 8 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 100, radius: '108%', color: '#FFDD00', startWidth: 8, endWidth: 8 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 100, end: 120, radius: '108%', color: '#F03E3E', startWidth: 8, endWidth: 8 })))))),
                React.createElement("div", { className: 'col-lg-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "30%" } },
                                        React.createElement("div", { id: 'pointerValue' },
                                            "Pointer Value ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A070"),
                                            " ")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "value", onChange: this.dragChange.bind(this), ref: function (d) { return _this.drag = d; }, defaultValue: "70", min: "0", max: "120", style: { width: "90%" } })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "20%" } },
                                        React.createElement("div", { id: 'enablePointer' }, "Enable Drag")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "checkbox", onChange: this.pointerDragChange.bind(this), ref: function (d) { return _this.pointerDrag = d; }, id: "enable", defaultChecked: true, style: { width: "90%" } }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample visualizes pointer drag in circular gauge. Position of pointer value can be changed by using ",
                    React.createElement("code", null, "Pointer Value"),
                    " and we can drag the pointer by enabling drag option.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to move pointers in gauge using drag and drop. Use ",
                    React.createElement("code", null, "enablePointerDrag"),
                    "        property, to achieve this behavior."),
                React.createElement("br", null),
                React.createElement("p", null, "In this sample, you can drag the pointer using mouse or touch, the pointer value will be updated in an annotation placed in the gauge."),
                React.createElement("p", null,
                    "More information on the gauge can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    // Code for Property Panel
    Drag.prototype.onChartLoad = function (args) {
        document.getElementById('drag-container').setAttribute('title', '');
    };
    ;
    Drag.prototype.dragMove = function (args) {
        document.getElementById('pointerValue').innerHTML = 'Pointer Value <span> &nbsp;&nbsp;&nbsp;' + Math.round(args.currentValue);
        this.drag.value = Math.round(args.currentValue).toString();
        this.gauge.setAnnotationValue(0, 0, this.content + Math.round(args.currentValue) + ' MPH</span></div > ');
    };
    ;
    Drag.prototype.dragEnd = function (args) {
        this.setPointersValue(this.gauge, Math.round(args.currentValue));
    };
    ;
    return Drag;
}(sample_base_1.SampleBase));
exports.Drag = Drag;
