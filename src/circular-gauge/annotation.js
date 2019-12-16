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
 * Sample for Annotation
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_circulargauge_1 = require("@syncfusion/ej2-circulargauge");
var sample_base_1 = require("../common/sample-base");
var annotation_gauge_1 = require("./annotation-gauge");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var AnnotationsSample = /** @class */ (function (_super) {
    __extends(AnnotationsSample, _super);
    function AnnotationsSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.intervalExecute = true;
        return _this;
    }
    AnnotationsSample.prototype.onChartLoad = function (args) {
        var id = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        this.gauge = args.gauge;
        this.updateSubGauge1();
        this.updateSubGauge2();
    };
    ;
    AnnotationsSample.prototype.onResized = function (args) {
        location.reload();
    };
    // custom code start
    AnnotationsSample.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    AnnotationsSample.prototype.calcTime = function (offset) {
        var date = new Date();
        var localTime = date.getTime();
        var localOffset = date.getTimezoneOffset() * 60000;
        var utc = localTime + localOffset;
        var curretDate = new Date(utc + (3600000 * (+offset)));
        return curretDate;
    };
    AnnotationsSample.prototype.updateSubGauge1 = function () {
        this.subGauge1 = new ej2_circulargauge_1.CircularGauge(annotation_gauge_1.gauge2());
        this.subGauge1.appendTo('#minutes');
    };
    AnnotationsSample.prototype.updateSubGauge2 = function () {
        var _this = this;
        this.subGauge2 = new ej2_circulargauge_1.CircularGauge({
            background: 'transparent',
            axes: [{
                    ranges: [{ start: 0, end: 3, startWidth: 4, endWidth: 4, color: 'rgba(128,128,128)' },
                        { start: 3, end: 12, startWidth: 4, endWidth: 4, color: 'rgba(192,192,192)' }],
                    labelStyle: { hiddenLabel: 'First', font: { size: '0px' }, autoAngle: false },
                    majorTicks: { width: 1, height: 5, interval: 1 },
                    minorTicks: { height: 3, width: 0.5, interval: 0.2 }, minimum: 0, maximum: 12,
                    pointers: [{
                            radius: '70%', pointerWidth: 2,
                            cap: {
                                radius: 2, border: { width: 0.2 }
                            }, needleTail: { length: '10%' }, animation: { enable: false, duration: 500 }
                        }], startAngle: 0, endAngle: 0, lineStyle: { width: 0 }
                }],
            load: (function (args) {
                args.gauge.axes[0].annotations = [{
                        angle: 360, radius: '35%', zIndex: '1', content: '<div id="tm" style="font-size:10px;">21-06-17</div>'
                    }];
            }),
            loaded: (function (args) {
                if (_this.intervalExecute) {
                    _this.updateTime(false);
                    _this.clockInterval = setInterval(function () {
                        _this.updateTime(true, _this.clockInterval);
                    }, 1000);
                    _this.intervalExecute = false;
                }
            })
        });
        this.subGauge2.appendTo('#seconds');
    };
    AnnotationsSample.prototype.updateTime = function (enable, interval) {
        if (document.getElementById('annotation-container') && document.getElementsByClassName('e-circulargauge')) {
            this.getTime('+5.5', this.gauge, enable);
            if (document.getElementById('minutes').childElementCount) {
                this.getTime('+5.5', this.subGauge1, enable, true);
            }
            else {
                this.updateSubGauge1();
                this.getTime('+5.5', this.subGauge1, enable, true);
            }
            if (document.getElementById('seconds').childElementCount) {
                this.getTime('+5.5', this.subGauge2, enable, true);
            }
            else {
                this.updateSubGauge2();
                this.getTime('+5.5', this.subGauge2, enable, true);
            }
        }
        else {
            clearInterval(+interval);
        }
    };
    AnnotationsSample.prototype.getTime = function (offset, gauge, enable, subGauge) {
        var returnTime = this.calcTime(offset);
        var seconds = returnTime.getSeconds() * 12 / 60;
        seconds = seconds === 0 ? 12 : seconds;
        var pointer = gauge.axes[0].pointers[2];
        var pointer1 = gauge.axes[0].pointers[0];
        if (!subGauge) {
            gauge.axes[0].pointers[2].animation.enable = enable;
            pointer.currentValue = seconds === 0.2 ? 0 : pointer.currentValue;
        }
        else {
            pointer1.currentValue = seconds === 0.2 ? 0 : pointer1.currentValue;
            gauge.axes[0].pointers[0].animation.enable = (gauge.element.id === 'seconds' && enable);
        }
        var hour = (returnTime.getHours() + returnTime.getMinutes() / 60) % 12;
        var minutes = returnTime.getMinutes() * 12 / 60 + returnTime.getSeconds() * 12 / 3600;
        var content;
        var hourValue;
        if (subGauge) {
            if (gauge.element.id === 'minutes') {
                content = '<div id="tm" style="font-size:8px;">' + Math.floor(returnTime.getMinutes()) + ' M</div>';
                gauge.setPointerValue(0, 0, minutes);
                gauge.setAnnotationValue(0, 3, content);
            }
            else {
                gauge.setPointerValue(0, 0, seconds);
                content = '<div id="tm" style="font-size:8px;">' + Math.floor(returnTime.getSeconds()) + ' S</div>';
                gauge.axes[0].annotations[0].angle = 0;
                gauge.axes[0].annotations[0].radius = '50%';
                gauge.setAnnotationValue(0, 0, content);
            }
        }
        else {
            gauge.setPointerValue(0, 0, hour);
            gauge.setPointerValue(0, 1, minutes);
            gauge.setPointerValue(0, 2, seconds);
            hourValue = (Math.floor(returnTime.getHours()) % 12);
            content = '<div id="hr" style="background-color:rgba(128,128,128);' +
                'color:white;padding:4px;font-size:12px;">' +
                (hourValue === 0 ? 12 : hourValue) + ':' + Math.floor(returnTime.getMinutes()) +
                (returnTime.getHours() >= 12 ? ' PM' : ' AM') + '</div>';
            gauge.setAnnotationValue(0, 2, content);
            var date = new Date();
            content = '<div id="tm" style="font-size:10px;">' + date.getDate() + '-' +
                (date.getMonth() + 1) + '-' + date.getFullYear() + '</div>';
            gauge.setAnnotationValue(0, 3, content);
        }
    };
    AnnotationsSample.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'annotation-container', ref: function (gauge) { return _this.gauge = gauge; }, loaded: this.onChartLoad.bind(this), resized: this.onResized.bind(this), centerY: '45%', titleStyle: { size: '16px' } },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: ej2_base_1.Browser.isDevice ? '90%' : '70%', minimum: 0, maximum: 12, majorTicks: {
                                width: 2, height: 14, interval: 1
                            }, lineStyle: { width: 0 }, minorTicks: {
                                height: 4, width: 1, interval: 0.2
                            }, labelStyle: {
                                hiddenLabel: 'First', autoAngle: false
                            } },
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="minutes" style="width:75px;height:75px;"></div>', angle: 270, radius: '50%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="seconds" style="width:75px;height:75px;"></div>', angle: 180, radius: '50%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="hr" style="background-color:rgba(128,128,128); color:white;font-size:12px;">11:11 AM</div>', angle: 90, radius: '40%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="tm" style="font-size:10px;">21-06-17</div>', angle: 360, radius: '50%', zIndex: '1' })),
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { pointerWidth: 5, radius: '40%', border: { width: 0 }, cap: { radius: 0, border: { width: 0 } }, needleTail: { length: '0%' }, animation: { enable: false } }),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '60%', pointerWidth: 5, border: { width: 0 }, cap: { radius: 0, border: { width: 0 } }, needleTail: { length: '0%' }, animation: { enable: false } }),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '70%', pointerWidth: 1, cap: { radius: 4, border: { width: 2 } }, border: { width: 2, }, needleTail: { length: '20%', border: { width: 2 } }, animation: { enable: false, duration: 500 } })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 3, color: 'rgba(128,128,128)' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 3, end: 12, color: 'rgba(192,192,192)' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a clock by using annotation feature in the gauge. Hour and minute gauge are placed as annotation in circular gauge.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to use annotation in the circular gauge. Annotations are used to mark the specific area of interest in gauge with texts, shapes or images. In this sample ",
                    React.createElement("code", null, "minutes"),
                    " and ",
                    React.createElement("code", null, "seconds"),
                    "        sub gauges are achieved using ",
                    React.createElement("code", null, "annotation"),
                    " feature."),
                React.createElement("br", null),
                React.createElement("p", { className: 'description-header' }, "Injecting Module"),
                React.createElement("p", null,
                    "Circular gauge component features are segregated into individual feature-wise modules. To use annotation, we need to inject ",
                    React.createElement("code", null, "Annotations"),
                    " into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the annotation can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    return AnnotationsSample;
}(sample_base_1.SampleBase));
exports.AnnotationsSample = AnnotationsSample;
