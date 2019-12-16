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
 * Dynamic gauge
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var sliderValue = 60;
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .sliderwrap {\n        margin-top: 0px;\n        width: 300px;            \n        align-self: center;\n    }  \n    #slider.e-control.e-slider .e-handle {\n        background-color: #4B4B4B ;\n    }\n    .e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {\n        background: -webkit-linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%);\n        background: linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%);\n        background: -moz-linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%); \n    }\n    .e-limit-bar.e-limits {\n        background-color: transparent !important;\n    }\n    .e-control-wrapper.e-slider-container.e-horizontal .e-range {\n        height: 0px !important;\n    }\n    #slider.e-control.e-slider .e-slider-track {\n        height: 8px;\n        top: calc(50% - 4px);\n        border-radius: 5px;\n    }";
var ArcGauge = /** @class */ (function (_super) {
    __extends(ArcGauge, _super);
    function ArcGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    ArcGauge.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    ArcGauge.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { title: 'Progress Tracker', titleStyle: { size: '18px' }, load: this.load.bind(this), ref: function (gauge) { return _this.gauge = gauge; }, id: 'gauge' },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '80%', startAngle: 200, endAngle: 160, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                font: {
                                    fontWeight: 'Roboto',
                                    fontStyle: 'Regular',
                                    size: '0px',
                                    color: 'white'
                                },
                                position: 'Inside',
                                useRangeColor: true
                            }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="pointervalue" style="font-size:35px;width:120px;text-align:center">60/100</div>', angle: 0, radius: '0%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="slider" style="height:70px;width:250px;"></div>', angle: 0, radius: '-100%', zIndex: '1' })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '90%', startWidth: 30, endWidth: 30, color: '#E0E0E0', roundedCornerRadius: 20 })),
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: false }, value: 60, radius: '90%', color: '#e5ce20', pointerWidth: 30, type: 'RangeBar', roundedCornerRadius: 20, border: {
                                        color: 'gray',
                                        width: 0
                                    } }))))),
                React.createElement(ej2_react_inputs_1.SliderComponent, { className: 'sliderwrap', id: "slider", style: { width: '300px', 'margin-left': '300px' }, type: 'MinRange', min: 0, max: 100, value: sliderValue, limits: { enabled: true, minStart: 0, minEnd: 100 }, change: this.sliderChange.bind(this), ref: function (d) { return _this.sliderElement = d; } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the progress of a work in the circular gauge using the range bar pointer with rounded corners. EJ2 Slider is used in this sample.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render the ranges and range bar pointer with rounded corners. The EJ2 Slider control is placed at the bottom of the gauge using annotation to change the range bar pointer value. Based on the value, color of the pointer can also be changed."),
                React.createElement("p", null,
                    "For more information on ranges, refer to this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation"),
                    " section."))));
    };
    ArcGauge.prototype.sliderChange = function () {
        sliderValue = this.sliderElement.value;
        if (!isNaN(sliderValue)) {
            this.gauge['isProtectedOnChange'] = true;
            if (sliderValue >= 0 && sliderValue < 20) {
                this.gauge.axes[0].pointers[0].color = '#ea501a';
            }
            else if (sliderValue >= 20 && sliderValue < 40) {
                this.gauge.axes[0].pointers[0].color = '#f79c02';
            }
            else if (sliderValue >= 40 && sliderValue < 60) {
                this.gauge.axes[0].pointers[0].color = '#e5ce20';
            }
            else if (sliderValue >= 60 && sliderValue < 80) {
                this.gauge.axes[0].pointers[0].color = '#a1cb43';
            }
            else if (sliderValue >= 80 && sliderValue < 100) {
                this.gauge.axes[0].pointers[0].color = '#82b944';
            }
            this.gauge.setPointerValue(0, 0, sliderValue);
            if (document.getElementById('pointervalue')) {
                document.getElementById('pointervalue').innerHTML = this.gauge.axes[0].pointers[0].value.toString() + '/100';
            }
        }
    };
    return ArcGauge;
}(sample_base_1.SampleBase));
exports.ArcGauge = ArcGauge;
