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
require("./bar.css");
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Handler used for slider created event
    Bar.prototype.onCreated = function () {
        var sliderTrack = document.getElementById('dynamic_color_slider').querySelector('.e-range');
        var sliderHandle = document.getElementById('dynamic_color_slider').querySelector('.e-handle');
        sliderHandle.style.backgroundColor = 'green';
        sliderTrack.style.backgroundColor = 'green';
    };
    Bar.prototype.onChange = function (args) {
        var sliderTrack = document.getElementById('dynamic_color_slider').querySelector('.e-range');
        var sliderHandle = document.getElementById('dynamic_color_slider').querySelector('.e-handle');
        if (args.value > 0 && args.value <= 25) {
            // Change handle and range bar color to green when
            sliderTrack.style.backgroundColor = 'green';
            sliderHandle.style.backgroundColor = 'green';
        }
        else if (args.value > 25 && args.value <= 50) {
            // Change handle and range bar color to royal blue
            sliderTrack.style.backgroundColor = 'royalblue';
            sliderHandle.style.backgroundColor = 'royalblue';
        }
        else if (args.value > 50 && args.value <= 75) {
            // Change handle and range bar color to dark orange
            sliderTrack.style.backgroundColor = 'darkorange';
            sliderHandle.style.backgroundColor = 'darkorange';
        }
        else if (args.value > 75 && args.value <= 100) {
            // Change handle and range bar color to red
            sliderTrack.style.backgroundColor = 'red';
            sliderHandle.style.backgroundColor = 'red';
        }
    };
    Bar.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "col-lg-12 control-section" },
                    React.createElement("div", { className: "slider-content-wrapper" },
                        React.createElement("div", { className: "slider_container" },
                            React.createElement("div", { className: "slider-labeltext slider_userselect" }, "Height"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "height_slider", value: 30, min: 0, max: 100 })),
                        React.createElement("div", { className: "slider_container" },
                            React.createElement("div", { className: "slider-labeltext slider_userselect" }, "Gradient color"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "gradient_slider", value: 50, min: 0, max: 100, type: "MinRange" })),
                        React.createElement("div", { className: "slider_container" },
                            React.createElement("div", { className: "slider-labeltext slider_userselect" }, "Dynamic thumb and selection bar color"),
                            React.createElement(ej2_react_inputs_1.SliderComponent, { id: "dynamic_color_slider", value: 20, min: 0, max: 100, type: "MinRange", created: this.onCreated.bind(this), change: this.onChange.bind(this) }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the customization of Slider's selection bar. Drag the thumb over the bar for selecting the values between min and max.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, customization of track using CSS is demonstrated."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Height - In this sample, track has been customized to custom height. Here, thumb has to be adjusted based on the track height."),
                    React.createElement("li", null, "Gradient color - In this sample, track has been customized with gradient color. "),
                    React.createElement("li", null, "Dynamic thumb and selection bar color - In this sample, track and thumb has been customized to different colors for different intervals by using created and change event. ")))));
    };
    return Bar;
}(sample_base_1.SampleBase));
exports.Bar = Bar;
