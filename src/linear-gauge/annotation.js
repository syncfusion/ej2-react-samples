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
 * Sample for Linear Gauge Annotation
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
exports.range = ['#30b32d', '#ffdd00', '#f03e3e'];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #templateWrap img {\n        border-radius: 30px;\n        width: 30px;\n        height: 30px;\n        margin: 0 auto;\n    }";
var Annotation = (function (_super) {
    __extends(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Annotation.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Annotation.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gauge', rangePalettes: exports.range, orientation: 'Horizontal' },
                    React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                    React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { maximum: 90, majorTicks: { interval: 10, height: 0 }, minorTicks: { height: 0 }, line: { width: 0 }, labelStyle: { font: { size: '0px' } } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 35, color: '#757575', placement: 'Near', height: 15, width: 15, offset: -50, markerType: 'Triangle' })),
                            React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 30, startWidth: 50, endWidth: 50 }),
                                React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 30, end: 60, startWidth: 50, endWidth: 50 }),
                                React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 60, end: 90, startWidth: 50, endWidth: 50 })))),
                    React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="title" style="width:200px;"><p style="font-size:18px;">CPU Utilization</p></div>', horizontalAlignment: 'Center', x: 35, zIndex: '1', y: 50 }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="low"><img style="height:25px;width:25px;" src="src/linear-gauge/images/Low.png"/></div>', axisIndex: 0, axisValue: 15, y: -25, zIndex: '1' }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="moderate"><img style="height:25px;width:25px;" src="src/linear-gauge/images/Moderate.png"/></div>', axisIndex: 0, axisValue: 45, y: -25, zIndex: '1' }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="high"><img style="height:25px;width:25px;" src="src/linear-gauge/images/High.png"/></div>', axisIndex: 0, axisValue: 75, y: -25, zIndex: '1' }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="lowText"><p style="font-size:15px;color:#248622;">Low</p></div>', axisIndex: 0, axisValue: 15, zIndex: '1', y: 20 }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="moderateText"><p style="font-size:15px;color:#ba9e2a;">Moderate</p></div>', axisIndex: 0, zIndex: '1', axisValue: 45, y: 20 }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="highText"><p style="font-size:15px;color:#b42f2f;">High</p></div>', axisIndex: 0, zIndex: '1', axisValue: 75, y: 20 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the CPU Utilization of a resource by using annotation feature.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample we have used annotations to indicate low, moderate and high ranges. Annotations are used to place the texts, shapes or images anywhere in the gauge. You can use ",
                    React.createElement("code", null, "content"),
                    ", ",
                    React.createElement("code", null, "x"),
                    ", ",
                    React.createElement("code", null, "y"),
                    ",",
                    React.createElement("code", null, "zIndex"),
                    " properties to customize the annotations. And you can specify the id of the element that needs to be displayed, in the content property."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Annotation;
}(sample_base_1.SampleBase));
exports.Annotation = Annotation;
