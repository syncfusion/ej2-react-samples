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
 * Sample for Gauge Customization
 */
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_circulargauge_1 = require("@syncfusion/ej2-circulargauge");
var customization_service_1 = require("./customization-service");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Customization = (function (_super) {
    __extends(Customization, _super);
    function Customization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.usageGauge = new ej2_circulargauge_1.CircularGauge(customization_service_1.DynamicDataSerive.prototype.GetSubGauge1().gauge1);
        _this.randomGauge = new ej2_circulargauge_1.CircularGauge(customization_service_1.DynamicDataSerive.prototype.GetSubGauge1().gauge2);
        _this.isUsage = false;
        _this.isClicked = true;
        _this.loaded = false;
        return _this;
    }
    // custom code start
    Customization.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
        this.usageGauge.appendTo('#customization-container1');
    };
    // custom code end
    Customization.prototype.random = function () {
        if (this.isClicked) {
            this.gauge1.destroy();
            this.isClicked = false;
            this.randomGauge.appendTo('#customization-container');
        }
        else {
            document.getElementById('customization-container1').style.display = 'none';
        }
        document.getElementById('customization-container').style.display = 'block';
        // Code for Property Panel
        this.isUsage = false;
        this.pointerValueElement.min = '1000';
        this.pointerValueElement.max = '2000';
        this.pointerValueElement.value = this.randomGauge.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + this.randomGauge.axes[0].pointers[0].value + '</span>';
        this.barColor.value = this.randomGauge.axes[0].pointers[0].color;
        this.rangeColor.value = this.randomGauge.axes[0].ranges[0].color;
        this.pointerColor.value = this.randomGauge.axes[0].pointers[1].color;
        this.pointerColor.enabled = true;
        document.getElementById('pointColor').className = 'e-enabled';
        document.getElementById('pointColor').style.visibility = 'visible';
        var currentLine = document.getElementById('random_line');
        var exisLine = document.getElementById('usage_line');
        currentLine.style.display = 'block';
        exisLine.style.display = 'none';
    };
    Customization.prototype.usage = function () {
        if (this.isClicked) {
            this.gauge1.destroy();
            this.isClicked = false;
            this.randomGauge.appendTo('#customization-container');
        }
        document.getElementById('customization-container').style.display = 'none';
        document.getElementById('customization-container1').style.display = 'block';
        this.isUsage = true;
        this.pointerValueElement.min = '0.5';
        this.pointerValueElement.max = '100';
        this.pointerValueElement.value = this.usageGauge.axes[0].pointers[0].value.toString();
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + this.usageGauge.axes[0].pointers[0].value + '</span>';
        this.barColor.value = this.usageGauge.axes[0].pointers[0].color;
        this.rangeColor.value = this.usageGauge.axes[0].ranges[0].color;
        this.pointerColor.enabled = false;
        document.getElementById('pointColor').className = 'e-disabled';
        var currentLine = document.getElementById('usage_line');
        var exisLine = document.getElementById('random_line');
        currentLine.style.display = 'block';
        exisLine.style.display = 'none';
    };
    Customization.prototype.pointerValue = function () {
        var value = +this.pointerValueElement.value;
        if (!this.isClicked) {
            if (this.isUsage) {
                this.usageGauge.setPointerValue(0, 0, value);
                this.usageGauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + 'GB' + '</div>');
            }
            else {
                this.randomGauge.setPointerValue(0, 0, value);
                this.randomGauge.setPointerValue(0, 1, value);
                this.randomGauge.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>');
            }
        }
        else {
            this.gauge1.setPointerValue(0, 0, value);
            this.gauge1.setPointerValue(0, 1, value);
            this.gauge1.setAnnotationValue(0, 0, '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>');
            this.randomGauge.axes[0].pointers[0].value = value;
            this.randomGauge.axes[0].pointers[1].value = value;
            this.randomGauge.axes[0].annotations[0].content = '<div style="color:#666666;font-size:35px;">' + value + '' + '</div>';
        }
        document.getElementById('currentPointerValue').innerHTML = 'Current Value <span> &nbsp;&nbsp;&nbsp;' + value + '</span>';
    };
    Customization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { style: { display: 'block' }, load: this.load.bind(this), id: 'customization-container', loaded: this.onChartLoad.bind(this), ref: function (gauge) { return _this.gauge1 = gauge; }, centerY: '70%' },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 300, endAngle: 60, radius: '80%', minimum: 999, maximum: 2000, majorTicks: {
                                    width: 0
                                }, lineStyle: { width: 0 }, minorTicks: {
                                    width: 0
                                }, labelStyle: {
                                    font: { size: '0px' }
                                } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:#666666;font-size:35px;">1800</div>', angle: 0, radius: '110%', zIndex: '1' })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: 'RangeBar', value: 1800, radius: '90%', color: '#FFDD00', pointerWidth: 30, animation: {
                                            duration: 0
                                        } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 1800, radius: '90%', color: '#424242', pointerWidth: 9, cap: { radius: 10, color: '#424242', border: { width: 0 } }, animation: {
                                            duration: 0
                                        } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 1000, end: 2000, radius: '90%', color: '#E0E0E0', startWidth: 30, endWidth: 30 }))))),
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { style: { display: 'none' }, id: "customization-container1" })),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("img", { id: 'random', src: "src/circular-gauge/images/gauge-1.png", alt: "Customized gauge 1", style: { marginLeft: '25px', marginTop: '10px' }, onClick: this.random.bind(this), ref: function (d) { return _this.image1 = d; } }),
                                        React.createElement("div", { id: "random_line", style: { display: "block", left: "0px", background: "#ff4081", "padding-top": "0px", height: "2px", width: "85px", margin: "2px 2px 2px 17px" } })),
                                    React.createElement("td", null,
                                        React.createElement("img", { id: 'usage', src: "src/circular-gauge/images/gauge-2.png", alt: "Customized gauge 2", style: { marginLeft: '25px', marginTop: '10px' }, onClick: this.usage.bind(this), ref: function (d) { return _this.image2 = d; } }),
                                        React.createElement("div", { id: "usage_line", style: { display: "none", left: "0px", background: "#ff4081", "padding-top": "0px", height: "2px", width: "85px", margin: "2px 2px 2px 17px" } }))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'currentPointerValue' },
                                            "Current Value ",
                                            React.createElement("span", null, " \u00A0\u00A0\u00A01800"),
                                            " ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "currentValue", defaultValue: "1800", min: "1000", max: "2000", style: { width: "90%" }, onChange: this.pointerValue.bind(this), ref: function (d) { return _this.pointerValueElement = d; } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'rangebarColor' }, "RangeBar Color")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "barColor", className: "form-control" },
                                                React.createElement("option", { value: "#FFDD00" }, "#FFDD00"),
                                                React.createElement("option", { value: "#00bdae" }, "#00bdae"),
                                                React.createElement("option", { value: "#FF2680" }, "#FF2680"))))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'range' }, "Range Color")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "rangeColor", className: "form-control" },
                                                React.createElement("option", { value: "#E0E0E0" }, "#E0E0E0"),
                                                React.createElement("option", { value: "#7bb4eb" }, "#7bb4eb"),
                                                React.createElement("option", { value: "#ea7a57" }, "#ea7a57"))))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'pointColor' }, "Pointer Color")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement("select", { id: "pointerColor", className: "form-control" },
                                                React.createElement("option", { value: "#424242" }, "#424242"),
                                                React.createElement("option", { value: "#6f6fe2" }, "#6f6fe2"),
                                                React.createElement("option", { value: "#9e480e" }, "#9e480e")))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates how to customize the gauge with pointers. Options to change the color and type of the pointer are available in the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to customize the gauge elements such as ",
                    React.createElement("code", null, "pointers"),
                    " and ",
                    React.createElement("code", null, "range"),
                    ". Here a needle and range bar are added to show the current value and its appearance can be customized by using options in property panel."),
                React.createElement("p", null,
                    "More information on the range and pointer customization can be found in this",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation" }, " documentation section"),
                    "."))));
    };
    Customization.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.barColor = new ej2_dropdowns_1.DropDownList({
                index: 0,
                width: 130,
                change: function () {
                    var barColor = _this.barColor.value.toString();
                    if (!_this.isClicked) {
                        if (_this.isUsage) {
                            _this.usageGauge.axes[0].pointers[0].color = barColor;
                            _this.usageGauge.refresh();
                        }
                        else {
                            _this.randomGauge.axes[0].pointers[0].color = barColor;
                            _this.randomGauge.refresh();
                        }
                    }
                    else {
                        _this.gauge1.axes[0].pointers[0].color = barColor;
                        _this.gauge1.refresh();
                        _this.randomGauge.axes[0].pointers[0].color = barColor;
                    }
                }
            });
            this.barColor.appendTo('#barColor');
            this.rangeColor = new ej2_dropdowns_1.DropDownList({
                index: 0,
                width: 130,
                change: function () {
                    var barColor = _this.rangeColor.value.toString();
                    if (!_this.isClicked) {
                        if (_this.isUsage) {
                            _this.usageGauge.axes[0].ranges[0].color = barColor;
                            _this.usageGauge.refresh();
                        }
                        else {
                            _this.randomGauge.axes[0].ranges[0].color = barColor;
                            _this.randomGauge.refresh();
                        }
                    }
                    else {
                        _this.gauge1.axes[0].ranges[0].color = barColor;
                        _this.gauge1.refresh();
                        _this.randomGauge.axes[0].ranges[0].color = barColor;
                    }
                }
            });
            this.rangeColor.appendTo('#rangeColor');
            this.pointerColor = new ej2_dropdowns_1.DropDownList({
                index: 0,
                width: 130,
                change: function () {
                    var barColor = _this.pointerColor.value.toString();
                    if (!_this.isClicked) {
                        if (!_this.isUsage) {
                            _this.randomGauge.axes[0].pointers[1].color = barColor;
                            _this.randomGauge.axes[0].pointers[1].cap.border.color = barColor;
                            _this.randomGauge.axes[0].pointers[1].cap.color = barColor;
                            _this.randomGauge.refresh();
                        }
                    }
                    else {
                        _this.gauge1.axes[0].pointers[1].color = barColor;
                        _this.gauge1.axes[0].pointers[1].cap.border.color = barColor;
                        _this.gauge1.axes[0].pointers[1].cap.color = barColor;
                        _this.gauge1.refresh();
                        _this.randomGauge.axes[0].pointers[1].color = barColor;
                        _this.randomGauge.axes[0].pointers[1].cap.border.color = barColor;
                        _this.randomGauge.axes[0].pointers[1].cap.color = barColor;
                    }
                }
            });
            this.pointerColor.appendTo('#pointerColor');
        }
        var selectedTheme = location.hash.split('/')[1];
        var color;
        if (selectedTheme === 'bootstrap') {
            color = '#a16ee5';
        }
        else if (selectedTheme === 'fabric') {
            color = '#1783FF';
        }
        else {
            color = '#ff4081';
        }
        var exisLine = document.getElementById('usage_line');
        var currentLine = document.getElementById('random_line');
        exisLine.style.background = color;
        currentLine.style.background = color;
    };
    return Customization;
}(sample_base_1.SampleBase));
exports.Customization = Customization;
