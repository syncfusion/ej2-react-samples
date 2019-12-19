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
 * Sample for Pointers
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Pointers = (function (_super) {
    __extends(Pointers, _super);
    function Pointers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Pointers.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Pointers.prototype.onChartLoad = function (args) {
        var _this = this;
        var id = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (id === 'pointer4-container') {
            this.tooltipInterval1 = setInterval(function () {
                var newVal = Math.random() * (90 - 20) + 20;
                if (document.getElementById('pointer4-container')) {
                    _this.gauge4.setPointerValue(0, 0, newVal);
                }
                else {
                    clearInterval(+_this.tooltipInterval1);
                }
            }, 1000);
        }
        if (id === 'pointer6-container') {
            this.tooltipInterval2 = setInterval(function () {
                var newVal = Math.random() * (80 - 30) + 30;
                if (document.getElementById('pointer6-container')) {
                    _this.gauge6.setPointerValue(0, 0, newVal);
                    _this.gauge6.setPointerValue(0, 1, newVal);
                }
                else {
                    clearInterval(+_this.tooltipInterval1);
                }
            }, 1000);
        }
    };
    ;
    Pointers.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-12" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, loaded: this.onChartLoad.bind(this), id: 'pointer1-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: {
                                                width: 3, color: '#01aebe'
                                            }, majorTicks: {
                                                width: 1,
                                                height: 0,
                                                interval: 100
                                            }, minorTicks: {
                                                height: 0,
                                                width: 0,
                                            }, labelStyle: {
                                                position: 'Outside',
                                                font: { size: '0px', color: '#01aebe' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '100%', color: 'rgb(0,171,169)', type: "Marker", markerShape: "InvertedTriangle", markerHeight: 15, markerWidth: 15 })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#757575; font-family:Roboto; font-size:14px;">Inverted Triangle</div>', angle: 180, zIndex: '1', radius: '20%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, loaded: this.onChartLoad.bind(this), id: 'pointer2-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: {
                                                width: 3, color: '#ff5985'
                                            }, majorTicks: {
                                                width: 1,
                                                height: 0,
                                                interval: 100
                                            }, minorTicks: {
                                                height: 0,
                                                width: 0,
                                            }, labelStyle: {
                                                position: 'Outside',
                                                font: { size: '0px', color: '#ff5985' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 66, radius: '90%', color: '#ff5985', type: "RangeBar", pointerWidth: 10 })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#757575; font-family:Roboto; font-size:14px;">Range Bar</div>', angle: 180, zIndex: '1', radius: '20%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, loaded: this.onChartLoad.bind(this), id: 'pointer3-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: {
                                                width: 3, color: '#1E7145'
                                            }, majorTicks: {
                                                width: 1,
                                                height: 0,
                                                interval: 100
                                            }, minorTicks: {
                                                height: 0,
                                                width: 0,
                                            }, labelStyle: {
                                                position: 'Outside',
                                                font: { size: '0px', color: '#1E7145' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '100%', color: '#1E7145', type: "Marker", markerShape: "Triangle", markerHeight: 15, markerWidth: 15 })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#757575; font-family:Roboto; font-size:14px;">Triangle</div>', angle: 180, zIndex: '1', radius: '20%' }))))))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-sm-12" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, centerY: "40%", ref: function (gauge) { return _this.gauge4 = gauge; }, loaded: this.onChartLoad.bind(this), id: 'pointer4-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: {
                                                width: 3, color: '#9250e6'
                                            }, majorTicks: {
                                                width: 1,
                                                height: 0,
                                                interval: 100
                                            }, minorTicks: {
                                                height: 0,
                                                width: 0,
                                            }, labelStyle: {
                                                position: 'Outside',
                                                font: { size: '0px', color: '#9250e6' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, animation: {
                                                        enable: true, duration: 900
                                                    }, radius: '100%', color: '#923C99', pointerWidth: 6, cap: {
                                                        radius: 0
                                                    }, needleTail: { length: '4%', color: '#923C99' } })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#757575; font-family:Roboto; font-size:14px;">Needle</div>', angle: 180, zIndex: '1', radius: '20%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, centerY: "40%", loaded: this.onChartLoad.bind(this), id: 'pointer5-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: {
                                                width: 3, color: '#e3a21a'
                                            }, majorTicks: {
                                                width: 1,
                                                height: 0,
                                                interval: 100
                                            }, minorTicks: {
                                                height: 0,
                                                width: 0,
                                            }, labelStyle: {
                                                position: 'Outside',
                                                font: { size: '0px', color: '#e3a21a' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '80%', color: '#e3a21a', pointerWidth: 10, cap: {
                                                        radius: 8,
                                                        color: 'white',
                                                        border: {
                                                            color: '#e3a21a',
                                                            width: 1
                                                        }
                                                    }, needleTail: {
                                                        length: '20%',
                                                        color: '#e3a21a'
                                                    } }),
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 40, radius: '60%', color: '#ffb133', pointerWidth: 10, cap: {
                                                        radius: 8, color: 'white',
                                                        border: {
                                                            color: '#ffb133',
                                                            width: 1
                                                        }
                                                    }, needleTail: {
                                                        length: '20%',
                                                        color: '#e3a21a'
                                                    } })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#757575; font-family:Roboto; font-size:14px;">Multiple Needle</div>', angle: 180, zIndex: '1', radius: '25%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), style: { height: "250px" }, ref: function (gauge) { return _this.gauge6 = gauge; }, centerY: "40%", loaded: this.onChartLoad.bind(this), id: 'pointer6-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: {
                                                width: 0
                                            }, majorTicks: {
                                                width: 1,
                                                height: 0,
                                                interval: 100
                                            }, minorTicks: {
                                                height: 0,
                                                width: 0,
                                            }, labelStyle: {
                                                position: 'Outside',
                                                font: { size: '0px', color: '#067bc2' }
                                            } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 40, animation: {
                                                        enable: true, duration: 900
                                                    }, radius: '100%', color: '#067bc2', pointerWidth: 6, cap: {
                                                        radius: 0
                                                    }, needleTail: { length: '4%', color: '#067bc2' } }),
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 40, type: "RangeBar", animation: {
                                                        enable: true, duration: 900
                                                    }, color: '#067bc2', pointerWidth: 5 })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#757575; font-family:Roboto; font-size:14px;">Live Update</div>', angle: 180, zIndex: '1', radius: '20%' }))))))))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample visualizes the different types of pointers which are available in the gauge.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null,
                        "In this example, you can see how to customize the pointer for an axis in the circular gauge. Gauge supports different types of pointers like ",
                        React.createElement("code", null, "marker"),
                        ", ",
                        React.createElement("code", null, "image"),
                        ", ",
                        React.createElement("code", null, "needle"),
                        ", ",
                        React.createElement("code", null, "rangeBar"),
                        "."),
                    React.createElement("br", null),
                    React.createElement("p", null, "Gauge with all type of pointer is used in this sample."),
                    React.createElement("p", null,
                        "More information on the pointers can be found in this",
                        React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                        ".")))));
    };
    return Pointers;
}(sample_base_1.SampleBase));
exports.Pointers = Pointers;
