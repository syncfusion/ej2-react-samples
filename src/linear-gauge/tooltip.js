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
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Linear gauge tooltip sample
 */
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // custom code start
    Tooltip.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Tooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { id: 'tooltipContainer', ref: function (gauge) { return _this.gaugeInstance = gauge; }, orientation: 'Horizontal', axisLabelRender: this.labelRender.bind(this), load: this.gaugeLoad.bind(this), loaded: this.gaugeLoaded.bind(this), resized: this.gaugeResized.bind(this), tooltipRender: this.tooltipRender.bind(this), container: { width: 140, border: { width: 2, color: '#a6a6a6' } }, tooltip: { enable: true } },
                    React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations, ej2_react_lineargauge_1.GaugeTooltip] }),
                    React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 10, majorTicks: { interval: 1 }, minorTicks: { interval: 0.2 }, line: { offset: 140 }, labelStyle: { font: { color: '#000000' } } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 5.4, color: '#ff66b3', offset: 15 }))),
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { opposedPosition: true, minimum: 0, maximum: 25, majorTicks: { interval: 1 }, minorTicks: { interval: 0.2 }, line: { offset: -140 }, labelStyle: { font: { color: '#000000' } } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 16.5, color: '#4d94ff', offset: -15 })))),
                    React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="first"><h1 style="font-size:15px;color: #686868"">Inches</h1></div>', axisIndex: 0, axisValue: 5.4, x: 35, y: -58, zIndex: '1' }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="second"><h1 style="font-size:15px;color: #686868"">Centimeters</h1></div>', axisIndex: 1, axisValue: 16.5, x: 50, y: 52, zIndex: '1' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the tooltip for pointer in gauge. To see tooltip in action, hover pointer or tap the pointer.")),
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
                    " properties to customize the appearance of the gauge. In this sample, an axis with multiple ranges and a pointer has been used."),
                React.createElement("p", null,
                    "More information about linear gauge can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation section"),
                    "."))));
    };
    Tooltip.prototype.tooltipRender = function (args) {
        args.content = (args.axis.visibleRange.max === 25) ? Number(args.content).toFixed(1) + ' cm' : Number(args.content).toFixed(1) + ' in';
    };
    Tooltip.prototype.gaugeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast') {
            args.gauge.annotations[0].content = '<div id="first"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
            args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
        }
        var width = Number(document.getElementById('tooltipContainer').offsetWidth);
        if (width < 500) {
            args.gauge.axes[1].majorTicks.interval = 2;
            args.gauge.axes[1].minorTicks.interval = 1;
            args.gauge.orientation = 'Vertical';
            args.gauge.annotations[0].x = -57;
            args.gauge.annotations[0].y = -30;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = -45;
        }
        else {
            args.gauge.axes[1].majorTicks.interval = 1;
            args.gauge.axes[1].minorTicks.interval = 0.5;
            args.gauge.orientation = 'Horizontal';
            args.gauge.annotations[0].x = 35;
            args.gauge.annotations[0].y = -58;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = 52;
        }
    };
    Tooltip.prototype.gaugeLoaded = function (args) {
        if (document.getElementById('tooltipContainer')) {
            if (args.gauge.availableSize.width < 500) {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = 'rotate(270deg)';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = 'rotate(270deg)';
            }
            else {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = '';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = '';
            }
        }
    };
    Tooltip.prototype.labelRender = function (args) {
        if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
            args.text = '';
        }
    };
    Tooltip.prototype.gaugeResized = function (args) {
        if (args.currentSize.width < 500) {
            this.gaugeInstance.axes[1].majorTicks.interval = 2;
            this.gaugeInstance.axes[1].minorTicks.interval = 1;
            this.gaugeInstance.orientation = 'Vertical';
            this.gaugeInstance.annotations[0].x = -57;
            this.gaugeInstance.annotations[0].y = -30;
            this.gaugeInstance.annotations[1].x = 50;
            this.gaugeInstance.annotations[1].y = -45;
        }
        else {
            this.gaugeInstance.axes[1].majorTicks.interval = 1;
            this.gaugeInstance.axes[1].minorTicks.interval = 0.5;
            this.gaugeInstance.orientation = 'Horizontal';
            this.gaugeInstance.annotations[0].x = 35;
            this.gaugeInstance.annotations[0].y = -58;
            this.gaugeInstance.annotations[1].x = 50;
            this.gaugeInstance.annotations[1].y = 52;
        }
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
