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
 * Sample for Gauge default sample
 */
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
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
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'gauge' },
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '80%', startAngle: 230, endAngle: 130, majorTicks: { width: 0 }, lineStyle: { width: 8 }, minorTicks: { width: 0 }, labelStyle: {
                                font: {
                                    fontFamily: 'Roboto',
                                    size: '12px',
                                    fontWeight: 'Regular'
                                },
                                offset: -5
                            } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 60, radius: '60%', pointerWidth: 7, cap: {
                                        radius: 8,
                                        border: { width: 0 }
                                    }, needleTail: {
                                        length: '25%'
                                    } })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the default rendering of circular gauge.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render a default circular gauge. The CircularGauge control visualizes the numerical values of scales in a circular manner. You can use ",
                    React.createElement("code", null, "axes"),
                    ", ",
                    React.createElement("code", null, "ranges"),
                    ",",
                    React.createElement("code", null, "pointers"),
                    "properties to customize the default appearance of the gauge. In this sample, an axis with multiple ranges and a pointer has been used."),
                React.createElement("p", null,
                    "More information on the gauge can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
