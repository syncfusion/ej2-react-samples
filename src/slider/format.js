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
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 40%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 40px;\n}\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n.sliderwrap label {\n    padding-bottom: 26px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n    text-align: left;\n    width: 100%;\n}\n";
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currencyTicks = {
            placement: 'After', largeStep: 25, smallStep: 5, showSmallTicks: true,
            // Formatting ticks value in currency with 3-decimal specifier.
            format: 'c1'
        };
        _this.currencyTooltip = {
            placement: 'Before', isVisible: true,
            // Formatting tooltip value in currency with 2-decimal specifier.
            format: 'c2'
        };
        _this.kilometerTicks = {
            placement: 'After',
            largeStep: 400,
            smallStep: 200,
            showSmallTicks: true,
            /**
             * Formatting ticks value in numeric with 2-decimal specifier if the any decimal values occurred.
             * Zeros will be filled if the values are not in 4-digits in the fractional part.
             */
            format: '00##.## km'
        };
        _this.kilometerTooltip = {
            placement: 'Before',
            isVisible: true,
            /**
             * Formatting tooltip value in numeric with 2-decimal specifier if the any decimal values occurred.
             * Zeros will be filled if the values are not in 4-digits in the fractional part.
             */
            format: '00##.## km'
        };
        _this.minValue = new Date(2013, 6, 13, 11).getTime();
        _this.maxValue = new Date(2013, 6, 13, 23).getTime();
        // 3600000 milliseconds = 1 Hour, 3600000 / 6 milliseconds = 10 Minutes
        _this.stepValue = 3600000 / 6;
        _this.value = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
        _this.timeTooltip = {
            placement: 'Before', isVisible: true
        };
        _this.timeTicks = {
            placement: 'After',
            // 3 * 3600000 milliseconds = 3 Hour
            largeStep: 3 * 3600000,
            smallStep: 3600000, showSmallTicks: true
        };
        return _this;
    }
    Format.prototype.tooltipChangeHandler = function (args) {
        // Splitting the range values from the tooltip using space into an array.
        var totalMiliSeconds = args.text.split(' ');
        // First part is the first handle value
        var firstPart = totalMiliSeconds[0];
        // Second part is the second handle value
        var secondPart = totalMiliSeconds[2];
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        var custom = { hour: '2-digit', minute: '2-digit' };
        firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
        secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
        // Assigning our custom text to the tooltip value.
        args.text = firstPart + ' - ' + secondPart;
    };
    Format.prototype.renderingTicksHandler = function (args) {
        var totalMiliSeconds = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        var custom = { hour: '2-digit', minute: '2-digit' };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString('en-us', custom);
    };
    // Handler used to reposition the tooltip on page scroll
    Format.prototype.onScroll = function () {
        if (this.currencyObj && this.kilometerObj && this.timeObj) {
            for (var _i = 0, _a = [this.currencyObj, this.kilometerObj, this.timeObj]; _i < _a.length; _i++) {
                var slider = _a[_i];
                slider.refreshTooltip(slider.tooltipTarget);
            }
        }
    };
    Format.prototype.render = function () {
        var _this = this;
        if (!ej2_base_1.isNullOrUndefined(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("style", null, slidercss),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Currency Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider01", value: [20, 80], min: 0, max: 100, ticks: this.currencyTicks, tooltip: this.currencyTooltip, type: 'Range', ref: function (slider) { _this.currencyObj = slider; } })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Kilometer Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider02", value: [1100, 1850], min: 900, max: 2100, ticks: this.kilometerTicks, type: 'Range', tooltip: this.kilometerTooltip, ref: function (slider) { _this.kilometerObj = slider; } })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Time Slider"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider03", value: this.value, min: this.minValue, max: this.maxValue, ticks: this.timeTicks, type: 'Range', step: this.stepValue, tooltip: this.timeTooltip, tooltipChange: this.tooltipChangeHandler.bind(this), renderingTicks: this.renderingTicksHandler.bind(this), ref: function (slider) { _this.timeObj = slider; } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the formatting of Ticks and Tooltip of Slider. Drag the thumb over the bar for selecting the formatted values between min and max.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The format feature used to customize the units of Slider values to desired format. The formatted values will also be applied to the ARIA attributes of the slider"),
                React.createElement("p", null, "In this demo, we have demonstrated Slider with Currency, Kilometer and Time formatting."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Currency Slider \u2013 In this sample, Ticks and Tooltip are formatted to currency using format API in both tooltip and ticks. "),
                    React.createElement("li", null, "Kilometer Slider \u2013 In this sample, Ticks and Tooltip are formatted to Kilometer using format API in both tooltip and ticks. "),
                    React.createElement("li", null, "Time Slider \u2013 In this sample, Ticks and Tooltip are formatted to Time using change event in Tooltip and renderingTicks event in Ticks")),
                React.createElement("p", null,
                    "For more information, we can refer the",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/documentation/slider/format.html?lang=es6" }, "Format"),
                    " section from the documentation."))));
    };
    return Format;
}(sample_base_1.SampleBase));
exports.Format = Format;
