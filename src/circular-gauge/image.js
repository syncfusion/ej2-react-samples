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
 * Sample for Pointer Imagei in circular gauge
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #templateWrap img {\n        border-radius: 30px;\n        width: 30px;\n        height: 30px;\n        margin: 0 auto;\n    }\n    #templateWrap .des {\n        float: right;\n        padding-left: 10px;\n        line-height: 30px;\n    }";
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Image.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Image.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-12' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), title: 'Short Put Distance', loaded: this.onChartLoad.bind(this), id: 'image-container', ref: function (gauge) { return _this.gauge = gauge; }, enablePointerDrag: true, titleStyle: { size: '18px' }, centerY: "57%'" },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 200, endAngle: 130, radius: '90%', minimum: 0, maximum: 14, lineStyle: {
                                    width: 0, color: '#1d1d1d'
                                }, majorTicks: {
                                    interval: 20, width: 0,
                                }, minorTicks: {
                                    width: 0,
                                }, labelStyle: {
                                    font: {
                                        size: '0px'
                                    }
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 12, markerShape: "Image", imageUrl: "src/circular-gauge/images/football.png", radius: '108%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 11, markerShape: "Image", imageUrl: "src/circular-gauge/images/basketball.png", radius: '78%', markerWidth: 28, markerHeight: 28, animation: { duration: 1200 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 10, markerShape: "Image", imageUrl: "src/circular-gauge/images/golfball.png", radius: '48%', markerWidth: 28, markerHeight: 28, animation: { duration: 900 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 12, markerShape: "Image", imageUrl: "src/circular-gauge/images/Athletics.png", radius: '0%', markerWidth: 90, markerHeight: 90, animation: { duration: 0 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 0.1, markerShape: "Image", imageUrl: "src/circular-gauge/images/girl-1.png", radius: '108%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 0.1, markerShape: "Image", imageUrl: "src/circular-gauge/images/man-1.png", radius: '78%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 0.1, markerShape: "Image", imageUrl: "src/circular-gauge/images/man-2.png", radius: '48%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 12, radius: '115%', color: '#01aebe', startWidth: 25, endWidth: 25 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 11, radius: '85%', color: '#3bceac', startWidth: 25, endWidth: 25 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 10, radius: '55%', color: '#ee4266', startWidth: 25, endWidth: 25 })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '12 M', radius: '108%', angle: 98, zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '11 M', radius: '80%', angle: 81, zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '10 M', radius: '50%', angle: 69, zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: 'Doe', radius: '108%', angle: 190, zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: 'Almaida', radius: '80%', angle: 185, zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: 'John', radius: '50%', angle: 180, zIndex: '1' }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the short-put distance covered by the athletes by using the image pointer in gauge.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to use the pointer image for an axis in the circular gauge. Pointer value points out the actual value set in the ",
                    React.createElement("b", null, "Circular Gauge"),
                    ". You can customize the ",
                    React.createElement("code", null, "pointers"),
                    " to improve the appearance of ",
                    React.createElement("b", null, "Gauge"),
                    "."),
                React.createElement("br", null),
                React.createElement("p", null, "In this sample, a pointer with image is used to show the short-put distance thrown by the player."),
                React.createElement("p", null,
                    "More information on the pointers can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    Image.prototype.onChartLoad = function (args) {
        document.getElementById('image-container').setAttribute('title', '');
    };
    ;
    return Image;
}(sample_base_1.SampleBase));
exports.Image = Image;
