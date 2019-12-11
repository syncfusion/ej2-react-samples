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
 * Sample for styles in linear gauge
 */
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Style = /** @class */ (function (_super) {
    __extends(Style, _super);
    function Style() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Style.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Style.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), style: { height: "150px" }, id: 'gauge1', orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { color: '#9E9E9E' }, majorTicks: { interval: 10, color: '#9E9E9E' }, minorTicks: { color: '#9E9E9E' } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 80, offset: 10, height: 13, width: 13 })))))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), style: { height: "150px" }, id: 'gauge2', orientation: 'Horizontal', container: { width: 30, backgroundColor: '#e0e0e0', border: { width: 0 }, offset: -20 } },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { majorTicks: { interval: 10 }, line: { offset: 30 }, labelStyle: { offset: 50 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, placement: 'Near', offset: -50, height: 15, width: 15, markerType: 'Triangle' })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 10, startWidth: 30, endWidth: 30, color: '#30b32d' })))))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), style: { height: "150px" }, id: 'gauge3', orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { majorTicks: { interval: 10, color: '#9E9E9E' }, minorTicks: { color: '#9E9E9E' }, line: { offset: -20, color: '#9E9E9E' } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, offset: 20, height: 13, width: 13 }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, type: 'Bar', height: 10, color: 'red' })))))),
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), style: { height: "150px" }, id: 'gauge4', orientation: 'Horizontal', container: { width: 30, backgroundColor: '#e0e0e0' } },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { majorTicks: { height: 0 }, minorTicks: { height: 0 }, line: { width: 0 }, labelStyle: { offset: 60 } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 60, placement: 'Near', offset: -55, height: 15, width: 15, markerType: 'Triangle' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 60, color: '#ff9200', height: 30 }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the available customizing options in linear gauge.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, we have indicated a value in various styles using bar and marker pointers. You can display any number of pointers in an axis."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    return Style;
}(sample_base_1.SampleBase));
exports.Style = Style;
