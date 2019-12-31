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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Speedometer = (function (_super) {
    __extends(Speedometer, _super);
    function Speedometer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gauge5Interval1 = setInterval(function () {
            if (_this.gauge) {
                var newVal = _this.gauge.axes[0].pointers[0].value + (Math.floor(Math.random() * (10 - (-10))) - 10);
                if (newVal <= 0) {
                    newVal = 5;
                }
                if (document.getElementById('container')) {
                    _this.gauge.axes[0].pointers[0].animation.enable = true;
                    _this.gauge.setPointerValue(0, 0, newVal);
                    if (!ej2_base_1.isNullOrUndefined(document.getElementById('pointerannotation'))) {
                        document.getElementById('pointerannotation').innerHTML = newVal.toString() + ' km/h';
                    }
                }
                else {
                    clearInterval(_this.gauge5Interval1);
                }
            }
        }, 1000);
        return _this;
    }
    // Code for Property Panel
    Speedometer.prototype.rangeChange = function () {
        if (this.rangeElement.checked === true) {
            this.gapElement.disabled = true;
            this.gauge.axes[0].ranges[0].start = 0;
            this.gauge.axes[0].ranges[0].end = 120;
            this.gauge.axes[0].ranges[0].startWidth = 5;
            this.gauge.axes[0].ranges[0].endWidth = 35;
            this.gauge.axes[0].ranges[0].color = 'url(#grad1)';
            this.gauge.axes[0].ranges[1].start = null;
            this.gauge.axes[0].ranges[1].end = null;
            this.gauge.axes[0].ranges[1].startWidth = '';
            this.gauge.axes[0].ranges[1].endWidth = '';
            this.gauge.axes[0].ranges[1].color = '';
            this.gauge.axes[0].ranges[2].start = null;
            this.gauge.axes[0].ranges[2].end = null;
            this.gauge.axes[0].ranges[2].startWidth = '';
            this.gauge.axes[0].ranges[2].endWidth = '';
            this.gauge.axes[0].ranges[2].color = '';
            this.gauge.axes[0].ranges[3].start = null;
            this.gauge.axes[0].ranges[3].end = null;
            this.gauge.axes[0].ranges[3].startWidth = '';
            this.gauge.axes[0].ranges[3].endWidth = '';
            this.gauge.axes[0].ranges[3].color = '';
            this.gauge.axes[0].ranges[4].start = null;
            this.gauge.axes[0].ranges[4].end = null;
            this.gauge.axes[0].ranges[4].startWidth = '';
            this.gauge.axes[0].ranges[4].endWidth = '';
            this.gauge.axes[0].ranges[4].color = '';
            this.gauge.axes[0].ranges[5].start = null;
            this.gauge.axes[0].ranges[5].end = null;
            this.gauge.axes[0].ranges[5].startWidth = '';
            this.gauge.axes[0].ranges[5].endWidth = '';
            this.gauge.axes[0].ranges[5].color = '';
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        }
        else {
            this.gapElement.disabled = false;
            this.gauge.axes[0].ranges[0].start = 0;
            this.gauge.axes[0].ranges[0].end = 20;
            this.gauge.axes[0].ranges[0].startWidth = 5;
            this.gauge.axes[0].ranges[0].endWidth = 10;
            this.gauge.axes[0].ranges[0].color = '#82b944';
            this.gauge.axes[0].ranges[1].start = 20;
            this.gauge.axes[0].ranges[1].end = 40;
            this.gauge.axes[0].ranges[1].startWidth = 10;
            this.gauge.axes[0].ranges[1].endWidth = 15;
            this.gauge.axes[0].ranges[1].color = '#a1cb43';
            this.gauge.axes[0].ranges[2].start = 40;
            this.gauge.axes[0].ranges[2].end = 60;
            this.gauge.axes[0].ranges[2].startWidth = 15;
            this.gauge.axes[0].ranges[2].endWidth = 20;
            this.gauge.axes[0].ranges[2].color = '#ddec12';
            this.gauge.axes[0].ranges[3].start = 60;
            this.gauge.axes[0].ranges[3].end = 80;
            this.gauge.axes[0].ranges[3].startWidth = 20;
            this.gauge.axes[0].ranges[3].endWidth = 25;
            this.gauge.axes[0].ranges[3].color = '#ffbc00';
            this.gauge.axes[0].ranges[4].start = 80;
            this.gauge.axes[0].ranges[4].end = 100;
            this.gauge.axes[0].ranges[4].startWidth = 25;
            this.gauge.axes[0].ranges[4].endWidth = 30;
            this.gauge.axes[0].ranges[4].color = '#ff6000';
            this.gauge.axes[0].ranges[5].start = 100;
            this.gauge.axes[0].ranges[5].end = 120;
            this.gauge.axes[0].ranges[5].startWidth = 30;
            this.gauge.axes[0].ranges[5].endWidth = 35;
            this.gauge.axes[0].ranges[5].color = 'red';
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        }
    };
    Speedometer.prototype.textChange = function () {
        if (this.textElement.checked === true) {
            this.gauge.axes[0].majorTicks.interval = 10;
            this.gauge.axisLabelRender = function (args) {
                var text;
                switch (parseInt(args.text)) {
                    case 10:
                        text = 'Ideal';
                        break;
                    case 30:
                        text = 'Safe';
                        break;
                    case 50:
                        text = 'Good';
                        break;
                    case 70:
                        text = 'Ok';
                        break;
                    case 90:
                        text = 'Risk';
                        break;
                    case 110:
                        text = 'Danger';
                        break;
                    default:
                        text = '';
                        break;
                }
                args.text = text;
            };
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        }
        else {
            this.gauge.axes[0].majorTicks.interval = 20;
            this.gauge.axes[0].minimum = 0;
            this.gauge.axes[0].maximum = 120;
            this.gauge.axisLabelRender = function (args) { };
            this.gauge.axes[0].pointers[0].animation.enable = false;
            this.gauge.refresh();
        }
    };
    Speedometer.prototype.gapChange = function () {
        if (this.gapElement.checked) {
            this.gauge.axes[0].rangeGap = 5;
        }
        else {
            this.gauge.axes[0].rangeGap = null;
        }
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    // custom code start
    Speedometer.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Speedometer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement("svg", { style: style1 },
                    React.createElement("defs", null,
                        React.createElement("linearGradient", { id: "grad1", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                            React.createElement("stop", { offset: "0%", style: style2 }),
                            React.createElement("stop", { offset: "50%", style: style3 }),
                            React.createElement("stop", { offset: "100%", style: style4 })))),
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { title: 'Speedometer', titleStyle: { size: '18px' }, centerY: '75%', load: this.load.bind(this), ref: function (gauge) { return _this.gauge = gauge; }, id: 'container' },
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '120%', startAngle: 270, endAngle: 90, minimum: 0, maximum: 120, lineStyle: { width: 0 }, labelStyle: {
                                font: {
                                    size: '13px',
                                    fontFamily: 'Roboto'
                                },
                                position: 'Outside',
                                autoAngle: true,
                                useRangeColor: false
                            }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true, duration: 900 }, value: 40, radius: '80%', color: '#757575', pointerWidth: 7, cap: {
                                        radius: 8,
                                        color: '#757575',
                                        border: { width: 0 }
                                    }, needleTail: {
                                        color: '#757575',
                                        length: '15%'
                                    } })),
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="width:90px;text-align:center;font-size:20px;font-family:Roboto">${pointers[0].value} km/h</div>', angle: 0, zIndex: '1', radius: '30%' })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 20, startWidth: 5, endWidth: 10, radius: '102%', color: '#82b944' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 20, end: 40, startWidth: 10, endWidth: 15, radius: '102%', color: '#a1cb43' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 60, startWidth: 15, endWidth: 20, radius: '102%', color: '#ddec12' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 60, end: 80, startWidth: 20, endWidth: 25, radius: '102%', color: '#ffbc00' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 80, end: 100, startWidth: 25, endWidth: 30, radius: '102%', color: '#ff6000' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 100, end: 120, startWidth: 30, endWidth: 35, radius: '102%', color: 'red' })))))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show text labels")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'showText', change: this.textChange.bind(this), ref: function (d) { return _this.textElement = d; } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Combine ranges")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'combineRange', change: this.rangeChange.bind(this), ref: function (d) { return _this.rangeElement = d; } })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Gap between ranges")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'range', change: this.gapChange.bind(this), ref: function (d) { return _this.gapElement = d; } })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample depicts the appearance of speedometer rendered using the circular gauge. The pointer is changed with random values dynamically.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to make the look of circular gauge like a speedometer. The labels can be changed to text values, gap can be added between the ranges, or the ranges can be combined to form single range using the options in the properties panel."),
                React.createElement("p", null,
                    "For more information on ranges, refer to this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, "documentation"),
                    " section."))));
    };
    return Speedometer;
}(sample_base_1.SampleBase));
exports.Speedometer = Speedometer;
var style1 = {
    'height': '0px',
    'width': '0px'
};
var style2 = {
    'stop-color': '#82b944',
    'stop-opacity': 1
};
var style3 = {
    'stop-color': 'rgb(255,255,0)',
    'stop-opacity': 1
};
var style4 = {
    'stop-color': 'red',
    'stop-opacity': 1
};
