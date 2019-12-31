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
 * Sample for labels
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Labels = (function (_super) {
    __extends(Labels, _super);
    function Labels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMajorTicks = true;
        _this.loaded = false;
        return _this;
    }
    // custom code start
    Labels.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    };
    // custom code end
    Labels.prototype.ticksOffset = function () {
        var value = +this.tickOffset.value;
        if (this.isMajorTicks) {
            this.gauge.axes[0].majorTicks.offset = value;
        }
        else {
            this.gauge.axes[0].minorTicks.offset = value;
        }
        document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + value;
        this.gauge.refresh();
    };
    Labels.prototype.ticksHeight = function () {
        var value = +this.tickHeight.value;
        if (this.isMajorTicks) {
            this.gauge.axes[0].majorTicks.height = value;
        }
        else {
            this.gauge.axes[0].minorTicks.height = value;
        }
        document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + value;
        this.gauge.refresh();
    };
    Labels.prototype.labelsOffset = function () {
        var value = +this.labelOffset.value;
        this.gauge.axes[0].labelStyle.offset = value;
        document.getElementById('labelOffsetValue').innerHTML = 'Label Offset <span>&nbsp;&nbsp;&nbsp;' + value;
        this.gauge.refresh();
    };
    Labels.prototype.showLastLabel = function () {
        var showLastLabel = document.getElementById('enable');
        this.gauge.axes[0].showLastLabel = this.lastLabel.checked;
        this.gauge.refresh();
    };
    Labels.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'range-container', loaded: this.onChartLoad.bind(this), ref: function (gauge) { return _this.gauge = gauge; } },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 150, radius: '75%', minimum: 0, maximum: 170, majorTicks: {
                                    position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20
                                }, lineStyle: { width: 2, color: '#9E9E9E' }, minorTicks: {
                                    position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10
                                }, labelStyle: {
                                    position: 'Outside', autoAngle: true,
                                    font: {
                                        size: '10px'
                                    }
                                } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="content" style="color:#518C03;font-size:20px;font-family:Segoe UI;font-weight:semibold;">145</div>', angle: 0, radius: '0%', zIndex: '1' })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 145, radius: '60%', color: '#8BC34A', pointerWidth: 10, border: {
                                            width: 0,
                                            color: 'transparent'
                                        }, animation: { enable: false }, type: "RangeBar", roundedCornerRadius: 10, cap: {
                                            radius: 0,
                                            border: {
                                                width: 0
                                            }
                                        } })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Ticks ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "Ticks", className: "form-control", style: { width: '90%' } },
                                                React.createElement("option", { value: "major" }, " Major Ticks"),
                                                React.createElement("option", { value: "minor" }, "Minor Ticks"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Tick Position ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "tickposition", className: "form-control", style: { width: '90%' } },
                                                React.createElement("option", { value: "Inside" }, " Inside"),
                                                React.createElement("option", { value: "Outside" }, "Outside"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", null, " Label Position ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "labelposition", className: "form-control", style: { width: '90%' } },
                                                React.createElement("option", { value: "Outside" }, " Outside"),
                                                React.createElement("option", { value: "Inside" }, "Inside"))))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'offset' },
                                            "Tick Offset ",
                                            React.createElement("span", null, "\u00A0\u00A0\u00A00"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", onChange: this.ticksOffset.bind(this), ref: function (d) { return _this.tickOffset = d; }, id: "tickOffset", defaultValue: "0", min: "0", max: "50", style: { width: '90%' } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'height' },
                                            "Tick Height ",
                                            React.createElement("span", null, "\u00A0\u00A0\u00A010"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", onChange: this.ticksHeight.bind(this), ref: function (d) { return _this.tickHeight = d; }, id: "tickHeight", defaultValue: "10", min: "1", max: "50", style: { width: '90%' } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'labelOffsetValue' },
                                            "Label Offset ",
                                            React.createElement("span", null, "\u00A0\u00A0\u00A00"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", onChange: this.labelsOffset.bind(this), ref: function (d) { return _this.labelOffset = d; }, id: "labelOffset", defaultValue: "0", min: "0", max: "50", style: { width: '90%' } })))),
                                React.createElement("tr", { style: { "height": "30px" } },
                                    React.createElement("td", { style: { "width": "50%" } },
                                        React.createElement("div", null, " enablePointer ")),
                                    React.createElement("td", { style: { "width": "50%" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.showLastLabel.bind(this), ref: function (d) { return _this.lastLabel = d; }, id: 'enable', disabled: false }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how to customize the ticks and labels of an axis. Position, offset, and height of the tick and label can be changed by using the options provided in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the ticks and labels of an axis in the circular gauge. Labels are units that are used to display the values in the axis. You can customize ",
                    React.createElement("code", null, "labels"),
                    " with the properties like ",
                    React.createElement("code", null, "angle"),
                    ", ",
                    React.createElement("code", null, "font"),
                    ",",
                    React.createElement("code", null, "position"),
                    ", etc. Ticks are used to mark some values on the axis. You can also customize the ticks using",
                    React.createElement("code", null, "majorTicks"),
                    ",",
                    React.createElement("code", null, "minorTicks"),
                    " properties."),
                React.createElement("p", null,
                    "More information on the labels can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    // Code for Property Panel
    Labels.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.ticks = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 130,
                change: function () {
                    var value = _this.ticks.value.toString();
                    var tickProp;
                    _this.isMajorTicks = value === 'major';
                    if (_this.isMajorTicks) {
                        tickProp = _this.gauge.axes[0].majorTicks;
                    }
                    else {
                        tickProp = _this.gauge.axes[0].minorTicks;
                    }
                    _this.tickPosition.value = tickProp.position;
                    _this.tickOffset.value = tickProp.offset.toString();
                    _this.tickHeight.value = tickProp.height.toString();
                    document.getElementById('offset').innerHTML = 'Tick Offset <span>&nbsp;&nbsp;&nbsp;' + tickProp.offset;
                    document.getElementById('height').innerHTML = 'Tick Height <span>&nbsp;&nbsp;&nbsp;' + tickProp.height;
                }
            });
            this.ticks.appendTo('#Ticks');
            this.tickPosition = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 130,
                change: function () {
                    var value = _this.tickPosition.value.toString();
                    if (_this.isMajorTicks) {
                        _this.gauge.axes[0].majorTicks.position = value == 'Inside' ? 'Inside' : 'Outside';
                    }
                    else {
                        _this.gauge.axes[0].minorTicks.position = value == 'Inside' ? 'Inside' : 'Outside';
                    }
                    _this.gauge.refresh();
                }
            });
            this.tickPosition.appendTo('#tickposition');
            this.labelPosition = new ej2_dropdowns_1.DropDownList({
                index: 0, width: 130,
                change: function () {
                    var value = _this.labelPosition.value.toString();
                    _this.gauge.axes[0].labelStyle.position = value == 'Inside' ? 'Inside' : 'Outside';
                    _this.gauge.refresh();
                }
            });
            this.labelPosition.appendTo('#labelposition');
        }
    };
    return Labels;
}(sample_base_1.SampleBase));
exports.Labels = Labels;
