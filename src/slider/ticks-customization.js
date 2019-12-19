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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./ticks-customization.css");
var TicksCustomization = (function (_super) {
    __extends(TicksCustomization, _super);
    function TicksCustomization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ticks = { placement: 'Before', largeStep: 20 };
        _this.ticksData = { placement: 'Both', largeStep: 20, smallStep: 5 };
        return _this;
    }
    TicksCustomization.prototype.renderingTicks = function (args) {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    };
    TicksCustomization.prototype.onrenderedSliderTicks = function (args) {
        this.li = args.ticksWrapper.getElementsByClassName('e-large');
        var remarks = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (var i = 0; i < this.li.length; ++i) {
            this.li[i].querySelectorAll('.e-tick-both')[1].innerText = remarks[i];
        }
    };
    TicksCustomization.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "slider-content-wrapper" },
                    React.createElement("div", { className: "slider_container" },
                        React.createElement("div", { className: "slider_container", id: "slider_wrapper" },
                            React.createElement("div", { className: "slider_labelText userselect" }, "Dynamic ticks color"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "ticks_slider", value: 20, min: 0, max: 100, step: 5, ticks: this.ticks, type: "MinRange", renderingTicks: this.renderingTicks.bind(this), ref: function (slider) { _this.defaultObj = slider; } })),
                        React.createElement("div", { className: "slider_container" },
                            React.createElement("div", { className: "slider_labelText userselect" }, "Ticks with legends"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider", value: 20, min: 0, max: 100, type: "MinRange", ticks: this.ticksData, ref: function (slider) { _this.sliderObj = slider; }, renderedTicks: this.onrenderedSliderTicks.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the customization of Slider's Tick. Drag the thumb over the bar for selecting the values between min and max.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, we have demonstrated the following customization of Ticks using CSS."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Dynamic ticks color - In this sample, Ticks has been customized to different colors by adding icon at each Ticks."),
                    React.createElement("li", null, "Ticks with legends - In this sample, Track has been formatted to display custom text using renderingTicks and renderedTicks events. ")))));
    };
    return TicksCustomization;
}(sample_base_1.SampleBase));
exports.TicksCustomization = TicksCustomization;
