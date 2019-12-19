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
 * Sample for data sample
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Data.prototype.load1 = function (args1) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args1.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (args1.gauge.theme.toLowerCase().indexOf('dark') > 1 || args1.gauge.theme.toLowerCase() === 'highcontrast') {
            args1.gauge.annotations[1].content = '<div id="running" style="width:100px;"><img style="height:25px;width:25px;' +
                'float:left" src="src/linear-gauge/images/Running1.svg" /></span><p style="float:left;' +
                'margin-left:10px;">Running</p></div>';
        }
    };
    Data.prototype.load2 = function (args1) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args1.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (args1.gauge.theme.toLowerCase().indexOf('dark') > 1 || args1.gauge.theme.toLowerCase() === 'highcontrast') {
            args1.gauge.annotations[0].content = '<div id="running" style="width:100px;"><img style="height:25px;width:25px;' +
                'float:left" src="src/linear-gauge/images/Cycling1.svg" /></span><p style="float:left;' +
                'margin-left:10px;">Cycling</p></div>';
        }
    };
    Data.prototype.load3 = function (args1) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args1.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (args1.gauge.theme.toLowerCase().indexOf('dark') > 1 || args1.gauge.theme.toLowerCase() === 'highcontrast') {
            args1.gauge.annotations[0].content = '<div id="running" style="width:100px;"><img style="height:25px;width:25px;' +
                'float:left" src="src/linear-gauge/images/Walking1.svg" /></span><p style="float:left;' +
                'margin-left:10px;">Walking</p></div>';
        }
    };
    // custom code end
    Data.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load1.bind(this), style: { height: "300px" }, id: 'gauge1', orientation: 'Horizontal', container: { width: 30, border: { width: 0 }, offset: 30 } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { offset: 30 }, labelStyle: { offset: 50 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, placement: 'Near', offset: -60, height: 10, width: 10, markerType: 'Triangle' })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 10, startWidth: 30, endWidth: 30, color: '#30b32d' })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="title" style="width:300px;"> <img style="float:left" src="src/linear-gauge/images/exercise-tracking.svg"/><p style="font-size:18px;color:#4285F4;float:left;margin-left:12px;margin-top:4px">Exercise Tracking </p></div>', axisIndex: 0, axisValue: 0, x: 150, zIndex: '1', y: -180 }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="running" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge/images/Running.svg" /></span><p style="float:left;margin-left:10px;">Running</p></div>', axisIndex: 0, axisValue: 0, zIndex: '1', x: 50, y: -130 }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="pointerText" style="width:60px;"><p style="font-size:15px;">10 MPH</p></div>', axisIndex: 0, zIndex: '1', axisValue: 10, y: -65 })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load2.bind(this), style: { height: "250px" }, id: 'gauge2', orientation: 'Horizontal', container: { width: 30, border: { width: 0 }, offset: -50 } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { offset: 30 }, labelStyle: { offset: 50 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 28, placement: 'Near', offset: -60, height: 10, width: 10, markerType: 'Triangle' })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 10, startWidth: 28, endWidth: 28, color: '#30b32d' })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="cycle" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge/images/Cycling.svg" /></span><p style="float:left;margin-left:10px;">Cycling</p></div>', axisIndex: 0, axisValue: 0, zIndex: '1', x: 50, y: -110 }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="pointerText" style="width:60px;"><p style="font-size:15px;">28 MPH</p></div>', axisIndex: 0, axisValue: 28, y: -70 })))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load3.bind(this), style: { height: "250px" }, id: 'gauge3', orientation: 'Horizontal', container: { width: 30, border: { width: 0 }, offset: -90 } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { maximum: 10, line: { offset: 30 }, labelStyle: { offset: 50, format: '{value}k' } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 2, placement: 'Near', offset: -60, height: 10, width: 10, markerType: 'Triangle' })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 2, startWidth: 30, endWidth: 30, color: '#30b32d' })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="walk" style="width:100px;"><img style="height:25px;width:25px;float:left" src="src/linear-gauge/images/Walking.svg" /></span><p style="float:left;margin-left:10px;">Walking</p></div>', axisIndex: 0, axisValue: 0, zIndex: '1', x: 50, y: -120 }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="pointerText" style="width:100px;"><p style="font-size:15px;">2000 Steps</p></div>', axisIndex: 0, zIndex: '1', axisValue: 2.2, y: -65 }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates exercise tracking of an athlete by using ranges, pointers, and annotation features available in linear gauge.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrates the exercise tracking using ranges, pointer and annotation features in linear gauge. We have rendered 3 linear gauges in this sample for indicating running, cycling and walking."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Data;
}(sample_base_1.SampleBase));
exports.Data = Data;
