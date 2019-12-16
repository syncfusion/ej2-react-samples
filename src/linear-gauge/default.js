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
 * Sample for default gauge
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Default.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gauge', orientation: 'Horizontal' },
                    React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                    React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { minorTicks: { interval: 2 }, majorTicks: { interval: 10 }, labelStyle: { font: { color: '#424242' }, offset: 48 } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, placement: 'Near', height: 15, width: 15, offset: -50, markerType: 'Triangle' })))),
                    React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="pointer" style="width:70px"><h1 style="font-size:14px;">10 MPH</h1></div>', axisIndex: 0, axisValue: 10, x: 10, zIndex: '1', y: -70 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the default rendering of linear gauge.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the default linear gauge. The linear gauge control indicates the values of scales in horizontal or vertical sliding meter. You can use ",
                    React.createElement("code", null, "axes"),
                    ",",
                    React.createElement("code", null, "ranges"),
                    ", ",
                    React.createElement("code", null, "pointers"),
                    " and ",
                    React.createElement("code", null, "container"),
                    " properties to customize the appearance of the gauge. In this sample, an axis, annotation and a pointer has been used."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
